// src/components/DetailCard.jsx

import React, { useState, useCallback, useRef } from 'react';
import { Paper, Typography, IconButton, Box, useTheme, CircularProgress } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';

const DetailCard = React.forwardRef(({ content }, ref) => {
    const theme = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);

    const strippedContent = content.replace(/<[^>]*>?/gm, '');

    const handleSpeak = useCallback(async () => {
        if (isLoading) return;

        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: strippedContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch audio from the server.');
            }

            const data = await response.json();
            if (data.audioContent) {
                const audioSrc = `data:audio/mp3;base64,${data.audioContent}`;
                audioRef.current = new Audio(audioSrc);
                audioRef.current.play();
                setIsPlaying(true);

                audioRef.current.onended = () => {
                    setIsPlaying(false);
                };
            }
        } catch (error) {
            console.error("Error fetching or playing TTS audio:", error);
        } finally {
            setIsLoading(false);
        }
    }, [strippedContent, isPlaying, isLoading]);

    // Apply styling
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const liquidGlassStyle = {
        backgroundColor: hexToRgba(theme.palette.background.paper, 0.1),
        backdropFilter: 'blur(12px) saturate(180%)',
        border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)}`,
        boxShadow: theme.shadows[4],
        borderRadius: 8,
    };

    return (
        <Paper
            ref={ref}
            sx={{ ...liquidGlassStyle, p: 2.5, position: 'relative', overflow: 'visible' }}
        >
            <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                <IconButton
                    onClick={handleSpeak}
                    aria-label={isPlaying ? "Stop reading content" : "Read content aloud"}
                    size="small"
                    disabled={!content || isLoading}
                    sx={{
                        backgroundColor: isPlaying ? hexToRgba(theme.palette.error.main, 0.2) : hexToRgba(theme.palette.background.paper, 0.15),
                        border: `1px solid ${isPlaying ? hexToRgba(theme.palette.error.main, 0.3) : hexToRgba(theme.palette.text.primary, 0.2)}`,
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                            backgroundColor: isPlaying ? hexToRgba(theme.palette.error.main, 0.3) : hexToRgba(theme.palette.background.paper, 0.25),
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    {isLoading ? <CircularProgress size={20} /> : (isPlaying ? <StopIcon fontSize="small" sx={{ color: 'error.main' }} /> : <VolumeUpIcon fontSize="small" />)}
                </IconButton>
            </Box>

            <Typography
                variant="body1"
                component="div"
                dangerouslySetInnerHTML={{ __html: content }}
                sx={{
                    color: (theme) => theme.palette.text.primary,
                    pt: 4,
                    lineHeight: 1.7,
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                        color: (theme) => theme.palette.text.primary,
                        marginTop: 2,
                        marginBottom: 1,
                        textAlign: 'center'
                    },
                    '& p': {
                        color: (theme) => theme.palette.text.secondary,
                        marginBottom: 1.5,
                        textAlign: 'justify'
                    },
                    '& ul, & ol': {
                        color: (theme) => theme.palette.text.secondary,
                        paddingLeft: 3,
                        marginBottom: 1.5
                    },
                    '& li': {
                        marginBottom: 0.5
                    },
                    '& strong': {
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: 600
                    },
                    '& .homework-email': {
                        backgroundColor: (theme) => theme.palette.action.hover,
                        borderLeft: (theme) => `4px solid ${theme.palette.secondary.main}`,
                        padding: '1rem',
                        marginTop: '1rem',
                        textAlign: 'left',
                        borderRadius: 1
                    },
                }}
            />
        </Paper>
    );
});

export default DetailCard;