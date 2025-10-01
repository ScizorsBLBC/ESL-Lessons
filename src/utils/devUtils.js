// src/utils/devUtils.js
// Development-only utilities for admin tools

/**
 * Check if we're in development environment
 * @returns {boolean} True if in development
 */
export const isDevelopment = () => {
  return import.meta.env.DEV && window.location.hostname === 'localhost';
};

/**
 * Check if we're in production
 * @returns {boolean} True if in production
 */
export const isProduction = () => {
  return !isDevelopment();
};

/**
 * Development-only component wrapper
 * Only renders children in development environment
 */
export const DevOnly = ({ children }) => {
  if (!isDevelopment()) {
    return null;
  }
  return children;
};
