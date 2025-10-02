import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import GlassButtonWrapper from './GlassButtonWrapper';
import { createLessonCard, createLessonTitle, createIconButton } from '../utils/stylingUtils';

/**
 * Component for a Flashcard set.
 * Updated to strictly expect the data via the 'data' prop.
 *
 * @param {object} props
 * @param {object} props.data - The data object conforming to the flashcard schema.
 * @returns {JSX.Element}
 */
const Flashcard = ({ data }) => {
    const { title, cards = [] } = data;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (cards.length === 0) {
        return (
            <Paper sx={{
                p: 2,
                bgcolor: 'error.light',
                color: 'error.dark',
                border: '1px solid',
                borderColor: 'error.main',
                borderRadius: 1
            }}>
                <Typography>Error: No flashcards found in data.</Typography>
            </Paper>
        );
    }

    const currentCard = cards[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    return (
        <Paper elevation={4} sx={createLessonCard('secondary.main')}>
            <Typography variant="h5" component="h3" sx={createLessonTitle('secondary.dark')}>
                {title || "Flashcards"}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                Card {currentIndex + 1} of {cards.length}
            </Typography>

            <Box
                onClick={handleFlip}
                sx={{
                    position: 'relative',
                    height: 200,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'action.hover',
                    borderRadius: 2,
                    boxShadow: 3,
                    cursor: 'pointer',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    '&:hover': {
                        boxShadow: 6,
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        transition: 'transform 0.6s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3
                    }}
                >
                    <Typography variant="h6" sx={{
                        color: 'text.primary'
                    }} align="center">
                        {isFlipped ? currentCard.back : currentCard.front}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                        transition: 'transform 0.6s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3
                    }}
                >
                    <Typography variant="h6" sx={{
                        color: 'text.primary'
                    }} align="center">
                        {isFlipped ? currentCard.back : currentCard.front}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
            }}>
                <GlassButtonWrapper>
                    <IconButton
                        onClick={handleFlip}
                        sx={createIconButton('primary.main')}
                        title="Flip Card"
                    >
                        <FlipCameraAndroidIcon />
                    </IconButton>
                </GlassButtonWrapper>
                <GlassButtonWrapper>
                    <IconButton
                        onClick={handleNext}
                        sx={createIconButton('primary.main')}
                        title="Next Card"
                    >
                        <SkipNextIcon />
                    </IconButton>
                </GlassButtonWrapper>
            </Box>
        </Paper>
    );
};

export default Flashcard;
