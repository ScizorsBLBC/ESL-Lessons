import React, { useState } from 'react';
import { Box, Typography, Paper, Tooltip, Collapse, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { createLessonCard, createLessonTitle, createAccessibilityTable } from '../utils/stylingUtils';

/**
 * Component to display a Timeline, visualizing temporal relationships.
 * This version is enhanced to be interactive, highlighting a selected event (tense)
 * and displaying its content on click/selection.
 *
 * @param {object} props
 * @param {object} props.data - The data object conforming to the timeline schema.
 * @param {object} [props.accessibility] - The accessibility object.
 * @param {string} [props.selectedId] - The ID of the currently selected tense/event to highlight.
 * @param {function} [props.onSelectId] - Callback function when a point/span is clicked, passing the ID.
 * @returns {JSX.Element}
 */
const TimelineVisualization = ({ data, accessibility, selectedId, onSelectId }) => {
    const theme = useTheme();
    const { title, timePoints = [], timeSpans = [], description } = data;
    const [hoveredId, setHoveredId] = useState(null);

    // Theme-aware colors for monochrome compatibility
    const isMonochrome = theme.palette.mode === 'light'
        ? theme.palette.primary.main === '#000000' || theme.palette.secondary.main === '#757575'
        : theme.palette.primary.main === '#FFFFFF' || theme.palette.secondary.main === '#BDBDBD';

    const visualizationColors = isMonochrome ? {
        background: 'grey.50',
        text: 'grey.600',
        border: 'grey.400',
        primary: 'grey.700',
        accent: 'grey.500',
        success: 'grey.600'
    } : {
        background: 'background.default',
        text: 'text.secondary',
        border: 'text.primary',
        primary: 'text.primary',
        accent: 'warning.main',
        success: 'success.main'
    };
    
    // Combine all events for unified lookup
    const allEvents = [...timePoints, ...timeSpans];
    const currentEvent = allEvents.find(e => e.id === selectedId);

    // --- Core Visualization Rendering ---
    const renderCoreVisualization = () => (
        <Box sx={{ mt: 3, p: 3, bgcolor: visualizationColors.background, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="body2" sx={{ color: visualizationColors.text, mb: 2, textAlign: 'center' }}>{description}</Typography>

            {/* Timeline Axis Container */}
            <Box sx={{
                position: 'relative',
                height: 180,
                borderBottom: '2px solid',
                borderColor: visualizationColors.border,
                mt: 4,
                mb: 2
            }}>

                {/* Fixed Labels: Past, Now, Future */}
                <Typography variant="caption" sx={{
                    position: 'absolute',
                    left: 0,
                    top: -25,
                    fontWeight: 'bold'
                }}>Past</Typography>
                <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                }}>
                    <Typography variant="caption" sx={{
                        top: -25,
                        fontWeight: 'bold'
                    }}>Now</Typography>
                    <Box sx={{
                        width: 1,
                        height: '100%',
                        bgcolor: 'error.main'
                    }} /> {/* Present Moment Line */}
                </Box>
                <Typography variant="caption" sx={{
                    position: 'absolute',
                    right: 0,
                    top: -25,
                    fontWeight: 'bold'
                }}>Future</Typography>

                {/* TIME POINTS (Above the line: Simple & Perfect Tenses) */}
                {timePoints.map((point) => {
                    const isSelected = point.id === selectedId;
                    const isHovered = point.id === hoveredId;
                    return (
                        <Tooltip key={point.id} title={point.label} arrow placement="top">
                            <Box
                                onClick={() => onSelectId && onSelectId(point.id)}
                                onMouseEnter={() => setHoveredId(point.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                sx={{
                                    position: 'absolute',
                                    left: `${point.position}%`,
                                    top: '40%', // Above the center line
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: isSelected ? visualizationColors.accent : visualizationColors.primary,
                                    border: isSelected ? '3px solid' : '1px solid',
                                    borderColor: isSelected ? visualizationColors.accent : visualizationColors.primary,
                                    transform: isSelected ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%)',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer',
                                    boxShadow: isSelected || isHovered ? '0 0 10px' : 'none',
                                    '&:hover': {
                                        boxShadow: '0 0 10px',
                                    },
                                }}
                            >
                                <Typography variant="caption" sx={{
                                    position: 'absolute',
                                    bottom: -20,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontWeight: isSelected ? 'bold' : 'normal',
                                    whiteSpace: 'nowrap',
                                    color: isSelected ? visualizationColors.accent : visualizationColors.primary
                                }}>
                                    {point.label.split(' ')[0]}
                                </Typography>
                            </Box>
                        </Tooltip>
                    );
                })}

                {/* TIME SPANS (Below the line: Continuous Tenses) */}
                {timeSpans.map((span) => {
                    const isSelected = span.id === selectedId;
                    const isHovered = span.id === hoveredId;
                    const width = span.endPosition - span.startPosition;
                    return (
                        <Tooltip key={span.id} title={span.label} arrow placement="bottom">
                            <Box
                                onClick={() => onSelectId && onSelectId(span.id)}
                                onMouseEnter={() => setHoveredId(span.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                sx={{
                                    position: 'absolute',
                                    left: `${span.startPosition}%`,
                                    width: `${width}%`,
                                    top: '60%', // Below the center line
                                    height: 10,
                                    bgcolor: isSelected ? visualizationColors.success + '.light' : visualizationColors.secondary + '.light',
                                    opacity: isSelected ? 1 : 0.7,
                                    border: span.style === 'wavy' ? '2px dashed' : '2px solid',
                                    borderColor: isSelected ? visualizationColors.success : visualizationColors.secondary,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    transform: isSelected ? 'scaleY(1.5)' : 'scaleY(1)',
                                    boxShadow: isSelected || isHovered ? '0 0 10px' : 'none',
                                    '&:hover': {
                                        boxShadow: '0 0 10px',
                                    },
                                }}
                            >
                                <Typography variant="caption" sx={{
                                    position: 'absolute',
                                    top: 15,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontWeight: isSelected ? 'bold' : 'normal',
                                    whiteSpace: 'nowrap',
                                    color: isSelected ? visualizationColors.success : visualizationColors.text
                                }}>
                                    {span.label.split(' ')[0]}
                                </Typography>
                            </Box>
                        </Tooltip>
                    );
                })}
            </Box>

            {/* Detailed Content Popout (Below the Timeline) */}
            <Collapse in={!!currentEvent} sx={{ mt: 2 }}>
                <Paper elevation={6} sx={{
                    p: 2,
                    bgcolor: visualizationColors.primary + '.light',
                    border: '1px solid',
                    borderColor: visualizationColors.primary
                }}>
                    <Typography variant="h6" sx={{
                        color: visualizationColors.primary,
                        mb: 1
                    }}>
                        {currentEvent?.label || "Select a Tense"}
                    </Typography>
                    <Box dangerouslySetInnerHTML={{ __html: currentEvent?.contentHtml || "Click a point or span on the timeline to see details about its time usage." }} />
                </Paper>
            </Collapse>
        </Box>
    );
    // --- End Core Visualization Rendering ---

    const renderAccessibilityTable = () => (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{
                color: visualizationColors.text,
                mb: 1
            }}>Data Table for Accessibility</Typography>
            <Paper variant="outlined" sx={{
                p: 2,
                bgcolor: 'action.hover'
            }}>
                <Typography variant="body2" sx={{
                    fontStyle: 'italic',
                    mb: 1
                }}>
                    **Alt Text:** {accessibility.altText}
                </Typography>
                {accessibility.dataTable && (
                    <Box component="table" sx={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        mt: 2,
                        ...createAccessibilityTable()
                    }}>
                        <Box component="thead" sx={{
                            borderBottom: '2px solid',
                            borderColor: 'divider'
                        }}>
                            <Box component="tr">
                                {accessibility.dataTable.headers.map((header, i) => (
                                    <Box component="th" key={i} sx={{
                                        p: 1,
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }}>{header}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box component="tbody">
                            {accessibility.dataTable.rows.map((row, i) => (
                                <Box component="tr" key={i} sx={{
                                    '&:nth-of-type(even)': {
                                        bgcolor: 'action.selected'
                                    }
                                }}>
                                    {row.map((cell, j) => (
                                        <Box component="td" key={j} sx={{
                                            p: 1,
                                            borderTop: '1px solid',
                                            borderColor: 'divider'
                                        }}>{cell}</Box>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );

    return (
        <Paper elevation={4} sx={createLessonCard('success.main')(theme)}>
            <Typography variant="h4" component="h2" sx={createLessonTitle('success.dark')(theme)}>
                <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1, color: 'inherit' }} /> {title}
            </Typography>
            {renderCoreVisualization()}
            {accessibility && renderAccessibilityTable()}
        </Paper>
    );
};

export default TimelineVisualization;
