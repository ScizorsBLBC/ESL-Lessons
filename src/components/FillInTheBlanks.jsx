import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import GlassButtonWrapper from './GlassButtonWrapper';
import { createLessonCard, createLessonTitle, createErrorState } from '../utils/stylingUtils';

/**
 * Component for a Fill-in-the-Blanks exercise.
 * Updated to strictly expect the data via the 'data' prop.
 * Now follows established styling patterns with proper theme integration.
 *
 * @param {object} props
 * @param {object} props.data - The data object conforming to the fillInTheBlanks schema.
 * @returns {JSX.Element}
 */
const FillInTheBlanks = ({ data }) => {
    const theme = useTheme();
    const { title, sentence, words } = data;
    const blanks = sentence.split('_');
    const [userAnswers, setUserAnswers] = useState(Array(words.length).fill(''));
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!sentence || !words || blanks.length - 1 !== words.length) {
        return (
            <Paper sx={createErrorState()(theme)}>
                <Typography>Error: Invalid Fill-in-the-Blanks data structure.</Typography>
            </Paper>
        );
    }

    const handleChange = (index, event) => {
        if (isSubmitted) return;
        const newAnswers = [...userAnswers];
        newAnswers[index] = event.target.value;
        setUserAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setUserAnswers(Array(words.length).fill(''));
        setIsSubmitted(false);
    };

    const isCorrect = (index) => {
        return userAnswers[index].toLowerCase().trim() === words[index].toLowerCase().trim();
    };

    const renderSentence = () => {
        const sentenceElements = [];
        let blankIndex = 0;

        blanks.forEach((part, i) => {
            if (part) {
                sentenceElements.push(<span key={`text-${i}`} dangerouslySetInnerHTML={{ __html: part }} />);
            }

            if (i < blanks.length - 1) {
                const inputId = `blank-${blankIndex}`;
                const correct = isSubmitted && isCorrect(blankIndex);
                const incorrect = isSubmitted && !correct;

                sentenceElements.push(
                    <Box
                        component="span"
                        key={inputId}
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            mx: 1,
                            verticalAlign: 'bottom',
                        }}
                    >
                        <TextField
                            id={inputId}
                            variant="outlined"
                            size="small"
                            value={userAnswers[blankIndex]}
                            onChange={(e) => handleChange(blankIndex, e)}
                            disabled={isSubmitted}
                            sx={{
                                width: '120px',
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: correct ? 'success.light' : incorrect ? 'error.light' : 'background.paper',
                                    color: correct ? 'success.dark' : incorrect ? 'error.dark' : 'text.primary',
                                    fontWeight: 'bold',
                                }
                            }}
                        />
                        {isSubmitted && (
                            <Box sx={{ ml: 0.5, lineHeight: 0 }}>
                                {correct ? (
                                    <CheckCircleIcon sx={{ color: 'success.main' }} />
                                ) : (
                                    <CancelIcon sx={{ color: 'error.main' }} />
                                )}
                            </Box>
                        )}
                    </Box>
                );

                if (incorrect) {
                    sentenceElements.push(
                        <Typography
                            key={`correct-${blankIndex}`}
                            variant="caption"
                            sx={{
                                display: 'inline-block',
                                mt: 0.5,
                                ml: 1,
                                fontWeight: 'bold',
                                color: 'success.main'
                            }}
                        >
                            ({words[blankIndex]})
                        </Typography>
                    );
                }

                blankIndex++;
            }
        });
        return sentenceElements;
    };

    return (
        <Paper elevation={4} sx={createLessonCard('primary.main')(theme)}>
            <Typography variant="h5" component="h3" sx={createLessonTitle('primary.dark')(theme)}>
                {title || "Fill in the Blanks"}
            </Typography>
            <Typography variant="body1" component="div" sx={{ mb: 4, lineHeight: 3 }}>
                {renderSentence()}
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <GlassButtonWrapper>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isSubmitted}
                            sx={{ textTransform: 'none' }}
                        >
                            Check Answers
                        </Button>
                    </GlassButtonWrapper>
                </Grid>
                <Grid item>
                    <GlassButtonWrapper>
                        <Button
                            variant="outlined"
                            onClick={handleReset}
                            disabled={!isSubmitted}
                            sx={{ textTransform: 'none' }}
                        >
                            Try Again
                        </Button>
                    </GlassButtonWrapper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FillInTheBlanks;
