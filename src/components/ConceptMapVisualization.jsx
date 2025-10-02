import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline'; // Using a placeholder icon
import { createLessonCard, createLessonTitle, createAccessibilityTable } from '../utils/stylingUtils';

/**
 * Component to display a Concept Map, visualizing relationships between abstract ideas.
 * This is a highly simplified, structural placeholder component.
 *
 * @param {object} props
 * @param {object} props.data - The data object conforming to the conceptMap schema.
 * @param {object} [props.accessibility] - The accessibility object.
 * @returns {JSX.Element}
 */
const ConceptMapVisualization = ({ data, accessibility }) => {
    const { title, nodes, links } = data;

    // --- Placeholder Visualization Rendering ---
    // In a final implementation, this section would render an SVG or D3/React Flow diagram
    // to visually connect the nodes based on the links array.
    // For now, we display the structured data clearly to the user.
    const renderPlaceholderVisualization = () => (
        <Box sx={{
            mt: 3,
            p: 3,
            border: '2px dashed',
            borderColor: 'secondary.main',
            borderRadius: 2
        }}>
            <Typography variant="subtitle1" gutterBottom sx={{
                color: 'secondary.main'
            }}>
                <TimelineIcon sx={{
                    verticalAlign: 'middle',
                    mr: 1
                }} /> Conceptual Map Visualization (In Development)
            </Typography>
            <Typography variant="body2" sx={{
                color: 'text.secondary',
                mb: 2
            }}>
                **Visualization Data Structure Preview:** This area will render an interactive concept map showing nodes and their links.
            </Typography>
            <Grid container spacing={2}>
                {nodes.slice(0, 3).map((node) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={node.id}>
                        <Paper elevation={3} sx={{
                            p: 2,
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            height: '100%'
                        }}>
                            <Typography variant="body1"><strong>{node.label}</strong></Typography>
                            <Typography variant="caption">{node.description.substring(0, 50)}...</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {nodes.length > 3 && (
                 <Typography variant="caption" sx={{
                     mt: 1,
                     display: 'block'
                 }}>
                    ... and {nodes.length - 3} more concepts.
                </Typography>
            )}
        </Box>
    );
    // --- End Placeholder Visualization Rendering ---

    const renderAccessibilityTable = () => (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{
                color: 'text.secondary',
                mb: 1
            }}>Accessibility & Data Table</Typography>
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
                <Typography variant="body2" sx={{
                    fontStyle: 'italic',
                    mb: 2
                }}>
                    **Long Description:** {accessibility.longDescription}
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
        <Paper elevation={4} sx={createLessonCard('secondary.main')}>
            <Typography variant="h4" component="h2" sx={createLessonTitle('secondary.dark')}>
                Concept Map: {title}
            </Typography>
            {renderPlaceholderVisualization()}
            {accessibility && renderAccessibilityTable()}
        </Paper>
    );
};

export default ConceptMapVisualization;
