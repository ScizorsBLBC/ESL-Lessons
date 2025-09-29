// src/pages/lessons/PhrasalVerbs.jsx

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/Layout';
import LessonHeader from '../../components/LessonHeader';
import LessonTabs from '../../components/LessonTabs';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import { phrasalVerbData } from '../../data/phrasalVerbData.js';

export default function PhrasalVerbs() {
  console.log('PhrasalVerbs component rendered');

  useEffect(() => {
    console.log('Setting document title');
    document.title = 'Phrasal Verbs | ESL Lessons';
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const { title, subtitle, content } = phrasalVerbData;
  console.log('PhrasalVerbs data loaded:', { title, subtitle, contentLength: content?.length });

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
    const filtered = content.filter(block => currentFilters.includes(block.blockId));

    console.log('Tab', activeTab, 'filters:', currentFilters);
    console.log('Filtered content length:', filtered.length);
    console.log('First few filtered blocks:', filtered.slice(0, 2));

    return filtered;
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

      <Box sx={{ mt: 4 }}>
        {/* Debug info */}
        <Box sx={{ mb: 4, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}>
          <p>Debug: Active tab: {activeTab}</p>
          <p>Debug: Filtered content length: {filteredContent.length}</p>
          <p>Debug: Total content length: {content?.length}</p>
        </Box>

        {/* Simple test content */}
        <Box sx={{ p: 4, backgroundColor: 'background.paper', borderRadius: 2, mb: 4 }}>
          <h2>Test Content</h2>
          <p>This is a simple test to see if content renders at all.</p>
        </Box>

        {filteredContent.length > 0 ? (
          filteredContent.map(block => (
            <Box key={block.blockId} sx={{ mb: 4 }}>
              <ContentBlockRenderer contentBlocks={[block]} />
            </Box>
          ))
        ) : (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            <p>No content found for this tab. Check console for debugging info.</p>
          </Box>
        )}
      </Box>
    </Layout>
  );
}