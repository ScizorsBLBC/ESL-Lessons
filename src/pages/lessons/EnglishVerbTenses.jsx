import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { verbTenseData } from '../../data/verbTenseData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import LessonTabs from '../../components/LessonTabs';
import GlassButtonWrapper from '../../components/GlassButtonWrapper';
import TimelineVisualization from '../../components/TimelineVisualization'; // Import the Visualization

/**
 * Utility function to extract the content for a specific tab.
 * In a fully refactored state, this logic would likely be cleaner or handled server-side,
 * but this is adapted from the existing page structure.
 */
const groupContentByCategory = (contentBlocks) => {
    const categories = {
        intro: [],
        past: [],
        present: [],
        future: [],
        practice: [],
    };
    
    // Separate the timeline component from the main content flow
    const timelineBlock = contentBlocks.find(block => block.type === 'timeline');
    const mainContent = contentBlocks.filter(block => block.type !== 'timeline');

    mainContent.forEach(block => {
        const blockId = block.blockId.toLowerCase();

        if (blockId.includes('intro-')) {
            categories.intro.push(block);
        } else if (blockId.includes('past-')) {
            categories.past.push(block);
        } else if (blockId.includes('present-')) {
            categories.present.push(block);
        } else if (blockId.includes('future-')) {
            categories.future.push(block);
        } else if (blockId.includes('practice-')) {
            categories.practice.push(block);
        } else {
            // Uncategorized blocks fall into intro
            categories.intro.push(block);
        }
    });

    return { categories, timelineBlock };
};

// Main lesson page component
export default function EnglishVerbTenses() {
    const { categories, timelineBlock } = useMemo(() => groupContentByCategory(verbTenseData.content), []);
    const [activeTab, setActiveTab] = useState('present'); // Default to Present tenses
    const [selectedTenseId, setSelectedTenseId] = useState('simple-present'); // Tense ID to highlight on the timeline

    // Group tenses by their aspect (Simple, Continuous, Perfect, Perfect Continuous)
    // This allows us to map the full set of tenses for button presentation.
    const allTenseData = useMemo(() => {
        const points = timelineBlock?.data?.timePoints || [];
        const spans = timelineBlock?.data?.timeSpans || [];
        // Combine all tenses, keying them by their ID for easy lookup and filtering
        return [...points, ...spans].reduce((acc, tense) => {
            acc[tense.id] = tense;
            return acc;
        }, {});
    }, [timelineBlock]);

    // Filter tenses based on the active tab for display in the sub-selection buttons
    const tensesForActiveTab = useMemo(() => {
        const tenseIds = {
            'past': ['simple-past', 'past-continuous', 'past-perfect', 'past-perfect-continuous'],
            'present': ['simple-present', 'present-continuous', 'present-perfect', 'present-perfect-continuous'],
            'future': ['simple-future', 'future-continuous', 'future-perfect', 'future-perfect-continuous'],
        }[activeTab] || [];
        
        return tenseIds.map(id => allTenseData[id]).filter(Boolean);
    }, [activeTab, allTenseData]);


    // Determine the content blocks to render beneath the buttons
    const getSelectedTenseContent = () => {
        // Find the block that corresponds to the currently selected Tense ID
        return categories[activeTab].filter(block => block.blockId.includes(selectedTenseId))
    };

    // Tabs configuration
    const tabs = [
        { label: 'Introduction', value: 'intro', content: categories.intro },
        { label: 'Present Tenses', value: 'present', content: categories.present },
        { label: 'Past Tenses', value: 'past', content: categories.past },
        { label: 'Future Tenses', value: 'future', content: categories.future },
        { label: 'Practice', value: 'practice', content: categories.practice },
    ];

    // Handle button click for tense selection
    const handleTenseSelection = (tenseId) => {
        setSelectedTenseId(tenseId);
    };
    
    // Auto-select the first tense when switching tabs
    useMemo(() => {
        if (tensesForActiveTab.length > 0 && activeTab !== 'intro' && activeTab !== 'practice') {
             // Find the 'simple' tense to set as the default when the tab changes
             const defaultTense = tensesForActiveTab.find(t => t.id.startsWith('simple-')) || tensesForActiveTab[0];
             setSelectedTenseId(defaultTense.id);
        }
    }, [activeTab, tensesForActiveTab]);


    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 2, md: 4 } }}>
            {/* 1. Header (Static Title/Subtitle) */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {verbTenseData.title}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {verbTenseData.subtitle}
                </Typography>
            </Box>

            {/* 2. Global Timeline Visualization (Always Visible, Interactive) */}
            {timelineBlock && (
                <Box sx={{ my: 4, p: { xs: 1, md: 2 } }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', color: 'primary.dark' }}>
                        Visualizing the Grammar of Time
                    </Typography>
                    <TimelineVisualization
                        data={timelineBlock.data}
                        accessibility={timelineBlock.accessibility}
                        // New prop: Pass the currently selected Tense ID to highlight it on the timeline
                        selectedId={selectedTenseId}
                        // Allow the timeline visual element to set the selected ID when clicked
                        onSelectId={handleTenseSelection} 
                    />
                </Box>
            )}

            {/* 3. Lesson Tabs */}
            <LessonTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
                <ContentBlockRenderer 
                    content={categories[activeTab].filter(block => 
                        // Only render content blocks that are NOT related to a specific tense here.
                        // Specific tense content is rendered below the buttons.
                        !(block.blockId.startsWith('present-') || block.blockId.startsWith('past-') || block.blockId.startsWith('future-'))
                    )} 
                />

                {/* Tense Selection Buttons (Only visible on Past, Present, Future tabs) */}
                {(activeTab === 'present' || activeTab === 'past' || activeTab === 'future') && (
                    <Box sx={{ my: 4, textAlign: 'center' }}>
                        <Typography variant="h6" component="p" sx={{ mb: 3, color: 'text.secondary' }}>
                            Select a specific tense to explore its details:
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            flexWrap="wrap"
                            useFlexGap
                            sx={{
                                maxWidth: '800px',
                                mx: 'auto',
                                rowGap: 2,
                            }}
                        >
                            {tensesForActiveTab.map((tense) => (
                                <GlassButtonWrapper key={tense.id} isActive={selectedTenseId === tense.id}>
                                    <Button 
                                        onClick={() => handleTenseSelection(tense.id)}
                                        sx={{ 
                                            textTransform: 'none',
                                            // Extract and display the user-friendly label from contentHtml 
                                            // The label is the first word in the contentHtml block title, e.g., "Present Simple"
                                            // This is a simple parsing hack derived from the old JSX logic, ideally the data would provide a clean .label
                                        }}
                                    >
                                        {tense.label}
                                    </Button>
                                </GlassButtonWrapper>
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* Tense Detail Content (Rendered below the buttons, based on selectedTenseId) */}
                {(activeTab === 'present' || activeTab === 'past' || activeTab === 'future') && (
                    <Box sx={{ my: 4 }}>
                        {/* Render the specific detail block that matches the selected ID */}
                        <ContentBlockRenderer content={getSelectedTenseContent()} />
                    </Box>
                )}
            </LessonTabs>
        </Box>
    );
}
