// src/components/TimelineVisualization.jsx

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TimelineVisualization = ({
  title = "Timeline",
  items = [],
  currentIndex = 0,
  showProgress = true
}) => {
  const theme = useTheme();

  const progress = items.length > 0 ? ((currentIndex + 1) / items.length) * 100 : 0;

  return (
    <Card sx={{
      backgroundColor: theme.palette.background.paper,
      backdropFilter: 'blur(12px) saturate(180%)',
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[4],
      borderRadius: 2,
      mb: 3
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccessTimeIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>

        {showProgress && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress: {currentIndex + 1} of {items.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.palette.action.hover,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 4
                }
              }}
            />
          </Box>
        )}

        <Box sx={{ position: 'relative' }}>
          {/* Timeline line */}
          <Box sx={{
            position: 'absolute',
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: theme.palette.divider,
            zIndex: 1
          }} />

          {items.map((item, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            const isUpcoming = index > currentIndex;

            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 3,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Timeline dot */}
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: isCompleted
                    ? theme.palette.success.main
                    : isActive
                    ? theme.palette.primary.main
                    : theme.palette.action.disabled,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  position: 'relative',
                  boxShadow: isActive ? theme.shadows[4] : 'none',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.3s ease-in-out'
                }}>
                  {isCompleted ? (
                    <CheckCircleIcon sx={{ color: 'white', fontSize: 20 }} />
                  ) : (
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {index + 1}
                    </Typography>
                  )}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Chip
                    label={item.label}
                    color={isActive ? "primary" : isCompleted ? "success" : "default"}
                    variant={isActive ? "filled" : "outlined"}
                    sx={{
                      mb: 1,
                      fontWeight: isActive ? 'bold' : 'normal'
                    }}
                  />
                  {item.description && (
                    <Typography
                      variant="body2"
                      color={isActive ? "text.primary" : "text.secondary"}
                      sx={{
                        fontStyle: isUpcoming ? 'italic' : 'normal',
                        opacity: isUpcoming ? 0.7 : 1
                      }}
                    >
                      {item.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimelineVisualization;
