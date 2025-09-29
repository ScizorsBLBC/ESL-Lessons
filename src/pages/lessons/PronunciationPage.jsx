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
    if (!practiceWords) return null;

    if (practiceWords.pairs) {
      return (
        <Box>
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'text.primary' }}>
            Practice Words:
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            {practiceWords.pairs.map((pair, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  my: 0.5
                }}
              >
                <Typography sx={{ minWidth: 80, textAlign: 'right', pr: 1, color: 'text.primary' }}>
                  {pair.word1}
                </Typography>
                <Typography
                  component="em"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 'bold',
                    px: 1
                  }}
                >
                  vs.
                </Typography>
                <Typography sx={{ minWidth: 80, textAlign: 'left', pl: 1, color: 'text.primary' }}>
                  {pair.word2}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      );
    }

    if (practiceWords.voiceless || practiceWords.voiced) {
      return (
        <Box sx={{ mt: 2 }}>
          {practiceWords.voiceless && (
            <Typography sx={{ color: 'text.secondary' }}>
              <strong>Voiceless {practiceWords.voiceless.sound}:</strong> {practiceWords.voiceless.words}
            </Typography>
          )}
          {practiceWords.voiced && (
            <Typography sx={{ color: 'text.secondary' }}>
              <strong>Voiced {practiceWords.voiced.sound}:</strong> {practiceWords.voiced.words}
            </Typography>
          )}
        </Box>
      );
    }

    return (
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        {Array.isArray(practiceWords) ? practiceWords.join(', ') : practiceWords}
      </Typography>
    );
  };

  // --- Renderer for Vowels/Consonants (Main Tabs) ---
  const pronunciationDetailRenderer = (item, theme) => {
    if (!item) return null;
    const { sounds, importance, howTo, practiceWords, videos } = item;

    const howToElements = Array.isArray(howTo)
      ? howTo.map((step, index) => (
          <Typography key={index} sx={{ color: 'text.secondary', mb: 1 }}>
            {step}
          </Typography>
        ))
      : howTo ? (
          <Typography sx={{ color: 'text.secondary', mb: 1 }}>
            {howTo}
          </Typography>
        ) : null;

    const practiceWordsElement = renderPracticeWords(practiceWords, theme);

    const videoElements = videos && videos.length > 0 ? (
      <Box sx={{
        textAlign: 'center',
        mt: 4,
        pt: 2,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Typography sx={{
          fontSize: '0.9em',
          fontStyle: 'italic',
          opacity: 0.8,
          mb: 2,
          color: 'text.secondary'
        }}>
          Note: Each lesson is followed by a short practice video.
        </Typography>
        {videos.map((video, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
              {video.title}
            </Typography>
            <Box
              component="a"
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                py: 1,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                textDecoration: 'none',
                borderRadius: 2,
                fontWeight: 500,
                fontFamily: 'Roboto, sans-serif',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <svg
                fill="currentColor"
                style={{ marginRight: 8 }}
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <path d="M10 16.5v-9l6 4.5z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Watch on YouTube
            </Box>
          </Box>
        ))}
      </Box>
    ) : null;

    return (
      <Box>
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'text.primary' }}>
          Why it's important:
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          {importance || ''}
        </Typography>

        {howTo && (
          <>
            <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'text.primary' }}>
              How to Make the Sound:
            </Typography>
            {howToElements}
          </>
        )}

        {practiceWordsElement}

        {videoElements}
      </Box>
    );
  };
  
  // --- NEW Renderer for Practice Techniques (Tab 3) ---
  const techniquesDetailRenderer = (item, theme) => {
      // The 'importance' property in the data file is actually a list of <li> strings.
      // We render them as individual Typography components without bullet points.
      const listItems = item.importance.map((liItem, index) => (
        <Typography key={index} sx={{ mb: 1, color: 'text.secondary' }}>
          {liItem}
        </Typography>
      ));

      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
            {item.title}:
          </Typography>
          <Box sx={{ listStyleType: 'none', pl: 0 }}>
            {listItems}
          </Box>
        </Box>
      );
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