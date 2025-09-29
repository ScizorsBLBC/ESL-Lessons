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

  // For now, show all content. We can add tab filtering later if needed
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
        <ContentBlockRenderer contentBlocks={content} />
      </Box>
    </Layout>
  );
}