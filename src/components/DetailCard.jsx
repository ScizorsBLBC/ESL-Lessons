// src/components/DetailCard.jsx

import React from 'react';
import { Paper, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSpeak } from 'react-text-to-speech';

const DetailCard = React.forwardRef(({ content }, ref) => {
    // Strip HTML tags for text-to-speech
    const strippedContent = content.replace(/<[^>]*>?/gm, '');

    // Initialize text-to-speech with the stripped content
    const { speak, isPlaying, voices } = useSpeak({
        text: strippedContent,
        lang: 'en-US', // Default to English
        voice: null, // Let browser choose best voice
        rate: 0.8, // Slightly slower for clarity
        volume: 0.8,
        pitch: 1
    });

    return (
        <Paper ref={ref} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
            {/* Text-to-Speech Button */}
            <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                <IconButton
                    onClick={speak}
                    aria-label="Read content aloud"
                    size="small"
                    disabled={isPlaying}
                    sx={{
                        backgroundColor: (theme) => theme.palette.background.paper,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.action.hover,
                        }
                    }}
                >
                    <VolumeUpIcon fontSize="small" />
                </IconButton>
            </Box>

            <Card sx={{ flexGrow: 1, overflowY: 'auto', pt: 4 }}>
                <CardContent>
                    <Typography
                        variant="body1"
                        component="div"
                        dangerouslySetInnerHTML={{ __html: content }}
                        sx={{
                            '& .homework-email': {
                                backgroundColor: (theme) => theme.palette.action.hover,
                                borderLeft: (theme) => `4px solid ${theme.palette.secondary.main}`,
                                padding: '1rem',
                                marginTop: '1rem',
                                textAlign: 'left',
                            },
                        }}
                    />
                </CardContent>
            </Card>
        </Paper>
    );
});

export default DetailCard;