// src/components/DetailCard.jsx

import React from 'react';
import { Paper, Typography, IconButton, Box, useTheme } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSpeak } from 'react-text-to-speech';

const DetailCard = React.forwardRef(({ content }, ref) => {
    const theme = useTheme();

    // Strip HTML tags for text-to-speech
    const strippedContent = content.replace(/<[^>]*>?/gm, '');

    // Initialize text-to-speech with the stripped content
    const { speak, isPlaying } = useSpeak({
        text: strippedContent,
        lang: 'en-US', // Default to English
        voice: null, // Let browser choose best voice
        rate: 0.8, // Slightly slower for clarity
        volume: 0.8,
        pitch: 1
    });

    // Apply the liquid glassmorphism styling from the theme
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
            sx={{
                ...liquidGlassStyle,
                p: 2.5,
                position: 'relative',
                overflow: 'visible'
            }}
        >
            {/* Text-to-Speech Button */}
            <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                <IconButton
                    onClick={speak}
                    aria-label="Read content aloud"
                    size="small"
                    disabled={isPlaying}
                    sx={{
                        backgroundColor: hexToRgba(theme.palette.background.paper, 0.15),
                        border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.2)}`,
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                            backgroundColor: hexToRgba(theme.palette.background.paper, 0.25),
                        }
                    }}
                >
                    <VolumeUpIcon fontSize="small" />
                </IconButton>
            </Box>

            <Typography
                variant="body1"
                component="div"
                dangerouslySetInnerHTML={{ __html: content }}
                sx={{
                    color: (theme) => theme.palette.text.primary,
                    pt: 4, // Add padding top to account for the button
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