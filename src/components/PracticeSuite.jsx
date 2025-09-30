import React, { useState, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import Flashcard from './Flashcard';
import Quiz from './Quiz';
import GlassButtonWrapper from './GlassButtonWrapper';
import { generateFlashcards, generateQuiz } from '../services/vocabularyService';

const PracticeSuite = ({ contentBlocks, showQuizTab = true, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const flashcards = useMemo(() => generateFlashcards(contentBlocks), [contentBlocks]);
  const quizData = useMemo(() => generateQuiz(contentBlocks, "Check Your Understanding", 20), [contentBlocks]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex(prev => (prev + 1) % flashcards.length);
  };

  return (
    <Box>
      {showQuizTab && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <GlassButtonWrapper isActive={activeTab === 0}>
            <Button
              onClick={() => setActiveTab(0)}
              sx={{
                backgroundColor: 'transparent',
                color: activeTab === 0 ? 'primary.main' : 'secondary.main',
                border: 'none',
                px: 4,
                py: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              FLASHCARDS
            </Button>
          </GlassButtonWrapper>

          <GlassButtonWrapper isActive={activeTab === 1}>
            <Button
              onClick={() => setActiveTab(1)}
              sx={{
                backgroundColor: 'transparent',
                color: activeTab === 1 ? 'primary.main' : 'secondary.main',
                border: 'none',
                px: 4,
                py: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              QUIZ
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
              <Button
                onClick={handleNextFlashcard}
                sx={{
                  backgroundColor: 'transparent',
                  color: 'secondary.main',
                  border: 'none',
                  px: 2,
                  py: 0.75,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
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