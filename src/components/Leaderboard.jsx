import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch the leaderboard data from a backend API
        const fetchLeaderboard = async () => {
            try {
                // --- Placeholder: Replace this URL with your actual backend API endpoint ---
                // For a real-world app, this would be a GET request to a server
                // that returns the theme counts from a database.
                const response = await fetch('/api/themes/leaderboard');
                const data = await response.json();
                
                // Sort the data by score in descending order
                const sortedData = Object.entries(data)
                    .map(([theme, score]) => ({ theme, score }))
                    .sort((a, b) => b.score - a.score);

                setLeaderboardData(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch leaderboard data:", error);
                setLoading(false);
            }
        };

        // Fetch the data once the component mounts and then refresh every minute
        fetchLeaderboard();
        const intervalId = setInterval(fetchLeaderboard, 60000);

        // Cleanup function to prevent memory leaks
        return () => clearInterval(intervalId);
    }, []);

    // A simple loading state for user experience
    if (loading) {
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">Loading Leaderboard...</Typography>
            </Box>
        );
    }
    
    return (
        <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 400, mx: 'auto' }}>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h3" color="text.primary">
                    🏆 Global Theme Leaderboard
                </Typography>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Theme</TableCell>
                        <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaderboardData.map((row) => (
                        <TableRow key={row.theme}>
                            <TableCell sx={{ color: (theme) => theme.palette.text.primary }}>{row.theme}</TableCell>
                            <TableCell align="right" sx={{ color: (theme) => theme.palette.text.primary }}>{row.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Leaderboard;