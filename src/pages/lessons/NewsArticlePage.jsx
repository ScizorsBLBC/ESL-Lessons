// src/pages/lessons/NewsArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getNewsArticleForLevel } from '../../utils/dataAccess.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import LessonHeader from '../../components/LessonHeader';
import TwoPaneLayout from '../../components/TwoPaneLayout';

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

    // Check if this level has a two-pane layout (levels 1, 3, 6)
    const levelNum = parseInt(level);
    const hasTwoPaneLayout = [1, 3, 6].includes(levelNum);

    // For two-pane layout, separate main content from exercises
    if (hasTwoPaneLayout && article.content && article.content.length > 0) {
        const mainContent = article.content[0]; // Main article text
        const exercisesContent = article.content.slice(1); // Questions and writing prompt

        return (
            <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
                <LessonHeader title={article.title} subtitle={article.subtitle} />
                <TwoPaneLayout
                    pane1={<ContentBlockRenderer content={[mainContent]} />}
                    pane2={<ContentBlockRenderer content={exercisesContent} />}
                />
            </Box>
        );
    }

    // Single pane layout for other levels
    return (
        <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <LessonHeader title={article.title} subtitle={article.subtitle} />
            <ContentBlockRenderer content={article.content || []} />
        </Box>
    );
}