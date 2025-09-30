import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Chip,
  Alert,
  Paper
} from '@mui/material';
import GlassButtonWrapper from './GlassButtonWrapper';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';

const QuizComponent = ({ quizData, onQuestionComplete, disableAutoAdvance = false }) => {
  const { quizTitle, questions } = quizData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(false);
  };

  const handleSubmitAnswer = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const result = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      explanation: isCorrect ? currentQuestion.messageForCorrectAnswer : currentQuestion.messageForIncorrectAnswer
    };

    setResults([...results, result]);
    setShowResult(true);

    // Call external handler if provided
    if (onQuestionComplete) {
      onQuestionComplete(result);
    }
  };

  const handleNextQuestion = () => {
    if (disableAutoAdvance) {
      // Don't auto-advance, let the parent handle navigation
      return;
    }

    if (isLastQuestion) {
      // Quiz completed - move to completion state
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setResults([]);
  };

  if (!currentQuestion) {
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
            variant="h5"
            gutterBottom
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              mb: 3
            }}
          >
            Quiz Completed!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 3,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            You answered {results.filter(r => r.isCorrect).length} out of {results.length} questions correctly.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {results.filter(r => r.isCorrect).length === results.length
              ? "Perfect score! 🎉"
              : results.filter(r => r.isCorrect).length >= results.length * 0.8
              ? "Great job! Keep practicing! 🌟"
              : "Good effort! Review the material and try again! 💪"
            }
          </Typography>
          <GlassButtonWrapper>
            <Button
              variant="text"
              onClick={handleRestartQuiz}
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Restart Quiz
            </Button>
          </GlassButtonWrapper>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{
      width: '100%',
      maxWidth: { xs: '100%', sm: 600, md: 800 },
      mx: 'auto',
      mb: 3
    }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textAlign: 'center',
            mb: 3
          }}
        >
          {quizTitle}
        </Typography>

        <Box sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Chip
            label={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
            color="primary"
            variant="outlined"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: 2
            }}
          />
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            mb: 3,
            lineHeight: 1.4
          }}
        >
          {currentQuestion.question}
        </Typography>

        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => handleAnswerSelect(e.target.value)}
          sx={{ mb: 3 }}
        >
          {currentQuestion.answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={String(index + 1)}
              control={<Radio />}
              label={answer}
              sx={{
                mb: 1,
                p: { xs: 1, sm: 1.5 },
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.4
                }
              }}
            />
          ))}
        </RadioGroup>

        {showResult && (
          <Alert
            severity={results[results.length - 1]?.isCorrect ? "success" : "error"}
            sx={{
              mb: 3,
              '& .MuiAlert-message': {
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          >
            {results[results.length - 1]?.isCorrect ? "✅ " : "❌ "}{results[results.length - 1]?.explanation}
          </Alert>
        )}

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 0 },
          justifyContent: 'space-between',
          mt: 3
        }}>
          <GlassButtonWrapper>
            <Button
              variant="text"
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              sx={{
                order: { xs: 2, sm: 1 },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Submit Answer
            </Button>
          </GlassButtonWrapper>

          {showResult && !disableAutoAdvance && (
            <GlassButtonWrapper>
              <Button
                variant="text"
                onClick={handleNextQuestion}
                sx={{
                  order: { xs: 1, sm: 2 },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </GlassButtonWrapper>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
