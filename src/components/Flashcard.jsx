import React, { useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';

const Flashcard = React.memo(({ frontContent, backContent, showBack = false, onFlip }) => {
  // Use external control if provided, otherwise use internal state
  const [internalFlipped, setInternalFlipped] = useState(false);

  // When using external control, always use the showBack prop
  // When not using external control, reset to front when content changes
  React.useEffect(() => {
    if (onFlip) {
      // When using external control, we don't need to do anything special
      // The showBack prop will control the state
    } else {
      // When using internal control, reset to front when content changes
      setInternalFlipped(false);
    }
  }, [frontContent, onFlip, showBack]);

  const isFlipped = onFlip ? showBack : internalFlipped;
  const handleFlip = onFlip ? onFlip : () => setInternalFlipped(!internalFlipped);

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '300px',
        height: '200px',
        cursor: 'pointer',
      }}
      onClick={handleFlip}
    >
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          borderRadius: 3,
          '&:hover': {
            transform: isFlipped ? 'rotateY(180deg) scale(1.02)' : 'rotateY(0deg) scale(1.02)',
            boxShadow: 8,
          },
        }}
      >
        {/* Front of card - only show when not flipped */}
        {!isFlipped && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <Box sx={{ width: '100%', textAlign: 'center', maxWidth: '280px' }}>
              {React.isValidElement(frontContent) ? (
                frontContent
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {frontContent}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Back of card - only show when flipped */}
        {isFlipped && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotateY(-180deg)',
              zIndex: 2,
            }}
          >
            <Box sx={{ width: '100%', textAlign: 'center', maxWidth: '280px' }}>
              {React.isValidElement(backContent) ? (
                backContent
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6
                  }}
                >
                  {backContent}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
});

Flashcard.displayName = 'Flashcard';

export default Flashcard;
