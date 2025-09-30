import React, { useState, useMemo, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Flashcard from './Flashcard';
import Quiz from './Quiz';
import GlassButtonWrapper from './GlassButtonWrapper';
import { generateFlashcards, generateQuiz } from '../services/vocabularyService';

const PracticeSuite = ({ contentBlocks, showQuizTab = true, mode = 'flashcards', showInternalButtons = true, integrateWithPageButtons = false }) => {
  const [activeTab, setActiveTab] = useState(() => {
    switch (mode) {
      case 'quiz':
        return 1;
      case 'flashcards':
      case 'practice':
      default:
        return 0;
    }
  });

  // Update activeTab when mode changes
  useEffect(() => {
    switch (mode) {
      case 'quiz':
        setActiveTab(1);
        break;
      case 'flashcards':
      case 'practice':
      default:
        setActiveTab(0);
        break;
    }
  }, [mode]);

  const flashcards = useMemo(() => generateFlashcards(contentBlocks), [contentBlocks]);
  const quizData = useMemo(() => generateQuiz(contentBlocks, "Check Your Understanding", 20), [contentBlocks]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex(prev => (prev + 1) % flashcards.length);
  };

  // Don't show internal buttons if integrating with page buttons or if explicitly disabled
  const shouldShowInternalButtons = showQuizTab && showInternalButtons && !integrateWithPageButtons;

  return (
    <Box>
      {shouldShowInternalButtons && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 1, sm: 2 }, mb: 4 }}>
          <GlassButtonWrapper isActive={activeTab === 0}>
            <Button onClick={() => setActiveTab(0)}>
              Flashcards
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={activeTab === 1}>
            <Button onClick={() => setActiveTab(1)}>
              Quiz
            </Button>
          </GlassButtonWrapper>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {activeTab === 0 && flashcards.length > 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Flashcard
              frontContent={flashcards[currentFlashcardIndex].front}
              backContent={flashcards[currentFlashcardIndex].back}
            />
            <GlassButtonWrapper sx={{ mt: 4, display: 'inline-block' }}>
              <Button onClick={handleNextFlashcard}>
                Next
              </Button>
            </GlassButtonWrapper>
          </Box>
        )}
        {activeTab === 1 && showQuizTab && quizData && (
          <Quiz quizData={quizData} />
        )}
      </Box>
    </Box>
  );
};

export default PracticeSuite;