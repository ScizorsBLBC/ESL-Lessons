require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS for Netlify deployment
app.use(cors({
  origin: ['https://esl-lessons.scizors.wtf', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// DeepL Translation API Proxy
app.post('/api/translate', async (req, res) => {
  const { text, target_lang } = req.body;

  if (!text || !target_lang) {
    return res.status(400).json({ error: 'Missing required fields: text and target_lang' });
  }

  try {
    const deeplApiKey = process.env.DEEPL_API_KEY;
    if (!deeplApiKey) {
      return res.status(500).json({ error: 'DeepL API key not configured' });
    }

    const response = await axios.post('https://api-free.deepl.com/v2/translate', {
      text: [text],
      target_lang: target_lang,
    }, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${deeplApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling DeepL API:', error.response?.data || error.message);

    if (error.response?.status === 429) {
      res.status(429).json({ error: 'Translation quota exceeded. Please try again later.' });
    } else if (error.response?.status === 403) {
      res.status(403).json({ error: 'Invalid API key or unauthorized request.' });
    } else {
      res.status(500).json({ error: 'Translation service temporarily unavailable.' });
    }
  }
});

// Text-to-Speech API Proxy
app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Missing required field: text' });
  }

  try {
    const googleApiKey = process.env.GOOGLE_TTS_API_KEY;
    if (!googleApiKey) {
      return res.status(500).json({ error: 'Google TTS API key not configured' });
    }

    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleApiKey}`,
      {
        input: { text: text },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Standard-J', // A clear, natural-sounding male voice
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.85, // Slower for ESL learners
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error calling Google TTS API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Text-to-speech service temporarily unavailable.' });
  }
});

// Article Management API (Development Only)
app.post('/api/articles/save', async (req, res) => {
  // Only allow in development
  if (process.env.NODE_ENV === 'production' || req.headers.origin !== 'http://localhost:5173') {
    return res.status(403).json({ error: 'Article management only available in development' });
  }

  const { articleData, mode, fileLocation = 'newsData.js' } = req.body;

  if (!articleData) {
    return res.status(400).json({ error: 'Article data is required' });
  }

  try {
    const projectRoot = path.resolve(__dirname, '..'); // Go up one level from server directory to project root
    const newsDataPath = path.join(projectRoot, 'src', 'data', fileLocation);

    // Read current newsData.js
    let newsDataContent = fs.readFileSync(newsDataPath, 'utf8');

    // Helper function to escape JavaScript strings
    const escapeJsString = (str) => {
      if (!str) return '';
      return str
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/"/g, '\\"')    // Escape double quotes
        .replace(/\n/g, '\\n')   // Escape newlines
        .replace(/\r/g, '\\r')   // Escape carriage returns
        .replace(/\t/g, '\\t');  // Escape tabs
    };

    let newId; // Declare newId variable that will be used for both create and update modes

    if (mode === 'update' && articleData.id) {
      // Update existing article - use a more reliable method to find article boundaries
      const idSearchTerm = `id: '${articleData.id}'`;
      const idIndex = newsDataContent.indexOf(idSearchTerm);

      if (idIndex === -1) {
        return res.status(404).json({ error: 'Article not found in newsData.js' });
      }

      // Find the article start by looking for the pattern: },\n  {\n    id: 'recXXX'
      const beforeIdIndex = newsDataContent.lastIndexOf('},', idIndex);
      const afterBraceIndex = newsDataContent.indexOf('{', beforeIdIndex);

      if (beforeIdIndex === -1 || afterBraceIndex === -1) {
        return res.status(404).json({ error: 'Could not find article boundaries' });
      }

      const startIndex = afterBraceIndex; // Start at the opening brace
      const articlePattern = /{\s*id: '[^']+',\s*fields: {[\s\S]*?}\s*},?/;
      const match = newsDataContent.substring(startIndex).match(articlePattern);

      if (!match) {
        return res.status(404).json({ error: 'Could not match article structure' });
      }

      const articleToReplace = match[0];

      if (!articleToReplace) {
        return res.status(500).json({ error: 'Could not determine article boundaries for replacement' });
      }

      // Parse the article structure and update only the field values
      // This approach ensures we maintain exact structure while updating content
      const lines = articleToReplace.split('\n');
      const updatedLines = lines.map(line => {
        // Update Headline
        if (line.includes('"Headline"')) {
          return `      "Headline": "${escapeJsString(articleData.headline)}",`;
        }
        // Update Slug
        if (line.includes('"Slug"')) {
          return `      "Slug": "${articleData.slug}",`;
        }
        // Update Image URL
        if (line.includes('"Image URL"')) {
          return `      "Image URL": "${articleData.imageUrl}",`;
        }
        // Update Date Written
        if (line.includes('"Date Written"')) {
          return `      "Date Written": "${articleData.dateWritten}"`;
        }
        // Update Level 1 fields
        if (line.includes('"Level 1 Text"')) {
          return `      "Level 1 Text": "${escapeJsString(articleData.level1Text)}",`;
        }
        if (line.includes('"Level 1 Questions"')) {
          return `      "Level 1 Questions": "${escapeJsString(articleData.level1Questions)}",`;
        }
        if (line.includes('"Level 1 Instruction"')) {
          return `      "Level 1 Instruction": "${articleData.level1Text && articleData.level1Text.length > 0 ? escapeJsString('Write a full-sentence answer for each question below.') : ''}",`;
        }
        // Update Level 3 fields
        if (line.includes('"Level 3 Text"')) {
          return `      "Level 3 Text": "${escapeJsString(articleData.level3Text)}",`;
        }
        if (line.includes('"Level 3 Questions"')) {
          return `      "Level 3 Questions": "${escapeJsString(articleData.level3Questions)}",`;
        }
        if (line.includes('"Level 3 Instruction"')) {
          return `      "Level 3 Instruction": "${articleData.level3Text && articleData.level3Text.length > 0 ? escapeJsString('Write a full-sentence answer for each question below.') : ''}",`;
        }
        // Update Level 6 fields
        if (line.includes('"Level 6 Text"')) {
          return `      "Level 6 Text": "${escapeJsString(articleData.level6Text)}",`;
        }
        if (line.includes('"Level 6 Questions"')) {
          return `      "Level 6 Questions": "${escapeJsString(articleData.level6Questions)}",`;
        }
        if (line.includes('"Level 6 Instruction"')) {
          return `      "Level 6 Instruction": "${articleData.level6Text && articleData.level6Text.length > 0 ? escapeJsString('Write a full-sentence answer for each question below.') : ''}",`;
        }
        if (line.includes('"Level 6 Writing Prompt"')) {
          return `      "Level 6 Writing Prompt": "${articleData.level6WritingPrompt && articleData.level6WritingPrompt.trim().length > 0 ? `Free Writing\n${escapeJsString(articleData.level6WritingPrompt.trim())}` : ''}",`;
        }
        return line;
      });

      const updatedArticle = updatedLines.join('\n');

      newsDataContent = newsDataContent.replace(articleToReplace, updatedArticle);

    } else if (mode === 'create') {
      // Create new article
      // Generate a sequential ID by finding the highest existing ID number and incrementing it
      const idPattern = /id: 'rec(\d+)'/g;
      let match;
      let highestNumber = 0;

      // Find all existing ID numbers, but only consider sequential ones (not random bug-generated ones)
      const existingIds = [];
      idPattern.lastIndex = 0; // Reset regex for global search
      while ((match = idPattern.exec(newsDataContent)) !== null) {
        const number = parseInt(match[1], 10);
        // Only consider sequential IDs (rec001-rec059 range) to avoid random bug-generated IDs
        if (number >= 1 && number <= 100) { // Reasonable range for sequential IDs
          existingIds.push(number);
          if (number > highestNumber) {
            highestNumber = number;
          }
        }
      }

      // Generate the next sequential ID
      const nextNumber = highestNumber + 1;
      const newId = `rec${String(nextNumber).padStart(3, '0')}`;


      const newArticle = `  {
    id: '${newId}',
    fields: {
      "Headline": "${escapeJsString(articleData.headline)}",
      "Slug": "${articleData.slug}",
      "Image URL": "${articleData.imageUrl}",
      "Level 0 Text": "",
      "Level 0 Questions": "",
      "Level 1 Text": "${escapeJsString(articleData.level1Text)}",
      "Level 1 Questions": "${escapeJsString(articleData.level1Questions)}",
      "Level 1 Instruction": "${articleData.level1Text && articleData.level1Text.length > 0 ? escapeJsString('Write a full-sentence answer for each question below.') : ''}",
      "Level 2 Text": "",
      "Level 2 Questions": "",
      "Level 3 Text": "${escapeJsString(articleData.level3Text)}",
      "Level 3 Questions": "${escapeJsString(articleData.level3Questions)}",
      "Level 3 Instruction": "${articleData.level3Text && articleData.level3Text.length > 0 ? escapeJsString('Write a full-sentence answer for each question below.') : ''}",
      "Level 4 Text": "",
      "Level 4 Questions": "",
      "Level 5 Text": "",
      "Level 5 Questions": "",
      "Level 6 Text": "${escapeJsString(articleData.level6Text)}",
      "Level 6 Questions": "${escapeJsString(articleData.level6Questions)}",
      "Level 6 Instruction": "${articleData.level6Text && articleData.level6Text.length > 0 ? escapeJsString('Write a full-sentence answer for each question below.') : ''}",
      "Level 6 Writing Prompt": "${articleData.level6WritingPrompt && articleData.level6WritingPrompt.trim().length > 0 ? `Free Writing\n${escapeJsString(articleData.level6WritingPrompt.trim())}` : ''}",
      "Date Written": "${articleData.dateWritten}"
    }
  }`;

      // Add before the closing bracket of the array
      newsDataContent = newsDataContent.replace(/\s*\];\s*$/, `,\n${newArticle}\n];`);
    }

    // Write back to file
    fs.writeFileSync(newsDataPath, newsDataContent, 'utf8');

    // Also update articleTopics.js if topic is specified
    if (articleData.topic && articleData.slug) {
      try {
        const topicsPath = path.join(projectRoot, 'src', 'data', 'articleTopics.js');
        let topicsContent = fs.readFileSync(topicsPath, 'utf8');

        // Add topic mapping if not already present
        if (!topicsContent.includes(`'${articleData.slug}': '${articleData.topic}'`)) {
          topicsContent = topicsContent.replace(
            /\s+\}\s*$/,
            `\n  '${articleData.slug}': '${articleData.topic}',\n};\n`
          );
          fs.writeFileSync(topicsPath, topicsContent, 'utf8');
        }
      } catch (topicError) {
        console.warn('Could not update articleTopics.js:', topicError.message);
      }
    }

    res.json({
      success: true,
      message: `Article ${mode === 'update' ? 'updated' : 'created'} successfully`,
      id: mode === 'create' ? newId : articleData.id,
      requiresReload: true
    });

  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Failed to save article: ' + error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'ESL Lessons BFF Proxy'
  });
});

// Error handling middleware
app.use((error, req, res) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 ESL Lessons API server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Translation API: http://localhost:${PORT}/api/translate`);
});
