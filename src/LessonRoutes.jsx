/**
 * ESL Lessons Hub - Centralized Lesson Route Configuration
 *
 * This file implements a declarative lesson routing system that provides:
 * - Centralized lesson management and organization
 * - Consistent URL patterns for all lesson types
 * - Easy lesson addition/removal without touching routing logic
 * - Separation of concerns between routing and lesson content
 *
 * Architecture Pattern:
 * Each lesson follows the pattern: { path, name, component }
 * - path: URL-friendly identifier (kebab-case)
 * - name: Human-readable lesson title
 * - component: React component that renders the lesson
 *
 * Benefits:
 * - Single source of truth for lesson availability
 * - Easy to add new lessons by just adding array entries
 * - URL structure remains consistent across lesson types
 * - Lesson organization can be easily modified
 *
 * @fileoverview Lesson route definitions and organization
 * @example
 * ```jsx
 * // Adding a new lesson type:
 * export const lessonRoutes = [
 *   ...existingRoutes,
 *   {
 *     path: 'new-lesson-type',
 *     name: 'New Lesson Type',
 *     component: <NewLessonPage />
 *   }
 * ];
 * ```
 */

import PronunciationPage from './pages/lessons/PronunciationPage';
import GlobalBusinessCultures from './pages/lessons/GlobalBusinessCultures';
import EnglishVerbTenses from './pages/lessons/EnglishVerbTenses';
import EnglishPrepositions from './pages/lessons/EnglishPrepositions';
import PhrasalVerbs from './pages/lessons/PhrasalVerbs';
import CatCulture from './pages/lessons/CatCulture';

/**
 * Centralized lesson route configuration
 *
 * This array defines all available lessons in the application using a declarative
 * pattern that separates lesson content from routing logic. Each lesson entry
 * contains the URL path, display name, and the React component that renders it.
 *
 * Route Generation Strategy:
 * - Static routes for main application pages
 * - Dynamic lesson routes generated from this configuration
 * - Consistent URL patterns across all lesson types
 * - Easy lesson management through array manipulation
 *
 * @type {Array<{path: string, name: string, component: React.Component}>}
 * @example
 * ```jsx
 * // In App.jsx, these routes are dynamically generated:
 * lessonRoutes.map(route => (
 *   <Route key={route.path} path={route.path} element={route.component} />
 * ))
 * ```
 */
export const lessonRoutes = [
    // ============================================================================
    // PRONUNCIATION AND LANGUAGE SKILLS LESSONS
    // ============================================================================

    // Pronunciation Guide Lesson - Interactive pronunciation lessons with audio support and visual aids
    // Route: /pronunciation
    { path: 'pronunciation', name: 'Pronunciation Guide', component: PronunciationPage },

    // ============================================================================
    // BUSINESS AND PROFESSIONAL COMMUNICATION LESSONS
    // ============================================================================

    // Global Business Cultures Lesson - Professional communication across different cultural contexts
    // Route: /global-business-cultures
    { path: 'global-business-cultures', name: 'Global Business Cultures', component: GlobalBusinessCultures },

    // ============================================================================
    // GRAMMAR LESSONS
    // ============================================================================

    // English Verb Tenses Lesson - Complete coverage of English verb tenses with interactive exercises
    // Route: /english-verb-tenses
    { path: 'english-verb-tenses', name: 'English Verb Tenses', component: EnglishVerbTenses },

    // English Prepositions Lesson - Interactive lessons on place, time, and movement prepositions
    // Route: /english-prepositions
    { path: 'english-prepositions', name: 'English Prepositions', component: EnglishPrepositions },

    // ============================================================================
    // VOCABULARY AND COMMUNICATION LESSONS
    // ============================================================================

    // Phrasal Verbs Lesson - Essential phrasal verbs with interactive exercises and real-world contexts
    // Route: /phrasal-verbs
    { path: 'phrasal-verbs', name: 'Phrasal Verbs', component: PhrasalVerbs },

    // ============================================================================
    // CULTURAL AND SPECIALIZED TOPICS LESSONS
    // ============================================================================

    // Cat Culture Studies Lesson - Fun, engaging lessons about feline behavior and culture
    // Route: /cat-culture
    { path: 'cat-culture', name: 'The Feline Economy', component: CatCulture }
];