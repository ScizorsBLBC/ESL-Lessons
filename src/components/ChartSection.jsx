import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Grid, Card, Fade } from '@mui/material';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import DetailCard from './DetailCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartSection({ data, title, description, tables = [] }) {
    const theme = useTheme();
    
    // FIX: Ensure 'data' is always treated as an array.
    // This handles cases where the data prop might not be an array, preventing crashes.
    const dataArray = useMemo(() => Array.isArray(data) ? data : [], [data]);

    const reversedData = useMemo(() => [...dataArray].reverse(), [dataArray]);
    const [selectedItem, setSelectedItem] = useState(null);
    const chartRef = useRef();

    // Effect to set the initial selected item once data is available
    useEffect(() => {
        if (reversedData.length > 0) {
            setSelectedItem(reversedData[0]);
        }
    }, [reversedData]);


    const chartData = useMemo(() => ({
        labels: reversedData.map(item => item.name),
        datasets: [{
            label: 'Score',
            data: reversedData.map(item => item.score),
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.primary.main,
            borderWidth: 1,
            hoverBackgroundColor: theme.palette.secondary.light,
        }],
    }), [reversedData, theme]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: { callbacks: { label: (context) => `${context.label}: ${context.parsed.x}` } }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 10,
                ticks: { color: theme.palette.text.secondary },
                grid: { color: theme.palette.divider },
            },
            y: {
                ticks: {
                    autoSkip: false,
                    color: theme.palette.text.primary,
                },
                grid: { display: false },
                // Enhanced bar thickness for better readability and selection
                // For horizontal bars (indexAxis: 'y'), this controls bar height
                // For vertical bars (indexAxis: 'x'), this would control bar width
                barThickness: 50,  // Enhanced height for better readability and selection
                minBarLength: 44,  // Maintain minimum 44px for accessibility compliance
            }
        }
    }), [theme]);

    const onClick = (event) => {
        if (!chartRef.current) return;
        const element = getElementAtEvent(chartRef.current, event);
        if (element.length > 0) {
            const { index } = element[0];
            setSelectedItem(reversedData[index]);
        }
    };

    return (
        <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>{title}</Typography>
                <Typography>{description}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{
                    display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                    gap: 4, minHeight: { xs: 'auto', md: '500px' }, alignItems: 'stretch'
                }}>
                    <Card sx={{
                        flexGrow: 1, flexShrink: 0,
                        minHeight: { xs: '450px', md: 'auto' },  // Increased for taller bars
                        maxHeight: { xs: '75vh', md: 'auto' },  // Allow scrolling on mobile if chart is tall
                        overflow: { xs: 'auto', md: 'visible' },  // Enable scrolling when needed for many bars
                        p: 2,
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Bar ref={chartRef} options={chartOptions} data={chartData} onClick={onClick} />
                    </Card>
                    <Box sx={{
                        flexBasis: { xs: 'auto', md: '45%' },
                        flexGrow: 1,
                        flexShrink: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,  // Allow proper sizing
                        maxHeight: { md: '500px' },  // Match parent on desktop
                        overflow: { xs: 'visible', md: 'auto' }  // Allow content to expand on mobile
                    }}>
                        <Fade in={!!selectedItem} key={selectedItem?.name || 'empty'} style={{ flex: 1 }}>
                           {selectedItem ? <DetailCard content={selectedItem.details} /> : <Box />}
                        </Fade>
                    </Box>
                </Box>
            </Grid>
            {tables.map((table, index) => (
                <Grid item xs={12} key={index}>{table}</Grid>
            ))}
        </Grid>
    );
};