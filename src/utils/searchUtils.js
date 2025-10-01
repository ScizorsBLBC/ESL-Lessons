// src/utils/searchUtils.js
// Advanced search utility functions

/**
 * Tokenize a string into searchable terms
 * @param {string} text - Text to tokenize
 * @returns {string[]} Array of tokens
 */
export const tokenize = (text) => {
  if (!text) return [];
  return text
    .toLowerCase()
    .split(/[\s\-_.]+/)
    .filter(token => token.length > 0);
};

/**
 * Calculate fuzzy match score between search term and text
 * @param {string} searchTerm - Search term
 * @param {string} text - Text to search in
 * @returns {number} Match score (0-1, higher is better)
 */
export const fuzzyMatch = (searchTerm, text) => {
  if (!searchTerm || !text) return 0;

  const searchLower = searchTerm.toLowerCase();
  const textLower = text.toLowerCase();

  // Exact match gets highest score
  if (textLower === searchLower) return 1;

  // Starts with search term gets high score
  if (textLower.startsWith(searchLower)) return 0.9;

  // Contains search term gets good score
  if (textLower.includes(searchLower)) return 0.8;

  // Fuzzy matching - check if all tokens are present
  const searchTokens = tokenize(searchLower);
  const textTokens = tokenize(textLower);

  let matches = 0;
  for (const token of searchTokens) {
    if (textTokens.some(textToken => textToken.includes(token) || token.includes(textToken))) {
      matches++;
    }
  }

  return matches / searchTokens.length;
};

/**
 * Search articles with advanced algorithm
 * @param {string} query - Search query
 * @param {Array} articles - Articles to search
 * @param {Object} options - Search options
 * @returns {Array} Filtered and scored articles
 */
export const searchArticles = (query, articles, options = {}) => {
  if (!query || !query.trim()) return articles;

  const searchTerm = query.trim().toLowerCase();
  const { fields = ['headline', 'slug', 'content'], minScore = 0.1 } = options;

  return articles
    .map(article => {
      let bestScore = 0;
      let matchedField = '';

      for (const field of fields) {
        const fieldValue = article[field] || '';
        const score = fuzzyMatch(searchTerm, fieldValue);
        if (score > bestScore) {
          bestScore = score;
          matchedField = field;
        }
      }

      return {
        ...article,
        searchScore: bestScore,
        matchedField
      };
    })
    .filter(article => article.searchScore >= minScore)
    .sort((a, b) => b.searchScore - a.searchScore); // Sort by relevance
};

// Export searchUtils object for backward compatibility
export const searchUtils = {
  tokenize,
  fuzzyMatch,
  searchArticles
};
