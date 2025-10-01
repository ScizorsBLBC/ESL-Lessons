// src/utils/dataAccess.js
// Simple synchronous data access utilities for static content

// Re-export from consolidated articles utility for backward compatibility
export {
  getNewsList,
  getNewsArticle,
  getNewsArticlesForLevel,
  getNewsArticleForLevel,
  transformArticleToCanonicalSchema
} from './articles.js';
