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

  return (
    <Layout>
      <LessonHeader title={title} subtitle={subtitle} />

      <LessonTabs
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        sections={["Introduction", "Workplace Verbs", "Full Vocabulary", "Practice & Assess"]}
      />

      <Box sx={{ mt: 4 }}>
        {content.map(block => (
          <Box key={block.blockId} sx={{ mb: 4 }}>
            <ContentBlockRenderer block={block} />
          </Box>
        ))}
      </Box>
    </Layout>
  );
}