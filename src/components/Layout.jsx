// src/components/Layout.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline, IconButton, Tooltip as MuiTooltip, Box, Menu, MenuItem, ListItemIcon, ListItemText, Container
} from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TonalityIcon from '@mui/icons-material/Tonality';
import InvertColorsOffIcon from '@mui/icons-material/InvertColorsOff';
import PaletteIcon from '@mui/icons-material/Palette';

import { darkTheme, vaporwaveTheme, lightTheme, monochromeDarkTheme, monochromeLightTheme } from '../theme.js';
import GlobalScrollIndicator from './GlobalScrollIndicator';
import Footer from './Footer'; // IMPORTED FOOTER COMPONENT

const themes = [
    { key: 'light', label: 'Light', icon: <Brightness7Icon fontSize="small" sx={{ color: lightTheme.palette.primary.main }} />, theme: lightTheme, preview: ['#E91E63', '#9C27B0', '#F8F7FA'] },
    { key: 'monochromeLight', label: 'Monochrome Light', icon: <InvertColorsOffIcon fontSize="small" sx={{ color: monochromeLightTheme.palette.text.primary }} />, theme: monochromeLightTheme, preview: ['#C5C5C5', '#757575', '#000000'] },
    { key: 'dark', label: 'Dark', icon: <Brightness4Icon fontSize="small" sx={{ color: darkTheme.palette.primary.main }} />, theme: darkTheme, preview: ['#E91E63', '#00BCD4', '#2C1B3E'] },
    { key: 'monochromeDark', label: 'Monochrome Dark', icon: <TonalityIcon fontSize="small" sx={{ color: monochromeDarkTheme.palette.text.primary }} />, theme: monochromeDarkTheme, preview: ['#5E5E5E', '#1E1E1E', '#121212'] },
    { key: 'vaporwave', label: 'VaporWave', icon: <AutoAwesomeIcon fontSize="small" sx={{ color: vaporwaveTheme.palette.secondary.main }} />, theme: vaporwaveTheme, preview: ['#2E004B', '#F200FF', '#FF8A00'] },
];

export default function Layout() {
  const [themeName, setThemeName] = useState(() => localStorage.getItem('themePreference') || 'light');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const activeTheme = useMemo(() => themes.find(t => t.key === themeName)?.theme || lightTheme, [themeName]);

  useEffect(() => {
    localStorage.setItem('themePreference', themeName);
  }, [themeName]);

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath) {
      sessionStorage.removeItem('redirect');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleThemeChange = (newThemeName) => {
    setThemeName(newThemeName);
    handleCloseMenu();
  };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <MuiTooltip title="Change Theme" arrow>
        <IconButton onClick={handleOpenMenu} color="inherit" sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}>
          <PaletteIcon />
        </IconButton>
      </MuiTooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        {themes.map((themeOption) => (
          <MenuItem
            key={themeOption.key}
            onClick={() => handleThemeChange(themeOption.key)}
            sx={{
              background: `linear-gradient(${
                themeOption.key.includes('light') ? '270deg' : '90deg'
              }, ${themeOption.preview[0]}40, ${themeOption.preview[1]}10, ${themeOption.preview[2]}00)`,
              '&:hover': {
                background: `linear-gradient(${
                  themeOption.key.includes('light') ? '270deg' : '90deg'
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

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        minHeight: '100vh',   
      }}>
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            pt: { xs: 8, sm: 6 },
            pb: 4,
            width: '100%',
            flexGrow: 1,
            px: { xs: 2, sm: 3 } // Add horizontal padding on mobile
          }}
        >
          <Outlet />
        </Container>
        
        {/* 2. PLACE FOOTER HERE */}
        <Footer /> 

      </Box>
      
      <GlobalScrollIndicator />
    </ThemeProvider>
  );
}