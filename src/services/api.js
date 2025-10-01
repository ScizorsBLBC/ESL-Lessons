// src/services/api.js
import axios from 'axios';

// Create axios instance with base configuration
// Use direct backend URL in development, proxy in production
const isDevelopment = process.env.NODE_ENV === 'development';
const api = axios.create({
  baseURL: isDevelopment ? 'http://localhost:3001/api' : '/api',
  timeout: 10000,
});

/**
 * Save an article (create or update)
 * @param {object} articleData - The article data to save
 * @param {string} mode - 'create' or 'update'
 * @param {string} fileLocation - The file location to save to (e.g., 'newsData.js')
 * @returns {Promise<object>} API response
 */
export const saveArticle = async (articleData, mode, fileLocation = 'newsData.js') => {
  try {
    const response = await api.post('/articles/save', {
      articleData,
      mode,
      fileLocation
    });
    return response.data;
  } catch (error) {
    console.error('API Error saving article:', error);
    throw new Error(error.response?.data?.error || 'Failed to save article');
  }
};

/**
 * Test API connectivity
 * @returns {Promise<object>} API health response
 */
export const checkApiHealth = async () => {
  try {
    const response = await axios.get('http://localhost:3001/health');
    return response.data;
  } catch (error) {
    console.error('API Health check failed:', error);
    throw new Error('API server is not running');
  }
};
