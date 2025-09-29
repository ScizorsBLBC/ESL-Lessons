# ESL Lessons Hub

Welcome to the ESL Lessons Hub, a modern, schema-driven platform designed to function as a premier Cognitive Learning Environment. Our goal is to evolve beyond a simple content repository by integrating pedagogically-driven, interactive components that reduce cognitive load and empower learners to build robust mental models of complex English concepts.

**📍 Live Site**: [https://esl-lessons.scizors.wtf](https://esl-lessons.scizors.wtf)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Material-UI](https://img.shields.io/badge/material--ui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## Features

### 🎓 Interactive Learning Experience
- **Comprehensive Lessons**: Vocabulary, idioms, verb tenses, pronunciation, cultural studies, and more.
- **Interactive Exercises**: Quizzes, fill-in-the-blanks, and flashcards for active learning.
- **Text-to-Speech**: Audio playback for all lesson content with accessibility support.
- **Rich Media Integration**: YouTube videos, interactive charts, and visual learning aids.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML and ARIA labels.

### 🎨 Advanced Theming System
- **5 Distinct Themes**: Light, Dark, Vaporwave, Monochrome Light, and Monochrome Dark.
- **Glassmorphism UI**: Beautiful backdrop blur effects and transparency.
- **Animated Backgrounds**: Subtle film grain and gradient animations.
- **Theme Persistence**: Remembers user preference across sessions.

### 🔒 Security & Performance
- **Backend-for-Frontend (BFF)**: Secure API key management for translation services using serverless functions.
- **Optimized Builds**: Vite provides a highly optimized and small production bundle for fast loading.
- **Secure Headers**: Deployed with security headers like X-Frame-Options and Referrer-Policy for user protection.

### 🚀 Deployment Configuration
- **Vite Base Path**: Configured with absolute paths (`base: '/'`) for correct asset loading on all routes.
- **Netlify SPA Deployment**: Uses a single catch-all redirect rule (`/*` → `/index.html`) for optimal single-page application routing.
- **Dynamic Route Support**: Properly handles nested routes like `/vocabulary/1` and `/idioms/12` without asset loading issues.
- **Serverless Functions**: API routes are handled by Netlify Functions located in the `server/` directory.

## Core Architectural Principles

This project follows a strict set of principles to ensure it remains scalable, maintainable, and easy to contribute to.

1.  **Data-Driven Content**: All lesson content (text, chart data, video links, etc.) is strictly separated from the UI components. All content resides in dedicated JavaScript files within the `src/data/` directory. UI components are designed to be stateless "templates" that simply render the data imported from this directory.

2.  **Modular & Reusable Components**: The application is built on a foundation of custom, reusable components located in `src/components/`. New features and lessons should leverage these existing components to maintain consistency and reduce code duplication.

3.  **No Student-Facing Navigation**: The platform is designed as a collection of individual lessons accessed via direct links. There is no global navigation bar or central lesson index for students, ensuring a focused learning experience for each topic.

## Content Schema Guide

The lesson schema is designed for maximum flexibility while maintaining the strict separation of content and presentation.

#### Basic Structure
```javascript
// Basic content block structure:
{
  "blockId": "unique-identifier-with-semantic-meaning",  // e.g., "present-tenses-quiz-09"
  "type": "content-type-identifier",                     // e.g., "text", "quiz", "chart"
  "data": {
    // Content-specific structure varies by type
  }
}