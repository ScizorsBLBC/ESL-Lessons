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
- **Smart Quiz System**: Context-aware multiple-choice quizzes with immediate feedback and progress tracking.
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

### 🔄 Continuous Deployment with Netlify

This project is configured for **continuous deployment** via Netlify, enabling seamless updates through proper Git workflow practices.

#### **Development Workflow**

1. **Feature Branch Development**:
   ```bash
   # Create a new feature branch
   git checkout -b feature/new-lesson-component

   # Make your changes and test locally
   npm run dev

   # Stage and commit your changes
   git add .
   git commit -m "feat: add new lesson component with glassmorphism styling"
   ```

2. **Pull Request Creation**:
   ```bash
   # Push your feature branch to GitHub
   git push origin feature/new-lesson-component

   # Create a pull request on GitHub
   # Navigate to your repository on GitHub
   # Click "Compare & pull request"
   # Add a descriptive title and description
   # Request review from maintainers
   ```

3. **Automated Deployment**:
   - **Netlify Integration**: Connected to the main branch for automatic deployments
   - **Build Process**: Triggered automatically when pull requests are merged to `main`
   - **Environment Variables**: Secure API keys and configuration managed through Netlify dashboard
   - **Build Command**: `npm run build` - Creates optimized production bundle
   - **Publish Directory**: `dist/` - Contains the built application

#### **Deployment Best Practices**

- **Semantic Commit Messages**: Use conventional commit format (`feat:`, `fix:`, `docs:`, etc.)
- **Pull Request Reviews**: All changes require review before merging
- **Branch Protection**: Main branch protected against direct pushes
- **Automated Testing**: Consider adding tests for critical functionality
- **Rollback Strategy**: Previous deployments can be quickly restored if issues arise

#### **Netlify Configuration**

- **Build Settings**:
  - **Base directory**: `.` (root of repository)
  - **Build command**: `npm run build`
  - **Publish directory**: `dist`
  - **Node version**: 18.x (or current LTS)

- **Environment Variables**:
  - **API Keys**: Stored securely in Netlify dashboard
  - **Feature Flags**: Can be configured for different environments
  - **Database URLs**: External services properly configured

- **Custom Headers**:
  - **Security Headers**: X-Frame-Options, Content-Security-Policy, etc.
  - **Performance**: Cache headers for static assets
  - **SPA Support**: Proper headers for single-page application routing

#### **Monitoring and Maintenance**

- **Netlify Analytics**: Built-in analytics for site performance and usage
- **Build Logs**: Detailed logs available for troubleshooting deployment issues
- **Form Handling**: Netlify Forms integration for contact forms
- **Function Logs**: Serverless function execution logs and error tracking

This setup ensures **zero-downtime deployments**, **automatic SSL certificates**, and **global CDN distribution** for optimal performance worldwide.

## Core Architectural Principles

This project follows a strict set of principles to ensure it remains scalable, maintainable, and easy to contribute to.

1.  **Data-Driven Content**: All lesson content (text, chart data, video links, etc.) is strictly separated from the UI components. All content resides in dedicated JavaScript files within the `src/data/` directory. UI components are designed to be stateless "templates" that simply render the data imported from this directory.

2.  **Modular & Reusable Components**: The application is built on a foundation of custom, reusable components located in `src/components/`. New features and lessons should leverage these existing components to maintain consistency and reduce code duplication.

3.  **No Student-Facing Navigation**: The platform is designed as a collection of individual lessons accessed via direct links. There is no global navigation bar or central lesson index for students, ensuring a focused learning experience for each topic.

## Available Lessons

The ESL Lessons Hub includes comprehensive lessons covering essential English language topics:

### 📚 Core Grammar Lessons
- **English Verb Tenses**: Complete coverage of present, past, and future tenses with interactive quizzes
- **English Prepositions**: Interactive quizzes for place, time, and movement prepositions with immediate feedback

### 📖 Vocabulary & Communication
- **Vocabulary Building**: Interactive vocabulary lessons with flashcards and context-aware quizzes
- **Idioms & Expressions**: Common English idioms with usage examples and practice exercises
- **Phrasal Verbs**: Essential phrasal verbs with interactive exercises and real-world contexts

### 🌍 Cultural & Practical Studies
- **Global Business Cultures**: Professional communication across cultures
- **Cat Culture Studies**: Fun, engaging lessons about feline behavior and culture
- **News Article Analysis**: Critical reading and vocabulary building through current events

### 🔊 Pronunciation & Language Skills
- **Pronunciation Guide**: Interactive pronunciation lessons with audio support
- **Sound Recognition**: Practice distinguishing English sounds and intonation patterns

