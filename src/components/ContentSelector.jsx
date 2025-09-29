// src/components/ContentSelector.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Grid, Button, Stack, Tooltip as MuiTooltip, Fade } from '@mui/material';
import DetailCard from './DetailCard';
import GlassButtonWrapper from './GlassButtonWrapper';

export default function ContentSelector({
  sectionData = [],
  title,
  description,
  detailRenderer,
  tables = [],
  preserveOrder = false,
  // --- PROPS FOR CONTROLLED MODE ---
  onItemSelect,
  selectedItem,
  hideDetailView = false,
  theme // Add theme prop
}) {
    const isArray = Array.isArray(sectionData);
    const dataToProcess = isArray ? sectionData : [sectionData];
    
    // --- FIX: Made dataKey detection more robust to include 'word' ---
    const dataKey = useMemo(() => {
        if (!dataToProcess || dataToProcess.length === 0) return 'name'; // Default fallback
        const item = dataToProcess[0];
        if (item.topic) return 'topic';
        if (item.name) return 'name';
        if (item.title) return 'title';
        if (item.word) return 'word';
        return 'name'; // Final fallback
    }, [dataToProcess]);
    
    const sortedData = useMemo(() => (
        preserveOrder 
            ? dataToProcess 
            : [...dataToProcess].sort((a, b) => (a[dataKey] || '').localeCompare(b[dataKey] || ''))
    ), [dataToProcess, dataKey, preserveOrder]);

    // Internal state for uncontrolled mode
    const [internalSelectedItem, setInternalSelectedItem] = useState(sortedData[0]);

    // Determine if component is controlled or uncontrolled
    const isControlled = selectedItem !== undefined && onItemSelect !== undefined;
    const currentItem = isControlled ? selectedItem : internalSelectedItem;

    const handleSelect = (item) => {
      if (!isControlled) {
        setInternalSelectedItem(item);
      }
      if (onItemSelect) {
        onItemSelect(item);
      }
    };

    // Effect for uncontrolled mode to update its internal state
    useEffect(() => {
        if (!isControlled && sortedData.length > 0) {
            setInternalSelectedItem(sortedData[0]);
        }
    }, [sortedData, isControlled]);

    return (
        <Grid container spacing={4} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: { xs: '100%', sm: '1100px' },
            mx: 'auto' // Center the entire grid on the page
        }}>
            <Grid item xs={12} sx={{ width: '100%' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h2" gutterBottom>{title}</Typography>
                    {description && <Typography>{description}</Typography>}
                </Box>
            </Grid>
            
            {sortedData.length > 1 && (
                <Grid item xs={12} sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '1100px' },
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Stack direction="row" justifyContent="center" flexWrap="wrap" sx={{ width: '100%', maxWidth: '600px' }}>
                        {sortedData.map(item => (
                             <MuiTooltip title={`View details for ${item[dataKey]}`} key={item[dataKey]} arrow>
                                <Box sx={{ m: 1 }}>
                                    <GlassButtonWrapper isActive={currentItem === item}>
                                        <Button
                                            onClick={() => handleSelect(item)}
                                            sx={{
                                                color: (theme) => theme.palette.secondary.main,
                                                minWidth: '120px',
                                                transition: 'all 0.2s ease-in-out',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    backgroundColor: (theme) => theme.palette.action.hover,
                                                    color: (theme) => theme.palette.primary.main,
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                        >
                                            {item[dataKey]}
                                        </Button>
                                    </GlassButtonWrapper>
                                </Box>
                            </MuiTooltip>
                        ))}
                    </Stack>
                </Grid>
            )}

            {/* Render internal DetailCard only if NOT in controlled/hidden mode */}
            {!hideDetailView && currentItem && detailRenderer && (
              <Grid item xs={12} sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '1100px' },
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center'
              }}>
                  <Box sx={{
                      width: '100%',
                      maxWidth: { xs: '100%', sm: '1100px' },
                      minHeight: 400
                  }}>
                      <Fade in={!!currentItem} key={currentItem ? currentItem[dataKey] : 'empty'}>
                          <Box>
                              {React.isValidElement(detailRenderer(currentItem, theme)) ? (
                                  detailRenderer(currentItem, theme)
                              ) : (
                                  <DetailCard content={detailRenderer(currentItem, theme)} />
                              )}
                          </Box>
                      </Fade>
                  </Box>
              </Grid>
            )}
            {tables}
        </Grid>
    );
};