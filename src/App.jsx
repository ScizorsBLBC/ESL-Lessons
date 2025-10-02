/**
 * ESL Lessons Hub - Main Application Component
 *
 * This is the root component that establishes the entire application architecture.
 * It implements a centralized routing system with a hierarchical component structure
 * that ensures consistent layout and theming across all pages.
 *
 * Architecture Overview:
 * - Single Layout wrapper for all routes (consistent navigation/footer)
 * - Dynamic lesson route generation from centralized configuration
 * - RESTful URL patterns for different content types
 * - Theme provider integration through Layout component
 *
 * Routing Strategy:
 * - Static routes for main pages (/, /about, /contact)
 * - Dynamic routes for content with URL parameters (news/:slug/:level)
 * - Lesson routes generated from lessonRoutes configuration
 * - Teacher dashboard accessible via obfuscated path (teacher-portal-231340)
 *
 * @component
 * @returns {JSX.Element} The complete application with routing and layout
 *
 * @example
 * ```jsx
 * // App renders the entire application within Layout wrapper
 * <Routes>
 *   <Route path="/" element={<Layout />}>
 *     <Route index element={<HomePage />} />
 *     <Route path="about" element={<AboutPage />} />
 *     // ... dynamic lesson routes generated from lessonRoutes array
 *   </Route>
 * </Routes>
 */

// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Components
import Layout from './components/Layout';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import NewsArticlePage from './pages/lessons/NewsArticlePage';
import VocabularyPage from './pages/lessons/VocabularyPage';
import IdiomPage from './pages/lessons/IdiomPage';

// Import the lesson routes (FIX: Capitalized filename)
import { lessonRoutes } from './LessonRoutes.jsx';

/**
 * Teacher dashboard access path
 * Uses obfuscated URL to restrict access to development/teacher interface
 * @constant {string}
 */
const DASHBOARD_PATH = 'teacher-portal-231340';

/**
 * Main Application Component
 *
 * This component serves as the root of the entire ESL Lessons Hub application.
 * It establishes the routing architecture and provides the structural foundation
 * for all pages and lessons.
 *
 * Key Responsibilities:
 * - Route configuration and management
 * - Layout wrapper for consistent UI structure
 * - Dynamic lesson route generation
 * - Theme provider integration
 * - Navigation state management
 *
 * @function App
 * @returns {JSX.Element} Complete application with routing and layout structure
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*
         * MAIN APPLICATION PAGES
         * These routes provide the core navigation structure for the application
         */}

        {/**
         * Home Page Route
         * Landing page showcasing available lessons and features
         * @route /
         */}
        <Route index element={<HomePage />} />

        {/**
         * About Page Route
         * Information about the ESL Lessons Hub platform and methodology
         * @route /about
         */}
        <Route path="about" element={<AboutPage />} />

        {/**
         * Contact Page Route
         * Contact information and support details
         * @route /contact
         */}
        <Route path="contact" element={<ContactPage />} />

        {/*
         * DYNAMIC CONTENT ROUTES
         * These routes handle parameterized content with URL-based data loading
         */}

        {/**
         * Teacher Dashboard Route (Obfuscated Access)
         * Development and teacher interface for content management
         * Uses obfuscated path for security (teacher-portal-231340)
         * @route /teacher-portal-231340
         */}
        <Route path={DASHBOARD_PATH} element={<DashboardPage />} />

        {/**
         * News Article Route with Parameters
         * Displays news articles based on slug and difficulty level
         * URL pattern: /news/article-slug/level-number
         * @route /news/:slug/:level
         * @param {string} slug - Article identifier from URL
         * @param {string} level - Difficulty level (1, 3, or 6)
         */}
        <Route path="news/:slug/:level" element={<NewsArticlePage />} />

        {/**
         * Vocabulary Lesson Route with Parameters
         * Displays vocabulary lessons with specific lesson IDs
         * URL pattern: /vocabulary/lesson-id
         * @route /vocabulary/:lessonId
         * @param {string} lessonId - Vocabulary lesson identifier
         */}
        <Route path="vocabulary/:lessonId" element={<VocabularyPage />} />

        {/**
         * Idioms Lesson Route with Parameters
         * Displays idiom lessons with specific lesson IDs
         * URL pattern: /idioms/lesson-id
         * @route /idioms/:lessonId
         * @param {string} lessonId - Idiom lesson identifier
         */}
        <Route path="idioms/:lessonId" element={<IdiomPage />} />

        {/*
         * DYNAMICALLY GENERATED LESSON ROUTES
         * Routes generated from centralized lesson configuration array
         * This pattern allows easy lesson addition without touching routing code
         */}

        {/**
         * Lesson Routes Generation
         * Dynamically creates routes for all lessons defined in lessonRoutes array
         * Each lesson gets its own URL path based on the route configuration
         *
         * Route Generation Pattern:
         * - lessonRoutes array defines available lessons
         * - Each entry contains path, name, and component
         * - Routes are generated at runtime for flexibility
         * - Easy to add new lessons by updating the array
         *
         * @example Adding a new lesson:
         * lessonRoutes.push({
         *   path: 'new-lesson-type',
         *   name: 'New Lesson Type',
         *   component: <NewLessonPage />
         * })
         */}
        {lessonRoutes.map(route => (
            <Route key={route.path} path={route.path} element={<route.component key={route.path} />} />
        ))}
      </Route>
    </Routes>
  );
}