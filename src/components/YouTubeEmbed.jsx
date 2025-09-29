// src/components/YouTubeEmbed.jsx

import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

/**
 * A responsive YouTube video embed component.
 * @param {object} props - The component props.
 * @param {string} props.videoId - The ID of the YouTube video to embed.
 */
const YouTubeEmbed = ({ videoId }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        background: theme.palette.background.default,
        my: 2, // Margin top and bottom
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <iframe
        // FIX: Switched to the youtube-nocookie.com domain for privacy-enhanced mode
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default YouTubeEmbed;