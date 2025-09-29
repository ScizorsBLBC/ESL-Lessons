import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const FillInTheBlanks = ({ data }) => {
  const { title, instructions, sentences } = data;
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState({ message: '', color: '' });
  const [completed, setCompleted] = useState({});

  const currentSentence = sentences[currentSentenceIndex];
  const { text, options, correctAnswer } = currentSentence;

  const checkAnswer = () => {
    if (userInput.toLowerCase().trim() === correctAnswer.toLowerCase()) {
      setFeedback({ message: 'Correct!', color: 'success.main' });
      setCompleted(prev => ({ ...prev, [currentSentenceIndex]: true }));
    } else {
      setFeedback({ message: 'Not quite, try again!', color: 'error.main' });
    }
  };

  const nextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
      setUserInput('');
      setFeedback({ message: '', color: '' });
    }
  };

  const sentenceParts = text.split('{blank}') || text.split('_______');
  const progress = Object.keys(completed).length;
  const total = sentences.length;
  const isLastSentence = currentSentenceIndex === sentences.length - 1;

  return (
    <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
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
      <Box sx={{ mb: 3, fontSize: '1.1em', lineHeight: 1.6 }}>
        <Typography component="div">
          {sentenceParts[0]}
          <TextField
            variant="outlined"
            size="small"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              setFeedback({ message: '', color: '' });
            }}
            sx={{ mx: 1, width: '200px' }}
            placeholder="Your answer..."
          />
          {sentenceParts[1]}
        </Typography>
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
          disabled={!userInput.trim()}
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

      {/* Options hint */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Options: {options.join(', ')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FillInTheBlanks;
