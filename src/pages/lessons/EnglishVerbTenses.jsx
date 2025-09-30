// src/pages/lessons/EnglishVerbTenses.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Tabs, Tab, Button, Stack, Grid } from '@mui/material';
import { verbTenseData } from '../../data/verbTenseData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import LessonTabs from '../../components/LessonTabs';
import GlassButtonWrapper from '../../components/GlassButtonWrapper';

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
      intro: [],
      present: [],
      past: [],
      future: [],
      practice: [],
      homework: []
    };

    contentBlocks.forEach(block => {
      const blockId = block.blockId.toLowerCase();

      if (blockId.includes('intro-what-are-tenses') || blockId.includes('visualizing-time')) {
        categories.intro.push(block);
      } else if (blockId.includes('present-') || blockId === 'present-summary-chart-08') {
        categories.present.push(block);
      } else if (blockId.includes('past-') || blockId === 'past-summary-chart-15') {
        categories.past.push(block);
      } else if (blockId.includes('future-') || blockId === 'future-summary-chart-20') {
        categories.future.push(block);
      } else if (blockId.includes('comprehensive-verb-tenses-practice')) {
        categories.practice.push(block);
      } else if (blockId.includes('practice') || blockId.includes('fill-blanks') ||
                 blockId.includes('transformation')) {
        categories.homework.push(block);
      } else {
        // Default to intro if category unclear
        categories.intro.push(block);
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



  useEffect(() => {
    document.title = `${verbTenseData.title} | ESL Lessons`;
  }, []);

  // Group content blocks by category
  const groupedContent = useMemo(() => groupContentByCategory(verbTenseData.content), []);
  const sections = ['Introduction', 'Present Time', 'Past Time', 'Future Time', 'Practice Exercises'];

  // Get content for current tab
  const getCurrentTabContent = () => {
    switch (activeTab) {
      case 0: return groupedContent.intro; // Introduction tab
      case 1: return groupedContent.present; // Present Time
      case 2: return groupedContent.past; // Past Time
      case 3: return groupedContent.future; // Future Time
      case 4: return groupedContent.practice; // Practice Exercises - comprehensive quiz
      default: return groupedContent.intro;
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
          block.blockId.includes('comprehensive') ||
          block.type === 'chart' ||
          block.type === 'quiz') {
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
    // For Introduction tab, show all intro content
    if (activeTab === 0) {
      return getCurrentTabContent();
    }

    // For Practice Exercises tab, show the comprehensive quiz directly
    if (activeTab === 4) {
      return getCurrentTabContent();
    }

    // For tense tabs (1, 2, 3), show both tense content and summary chart
    const currentTabContent = getCurrentTabContent();
    const summaryChart = currentTabContent.find(block => block.type === 'chart');
    const otherContent = currentTabContent.filter(block => block.type !== 'chart');

    if (!selectedTense) {
      // Show intro content plus the summary chart
      const introContent = otherContent.filter(block =>
        block.blockId.includes('intro') ||
        block.blockId.includes('tenses-intro')
      );
      return [...introContent, summaryChart].filter(Boolean);
    }

    // Show selected tense plus the summary chart
    return [selectedTense, summaryChart].filter(Boolean);
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


      {/* Tense selection buttons - hide for intro and practice tabs */}
      {tenses.length > 0 && activeTab > 0 && activeTab < 4 && (
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Select a tense to explore:
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
              rowGap: 2, // Ensure vertical spacing matches horizontal spacing
            }}
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