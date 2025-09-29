// src/theme.js

import { createTheme } from '@mui/material/styles';

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
    boxShadow: theme.shadows[4],
    borderRadius: 16,
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
        },
      },
      // --- NEW: Typography override for justified text ---
      MuiTypography: {
        styleOverrides: {
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
      MuiPaper: { styleOverrides: { root: { ...liquidGlassStyle, borderRadius: 12 } } },
      MuiCard: { styleOverrides: { root: { ...liquidGlassStyle, borderRadius: 12 } } },
      MuiMenu: { styleOverrides: { paper: liquidGlassStyle } },
      MuiAccordion: { styleOverrides: { root: { ...liquidGlassStyle, '&:before': { display: 'none' } } } },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
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
            border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)}`,
            // This '& *' selector will force the color onto ALL child elements inside the tooltip.
            '& *': {
              color: theme.palette.secondary.main,
            }
          },
          arrow: {
            color: hexToRgba(theme.palette.background.paper, 0.1),
            '&::before': {
              border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)}`,
              backdropFilter: 'blur(12px) saturate(180%)',
            }
          }
        }
      }
    },
  };
};

// --- Theme Definitions ---
let lightTheme = createTheme({ palette: { mode: 'light', primary: { main: '#9C27B0' }, secondary: { main: '#E91E63' }, background: { default: '#F8F7FA', paper: '#FFFFFF' }, text: { primary: '#2C1B3E', secondary: '#8E24AA' } } });
lightTheme = createTheme(lightTheme, baseOverrides(lightTheme));

let monochromeLightTheme = createTheme({ palette: { mode: 'light', primary: { main: '#000000' }, secondary: { main: '#757575' }, background: { default: '#F5F5F5', paper: '#FFFFFF' }, text: { primary: '#000000', secondary: '#424242' } } });
monochromeLightTheme = createTheme(monochromeLightTheme, baseOverrides(monochromeLightTheme));

let darkTheme = createTheme({ palette: { mode: 'dark', primary: { main: '#E91E63' }, secondary: { main: '#00BCD4' }, background: { default: '#2C1B3E', paper: '#3E2A50' }, text: { primary: '#F5F1F8', secondary: '#FF80AB' } } });
darkTheme = createTheme(darkTheme, baseOverrides(darkTheme));

let monochromeDarkTheme = createTheme({ palette: { mode: 'dark', primary: { main: '#FFFFFF' }, secondary: { main: '#BDBDBD' }, background: { default: '#121212', paper: '#1E1E1E' }, text: { primary: '#FFFFFF', secondary: '#E0E0E0' } } });
monochromeDarkTheme = createTheme(monochromeDarkTheme, baseOverrides(monochromeDarkTheme));

let vaporwaveTheme = createTheme({ palette: { mode: 'dark', primary: { main: '#F200FF' }, secondary: { main: '#00FFFF' }, background: { default: '#2E004B', paper: '#4F1A7E' }, text: { primary: '#DFFF00', secondary: '#FF8A00' } } });
vaporwaveTheme = createTheme(vaporwaveTheme, baseOverrides(vaporwaveTheme));

export { darkTheme, vaporwaveTheme, lightTheme, monochromeDarkTheme, monochromeLightTheme };