import React, { useState } from 'react';
import { Box, Button, Typography, Paper, useTheme } from '@mui/material';

const FillInTheBlanks = ({ data }) => {
  const { title, instructions, sentences } = data;
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState({ message: '', color: '' });
  const [completed, setCompleted] = useState({});
  const theme = useTheme();

  const currentSentence = sentences[currentSentenceIndex];
  const { text, options, correctAnswer } = currentSentence;

  const checkAnswer = () => {
    if (selectedAnswer === correctAnswer) {
      setFeedback({ message: 'Correct!', color: 'success.main' });
      setCompleted(prev => ({ ...prev, [currentSentenceIndex]: true }));
    } else {
      setFeedback({ message: 'Not quite, try again!', color: 'error.main' });
    }
  };

  const nextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
      setSelectedAnswer('');
      setFeedback({ message: '', color: '' });
    }
  };

  // Create display sentence (replace blank with underlined space)
  const displaySentence = text.replace('{blank}', '__________').replace('_______', '__________');
  const total = sentences.length;
  const isLastSentence = currentSentenceIndex === sentences.length - 1;

  return (
    <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {instructions}
      </Typography>

      {/* Progress indicator */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Question {currentSentenceIndex + 1} of {total}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
          {sentences.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: completed[index] ? 'success.main' : 'grey.300'
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Current sentence */}
      <Box sx={{ mb: 4, fontSize: '1.1em', lineHeight: 1.6, textAlign: 'center' }}>
        <Typography component="div" sx={{ mb: 3 }}>
          {displaySentence}
        </Typography>

        {/* Multiple choice options */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          {options.map((option) => (
            <Paper
              key={option}
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: selectedAnswer === option
                  ? theme.palette.primary.main + '20'
                  : theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${
                  selectedAnswer === option
                    ? theme.palette.primary.main
                    : theme.palette.divider
                }`,
                boxShadow: theme.shadows[selectedAnswer === option ? 4 : 2],
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: theme.shadows[4],
                  transform: 'translateY(-1px)',
                },
                minWidth: '120px',
                textAlign: 'center',
              }}
              onClick={() => {
                setSelectedAnswer(option);
                setFeedback({ message: '', color: '' });
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: selectedAnswer === option
                    ? 'primary.main'
                    : 'text.primary',
                }}
              >
                {option}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Feedback */}
      {feedback.message && (
        <Typography sx={{ color: feedback.color, mb: 2, textAlign: 'center' }}>
          {feedback.message}
        </Typography>
      )}

      {/* Action buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          onClick={checkAnswer}
          disabled={!selectedAnswer}
        >
          Check Answer
        </Button>
        {completed[currentSentenceIndex] && (
          <Button
            variant="outlined"
            onClick={nextSentence}
            disabled={isLastSentence}
          >
            {isLastSentence ? 'Complete!' : 'Next'}
          </Button>
        )}
      </Box>

    </Paper>
  );
};

export default FillInTheBlanks;
