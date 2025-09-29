// src/pages/lessons/NewsArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import { getNewsArticle } from '../../services/api.js'; // UPDATED IMPORT
import TwoPaneLayout from '../../components/TwoPaneLayout';
import DetailCard from '../../components/DetailCard';

const Header = ({ title }) => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      {title}
    </Typography>
  </Box>
);

const ArticlePane = ({ text, imageUrl }) => {
    const content = `
        ${imageUrl ? `<img src="${imageUrl}" alt="" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 1em;" />` : ''}
        ${text.split('\n').map(p => `<p>${p}</p>`).join('')}
    `;
    return <DetailCard content={content} />;
};

const HomeworkPane = ({ questions, writingPrompt, theme }) => {
    const formatList = (text) => {
        if (!text) return '';
        return text.split('\n').filter(line => line.trim()).map(line => `<li>${line}</li>`).join('');
    };

    const questionsHtml = questions ? `
        <h4 style="font-weight: bold; margin-bottom: 1em; color: ${theme.palette.text.primary};">Comprehension Questions:</h4>
        <ol style="list-style-position: inside; padding-left: 0; margin: 0; display: grid; gap: 1em;">
            ${formatList(questions)}
        </ol>
    ` : '';

    const writingPromptHtml = writingPrompt ? `
        <div style="margin-top: ${questions ? '2em' : '0'}; padding-top: ${questions ? '1.5em' : '0'}; border-top: ${questions ? `1px solid ${theme.palette.divider}` : 'none'};">
            <h4 style="font-weight: bold; margin-bottom: 1em; color: ${theme.palette.text.primary};">Writing Practice:</h4>
            <p style="color: ${theme.palette.text.secondary};">${writingPrompt}</p>
        </div>
    ` : '';

    return <DetailCard content={`${questionsHtml}${writingPromptHtml}`} />;
};

export default function NewsArticlePage() {
    const { slug, level } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setLoading(true);
                const data = await getNewsArticle(slug);
                if (data && data.fields) {
                    setArticle(data.fields);
                } else {
                    setError('Article not found. Please check the link.');
                }
            } catch (err) {
                setError('Failed to load the article. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (slug) loadArticle();
    }, [slug]);
    
    useEffect(() => {
        if (article) document.title = `${article.Headline} | ESL Lessons`;
    }, [article]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}><CircularProgress /></Box>;
    }
    if (error) {
        return <Typography color="error" textAlign="center" variant="h5">{error}</Typography>;
    }
    if (!article) return null;

    const articleText = article[`Level ${level} Text`];
    const questions = article[`Level ${level} Questions`];
    const writingPrompt = article[`Level ${level} Writing Prompt`];
    const imageUrl = article['Image URL'];

    if (!articleText) {
        return <Typography color="error" textAlign="center" variant="h5">The requested difficulty level is not available for this article.</Typography>;
    }

    return (
        <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <Header title={article.Headline} />
            <TwoPaneLayout
                pane1={<ArticlePane text={articleText} imageUrl={imageUrl} />}
                pane2={<HomeworkPane questions={questions} writingPrompt={writingPrompt} theme={theme} />}
            />
        </Box>
    );
}