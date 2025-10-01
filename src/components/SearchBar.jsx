// src/components/SearchBar.jsx
import React, { useState, useCallback } from 'react';
import {
  TextField,
  InputAdornment,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import GlassButtonWrapper from './GlassButtonWrapper';
// searchUtils is imported by parent components that need it

/**
 * SearchBar Component
 * Reusable search component with advanced search capabilities
 */
const SearchBar = ({
  placeholder = "Search...",
  value = '',
  onChange,
  onClear,
  showResultsCount = false,
  resultsCount = 0,
  resultsLabel = "results",
  className,
  size = "small",
  fullWidth = true,
  variant = "outlined",
  sx = {}
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = useCallback((event) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(event);  // Pass the event object as expected by parent components
    }
  }, [onChange]);

  const handleClear = useCallback(() => {
    setInternalValue('');
    if (onClear) {
      onClear();
    }
  }, [onClear]);

  const displayValue = value !== undefined ? value : internalValue;
  const hasValue = displayValue && displayValue.trim().length > 0;

  return (
    <Box className={className} sx={{ width: '100%', ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth={fullWidth}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          size={size}
          variant={variant}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: hasValue && (
              <InputAdornment position="end">
                <GlassButtonWrapper sx={{ p: 0.5 }}>
                  <Button
                    onClick={handleClear}
                    size="small"
                    sx={{
                      minWidth: 'auto',
                      p: 0.5,
                      '& .MuiSvgIcon-root': {
                        fontSize: 16
                      }
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </GlassButtonWrapper>
              </InputAdornment>
            ),
          }}
        />

        {showResultsCount && hasValue && (
          <Typography variant="body2" color="text.secondary">
            {resultsCount} {resultsLabel}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
