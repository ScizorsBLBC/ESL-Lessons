import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { createLessonCard, createLessonTitle, createAccessibilityTable } from '../utils/stylingUtils';

/**
 * Component to display a Chart (Bar, Pie, or Line).
 * Updated to use the canonical data and accessibility props from the schema.
 * This remains a structural placeholder, actual chart library implementation (e.g., Recharts) is omitted.
 *
 * @param {object} props
 * @param {object} props.data - The data object conforming to the chart schema.
 * @param {object} [props.accessibility] - The accessibility object.
 * @returns {JSX.Element}
 */
const ChartSection = ({ data, accessibility }) => {
    // Handle both schema format and cultural data format
    const { title, chartType, labels, datasets, data: chartData, xAxisLabel, yAxisLabel, descriptionHtml } = data;

    // If we have cultural data format, transform it to schema format
    const processedData = datasets ? { labels, datasets } : {
        labels: chartData?.map(item => item.country || item.label) || [],
        datasets: [{
            label: yAxisLabel || 'Value',
            data: chartData?.map(item => item.score || item.value) || []
        }]
    };

    // --- Placeholder Visualization Rendering ---
    const renderPlaceholderVisualization = () => (
        <Box sx={{
            mt: 3,
            p: 3,
            border: '2px dashed',
            borderColor: 'warning.main',
            borderRadius: 2
        }}>
            <Typography variant="subtitle1" gutterBottom sx={{
                color: 'warning.main'
            }}>
                <BarChartIcon sx={{
                    verticalAlign: 'middle',
                    mr: 1
                }} /> Chart Visualization ({chartType} - Mock Data)
            </Typography>
            <Typography variant="body2" sx={{
                color: 'text.secondary',
                mb: 2
            }}>
                **Visualization Data Structure Preview:** This area will render an interactive {chartType} chart.
            </Typography>
            {descriptionHtml && (
                <Typography variant="body2" sx={{ mb: 2 }}>
                    <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                </Typography>
            )}
            <Box sx={{
                maxHeight: 250,
                overflowY: 'auto'
            }}>
                {processedData.datasets.map((dataset, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{
                            fontWeight: 'bold'
                        }}>{dataset.label}</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            mt: 1
                        }}>
                            {processedData.labels.map((label, i) => (
                                <Paper key={i} sx={{
                                    p: 1,
                                    bgcolor: 'warning.light',
                                    color: 'warning.contrastText'
                                }}>
                                    {label}: **{dataset.data[i] || 0}**
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
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
                    <Typography variant="caption" display="block">
                         Data Table available with {accessibility.dataTable.headers.length} columns and {accessibility.dataTable.rows.length} rows.
                    </Typography>
                )}
            </Paper>
        </Box>
    );


    return (
        <Paper elevation={4} sx={createLessonCard('warning.main')}>
            <Typography variant="h4" component="h2" sx={createLessonTitle('warning.dark')}>
                Chart: {title}
            </Typography>
            {renderPlaceholderVisualization()}
            {accessibility && renderAccessibilityTable()}
        </Paper>
    );
};

export default ChartSection;
