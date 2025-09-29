// src/pages/lessons/PhrasalVerbs.jsx

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/Layout';
import LessonHeader from '../../components/LessonHeader';
import LessonTabs from '../../components/LessonTabs';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import { phrasalVerbData } from '../../data/phrasalVerbData.js';

export default function PhrasalVerbs() {
  useEffect(() => {
    document.title = 'Phrasal Verbs | ESL Lessons';
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const { title, subtitle, content } = phrasalVerbData;

  // Filter content based on active tab
  const getFilteredContent = () => {
    switch (activeTab) {
      case 0: // Introduction
        return content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes('intro');
        });
      case 1: // Workplace Verbs
        return content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes('workplace');
        });
      case 2: // Full Vocabulary
        return content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes('communication') ||
          blockId.includes('socializing') ||
          blockId.includes('business') ||
          blockId.includes('travel') ||
          blockId.includes('action') ||
          blockId.includes('thinking') ||
          blockId.includes('problems') ||
          blockId.includes('daily') ||
          blockId.includes('finance') ||
          blockId.includes('general');
        });
      case 3: // Practice & Assess
        return content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes('assessment') ||
                 blockId.includes('gap-fill') ||
                 blockId.includes('quiz') ||
                 blockId.includes('flashcard') ||
                 blockId.includes('practice') ||
                 blockId.includes('homework');
        });
      default:
        return content;
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <Layout>
      <LessonHeader title={title} subtitle={subtitle} />

      <LessonTabs
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        sections={["Introduction", "Workplace Verbs", "Full Vocabulary", "Practice & Assess"]}
      />

      <Box sx={{
        mt: 4,
        p: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        minHeight: '200px'
      }}>
        <ContentBlockRenderer contentBlocks={filteredContent} />
      </Box>
    </Layout>
  );
}