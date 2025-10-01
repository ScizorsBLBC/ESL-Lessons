// src/utils/articles.js
// Consolidated article utilities - simplified and streamlined

import { newsData } from '../data/newsData.js';
import { getArticleTopic, getAllTopics } from '../data/articleTopics.js';

/**
 * Get all news articles in simplified format
 * @returns {Array} Array of all news articles
 */
export const getNewsList = () => newsData;

/**
 * Get a single news article by slug
 * @param {string} slug - The article slug
 * @returns {Object|null} The article object or null if not found
 */
export const getNewsArticle = (slug) =>
  newsData.find(article => article.fields.Slug === slug) || null;

/**
 * Get all articles for a specific level in canonical schema format
 * @param {number} level - The difficulty level (1, 3, or 6)
 * @returns {Array} Array of articles in canonical schema format
 */
export const getNewsArticlesForLevel = (level) =>
  newsData
    .filter(article => article.fields[`Level ${level} Text`] && article.fields[`Level ${level} Text`].trim())
    .map(article => transformArticleToCanonicalSchema(article, level));

/**
 * Get a specific article and level in canonical schema format
 * @param {string} slug - The article slug
 * @param {number} level - The difficulty level (1, 3, or 6)
 * @returns {Object|null} Article in canonical schema format or null if not found
 */
export const getNewsArticleForLevel = (slug, level) => {
  const article = newsData.find(article => article.fields.Slug === slug);
  return article ? transformArticleToCanonicalSchema(article, level) : null;
};

/**
 * Transform article to canonical schema format
 * @param {Object} article - Raw article from newsData
 * @param {number} level - Level to transform for
 * @returns {Object} Article in canonical schema format
 */
export const transformArticleToCanonicalSchema = (article, level) => {
  const levelText = article.fields[`Level ${level} Text`];
  if (!levelText || !levelText.trim()) return null;

  const contentBlocks = [];

  // Main article content block (left pane)
  // First unescape \n strings back to actual newlines, then normalize paragraph breaks
  let unescapedText = levelText.replace(/\\n/g, '\n');

  // For levels 3 and 6, remove the headline if it appears at the beginning of the body text
  if (level === 3 || level === 6) {
    const headline = article.fields.Headline;
    const firstLine = unescapedText.split('\n')[0].trim();

    // If the first line matches the headline, remove it
    if (firstLine === headline) {
      unescapedText = unescapedText.substring(unescapedText.indexOf('\n') + 1).trim();
    }
  }

  // Normalize paragraph breaks: ensure all paragraph breaks are \n\n for consistent spacing
  // Split by newlines, filter out empty lines, and join with \n\n
  const lines = unescapedText.split('\n').filter(line => line.trim().length > 0);
  const normalizedText = lines.join('\n\n');

  contentBlocks.push({
    blockId: `${article.fields.Slug}-content`,
    type: 'text',
    data: {
      htmlContent: normalizedText.replace(/\n/g, '<br>')
    }
  });

  // Level 1, 3, and 6 have additional sections in the right pane
  if (level === 1 || level === 3 || level === 6) {
    const questions = article.fields[`Level ${level} Questions`];
    const instruction = article.fields[`Level ${level} Instruction`];
    const writingPrompt = article.fields[`Level ${level} Writing Prompt`];

    let exercisesContent = '';

    // Add questions section
    if (questions && questions.trim()) {
      const unescapedQuestions = questions.replace(/\\n/g, '\n');
      const formattedQuestions = unescapedQuestions.replace(/\n/g, '<br>');
      exercisesContent += `
<div class="homework-email">
  <h3 style="margin-top: 0; color: inherit; text-align: center;">Comprehension Questions:</h3>
  <p style="margin-bottom: 1.5rem; color: inherit; text-align: center;"><strong>Write a full-sentence answer for each question below.</strong></p>
  <div style="text-align: left; display: inline-block; max-width: 600px;">
    ${formattedQuestions.split('<br>').map(q => `<p style="margin-bottom: 1rem; color: inherit; text-align: left;">${q}</p>`).join('')}
  </div>
</div>`;
    }

    // Add instruction section (only if it's not the standard "Write a full sentence..." text that's already in questions)
    const normalizedInstruction = instruction.trim().toLowerCase().replace(/[-\s]/g, ' ');
    if (instruction && instruction.trim() && !normalizedInstruction.includes("write a full sentence answer for each question below")) {
      const unescapedInstruction = instruction.replace(/\\n/g, '\n');
      const formattedInstruction = unescapedInstruction.replace(/\n/g, '<br>');
      exercisesContent += `

<div class="homework-email">
  <p style="color: inherit; text-align: center; font-weight: bold;">${formattedInstruction}</p>
</div>`;
    }

    // Add writing prompt section
    if (writingPrompt && writingPrompt.trim()) {
      const unescapedWritingPrompt = writingPrompt.replace(/\\n/g, '\n');
      const formattedWritingPrompt = unescapedWritingPrompt.replace(/\n/g, '<br>');
      const lines = formattedWritingPrompt.split('<br>');
      const firstLine = lines[0].trim();

      exercisesContent += `

<div class="homework-email">
  ${firstLine.toLowerCase().includes('free writing') ?
    `<p style="margin-top: 0; margin-bottom: 1rem; color: inherit; text-align: center; font-size: 1.2em; font-weight: bold;">${firstLine}</p>` :
    `<h3 style="margin-top: 0; color: inherit; text-align: center;">Free Writing</h3>`
  }
  <div style="text-align: left; display: inline-block; max-width: 600px;">
    ${lines.slice(firstLine.toLowerCase().includes('free writing') ? 1 : 0).map(line => `<p style="margin-bottom: 0.5rem; color: inherit; text-align: left;">${line}</p>`).join('')}
  </div>
</div>`;
    }

    // Add exercises block to right pane (only if there's content)
    if (exercisesContent.trim()) {
      contentBlocks.push({
        blockId: `${article.fields.Slug}-exercises`,
        type: 'text',
        data: {
          htmlContent: exercisesContent
        }
      });
    }
  }

  return {
    lessonId: article.fields.Slug,
    title: article.fields.Headline,
    subtitle: `Level ${level} Article`,
    content: contentBlocks
  };
};

// getAllTopics is already imported from '../data/articleTopics.js'

// getArticleTopic is already imported from '../data/articleTopics.js'

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
 * Organize articles by level and topic - simplified version
 * @returns {Object} Organized articles structure
 */
export const organizeArticlesByLevelAndTopic = () => {
  const organized = {
    1: { articles: [], topics: {} },
    3: { articles: [], topics: {} },
    6: { articles: [], topics: {} }
  };

  newsData.forEach(article => {
    // Check each level
    [1, 3, 6].forEach(level => {
      const levelText = article.fields[`Level ${level} Text`];
      if (levelText && levelText.trim()) {
        const topic = getArticleTopic(article.fields.Slug);

        const articleData = {
          id: article.id,
          slug: article.fields.Slug,
          headline: article.fields.Headline,
          content: levelText,
          topic: topic,
          publishedDate: article.fields['Date Written']
            ? new Date(`${article.fields['Date Written']}T00:00:00`)
            : new Date(),
          availableLevels: getAvailableLevels(article.fields)
        };

        organized[level].articles.push(articleData);

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
 * Sort articles by date
 * @param {Array} articles - Articles to sort
 * @param {boolean} newestFirst - Sort newest first if true, oldest first if false
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
    const headlineMatch = article.headline.toLowerCase().includes(searchTerm);
    const contentMatch = article.content && article.content.toLowerCase().includes(searchTerm);
    return headlineMatch || contentMatch;
  });
};
