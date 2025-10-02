// src/pages/lessons/PronunciationPage.jsx
import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; 
import { pronunciationData } from '../../data/pronunciationData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';

/**
 * Renders the American English Pronunciation Guide lesson content.
 * This component is a lightweight wrapper that loads the canonical data 
 * and delegates all block rendering (text, charts, quizzes) to the 
 * ContentBlockRenderer for a clean, maintenance-friendly design.
 */
export default function PronunciationPage() {
    // Note: useTheme is included here for future component needs, though not strictly used in this minimal page structure.
    const theme = useTheme(); 

    useEffect(() => {
        document.title = `${pronunciationData.title} | ESL Lessons`;
    }, []);

    // The data is automatically consumed sequentially by the renderer.
    // This design eliminates the old complex logic for tabs and content selectors.

    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 2, md: 4 } }}>
            {/* Header: Displays the Title and Subtitle directly from the canonical data */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {pronunciationData.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {pronunciationData.subtitle}
                </Typography>
            </Box>

            {/* Core Content Rendering: This single line replaces all previous complex, manual rendering logic. */}
            <ContentBlockRenderer content={pronunciationData.content} />
        </Box>
    );
}
