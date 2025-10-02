import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { prepositionData } from '../../data/prepositionData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';

/**
 * Renders the English Prepositions lesson content from the canonical JSON data file.
 * The complex rendering logic (tabs, selections, etc.) has been removed, relying
 * entirely on the structured data and the ContentBlockRenderer component.
 *
 * This refactoring significantly reduces file size and maintenance complexity.
 */
export default function EnglishPrepositions() {
    useEffect(() => {
        document.title = `${prepositionData.title} | ESL Lessons`;
    }, []);

    // The data is automatically consumed sequentially by the renderer.

    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 2, md: 4 } }}>
            {/* Header: Displays the Title and Subtitle directly from the canonical data */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {prepositionData.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {prepositionData.subtitle}
                </Typography>
            </Box>

            {/* Core Content Rendering: This single line replaces all previous complex logic. */}
            <ContentBlockRenderer content={prepositionData.content} />
        </Box>
    );
}
