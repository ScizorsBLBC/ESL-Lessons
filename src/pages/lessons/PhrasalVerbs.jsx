import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { phrasalVerbData } from '../../data/phrasalVerbData.js';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import LessonTabs from '../../components/LessonTabs';
import LessonHeader from '../../components/LessonHeader';
import PracticeSuite from '../../components/PracticeSuite';
import GlassButtonWrapper from '../../components/GlassButtonWrapper';

export default function PhrasalVerbs() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAssessment, setSelectedAssessment] = useState('gap-fill');
  const { content } = phrasalVerbData;

  const getFilteredContent = () => {
    if (activeTab === 3) {
      // For Practice tab, return empty array since PracticeSuite handles its own content
      return [];
    }

    // Filter content based on tab
    switch (activeTab) {
      case 0: // Introduction
        return content.filter(block =>
          block.blockId.toLowerCase().includes('intro') ||
          block.blockId === 'intro-what-are-phrasal-verbs' ||
          block.blockId === 'intro-examples-chart'
        );
      case 1: // Workplace Verbs
        return content.filter(block =>
          block.blockId.toLowerCase().includes('workplace')
        );
      case 2: // Full Vocabulary
        return content.filter(block =>
          !block.blockId.toLowerCase().includes('intro') &&
          !block.blockId.toLowerCase().includes('workplace') &&
          !block.blockId.toLowerCase().includes('practice') &&
          !block.blockId.toLowerCase().includes('assessment')
        );
      case 4: { // Assessments - specific quiz and practice content
        const assessmentBlocks = content.filter(block =>
          block.blockId.toLowerCase().includes('assessment') ||
          block.blockId === 'contextual-practice-text' ||
          block.blockId === 'homework-assignment-text'
        );

        // Filter to show only the selected assessment item
        switch (selectedAssessment) {
          case 'gap-fill':
            return assessmentBlocks.filter(block => block.blockId === 'assessment-gap-fill');
          case 'contextual-practice':
            return assessmentBlocks.filter(block => block.blockId === 'contextual-practice-text');
          case 'homework':
            return assessmentBlocks.filter(block => block.blockId === 'homework-assignment-text');
          default:
            return assessmentBlocks.filter(block => block.blockId === 'assessment-gap-fill');
        }
      }
      default:
        return content;
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <Box>
      <LessonHeader
        title={phrasalVerbData.title}
        subtitle={phrasalVerbData.subtitle}
      />
      <LessonTabs
        activeTab={activeTab}
        handleTabChange={(e, newValue) => setActiveTab(newValue)}
        sections={["Introduction", "Workplace Verbs", "Full Vocabulary", "Practice", "Assessments"]}
      />

      {/* Assessment selection buttons - only show on Assessments tab */}
      {activeTab === 4 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, mb: 2 }}>
          <GlassButtonWrapper isActive={selectedAssessment === 'gap-fill'}>
            <Button
              onClick={() => setSelectedAssessment('gap-fill')}
              sx={{
                backgroundColor: 'transparent',
                color: selectedAssessment === 'gap-fill' ? 'primary.main' : 'secondary.main',
                border: 'none',
                px: 3,
                py: 1.5,
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Gap Fill
            </Button>
          </GlassButtonWrapper>


          <GlassButtonWrapper isActive={selectedAssessment === 'contextual-practice'}>
            <Button
              onClick={() => setSelectedAssessment('contextual-practice')}
              sx={{
                backgroundColor: 'transparent',
                color: selectedAssessment === 'contextual-practice' ? 'primary.main' : 'secondary.main',
                border: 'none',
                px: 3,
                py: 1.5,
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Practice Exercise
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedAssessment === 'homework'}>
            <Button
              onClick={() => setSelectedAssessment('homework')}
              sx={{
                backgroundColor: 'transparent',
                color: selectedAssessment === 'homework' ? 'primary.main' : 'secondary.main',
                border: 'none',
                px: 3,
                py: 1.5,
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Homework
            </Button>
          </GlassButtonWrapper>
        </Box>
      )}

      {/* Render content or the practice suite based on the tab */}
      <Box sx={{ mt: 4 }}>
        {activeTab === 3 ? (
          <PracticeSuite contentBlocks={content} />
        ) : (
          <ContentBlockRenderer contentBlocks={filteredContent} />
        )}
      </Box>
    </Box>
  );
}