import React from 'react';
import { Box, Typography } from '@mui/material';

const LessonHeader = ({ title, subtitle }) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          color: 'text.secondary',
          mb: 2
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          color: 'text.primary',
          maxWidth: '600px',
          mx: 'auto'
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default LessonHeader;
