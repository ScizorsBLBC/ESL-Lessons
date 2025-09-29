import React from 'react';
import { Paper, useTheme } from '@mui/material';

const GlassButtonWrapper = React.forwardRef(({ children, isActive = false, ...props }, ref) => {
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
        },
    };

    const activeStyles = isActive ? {
        background: `linear-gradient(135deg, ${hexToRgba(theme.palette.background.paper, 0.3)}, ${hexToRgba(theme.palette.background.paper, 0.15)})`,
        boxShadow: theme.shadows[12],
    } : {};

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
            {children}
        </Paper>
    );
});

export default GlassButtonWrapper;