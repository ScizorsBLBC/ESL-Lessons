// src/components/NewsList.jsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
} from '@mui/material';
import GlassButtonWrapper from './GlassButtonWrapper';

const NewsList = ({ articles, selectedTopic, levelStats }) => {
  if (articles.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 1 }}>
        <Typography variant="h6" color="text.secondary">
          No articles found matching your criteria.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search terms or filters.
        </Typography>
      </Paper>
    );
  }

  if (selectedTopic === 'all') {
    return <AllArticlesSection articles={articles} />;
  }

  return (
    <>
      {Object.entries(levelStats.topics).map(([topicKey, topic]) => {
        const topicArticles = articles.filter(article => article.topic === topicKey);

        if (topicArticles.length === 0) return null;

        return (
          <TopicSection
            key={topicKey}
            topic={topic}
            articles={topicArticles}
          />
        );
      })}
    </>
  );
};

const AllArticlesSection = ({ articles }) => {
  const createShareLink = (slug, level) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/news/${slug}/${level}`;
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          📚 All Articles
        </Typography>
        <Chip
          label={`${articles.length} articles`}
          size="small"
        />
      </Box>

      <Stack spacing={2}>
        {articles.map((article) => (
          <Paper
            key={article.slug}
            sx={{ p: 2 }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {article.headline}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Published: {article.publishedDate.toLocaleDateString()}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {article.availableLevels.map((level) => (
                <GlassButtonWrapper key={level}>
                  <Button
                    component="a"
                    href={createShareLink(article.slug, level)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                  >
                    Level {level}
                  </Button>
                </GlassButtonWrapper>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

const TopicSection = ({ topic, articles }) => {
  const createShareLink = (slug, level) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/news/${slug}/${level}`;
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {topic.icon} {topic.name}
        </Typography>
        <Chip
          label={`${articles.length} articles`}
          size="small"
        />
      </Box>

      <Stack spacing={2}>
        {articles.map((article) => (
          <Paper
            key={article.slug}
            sx={{ p: 2 }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {article.headline}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Published: {article.publishedDate.toLocaleDateString()}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {article.availableLevels.map((level) => (
                <GlassButtonWrapper key={level}>
                  <Button
                    component="a"
                    href={createShareLink(article.slug, level)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                  >
                    Level {level}
                  </Button>
                </GlassButtonWrapper>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

export default NewsList;
