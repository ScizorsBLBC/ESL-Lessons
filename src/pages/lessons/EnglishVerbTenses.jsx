// src/pages/lessons/EnglishVerbTenses.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Tabs, Tab, Button, Stack, Grid } from '@mui/material';
import { verbTenseData } from '../../data/verbTenseData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import LessonTabs from '../../components/LessonTabs';
import GlassButtonWrapper from '../../components/GlassButtonWrapper';
import TimelineVisualization from '../../components/TimelineVisualization';

// Header component for consistent styling
const Header = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      {verbTenseData.title}
    </Typography>
    <Typography variant="h6" sx={{ color: 'text.primary' }}>
      {verbTenseData.subtitle}
    </Typography>
  </Box>
);

  // Group content blocks by category for tabbed organization
  const groupContentByCategory = (contentBlocks) => {
    const categories = {
      present: [],
      past: [],
      future: [],
      homework: []
    };

    contentBlocks.forEach(block => {
      const blockId = block.blockId.toLowerCase();

      if (blockId.includes('present-') && !blockId.includes('summary')) {
        categories.present.push(block);
      } else if (blockId.includes('past-') && !blockId.includes('summary')) {
        categories.past.push(block);
    } else if (blockId.includes('future-') && !blockId.includes('summary')) {
      categories.future.push(block);
      } else if (blockId.includes('practice') || blockId.includes('fill-blanks') ||
                 blockId.includes('transformation') || blockId.includes('final-practice')) {
        categories.homework.push(block);
      } else {
        // Default to present if category unclear
        categories.present.push(block);
      }
    });

    return categories;
  };

// --- Main Exported Component ---
export default function EnglishVerbTenses() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTense, setSelectedTense] = useState(null);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedTense(null); // Reset tense selection when changing tabs
  };

  // Create timeline data for each section
  const timelineData = useMemo(() => {
    const timelines = {
      0: [ // Present Tenses
        { label: "Simple Present", description: "Habits, facts, and schedules" },
        { label: "Present Continuous", description: "Actions happening now or temporary situations" },
        { label: "Present Perfect", description: "Past actions with present results" },
        { label: "Present Perfect Continuous", description: "Duration of ongoing actions" }
      ],
      1: [ // Past Tenses
        { label: "Simple Past", description: "Completed actions at specific past times" },
        { label: "Past Continuous", description: "Actions in progress in the past" },
        { label: "Past Perfect", description: "Actions completed before other past actions" },
        { label: "Past Perfect Continuous", description: "Duration before other past actions" }
      ],
      2: [ // Future Tenses
        { label: "Future with 'will'", description: "Spontaneous decisions and predictions" },
        { label: "'Be going to'", description: "Prior plans and evidence-based predictions" },
        { label: "Future Continuous", description: "Actions in progress at future times" },
        { label: "Future Perfect", description: "Actions completed before future times" },
        { label: "Future Perfect Continuous", description: "Duration leading up to future times" }
      ]
    };

    return timelines[activeTab] || [];
  }, [activeTab]);

  // Calculate current timeline index based on selected tense
  const currentTimelineIndex = useMemo(() => {
    if (!selectedTense) return 0;
    return timelineData.findIndex(item =>
      selectedTense.data.htmlContent.includes(item.label.replace(/['"]|^\s*-\s*/, ''))
    );
  }, [selectedTense, timelineData]);

  useEffect(() => {
    document.title = `${verbTenseData.title} | ESL Lessons`;
  }, []);

  // Group content blocks by category
  const groupedContent = useMemo(() => groupContentByCategory(verbTenseData.content), []);
  const sections = ['Present Time', 'Past Time', 'Future Time', 'Practice Exercises'];

  // Get content for current tab
  const getCurrentTabContent = () => {
    switch (activeTab) {
      case 0: return groupedContent.present;
      case 1: return groupedContent.past;
      case 2: return groupedContent.future;
      case 3: return groupedContent.homework;
      default: return groupedContent.present;
    }
  };

  // Extract individual tenses from current tab content
  const getTensesForCurrentTab = () => {
    const currentContent = getCurrentTabContent();
    const tenses = [];

    currentContent.forEach(block => {
      // Skip intro blocks, summary charts, and practice exercises
      if (block.blockId.includes('intro') ||
          block.blockId.includes('summary') ||
          block.blockId.includes('practice') ||
          block.blockId.includes('fill-blanks') ||
          block.type === 'chart') {
        return;
      }

      // Include text blocks that represent individual tenses
      if (block.type === 'text') {
        tenses.push(block);
      }
    });

    return tenses;
  };

  // Get content for selected tense (or intro if none selected)
  const getSelectedTenseContent = () => {
    if (!selectedTense) {
      // Show intro content and quizzes for the current tab
      return getCurrentTabContent().filter(block =>
        block.blockId.includes('intro') ||
        block.blockId.includes('tenses-intro') ||
        block.type === 'quiz'
      );
    }
    return [selectedTense];
  };

  const tenses = getTensesForCurrentTab();

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <Header />

      <LessonTabs
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        sections={sections}
      />

      {/* Timeline visualization */}
      {timelineData.length > 0 && (
        <TimelineVisualization
          title={`${sections[activeTab]} Timeline`}
          items={timelineData}
          currentIndex={currentTimelineIndex}
          showProgress={true}
        />
      )}

      {/* Tense selection buttons */}
      {tenses.length > 0 && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Select a tense to explore:
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            {tenses.map((tense) => (
              <GlassButtonWrapper key={tense.blockId} isActive={selectedTense === tense}>
                <Button
                  onClick={() => setSelectedTense(tense)}
                  sx={{
                    color: (theme) => theme.palette.secondary.main,
                    minWidth: '140px',
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.action.hover,
                      color: (theme) => theme.palette.primary.main,
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  {(() => {
                    const htmlContent = tense.data.htmlContent;
                    const h3Match = htmlContent.match(/<h3[^>]*>([^<]+)<\/h3>/);
                    if (h3Match) {
                      const title = h3Match[1].replace(/<[^>]*>/g, ''); // Remove HTML tags
                      // Extract just the tense name (remove quotes and extra text)
                      return title.replace(/['"]/g, '').trim();
                    }
                    return tense.blockId.split('-').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ');
                  })()}
                </Button>
              </GlassButtonWrapper>
            ))}
          </Stack>
        </Box>
      )}

      <ContentBlockRenderer contentBlocks={getSelectedTenseContent()} />
    </Box>
  );
}