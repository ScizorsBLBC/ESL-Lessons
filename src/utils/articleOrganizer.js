// src/utils/articleOrganizer.js
// Utilities for organizing news articles by level, topic, and date

import { getNewsList } from './dataAccess.js';
import { getArticleTopic, getAllTopics } from '../data/articleTopics.js';

/**
 * Organize articles by level and topic
 * @returns {Object} Organized articles structure
 */
export const organizeArticlesByLevelAndTopic = () => {
  const articles = getNewsList();
  const organized = {
    1: { articles: [], topics: {} },
    3: { articles: [], topics: {} },
    6: { articles: [], topics: {} }
  };

  articles.forEach(article => {
    // Check each level
    [1, 3, 6].forEach(level => {
      const levelText = article.fields[`Level ${level} Text`];
      if (levelText && levelText.trim()) {
        const topic = getArticleTopic(article.fields.Slug);

        organized[level].articles.push({
          id: article.id,
          slug: article.fields.Slug,
          headline: article.fields.Headline,
          content: levelText, // Include article content for searching
          topic: topic,
          publishedDate: article.fields['Date Written']
            ? new Date(`${article.fields['Date Written']}T00:00:00`)
            : new Date(),
          availableLevels: getAvailableLevels(article.fields)
        });

        // Group by topic within level
        if (topic) {
          if (!organized[level].topics[topic]) {
            organized[level].topics[topic] = [];
          }
          organized[level].topics[topic].push(article.fields.Slug);
        }
      }
    });
  });

  return organized;
};

/**
 * Get available levels for an article
 * @param {Object} fields - Article fields
 * @returns {Array} Array of available level numbers
 */
const getAvailableLevels = (fields) => {
  const levels = [];
  [1, 3, 6].forEach(level => {
    if (fields[`Level ${level} Text`] && fields[`Level ${level} Text`].trim()) {
      levels.push(level);
    }
  });
  return levels;
};

/**
 * Sort articles by date (newest first)
 * @param {Array} articles - Articles to sort
 * @returns {Array} Sorted articles
 */
export const sortArticlesByDate = (articles, newestFirst = true) => {
  return [...articles].sort((a, b) => {
    const dateA = new Date(a.publishedDate);
    const dateB = new Date(b.publishedDate);
    return newestFirst ? dateB - dateA : dateA - dateB;
  });
};

/**
 * Filter articles by topic
 * @param {Array} articles - Articles to filter
 * @param {string} topic - Topic key to filter by
 * @returns {Array} Filtered articles
 */
export const filterArticlesByTopic = (articles, topic) => {
  return articles.filter(article => article.topic === topic);
};

/**
 * Get topic statistics for a level
 * @param {number} level - Level number
 * @returns {Object} Topic statistics
 */
export const getTopicStatsForLevel = (level) => {
  const organized = organizeArticlesByLevelAndTopic();
  const levelData = organized[level];

  if (!levelData) return { totalArticles: 0, topics: {} };

  const topics = getAllTopics();
  const stats = {
    totalArticles: levelData.articles.length,
    topics: {}
  };

  topics.forEach(topic => {
    const topicArticles = levelData.topics[topic.key] || [];
    if (topicArticles.length > 0) {
      stats.topics[topic.key] = {
        name: topic.name,
        icon: topic.icon,
        count: topicArticles.length,
        articles: topicArticles
      };
    }
  });

  return stats;
};

/**
 * Search articles by keyword in headline and content
 * @param {string} query - Search query
 * @param {number} level - Optional level filter
 * @returns {Array} Matching articles
 */
export const searchArticles = (query, level = null) => {
  const organized = organizeArticlesByLevelAndTopic();
  let articles = [];

  if (level) {
    articles = organized[level]?.articles || [];
  } else {
    // Get all articles from all levels
    [1, 3, 6].forEach(l => {
      articles = articles.concat(organized[l]?.articles || []);
    });
  }

  if (!query.trim()) return articles;

  const searchTerm = query.toLowerCase();
  return articles.filter(article => {
    // Search in headline
    const headlineMatch = article.headline.toLowerCase().includes(searchTerm);

    // Search in article content
    const contentMatch = article.content && article.content.toLowerCase().includes(searchTerm);

    // Return true if either headline or content matches
    return headlineMatch || contentMatch;
  });
};
