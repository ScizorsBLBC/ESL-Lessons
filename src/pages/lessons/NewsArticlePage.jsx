// src/pages/lessons/NewsArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getNewsArticleForLevel } from '../../utils/dataAccess.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import LessonHeader from '../../components/LessonHeader';

export default function NewsArticlePage() {
    const { slug, level } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setLoading(true);
            const levelNum = parseInt(level);
            const data = getNewsArticleForLevel(slug, levelNum);

            if (data) {
                setArticle(data);
            } else {
                setError('Article not found. Please check the link.');
            }
        } catch (err) {
            setError('Failed to load the article. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [slug, level]);

    useEffect(() => {
        if (article) document.title = `${article.title} | ESL Lessons`;
    }, [article]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" textAlign="center" variant="h5">
                {error}
            </Typography>
        );
    }

    if (!article) return null;

    // Check if we have content for this level
    if (!article.content || article.content.length === 0) {
        return (
            <Typography color="error" textAlign="center" variant="h5">
                The requested difficulty level is not available for this article.
            </Typography>
        );
    }

    return (
        <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <LessonHeader title={article.title} subtitle={article.subtitle} />
            <ContentBlockRenderer contentBlocks={article.content} />
        </Box>
    );
}