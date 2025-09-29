// src/pages/lessons/PronunciationPage.jsx

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { pronunciationData } from '../../data/pronunciationData.js';
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';
import DetailCard from '../../components/DetailCard';

// --- Helper Components (Header) remains outside ---
const Header = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      American English Pronunciation Guide
    </Typography>
  </Box>
);

// --- Main Page Component ---
const PronunciationPage = () => {
  const theme = useTheme();

  useEffect(() => { document.title = 'Pronunciation Guide | ESL Lessons'; }, []);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  // --- Core Helper Functions ---
  const renderPracticeWords = (practiceWords, theme) => {
    if (!practiceWords) return '';

    if (practiceWords.pairs) {
      const pairsHtml = practiceWords.pairs.map((pair, index) => `
        <div style="display: flex; justify-content: center; align-items: center; margin: 2px 0;">
          <span style="min-width: 80px; text-align: right; padding-right: 4px; color: ${theme.palette.text.primary}">${pair.word1}</span>
          <em style="color: ${theme.palette.secondary.main}; font-weight: bold; padding: 0 4px;">vs.</em>
          <span style="min-width: 80px; text-align: left; padding-left: 4px; color: ${theme.palette.text.primary}">${pair.word2}</span>
        </div>
      `).join('');

      return `
        <div>
          <h6 style="margin-top: 8px; margin-bottom: 4px; color: ${theme.palette.text.primary}">Practice Words:</h6>
          <div style="text-align: center;">
            ${pairsHtml}
          </div>
        </div>
      `;
    }

    if (practiceWords.voiceless || practiceWords.voiced) {
      let html = '<div style="margin-top: 8px;">';
      if (practiceWords.voiceless) {
        html += `<p style="color: ${theme.palette.text.secondary}"><strong>Voiceless ${practiceWords.voiceless.sound}:</strong> ${practiceWords.voiceless.words}</p>`;
      }
      if (practiceWords.voiced) {
        html += `<p style="color: ${theme.palette.text.secondary}"><strong>Voiced ${practiceWords.voiced.sound}:</strong> ${practiceWords.voiced.words}</p>`;
      }
      html += '</div>';
      return html;
    }

    return `<p style="margin-top: 8px; color: ${theme.palette.text.secondary}">${Array.isArray(practiceWords) ? practiceWords.join(', ') : practiceWords}</p>`;
  };

  // --- Renderer for Vowels/Consonants (Main Tabs) ---
  const pronunciationDetailRenderer = (item, theme) => {
    if (!item) return null;
    const { importance, howTo, practiceWords, videos } = item;

    const howToElements = Array.isArray(howTo)
      ? howTo.map((step, index) => `<p>${step}</p>`).join('')
      : howTo ? `<p>${howTo}</p>` : '';

    const practiceWordsElement = renderPracticeWords(practiceWords, theme);

    const videoElements = videos && videos.length > 0 ? `
      <div style="text-align: center; margin-top: 16px; padding-top: 8px; border-top: 1px solid ${theme.palette.divider}">
        <p style="font-size: 0.9em; font-style: italic; opacity: 0.8; margin-bottom: 8px; color: ${theme.palette.text.secondary}">
          Note: Each lesson is followed by a short practice video.
        </p>
        ${videos.map((video, index) => `
          <div style="margin-bottom: 8px;">
            <h6 style="margin-bottom: 4px; color: ${theme.palette.text.primary}">${video.title}</h6>
            <a href="${video.url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; padding: 12px 24px; background-color: ${theme.palette.primary.main}; color: ${theme.palette.primary.contrastText}; text-decoration: none; border-radius: 8px; font-weight: 500; font-family: Roboto, sans-serif; transition: transform 0.2s ease-in-out;">
              <svg fill="currentColor" style="margin-right: 8px" focusable="false" aria-hidden="true" viewBox="0 0 24 24" height="24" width="24">
                <path d="M10 16.5v-9l6 4.5z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Watch on YouTube
            </a>
          </div>
        `).join('')}
      </div>
    ` : '';

    const htmlContent = `
      <div>
        <h6 style="margin-top: 8px; margin-bottom: 4px; color: ${theme.palette.text.primary}">Why it's important:</h6>
        <p style="color: ${theme.palette.text.secondary}; margin-bottom: 8px;">${importance || ''}</p>

        ${howTo ? `
          <h6 style="margin-top: 8px; margin-bottom: 4px; color: ${theme.palette.text.primary}">How to Make the Sound:</h6>
          ${howToElements}
        ` : ''}

        ${practiceWordsElement}

        ${videoElements}
      </div>
    `;

    return <DetailCard content={htmlContent} />;
  };
  
  // --- NEW Renderer for Practice Techniques (Tab 3) ---
  const techniquesDetailRenderer = (item, theme) => {
      // The 'importance' property in the data file is actually a list of <li> strings.
      // We render them as HTML list items.
      const listItems = item.importance.map((liItem, index) =>
        `<li style="margin-bottom: 4px; color: ${theme.palette.text.secondary}">${liItem}</li>`
      ).join('');

      const htmlContent = `
        <div>
          <h6 style="font-weight: bold; margin-bottom: 8px; color: ${theme.palette.text.primary}">${item.title}:</h6>
          <ul style="list-style-type: none; padding-left: 0;">
            ${listItems}
          </ul>
        </div>
      `;

      return <DetailCard content={htmlContent} />;
  }
  // --- End of helper function definitions ---

  const sections = ["Vowels", "Consonants", "Rhythm", "Techniques"];
  const dataMap = [
    { name: "Vowel Sounds", data: pronunciationData.vowels, renderer: pronunciationDetailRenderer },
    { name: "Consonant Sounds", data: pronunciationData.consonants, renderer: pronunciationDetailRenderer },
    { name: "Rhythm and Melody", data: pronunciationData.rhythm, renderer: pronunciationDetailRenderer },
    { name: "Practice Techniques", data: pronunciationData.techniques, renderer: techniquesDetailRenderer }, // Use the new renderer
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header />
      <LessonTabs
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        sections={sections}
      />

      <Box sx={{ mt: 4 }}>
        <ContentSelector
          key={sections[activeTab]}
          sectionData={dataMap[activeTab].data}
          title={dataMap[activeTab].name}
          description=""
          detailRenderer={(item) => dataMap[activeTab].renderer(item, theme)} // Dynamically select the renderer and pass theme
          preserveOrder={true}
        />
      </Box>
    </Container>
  );
};

export default PronunciationPage;