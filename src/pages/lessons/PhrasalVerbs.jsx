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
  const [selectedPracticeMode, setSelectedPracticeMode] = useState('practice');
  const [selectedVocabSection, setSelectedVocabSection] = useState('communication');
  const { content } = phrasalVerbData;

  const getFilteredContent = () => {
    if (activeTab === 3) {
      // For Practice & Assessments tab, return empty array since components handle their own content
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
          block.blockId.toLowerCase().includes('workplace') &&
          !block.blockId.toLowerCase().includes('quiz')
        );
      case 2: { // Full Vocabulary
        // Filter out intro, workplace, practice, assessment, homework, and flashcard blocks
        let filteredContent = content.filter(block =>
          !block.blockId.toLowerCase().includes('intro') &&
          !block.blockId.toLowerCase().includes('workplace') &&
          !block.blockId.toLowerCase().includes('practice') &&
          !block.blockId.toLowerCase().includes('assessment') &&
          !block.blockId.toLowerCase().includes('homework') &&
          !block.blockId.toLowerCase().includes('flashcard')
        );

        // Further filter to show only the selected vocabulary section
        if (selectedVocabSection) {
          const sectionBlockId = `${selectedVocabSection}-vocab`;
          filteredContent = filteredContent.filter(block =>
            block.blockId === sectionBlockId
          );
        }

        return filteredContent;
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
        sections={["Introduction", "Workplace Verbs", "Full Vocabulary", "Practice"]}
      />

      {/* Practice mode buttons - always visible on Practice tab */}
      {activeTab === 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, mb: 2 }}>
          <GlassButtonWrapper isActive={selectedPracticeMode === 'practice'}>
            <Button
              onClick={() => setSelectedPracticeMode('practice')}
              sx={{
                minWidth: '120px',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              FLASHCARDS
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'quiz'}>
            <Button
              onClick={() => setSelectedPracticeMode('quiz')}
              sx={{
                minWidth: '120px',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              QUIZ
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'gap-fill'}>
            <Button
              onClick={() => setSelectedPracticeMode('gap-fill')}
              sx={{
                minWidth: '120px',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Gap Fill
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'contextual-practice'}>
            <Button
              onClick={() => setSelectedPracticeMode('contextual-practice')}
              sx={{
                minWidth: '120px',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Practice Exercise
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'homework'}>
            <Button
              onClick={() => setSelectedPracticeMode('homework')}
              sx={{
                minWidth: '120px',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Homework
            </Button>
          </GlassButtonWrapper>
        </Box>
      )}

      {/* Vocabulary section buttons - only show on Full Vocabulary tab */}
      {activeTab === 2 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 3, mb: 2 }}>
          <GlassButtonWrapper isActive={selectedVocabSection === 'communication'}>
            <Button
              onClick={() => setSelectedVocabSection('communication')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Communication
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'socializing'}>
            <Button
              onClick={() => setSelectedVocabSection('socializing')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Socializing
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'business'}>
            <Button
              onClick={() => setSelectedVocabSection('business')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Business
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'travel'}>
            <Button
              onClick={() => setSelectedVocabSection('travel')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Travel
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'action'}>
            <Button
              onClick={() => setSelectedVocabSection('action')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Actions
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'thinking'}>
            <Button
              onClick={() => setSelectedVocabSection('thinking')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Thinking
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'problems'}>
            <Button
              onClick={() => setSelectedVocabSection('problems')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Problems
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'daily'}>
            <Button
              onClick={() => setSelectedVocabSection('daily')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Daily Life
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'finance'}>
            <Button
              onClick={() => setSelectedVocabSection('finance')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              Finance
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'general'}>
            <Button
              onClick={() => setSelectedVocabSection('general')}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                minWidth: 'auto'
              }}
            >
              General
            </Button>
          </GlassButtonWrapper>
        </Box>
      )}

      {/* Render content based on the tab */}
      <Box sx={{ mt: 4 }}>
        {activeTab === 3 ? (
          <Box>
            {/* Show content based on selected practice mode */}
            {(() => {
              switch (selectedPracticeMode) {
                case 'practice':
                  return <PracticeSuite contentBlocks={content} mode="flashcards" showInternalButtons={false} />;
                case 'quiz':
                  return <PracticeSuite contentBlocks={content} mode="quiz" showInternalButtons={false} />;
                case 'gap-fill': {
                  const gapFillBlocks = content.filter(block => block.blockId === 'assessment-gap-fill');
                  return gapFillBlocks.map(block => (
                    <ContentBlockRenderer key={block.blockId} contentBlocks={[block]} />
                  ));
                }
                case 'contextual-practice': {
                  const practiceBlocks = content.filter(block => block.blockId === 'contextual-practice-text');
                  return practiceBlocks.map(block => (
                    <ContentBlockRenderer key={block.blockId} contentBlocks={[block]} />
                  ));
                }
                case 'homework': {
                  const homeworkBlocks = content.filter(block => block.blockId === 'homework-assignment-text');
                  return homeworkBlocks.map(block => (
                    <ContentBlockRenderer key={block.blockId} contentBlocks={[block]} />
                  ));
                }
                default:
                  return <PracticeSuite contentBlocks={content} mode="flashcards" showInternalButtons={false} />;
              }
            })()}
          </Box>
        ) : (
          <ContentBlockRenderer contentBlocks={filteredContent} />
        )}
      </Box>
    </Box>
  );
}