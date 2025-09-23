import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline, IconButton, Tooltip as MuiTooltip, Box,
  Card, CardContent, Typography, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';

// Import all icons and themes
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TonalityIcon from '@mui/icons-material/Tonality';
import InvertColorsOffIcon from '@mui/icons-material/InvertColorsOff';
import PaletteIcon from '@mui/icons-material/Palette';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import { darkTheme, vaporwaveTheme, lightTheme, monochromeDarkTheme, monochromeLightTheme } from './theme.js';

// Import all components needed for the app
import GlobalBusinessCultures from './lessons/GlobalBusinessCultures';
import Leaderboard from './components/Leaderboard';

// --- A more organized way to manage themes ---
const themes = [
  {
    key: 'light',
    label: 'Light',
    icon: <Brightness7Icon fontSize="small" sx={{ color: lightTheme.palette.primary.main }} />,
    theme: lightTheme,
    preview: ['#E91E63', '#9C27B0', '#F8F7FA']
  },
  {
    key: 'monochromeLight',
    label: 'Monochrome Light',
    icon: <InvertColorsOffIcon fontSize="small" sx={{ color: monochromeLightTheme.palette.background.default }} />,
    theme: monochromeLightTheme,
    preview: ['#C5C5C5', '#757575', '#000000']
  },
  {
    key: 'dark',
    label: 'Dark',
    icon: <Brightness4Icon fontSize="small" sx={{ color: darkTheme.palette.primary.main }} />,
    theme: darkTheme,
    preview: ['#E91E63', '#00BCD4', '#2C1B3E']
  },
  {
    key: 'monochromeDark',
    label: 'Monochrome Dark',
    icon: <TonalityIcon fontSize="small" sx={{ color: monochromeDarkTheme.palette.background.paper }} />,
    theme: monochromeDarkTheme,
    preview: ['#5E5E5E', '#1E1E1E', '#121212']
  },
  {
    key: 'vaporwave',
    label: 'VaporWave',
    icon: <AutoAwesomeIcon fontSize="small" sx={{ color: vaporwaveTheme.palette.secondary.main }} />,
    theme: vaporwaveTheme,
    preview: ['#2E004B', '#F200FF', '#FF8A00']
  },
];

function MainLayout() {
  const [themeName, setThemeName] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);

  // State to track the last theme selected for analytics
  const [lastSelectedTheme, setLastSelectedTheme] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleThemeChange = (newThemeName) => {
    setThemeName(newThemeName);
    setLastSelectedTheme(newThemeName);
    handleCloseMenu();
  };
  
  const handleGoToLeaderboard = () => {
    navigate('/leaderboard');
  };

  const theme = useMemo(() => {
    return themes.find(t => t.key === themeName)?.theme || lightTheme;
  }, [themeName]);

  // The combined and corrected useEffect hook
  useEffect(() => {
    // Analytics logging with 30-second debounce
    if (lastSelectedTheme) {
        const timerId = setTimeout(async () => {
            try {
                await fetch('/api/themes/log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ theme: lastSelectedTheme }),
                });
                console.log(`Success: Sent analytics event for theme '${lastSelectedTheme}'.`);
            } catch (error) {
                console.error("Failed to send analytics event:", error);
            }
        }, 30000); // Wait for 30 seconds

        return () => clearTimeout(timerId);
    }
  }, [lastSelectedTheme]);

  // NEW: A separate useEffect to log the initial default theme after a delay.
  useEffect(() => {
    // Check for the initial theme, which is 'light'
    const initialTheme = themes[0].key;

    // Set a timer to log the initial theme after a delay
    const initialThemeTimer = setTimeout(async () => {
      // Only log if the theme hasn't been changed by the user
      if (themeName === initialTheme) {
        try {
          await fetch('/api/themes/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme: initialTheme }),
          });
          console.log(`Success: Sent analytics event for initial default theme '${initialTheme}'.`);
        } catch (error) {
          console.error("Failed to send analytics event for default theme:", error);
        }
      }
    }, 30000); // Wait for 30 seconds

    // Cleanup function to cancel the timer if the component unmounts
    // or if the theme changes before the timer finishes
    return () => clearTimeout(initialThemeTimer);

  }, [themeName]); // Depend on themeName to clear the timer on change

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath) {
      sessionStorage.removeItem('redirect');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}>
        {/* Only show the leaderboard icon on the main and leaderboard pages */}
        {(location.pathname === '/' || location.pathname === '/leaderboard') && (
          <MuiTooltip title="View Leaderboard" arrow>
            <IconButton onClick={handleGoToLeaderboard} color="inherit" sx={{ mr: 1, '&:hover': { transform: 'scale(1.15)', filter: 'brightness(1.2)' } }}>
              <EmojiEventsIcon />
            </IconButton>
          </MuiTooltip>
        )}
        
        <MuiTooltip title="Change Theme" arrow>
          <IconButton
            onClick={handleOpenMenu}
            color="inherit"
            sx={{
                transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.15)', filter: 'brightness(1.2)' }
            }}
          >
            <PaletteIcon />
          </IconButton>
        </MuiTooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{ 'aria-labelledby': 'theme-button' }}
        >
          {themes.map((themeOption) => (
            <MenuItem
              key={themeOption.key}
              onClick={() => handleThemeChange(themeOption.key)}
              sx={{
                background: `linear-gradient(${
                  themeOption.key === 'light' || themeOption.key === 'monochromeLight' ? '270deg' : '90deg'
                }, ${themeOption.preview[0]}40, ${themeOption.preview[1]}10, ${themeOption.preview[2]}00)`,
                '&:hover': {
                  background: `linear-gradient(${
                    themeOption.key === 'light' || themeOption.key === 'monochromeLight' ? '270deg' : '90deg'
                  }, ${themeOption.preview[0]}80, ${themeOption.preview[1]}20, ${themeOption.preview[2]}00)`,
                },
              }}
            >
              <ListItemIcon sx={{ '& .MuiSvgIcon-root': { color: themeOption.icon.props.sx.color } }}>
                {themeOption.icon}
              </ListItemIcon>
              <ListItemText sx={{ color: themeOption.theme.palette.text.primary }}>
                {themeOption.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Outlet />
    </ThemeProvider>
  );
}

function SiteRoot() {
  useEffect(() => {
    document.title = 'ESL Lesson Portal';
  }, []);

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', textAlign: 'center', px: 2
    }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h3" component="h1" gutterBottom>
            ESL Lesson Portal
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary">
            Please use the direct link provided by Ryan C. to access your lesson.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SiteRoot />} />
          <Route path="/global-business-cultures" element={<GlobalBusinessCultures />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}