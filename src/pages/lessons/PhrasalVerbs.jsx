import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
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
  const [gapFillCompleted, setGapFillCompleted] = useState(false);
  const { content } = phrasalVerbData;

  useEffect(() => {
    document.title = 'Phrasal Verbs | ESL Lessons Hub';
  }, []);

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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 1, sm: 2 }, mt: 3, mb: 2 }}>
          <GlassButtonWrapper isActive={selectedPracticeMode === 'practice'}>
            <Button onClick={() => setSelectedPracticeMode('practice')}>
              Flashcards
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'quiz'}>
            <Button onClick={() => setSelectedPracticeMode('quiz')}>
              Quiz
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'gap-fill'}>
            <Button onClick={() => setSelectedPracticeMode('gap-fill')}>
              Gap Fill
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'contextual-practice'}>
            <Button onClick={() => setSelectedPracticeMode('contextual-practice')}>
              Practice Exercise
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedPracticeMode === 'homework'}>
            <Button onClick={() => setSelectedPracticeMode('homework')}>
              Homework
            </Button>
          </GlassButtonWrapper>
        </Box>
      )}

      {/* Vocabulary section buttons - only show on Full Vocabulary tab */}
      {activeTab === 2 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 3, mb: 2 }}>
          <GlassButtonWrapper isActive={selectedVocabSection === 'communication'}>
            <Button onClick={() => setSelectedVocabSection('communication')}>
              Communication
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'socializing'}>
            <Button onClick={() => setSelectedVocabSection('socializing')}>
              Socializing
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'business'}>
            <Button onClick={() => setSelectedVocabSection('business')}>
              Business
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'travel'}>
            <Button onClick={() => setSelectedVocabSection('travel')}>
              Travel
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'action'}>
            <Button onClick={() => setSelectedVocabSection('action')}>
              Actions
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'thinking'}>
            <Button onClick={() => setSelectedVocabSection('thinking')}>
              Thinking
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'problems'}>
            <Button onClick={() => setSelectedVocabSection('problems')}>
              Problems
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'daily'}>
            <Button onClick={() => setSelectedVocabSection('daily')}>
              Daily Life
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'finance'}>
            <Button onClick={() => setSelectedVocabSection('finance')}>
              Finance
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={selectedVocabSection === 'general'}>
            <Button onClick={() => setSelectedVocabSection('general')}>
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
                  if (gapFillCompleted) {
                    return (
                      <Card sx={{
                        width: '100%',
                        maxWidth: { xs: '100%', sm: 600, md: 800 },
                        mx: 'auto',
                        mb: 3
                      }}>
                        <CardContent sx={{
                          p: { xs: 3, sm: 4 },
                          textAlign: 'center'
                        }}>
                          <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                              color: 'success.main',
                              fontSize: { xs: '1.5rem', sm: '2rem' },
                              mb: 3
                            }}
                          >
                            🎉 Congratulations!
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.secondary',
                              mb: 3,
                              fontSize: { xs: '1rem', sm: '1.25rem' }
                            }}
                          >
                            You have successfully completed all gap-fill exercises!
                          </Typography>
                          <GlassButtonWrapper>
                            <Button
                              onClick={() => {
                                setGapFillCompleted(false);
                                setSelectedPracticeMode('gap-fill');
                              }}
                            >
                              Try Again
                            </Button>
                          </GlassButtonWrapper>
                        </CardContent>
                      </Card>
                    );
                  }

                  const gapFillBlocks = content.filter(block => block.blockId === 'assessment-gap-fill');
                  return gapFillBlocks.map(block => (
                    <ContentBlockRenderer
                      key={block.blockId}
                      contentBlocks={[block]}
                      onComplete={() => {
                        setGapFillCompleted(true);
                      }}
                    />
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