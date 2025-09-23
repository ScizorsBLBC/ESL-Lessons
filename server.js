import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper for ES Modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Define the path to our persistent data file
const leaderboardFilePath = path.join(__dirname, 'leaderboard.json');

// Middleware to parse JSON bodies and allow cross-origin requests from your frontend
app.use(express.json());
app.use(cors());

// POST endpoint to log a theme adoption event
app.post('/api/themes/log', async (req, res) => {
    const { theme } = req.body;
    if (theme) {
        try {
            // Read the current leaderboard data from the file
            const data = await fs.readFile(leaderboardFilePath, 'utf8');
            const themeLeaderboard = JSON.parse(data);

            // Increment the score for the selected theme
            themeLeaderboard[theme] = (themeLeaderboard[theme] || 0) + 1;
            
            // Write the updated leaderboard back to the file
            await fs.writeFile(leaderboardFilePath, JSON.stringify(themeLeaderboard, null, 2), 'utf8');

            console.log(`Theme logged: ${theme}`);
            res.status(200).send({ message: 'Theme logged successfully' });
        } catch (error) {
            console.error("Error logging theme:", error);
            res.status(500).send({ message: 'Failed to log theme' });
        }
    } else {
        res.status(400).send({ message: 'Theme not provided' });
    }
});

// GET endpoint to retrieve the current leaderboard
app.get('/api/themes/leaderboard', async (req, res) => {
    try {
        const data = await fs.readFile(leaderboardFilePath, 'utf8');
        const themeLeaderboard = JSON.parse(data);
        res.status(200).json(themeLeaderboard);
    } catch (error) {
        // If the file doesn't exist, return an empty object
        if (error.code === 'ENOENT') {
            return res.status(200).json({});
        }
        console.error("Error retrieving leaderboard:", error);
        res.status(500).send({ message: 'Failed to retrieve leaderboard' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
});