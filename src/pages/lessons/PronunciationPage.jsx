// src/pages/lessons/PronunciationPage.jsx

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { pronunciationData } from '../../data/pronunciationData.js';
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';

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
  const secondaryColor = theme.palette.secondary.main;

  useEffect(() => { document.title = 'Pronunciation Guide | ESL Lessons'; }, []);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  // --- Core Helper Functions ---
  const renderPracticeWords = (practiceWords, theme) => {
    if (!practiceWords) return '';
    let content = `<h4 style="margin-top: 1.5em; margin-bottom: 0.5em; color: ${theme.palette.text.primary};">Practice Words:</h4>`;
    if (practiceWords.pairs) {
      const pairsHtml = practiceWords.pairs.map(p => `
        <div style="display: flex; justify-content: center; align-items: center; margin: 0.25em 0;">
          <span style="min-width: 80px; text-align: right; padding-right: 0.5em; color: ${theme.palette.text.primary};">${p.word1}</span>
          <em style="color: ${theme.palette.secondary.main}; font-weight: bold; padding: 0 0.5em;">vs.</em>
          <span style="min-width: 80px; text-align: left; padding-left: 0.5em; color: ${theme.palette.text.primary};">${p.word2}</span>
        </div>`).join('');
      return content + `<div style="text-align: center;">${pairsHtml}</div>`;
    }
    if (practiceWords.voiceless || practiceWords.voiced) {
      if (practiceWords.voiceless) content += `<p style="color: ${theme.palette.text.secondary};"><strong>Voiceless ${practiceWords.voiceless.sound}:</strong> ${practiceWords.voiceless.words}</p>`;
      if (practiceWords.voiced) content += `<p style="color: ${theme.palette.text.secondary};"><strong>Voiced ${practiceWords.voiced.sound}:</strong> ${practiceWords.voiced.words}</p>`;
      return content;
    }
    return content + `<p style="color: ${theme.palette.text.secondary};">${Array.isArray(practiceWords) ? practiceWords.join(', ') : practiceWords}</p>`;
  };

  // --- Renderer for Vowels/Consonants (Main Tabs) ---
  const pronunciationDetailRenderer = (item, theme) => {
    if (!item) return '';
    const { sounds, importance, howTo, practiceWords, videos } = item;
    const howToHtml = Array.isArray(howTo) ? howTo.map(step => `<p style="color: ${theme.palette.text.secondary};">${step}</p>`).join('') : `<p style="color: ${theme.palette.text.secondary};">${howTo || ''}</p>`;

    const textContent = `
      <h4 style="margin-top: 1.5em; margin-bottom: 0.5em; color: ${theme.palette.text.primary};">Why it's important:</h4>
      <p style="margin-top:0; color: ${theme.palette.text.secondary};">${importance || ''}</p>
      ${howTo ? `<h4 style="margin-top: 1.5em; margin-bottom: 0.5em; color: ${theme.palette.text.primary};">How to Make the Sound:</h4>${howToHtml}` : ''}
      ${renderPracticeWords(practiceWords, theme)}
    `;

    const videoLinkContent = (videos && videos.length > 0) ? `
      <div style="text-align: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid ${theme.palette.divider};">
        <p style="font-size: 0.9em; font-style: italic; opacity: 0.8; margin-top: 0; margin-bottom: 1rem; color: ${theme.palette.text.secondary};">Note: Each lesson is followed by a short practice video.</p>
        ${videos.map(video => `
          <div style="margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: ${theme.palette.text.primary};">${video.title}</h4>
            <a href="${video.url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; padding: 8px 22px; background-color: ${theme.palette.primary.main}; color: ${theme.palette.primary.contrastText}; text-decoration: none; border-radius: 8px; font-weight: 500; font-family: Roboto, sans-serif; transition: transform 0.2s ease-in-out;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <svg fill="currentColor" style="margin-right: 8px;" focusable="false" aria-hidden="true" viewBox="0 0 24 24" height="24" width="24"><path d="M10 16.5v-9l6 4.5z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
              Watch on YouTube
            </a>
          </div>
        `).join('')}
      </div>
    ` : '';

    return `<div>${textContent}${videoLinkContent}</div>`;
  };
  
  // --- NEW Renderer for Practice Techniques (Tab 3) ---
  const techniquesDetailRenderer = (item) => {
      // The 'importance' property in the data file is actually a list of <li> strings.
      // We wrap it in a <ul> tag and join the elements without using a comma separator.
      const listItems = item.importance.join('');
      
      return `
        <h4 style="font-weight: bold; margin-bottom: 1em;">${item.title}:</h4>
        <ul style="list-style-type: none; padding: 0;">${listItems}</ul>
      `;
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
          detailRenderer={dataMap[activeTab].renderer} // Dynamically select the renderer
          preserveOrder={true}
        />
      </Box>
    </Container>
  );
};

export default PronunciationPage;