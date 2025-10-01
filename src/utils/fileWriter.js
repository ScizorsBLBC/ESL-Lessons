// src/utils/fileWriter.js
// Utility for writing article data to newsData.js file

import { newsData } from '../data/newsData.js';

/**
 * Writes article data to the newsData.js file
 * @param {object} articleData - The article data to save
 * @param {boolean} isNew - Whether this is a new article or an update
 * @returns {Promise<string>} Status message
 */
export const writeArticleToFile = async (articleData, isNew = false) => {
  try {
    // In a real application, this would use Node.js fs module or a backend API
    // For now, we'll simulate the file writing and return the JavaScript code
    // that should be copied to newsData.js

    const jsCode = generateArticleJSCode(articleData, isNew);

    // In development, we could use a backend endpoint to write files
    // For now, return the code that needs to be manually added
    return {
      success: true,
      message: `✅ Article ${isNew ? 'created' : 'updated'} successfully!\n\n📋 JavaScript code generated for newsData.js:\n\n${jsCode}\n\n📝 Please copy this code and add it to the newsData array in src/data/newsData.js`,
      jsCode: jsCode
    };

  } catch (error) {
    return {
      success: false,
      message: `❌ Error ${isNew ? 'creating' : 'updating'} article: ${error.message}`
    };
  }
};

/**
 * Generates JavaScript code for an article entry in newsData.js format
 * @param {object} data - Article data
 * @param {boolean} isNew - Whether this is a new article
 * @returns {string} JavaScript code string
 */
const generateArticleJSCode = (data, isNew) => {
  const id = data.id || `rec${String(newsData.length + 1).padStart(3, '0')}`;

  // Escape quotes in string values
  const escapeQuotes = (str) => str ? str.replace(/"/g, '\\"') : '';

  return `  {
    id: '${id}',
    fields: {
      "Headline": "${escapeQuotes(data.headline)}",
      "Slug": "${data.slug}",
      "Image URL": "${data.imageUrl || ''}",
      "Date Written": "${data.dateWritten}",
      "Level 0 Text": "",
      "Level 0 Questions": "",
      "Level 1 Text": "${escapeQuotes(data.level1Text)}",
      "Level 1 Questions": "${escapeQuotes(data.level1Questions)}",
      "Level 1 Instruction": "${escapeQuotes(data.level1Instruction)}",
      "Level 2 Text": "",
      "Level 2 Questions": "",
      "Level 3 Text": "${escapeQuotes(data.level3Text)}",
      "Level 3 Questions": "${escapeQuotes(data.level3Questions)}",
      "Level 3 Instruction": "${escapeQuotes(data.level3Instruction)}",
      "Level 4 Text": "",
      "Level 4 Questions": "",
      "Level 5 Text": "",
      "Level 5 Questions": "",
      "Level 6 Text": "${escapeQuotes(data.level6Text)}",
      "Level 6 Questions": "${escapeQuotes(data.level6Questions)}",
      "Level 6 Instruction": "${escapeQuotes(data.level6Instruction)}",
      "Level 6 Writing Prompt": "${escapeQuotes(data.level6WritingPrompt)}"
    }
  }`;
};

/**
 * Validates article data before saving
 * @param {object} data - Article data to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validateArticleData = (data) => {
  const errors = [];

  if (!data.headline || data.headline.trim() === '') {
    errors.push('Headline is required');
  }

  if (!data.slug || data.slug.trim() === '') {
    errors.push('Slug is required');
  }

  if (!data.dateWritten) {
    errors.push('Date Written is required');
  }

  // Validate slug format (no spaces, lowercase, hyphens only)
  if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
