import React from 'react';
import { Paper, useTheme, Button } from '@mui/material';

const GlassButtonWrapper = React.forwardRef(({ children, isActive = false, color = 'secondary', ...props }, ref) => {
    const theme = useTheme();

    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const baseStyles = {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: theme.shadows[4],
        background: `linear-gradient(135deg, ${hexToRgba(theme.palette.background.paper, 0.1)}, ${hexToRgba(theme.palette.background.paper, 0)})`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.18)}`,
        '&:hover': {
            boxShadow: theme.shadows[8],
            background: `linear-gradient(135deg, ${hexToRgba(theme.palette.background.paper, 0.2)}, ${hexToRgba(theme.palette.background.paper, 0.1)})`,
            backgroundColor: theme.palette.action.hover,
            transform: 'scale(1.05)',
        },
    };

    const activeStyles = isActive ? {
        background: `linear-gradient(135deg, ${hexToRgba(theme.palette.background.paper, 0.3)}, ${hexToRgba(theme.palette.background.paper, 0.15)})`,
        boxShadow: theme.shadows[12],
    } : {};

    // Apply theme colors and typography to Button children
    const childrenWithThemeColors = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Button) {
            // Determine the color based on active state and color prop
            const buttonColor = isActive ? 'primary.main' : `${color}.main`;

            return React.cloneElement(child, {
                sx: {
                    color: (theme) => theme.palette[buttonColor.split('.')[0]][buttonColor.split('.')[1]],
                    backgroundColor: 'transparent',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: '0.02em',
                    // Responsive design for readability and accessibility
                    minWidth: 'auto',  // Content-based width for readability
                    fontSize: { xs: '0.875rem', sm: '1rem' },  // Responsive typography
                    px: { xs: 3, sm: 2 },  // More padding on mobile for touch targets
                    minHeight: { xs: '44px', sm: '36px' },  // Accessible touch targets
                    whiteSpace: 'nowrap',  // Prevent text wrapping within buttons
                    ...child.props.sx
                }
            });
        }
        return child;
    });

    return (
        <Paper
            elevation={0}
            ref={ref}
            sx={{
                ...baseStyles,
                ...activeStyles,
                ...props.sx
            }}
        >
            {childrenWithThemeColors}
        </Paper>
    );
});

export default GlassButtonWrapper;