import React, { useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';

const isHtmlContent = (content) => {
  if (typeof content !== 'string') return false;
  return /<[^>]*>/.test(content);
};

const Flashcard = React.memo(({ frontContent, backContent, showBack = false, onFlip, size = 'default' }) => {
  const [internalFlipped, setInternalFlipped] = useState(false);

  React.useEffect(() => {
    if (!onFlip) {
      setInternalFlipped(false);
    }
  }, [frontContent, onFlip, showBack]);

  const isFlipped = onFlip ? showBack : internalFlipped;
  const handleFlip = onFlip ? onFlip : () => setInternalFlipped(!internalFlipped);

  const isLarge = size === 'large';
  const cardHeight = isLarge ? 320 : 240;
  const cardMaxWidth = isLarge ? 480 : 360;

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        maxWidth: cardMaxWidth,
        minWidth: 280,
        height: cardHeight,
        cursor: 'pointer',
        mx: 'auto',
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
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          '&:hover': {
            transform: isFlipped ? 'rotateY(180deg) scale(1.02)' : 'rotateY(0deg) scale(1.02)',
            boxShadow: 8,
          },
        }}
      >
        {!isFlipped && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              px: 2,
            }}
          >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              {React.isValidElement(frontContent) ? (
                frontContent
              ) : isHtmlContent(frontContent) ? (
                <Typography
                  variant="h6"
                  sx={{ textAlign: 'center' }}
                  dangerouslySetInnerHTML={{ __html: frontContent }}
                />
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {frontContent}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {isFlipped && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              transform: 'rotateY(-180deg)',
              zIndex: 2,
              overflowY: 'auto',
              overflowX: 'hidden',
              px: 2,
              py: 2,
            }}
          >
            <Box sx={{ width: '100%', textAlign: 'left' }}>
              {React.isValidElement(backContent) ? (
                backContent
              ) : isHtmlContent(backContent) ? (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.55,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                  dangerouslySetInnerHTML={{ __html: backContent }}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.55,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
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