Each lesson includes interactive exercises, quizzes, and multimedia content designed to maximize learning retention and engagement.

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
```

## Recent Fixes & Updates

### Phrasal Verbs Content Filtering Fix
- **Issue**: Phrasal Verbs lesson content was not displaying properly due to missing tab-based filtering logic
- **Fix**: Added `getFilteredContent()` function to properly filter content blocks based on active tab selection
- **Tabs**:
  - **Introduction**: Shows intro-* content blocks (phrasal verb definitions and examples)
  - **Workplace Verbs**: Shows workplace-* content blocks (professional communication verbs)
  - **Full Vocabulary**: Shows all vocabulary category blocks (communication, socializing, business, travel, etc.)
  - **Practice**: Auto-generated flashcards and quiz using PracticeSuite component
  - **Assessments**: Curated gap fill, flashcards, practice exercises, and homework assignments
- **Impact**: Users can now properly navigate through different sections of the Phrasal Verbs lesson with organized content sections

### Major Architecture Refactor: Standardized Component System
- **Issue**: Phrasal Verbs lesson had 583 lines of complex, custom logic making it difficult to maintain and extend
- **Solution**: Complete refactor to use standardized, reusable component architecture
- **Key Changes**:
  - **Reduced complexity**: From 583 lines to 66 lines of clean, template-style code
  - **Component standardization**: Replaced custom logic with `PracticeSuite`, `ContentBlockRenderer`, and `LessonTabs`
  - **Content organization**: Separated auto-generated content (Practice tab) from curated assessments (Assessments tab)
  - **Glass button styling**: Applied consistent glassmorphism design to all interactive elements
  - **Multiple choice conversion**: Transformed gap fill from text input to interactive multiple choice buttons
- **Benefits**:
  - **Maintainability**: Much easier to modify and extend
  - **Consistency**: Uniform styling and behavior across all lessons
  - **Reusability**: Components can be used for future lessons
  - **Performance**: Reduced bundle size and improved loading times
- **New Tab Structure**:
  - **Practice**: Auto-generated flashcards and quiz (vocabularyService integration)
  - **Assessments**: Curated exercises with glass-styled selection buttons
- **Technical Implementation**: Leverages `vocabularyService.js` for automatic exercise generation from content data

## Recent Enhancements

### Comprehensive Phrasal Verbs Lesson Architecture Refactor
- **Major Code Reduction**: Reduced from 583 lines of complex custom logic to 66 lines of clean, maintainable template code
- **Standardized Component System**: Replaced custom implementations with reusable `PracticeSuite`, `ContentBlockRenderer`, and `LessonTabs` components
- **Multiple Choice Gap Fill**: Converted text-input gap fill to interactive multiple choice buttons with glassmorphism styling
- **Organized Assessment Structure**: Separated auto-generated content (Practice tab) from curated assessments (Assessments tab)
- **Enhanced User Experience**: Added glass-styled selection buttons for different assessment types (Gap Fill, Practice Exercise, Homework)
- **Consistent Glassmorphism Design**: Applied uniform styling across all interactive elements including flashcards, quizzes, and buttons
- **Improved Content Organization**: Clear separation between learning activities (Practice) and assessment activities (Assessments)

### Vocabulary-Driven Exercise Generation System
- **Automatic Exercise Creation**: Leverages `vocabularyService.js` to automatically generate flashcards, quizzes, and gap fill exercises from content data
- **Smart Content Parsing**: Extracts phrasal verb-definition pairs using consistent HTML patterns
- **Dynamic Quiz Generation**: Creates randomized multiple choice questions with intelligent distractor selection
- **Scalable Architecture**: Works with any vocabulary database size and can be extended to other lesson types
- **Reduced Manual Work**: Single data source drives multiple exercise types automatically

### English Verb Tenses Quiz Consolidation
- **Issue**: Verb tenses lesson had 4 separate quizzes scattered throughout individual tense sections
- **Solution**: Consolidated all quiz questions into a single comprehensive quiz on dedicated Practice Exercises tab
- **Key Changes**:
  - **Quiz consolidation**: Combined 6 questions from Present, Past, Future, and transformation quizzes
  - **Tab restructuring**: Added Introduction tab, moved summary charts to respective tense tabs
  - **Removed redundancy**: Eliminated scattered individual quizzes and Legacy Practice tab
- **Final Structure**:
  - **Introduction**: "What Are Verb Tenses?" concepts and timeline
  - **Present Time**: Individual tenses + summary chart at bottom
  - **Past Time**: Individual tenses + summary chart at bottom
  - **Future Time**: Individual tenses + summary chart at bottom
  - **Practice Exercises**: Comprehensive 6-question quiz
- **Benefits**:
  - **Better organization**: Practice separated from learning content
  - **Consistent summaries**: Summary charts always visible on tense tabs
  - **Streamlined experience**: Single location for comprehensive testing

### Modular Component Opportunities

#### Reusable Components for Future Lessons
The enhancements implemented in the Phrasal Verbs lesson demonstrate several patterns that can be abstracted into reusable components:

1. **Responsive Content Layout (`TwoPaneLayout`)**:
   - **Current Use**: Introduction section with definition and examples
   - **Future Applications**: Any lesson needing side-by-side content (theory + examples, vocabulary + usage, etc.)
   - **Benefits**: Mobile-first responsive design, consistent spacing, accessibility-friendly

2. **Dynamic Quiz Generation**:
   - **Current Use**: Gap fill exercises with random question selection
   - **Future Applications**: Any lesson requiring randomized question sets
   - **Benefits**: Reduces repetition, increases engagement, maintains consistent question structure

3. **Enhanced Text-to-Speech Integration**:
   - **Current Use**: Clean text formatting with proper line breaks
   - **Future Applications**: All lessons with audio content
   - **Benefits**: Better accessibility, improved learning experience, consistent audio quality

4. **Vocabulary Organization System**:
   - **Current Use**: 10 topic-based phrasal verb categories
   - **Future Applications**: Any lesson with categorized vocabulary (verbs, idioms, business terms, etc.)
   - **Benefits**: Scalable organization, easy content management, improved user navigation

#### Implementation Patterns for Future Lessons
- **Data Structure**: Topic-based organization with consistent schema compliance
- **Component Reusability**: Leverage existing `TwoPaneLayout`, `Quiz`, `Flashcard` components
- **Content Filtering**: Extend `getFilteredContent()` pattern for new lesson types
- **Responsive Design**: Apply TwoPaneLayout pattern for mobile-first layouts

#### Vocabulary-Driven Exercise Generation
The Phrasal Verbs lesson demonstrates a powerful pattern for automatically generating interactive exercises from vocabulary data:

1. **Vocabulary Parsing Engine**:
   - **Pattern Matching**: Extracts phrasal verb-definition pairs using regex patterns like `<strong>Verb</strong> – Definition`
   - **HTML Processing**: Strips formatting tags while preserving semantic content
   - **Data Normalization**: Converts extracted data into consistent flashcard/quiz formats

2. **Automated Flashcard Generation**:
   - **Source**: Any content block with vocabulary definitions
   - **Format**: `{front: "Phrasal Verb", back: "Definition\n\nExample: 'Example sentence.'"}`
   - **Benefits**: Instant flashcard collection without manual creation

3. **Dynamic Quiz Generation**:
   - **Question Types**: Multiple choice with randomized distractors
   - **Source Material**: Vocabulary definitions as answer options
   - **Randomization**: Ensures unique question sets per session
   - **Scalability**: Works with any size vocabulary database

4. **Gap Fill Exercise Creation**:
   - **Source**: Sentence templates with vocabulary integration
   - **Random Selection**: 20 questions from available exercises
   - **Progressive Difficulty**: Can be extended with complexity tiers

#### Abstraction Opportunities for Future Lessons
This vocabulary-driven approach can be abstracted into reusable services:

```javascript
// Potential service architecture
const VocabularyExerciseService = {
  parseVocabulary(contentBlocks) {
    // Extract verb-definition pairs from any content
    return extractedVocabulary;
  },

  generateFlashcards(vocabularyData) {
    // Convert vocabulary to flashcard format
    return flashcardArray;
  },

  generateQuiz(vocabularyData, questionCount = 20) {
    // Create randomized quiz questions
    return quizQuestions;
  },

  generateGapFill(sentences, vocabularyData) {
    // Create gap fill exercises
    return exerciseArray;
  }
};
```

**Benefits for Future Lessons**:
- **Automatic Exercise Generation**: Any lesson with vocabulary data gets flashcards, quizzes, and gap fill exercises
- **Consistent Quality**: Standardized question formats and difficulty levels
- **Maintenance Efficiency**: Single data source drives multiple exercise types
- **Scalability**: Works with vocabulary databases of any size
- **Localization Ready**: Can be extended for multiple languages

**Implementation Strategy**:
1. **Data Schema**: Ensure vocabulary content follows consistent `<strong>Term</strong> – Definition` pattern
2. **Service Layer**: Abstract parsing and generation logic into reusable utilities
3. **Component Integration**: Update existing components to accept generated exercise data
4. **Configuration**: Allow lessons to specify exercise parameters (question count, difficulty, etc.)