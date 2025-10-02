// src/theme.js

import { createTheme } from '@mui/material/styles';
import { getLiquidGlassShadow, getLiquidGlassBorder } from './utils/stylingUtils';

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const baseOverrides = (theme) => {
  const liquidGlassStyle = {
    backgroundColor: hexToRgba(theme.palette.background.paper, 0.1),
    backdropFilter: 'blur(12px) saturate(180%)',
    border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)}`,
    // Use centralized liquid glass shadow system
    boxShadow: getLiquidGlassShadow('base', theme),
    borderRadius: 16,
    // Ensure proper transparency for glass effect
    opacity: 0.95,
  };

  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: theme.palette.background.default,
            backgroundAttachment: 'fixed',
            backgroundImage: `radial-gradient(at 0% 0%, ${hexToRgba(theme.palette.primary.main, 0.2)} 0px, transparent 50%),
                            radial-gradient(at 98% 1%, ${hexToRgba(theme.palette.secondary.main, 0.25)} 0px, transparent 50%)`,
            '&::after': {
              content: '""', position: 'fixed', inset: 0, pointerEvents: 'none',
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.035"/%3E%3C/svg%3E')`,
              animation: 'grain 8s steps(10) infinite', zIndex: -1,
            },
          },
          // Global CSS overrides to ensure all MUI elements use liquid glass styling
          '.MuiPaper-root': {
            backgroundColor: `${hexToRgba(theme.palette.background.paper, 0.1)} !important`,
            backdropFilter: 'blur(12px) saturate(180%) !important',
            border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)} !important`,
            borderRadius: '16px !important',
            boxShadow: getLiquidGlassShadow('base', theme),
            '--Paper-shadow': getLiquidGlassShadow('base', theme),
            '--Paper-overlay': `linear-gradient(${hexToRgba(theme.palette.background.paper, 0.092)}, ${hexToRgba(theme.palette.background.paper, 0.092)}) !important`,
          },
          // More specific overrides for elevation classes to ensure CSS custom properties are overridden
          '.MuiPaper-elevation1': {
            '--Paper-shadow': `${getLiquidGlassShadow('base', theme)} !important`,
          },
          '.MuiPaper-elevation2': {
            '--Paper-shadow': `${getLiquidGlassShadow('hover', theme)} !important`,
          },
          '.MuiPaper-elevation3': {
            '--Paper-shadow': `${getLiquidGlassShadow('active', theme)} !important`,
          },
          '.MuiPaper-elevation4': {
            '--Paper-shadow': `${getLiquidGlassShadow('modal', theme)} !important`,
          },
          '.MuiPaper-elevation6': {
            '--Paper-shadow': `${getLiquidGlassShadow('modal', theme)} !important`,
          },
          '.MuiCard-root': {
            backgroundColor: `${hexToRgba(theme.palette.background.paper, 0.1)} !important`,
            backdropFilter: 'blur(12px) saturate(180%) !important',
            border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)} !important`,
            borderRadius: '16px !important',
            boxShadow: getLiquidGlassShadow('base', theme),
          },
          '.MuiChip-root': {
            backgroundColor: `${hexToRgba(theme.palette.background.paper, 0.15)} !important`,
            backdropFilter: 'blur(8px) saturate(150%) !important',
            border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)} !important`,
            borderRadius: '12px !important',
            boxShadow: getLiquidGlassShadow('base', theme),
          },
          '.MuiButton-root': {
            backgroundColor: `${hexToRgba(theme.palette.background.paper, 0.15)} !important`,
            backdropFilter: 'blur(8px) saturate(150%) !important',
            ...getLiquidGlassBorder('button', theme),
            boxShadow: getLiquidGlassShadow('base', theme),
          },
          '.MuiIconButton-root': {
            backgroundColor: `${hexToRgba(theme.palette.background.paper, 0.15)} !important`,
            backdropFilter: 'blur(8px) saturate(150%) !important',
            ...getLiquidGlassBorder('button', theme),
            boxShadow: getLiquidGlassShadow('base', theme),
          },
        },
      },
      // --- NEW: Typography override for justified text ---
      MuiTypography: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: 'inherit', // Ensure proper color inheritance
          }),
          // Target paragraph text for justification
          body1: { textAlign: 'justify' },
          body2: { textAlign: 'justify' },
          // Ensure headings remain centered
          h1: { textAlign: 'center' },
          h2: { textAlign: 'center' },
          h3: { textAlign: 'center' },
          h4: { textAlign: 'center' },
          h5: { textAlign: 'center' },
          h6: { textAlign: 'center' },
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: 'inherit', // Ensure icons inherit color from parent
          }),
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...liquidGlassStyle,
            borderRadius: 12,
            // Enhanced liquid glass CSS custom properties for better browser compatibility
            '--Paper-shadow': getLiquidGlassShadow('base', theme),
            '--Paper-overlay': `linear-gradient(${hexToRgba(theme.palette.background.paper, 0.092)}, ${hexToRgba(theme.palette.background.paper, 0.092)})`,
          }),
          // Ensure all elevation variants use liquid glass styling
          elevation1: ({ theme }) => ({
            boxShadow: getLiquidGlassShadow('base', theme),
            '--Paper-shadow': getLiquidGlassShadow('base', theme),
          }),
          elevation2: ({ theme }) => ({
            boxShadow: getLiquidGlassShadow('hover', theme),
            '--Paper-shadow': getLiquidGlassShadow('hover', theme),
          }),
          elevation3: ({ theme }) => ({
            boxShadow: getLiquidGlassShadow('active', theme),
            '--Paper-shadow': getLiquidGlassShadow('active', theme),
          }),
          elevation4: ({ theme }) => ({
            boxShadow: getLiquidGlassShadow('modal', theme),
            '--Paper-shadow': getLiquidGlassShadow('modal', theme),
          }),
          elevation6: ({ theme }) => ({
            boxShadow: getLiquidGlassShadow('modal', theme),
            '--Paper-shadow': getLiquidGlassShadow('modal', theme),
          }),
        }
      },
      MuiCard: { styleOverrides: { root: ({ theme }) => ({ ...liquidGlassStyle, '--Paper-shadow': getLiquidGlassShadow('base', theme) }) } },
      MuiMenu: { styleOverrides: { paper: ({ theme }) => ({ ...liquidGlassStyle, '--Paper-shadow': getLiquidGlassShadow('base', theme) }) } },
      MuiAccordion: { styleOverrides: { root: ({ theme }) => ({ ...liquidGlassStyle, '&:before': { display: 'none' }, '--Paper-shadow': getLiquidGlassShadow('base', theme) }) } },
      MuiButton: {
        styleOverrides: {
          root: {
            ...getLiquidGlassBorder('button', theme),
            textTransform: 'none',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': { transform: 'scale(1.05)' },
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            ...liquidGlassStyle,
            fontSize: '0.875rem',
            padding: '8px 12px',
            maxWidth: 300,
            // This color is for the tooltip itself, but not its children.
            color: theme.palette.secondary.main,
            backgroundColor: hexToRgba(theme.palette.background.paper, 0.1),
            backdropFilter: 'blur(12px) saturate(180%)',
            ...getLiquidGlassBorder('secondary', theme),
            // This '& *' selector will force the color onto ALL child elements inside the tooltip.
            '& *': {
              color: theme.palette.secondary.main,
            }
          },
          arrow: {
            color: hexToRgba(theme.palette.background.paper, 0.1),
            '&::before': {
              ...getLiquidGlassBorder('secondary', theme),
              backdropFilter: 'blur(12px) saturate(180%)',
            }
          }
        }
      },
      // Ensure popover and dialog components also use liquid glass styling
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            ...liquidGlassStyle,
            '--Paper-shadow': getLiquidGlassShadow('modal', theme),
          })
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: ({ theme }) => ({
            ...liquidGlassStyle,
            '--Paper-shadow': getLiquidGlassShadow('modal', theme),
          })
        }
      },
      MuiModal: {
        styleOverrides: {
          backdrop: ({ theme }) => ({
            backgroundColor: hexToRgba(theme.palette.background.paper, 0.1),
            backdropFilter: 'blur(8px) saturate(150%)',
          })
        }
      },
      // Ensure chips and floating action buttons use liquid glass styling
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: hexToRgba(theme.palette.background.paper, 0.15),
            backdropFilter: 'blur(8px) saturate(150%)',
            ...getLiquidGlassBorder('secondary', theme),
            boxShadow: getLiquidGlassShadow('tooltip', theme),
            '&:hover': {
              backgroundColor: hexToRgba(theme.palette.background.paper, 0.2),
              boxShadow: getLiquidGlassShadow('tooltip', theme),
            }
          })
        }
      },
      MuiFab: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: hexToRgba(theme.palette.background.paper, 0.15),
            backdropFilter: 'blur(8px) saturate(150%)',
            ...getLiquidGlassBorder('button', theme),
            boxShadow: getLiquidGlassShadow('buttonActive', theme),
            '&:hover': {
              backgroundColor: hexToRgba(theme.palette.background.paper, 0.2),
              boxShadow: getLiquidGlassShadow('modal', theme),
            }
          })
        }
      }
    },
  };
};

// --- Theme Definitions ---
let lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#9C27B0' },
    secondary: { main: '#E91E63' },
    success: { main: '#4CAF50', light: '#81C784', dark: '#388E3C' },
    warning: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' },
    error: { main: '#F44336', light: '#EF5350', dark: '#C62828' },
    info: { main: '#2196F3', light: '#64B5F6', dark: '#1565C0' },
    background: { default: '#F8F7FA', paper: '#FFFFFF' },
    text: { primary: '#2C1B3E', secondary: '#8E24AA' }
  }
});
lightTheme = createTheme(lightTheme, baseOverrides(lightTheme));

let monochromeLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#000000' },
    secondary: { main: '#757575' },
    success: { main: '#4CAF50', light: '#81C784', dark: '#388E3C' },
    warning: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' },
    error: { main: '#F44336', light: '#EF5350', dark: '#C62828' },
    info: { main: '#2196F3', light: '#64B5F6', dark: '#1565C0' },
    background: { default: '#F5F5F5', paper: '#FFFFFF' },
    text: { primary: '#000000', secondary: '#424242' }
  }
});
monochromeLightTheme = createTheme(monochromeLightTheme, baseOverrides(monochromeLightTheme));

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#E91E63' },
    secondary: { main: '#00BCD4' },
    success: { main: '#4CAF50', light: '#81C784', dark: '#388E3C' },
    warning: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' },
    error: { main: '#F44336', light: '#EF5350', dark: '#C62828' },
    info: { main: '#2196F3', light: '#64B5F6', dark: '#1565C0' },
    background: { default: '#2C1B3E', paper: '#3E2A50' },
    text: { primary: '#F5F1F8', secondary: '#FF80AB' }
  }
});
darkTheme = createTheme(darkTheme, baseOverrides(darkTheme));

let monochromeDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FFFFFF' },
    secondary: { main: '#BDBDBD' },
    success: { main: '#4CAF50', light: '#81C784', dark: '#388E3C' },
    warning: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' },
    error: { main: '#F44336', light: '#EF5350', dark: '#C62828' },
    info: { main: '#2196F3', light: '#64B5F6', dark: '#1565C0' },
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#FFFFFF', secondary: '#E0E0E0' }
  }
});
monochromeDarkTheme = createTheme(monochromeDarkTheme, baseOverrides(monochromeDarkTheme));

let vaporwaveTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#F200FF' },
    secondary: { main: '#00FFFF' },
    success: { main: '#4CAF50', light: '#81C784', dark: '#388E3C' },
    warning: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' },
    error: { main: '#F44336', light: '#EF5350', dark: '#C62828' },
    info: { main: '#2196F3', light: '#64B5F6', dark: '#1565C0' },
    background: { default: '#2E004B', paper: '#4F1A7E' },
    text: { primary: '#DFFF00', secondary: '#FF8A00' }
  }
});
vaporwaveTheme = createTheme(vaporwaveTheme, baseOverrides(vaporwaveTheme));

export { darkTheme, vaporwaveTheme, lightTheme, monochromeDarkTheme, monochromeLightTheme };