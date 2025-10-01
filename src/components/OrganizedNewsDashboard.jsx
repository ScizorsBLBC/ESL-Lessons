// src/components/OrganizedNewsDashboard.jsx
import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  organizeArticlesByLevelAndTopic,
  sortArticlesByDate,
  getTopicStatsForLevel
} from '../utils/articles.js';
import { searchUtils } from '../utils/searchUtils';
import NewsFilters from './NewsFilters';
import NewsList from './NewsList';

const OrganizedNewsDashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState(0); // 0 means "Show All"
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedTopic, setSelectedTopic] = useState('all');

  // Get organized data
  const organizedData = useMemo(() => organizeArticlesByLevelAndTopic(), []);
  const levelStats = useMemo(() => {
    if (selectedLevel === 0) {
      // Show All - combine stats from all levels
      const allStats = {
        totalArticles: 0,
        topics: {}
      };

      // Combine articles from all levels and deduplicate
      const allArticles = [
        ...(organizedData[1]?.articles || []),
        ...(organizedData[3]?.articles || []),
        ...(organizedData[6]?.articles || [])
      ];

      // Remove duplicates by slug for accurate counting
      const seen = new Set();
      const uniqueArticles = allArticles.filter(article => {
        if (seen.has(article.slug)) {
          return false;
        }
        seen.add(article.slug);
        return true;
      });

      allStats.totalArticles = uniqueArticles.length;

      // Count unique articles by topic across all levels
      uniqueArticles.forEach(article => {
        if (article.topic) {
          if (!allStats.topics[article.topic]) {
            allStats.topics[article.topic] = {
              name: article.topic,
              count: 0
            };
          }
          allStats.topics[article.topic].count++;
        }
      });

      return allStats;
    } else {
      return getTopicStatsForLevel(selectedLevel);
    }
  }, [organizedData, selectedLevel]);

  // Filter and sort articles based on current selections
  const filteredArticles = useMemo(() => {
    let articles = [];

    // Get articles based on selected level
    if (selectedLevel === 0) {
      // Show All - combine articles from all levels, but deduplicate by slug
      const allArticles = [
        ...(organizedData[1]?.articles || []),
        ...(organizedData[3]?.articles || []),
        ...(organizedData[6]?.articles || [])
      ];

      // Remove duplicates by slug (keep first occurrence)
      const seen = new Set();
      articles = allArticles.filter(article => {
        if (seen.has(article.slug)) {
          return false;
        }
        seen.add(article.slug);
        return true;
      });
    } else {
      articles = organizedData[selectedLevel]?.articles || [];
    }

    // Apply advanced search filter
    if (searchQuery.trim()) {
      articles = searchUtils.searchArticles(searchQuery, articles, {
        fields: ['headline', 'slug', 'content'],
        minScore: 0.1
      });
    }

    // Apply topic filter
    if (selectedTopic !== 'all') {
      articles = articles.filter(article => article.topic === selectedTopic);
    }

    // Apply sorting
    if (sortOrder === 'newest') {
      articles = sortArticlesByDate(articles, true);
    } else if (sortOrder === 'oldest') {
      articles = sortArticlesByDate(articles, false);
    }

    return articles;
  }, [organizedData, selectedLevel, searchQuery, selectedTopic, sortOrder]);

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setSelectedLevel(newLevel);
    setSelectedTopic('all'); // Reset topic filter when changing levels
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(0); // Reset to "Show All"
    setSelectedTopic('all');
    setSortOrder('newest');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom color="primary.main">
          📚 News Articles
        </Typography>

        <NewsFilters
          selectedLevel={selectedLevel}
          searchQuery={searchQuery}
          sortOrder={sortOrder}
          selectedTopic={selectedTopic}
          onLevelChange={handleLevelChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onTopicChange={handleTopicChange}
          onClearFilters={clearFilters}
          organizedData={organizedData}
          levelStats={levelStats}
          searchResultsCount={filteredArticles.length}
        />
      </Paper>

      <NewsList
        articles={filteredArticles}
        selectedTopic={selectedTopic}
        levelStats={levelStats}
      />
    </Box>
  );
};


export default OrganizedNewsDashboard;
