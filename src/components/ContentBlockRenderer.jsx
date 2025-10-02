import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { createVisualizationWrapper } from '../utils/stylingUtils';

// Import all content block components
import Quiz from './Quiz';
import FillInTheBlanks from './FillInTheBlanks';
import Flashcard from './Flashcard';
import YouTubeEmbed from './YouTubeEmbed';
import ChartSection from './ChartSection'; // Existing chart component, renamed from Chart.jsx
import TimelineVisualization from './TimelineVisualization'; // Existing component
import ConceptMapVisualization from './ConceptMapVisualization'; // New component
import FlowchartVisualization from './FlowchartVisualization';   // New component

/**
 * A central component responsible for rendering all types of content blocks
 * based on the structured JSON schema. This enforces the data-driven architecture.
 *
 * @param {object} props
 * @param {string} props.blockId - Unique ID for the block.
 * @param {('text'|'quiz'|'fillInTheBlanks'|'flashcard'|'youtubeEmbed'|'chart'|'timeline'|'conceptMap'|'flowchart')} props.type - The type of content block.
 * @param {object} props.data - The data object specific to the block type.
 * @param {object} [props.accessibility] - Optional accessibility data for visualizations.
 * @returns {JSX.Element} The rendered content block component.
 */
const ContentBlockRenderer = ({ blockId, type, data, accessibility }) => {
    const theme = useTheme();

    // Use centralized styling utilities for consistency
    const visualizationWrapperStyle = createVisualizationWrapper()(theme);

    try {
        switch (type) {
            case 'text':
                // For a simple text block, we render raw HTML content directly.
                return (
                    <Box key={blockId} sx={{ my: 3 }} className="lesson-text">
                        <div dangerouslySetInnerHTML={{ __html: data.htmlContent }} />
                    </Box>
                );

            case 'quiz':
                return <Quiz key={blockId} data={data} />;

            case 'fillInTheBlanks':
                return <FillInTheBlanks key={blockId} data={data} />;

            case 'flashcard':
                return <Flashcard key={blockId} data={data} />;

            case 'youtubeEmbed':
                return <YouTubeEmbed key={blockId} embedUrl={data.embedUrl} title={data.title} />;

            case 'chart':
                return (
                    <Box key={blockId} sx={visualizationWrapperStyle}>
                        <ChartSection data={data} accessibility={accessibility} />
                    </Box>
                );

            case 'timeline':
                return (
                    <Box key={blockId} sx={visualizationWrapperStyle}>
                        <TimelineVisualization data={data} accessibility={accessibility} />
                    </Box>
                );

            case 'conceptMap':
                return (
                    <Box key={blockId} sx={visualizationWrapperStyle}>
                        <ConceptMapVisualization data={data} accessibility={accessibility} />
                    </Box>
                );

            case 'flowchart':
                return (
                    <Box key={blockId} sx={visualizationWrapperStyle}>
                        <FlowchartVisualization data={data} accessibility={accessibility} />
                    </Box>
                );

            default:
                // Handle unknown block type gracefully
                console.error(`Unknown content block type: ${type} for blockId: ${blockId}`);
                return (
                    <Box key={blockId} sx={{ my: 3, p: 2, border: '1px dashed red' }}>
                        <Typography color="error">
                            Error: Unknown block type "{type}" (ID: {blockId})
                        </Typography>
                    </Box>
                );
        }
    } catch (error) {
        // Handle rendering errors
        console.error(`Error rendering block ${blockId} of type ${type}:`, error);
        return (
            <Box key={blockId} sx={{ my: 3, p: 2, border: '1px solid red', bgcolor: 'error.main', color: 'white' }}>
                <Typography variant="h6">Fatal Rendering Error</Typography>
                <Typography>
                    A critical error occurred while displaying this lesson section (Type: {type}, ID: {blockId}). Please check the data structure.
                </Typography>
            </Box>
        );
    }
};

/**
 * Main wrapper for a lesson. It iterates through the content array and renders each block.
 * @param {object} props
 * @param {Array<object>} props.content - The array of content blocks from the JSON lesson data.
 */
const LessonContentRenderer = ({ content }) => {
    if (!content || content.length === 0) {
        return <Typography variant="h5" color="textSecondary" sx={{ mt: 4 }}>Lesson content is empty or not yet loaded.</Typography>;
    }

    return (
        <Box className="lesson-content-container">
            {content.map((block) => (
                <ContentBlockRenderer key={block.blockId} {...block} />
            ))}
        </Box>
    );
};

// Export the wrapper as the default export for use in lesson page templates
export default LessonContentRenderer;
