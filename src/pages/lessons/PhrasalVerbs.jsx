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
    const tabFilters = {
      0: ["intro-text", "intro-comparison"], // Introduction
      1: ["workplace-section", "workplace-list"], // Workplace Verbs
      2: [
        "vocabulary-section", "communication-vocab", "socializing-vocab",
        "business-vocab", "travel-vocab", "action-vocab", "thinking-vocab",
        "problems-vocab", "daily-vocab", "finance-vocab", "general-vocab"
      ], // Full Vocabulary
      3: [
        "assessment-gap-fill", "assessment-quiz", "assessment-flashcard",
        "assessment-practice", "assessment-homework"
      ] // Practice & Assess
    };

    const currentFilters = tabFilters[activeTab] || [];
    return content.filter(block => currentFilters.includes(block.blockId));
  };

  return (
    <Layout>
      <LessonHeader title={title} subtitle={subtitle} />

      <LessonTabs
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        sections={["Introduction", "Workplace Verbs", "Full Vocabulary", "Practice & Assess"]}
      />

      <Box sx={{ mt: 4 }}>
        {getFilteredContent().map(block => (
          <Box key={block.blockId} sx={{ mb: 4 }}>
            <ContentBlockRenderer block={block} />
          </Box>
        ))}
      </Box>
    </Layout>
  );
}