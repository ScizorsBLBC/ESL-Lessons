import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { phrasalVerbData } from '../../data/phrasalVerbData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';

/**
 * Renders the Phrasal Verbs lesson content from the canonical JSON data file.
 * This page leverages the standard architecture, relying on the ContentBlockRenderer
 * to dynamically render text, flashcards, quizzes, and fill-in-the-blanks practice.
 */
export default function PhrasalVerbs() {
    useEffect(() => {
        document.title = `${phrasalVerbData.title} | ESL Lessons`;
    }, []);

    // The entire lesson structure and flow are defined in phrasalVerbData.content.

    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 2, md: 4 } }}>
            {/* Header: Displays the Title and Subtitle directly from the canonical data */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {phrasalVerbData.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {phrasalVerbData.subtitle}
                </Typography>
            </Box>

            {/* Core Content Rendering: This line executes the entire lesson plan */}
            <ContentBlockRenderer content={phrasalVerbData.content} />
        </Box>
    );
}
