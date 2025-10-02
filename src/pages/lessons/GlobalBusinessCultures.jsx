// src/pages/lessons/GlobalBusinessCultures.jsx
import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { culturalData } from '../../data/culturalData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';

/**
 * Renders the Global Business Cultures lesson content.
 * * This component acts as a lightweight wrapper, loading the canonical data
 * and delegating all content rendering (charts, text, flashcards) to the 
 * centralized ContentBlockRenderer. This eliminates the complex multi-tab 
 * and custom rendering logic of the original file.
 */
export default function GlobalBusinessCultures() {
    useEffect(() => {
        document.title = `${culturalData.title} | ESL Lessons`;
    }, []);

    // This lesson now relies entirely on the 'content' array structure
    // defined in culturalData.js to sequentially display the introduction,
    // three comparative charts (with their detailed explanations), the vocabulary,
    // country notes, and homework assignments.

    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 2, md: 4 } }}>
            
            {/* Header: Displays the Title and Subtitle directly from the canonical data */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {culturalData.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {culturalData.subtitle}
                </Typography>
            </Box>

            {/* Core Content Rendering: This single line replaces all previous complex logic. */}
            <ContentBlockRenderer content={culturalData.content} />
            
        </Box>
    );
}
