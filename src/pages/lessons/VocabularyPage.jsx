/**
 * ESL Lessons Hub - Vocabulary Page Component
 *
 * This component demonstrates the standard lesson page architecture pattern:
 * - Data fetching from centralized data files
 * - State management for active content selection
 * - Component composition using reusable UI components
 * - Responsive design with tab-based organization
 *
 * Architecture Pattern:
 * 1. Import lesson data from src/data/ directory
 * 2. Use useState for active tab/content management
 * 3. Use useMemo for expensive data transformations
 * 4. Compose UI using established component library
 * 5. Implement responsive design patterns
 *
 * Data Flow:
 * lesson data → tab selection → content filtering → component rendering
 *
 * @component
 * @param {object} props - Component props (none expected for route components)
 * @returns {JSX.Element} Complete vocabulary lesson interface
 *
 * @example
 * ```jsx
 * // URL: /vocabulary/1
 * // Renders: Vocabulary lesson with tabs for different content types
 * // Data source: vocabularyData.js with lessonId matching URL parameter
 * ```
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Typography, Fade, Paper, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { vocabularyData } from '../../data/vocabularyData.js';
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';
import DetailCard from '../../components/DetailCard';
import QuizComponent from '../../components/Quiz';
import Flashcard from '../../components/Flashcard';

// ============================================================================
// HELPER COMPONENTS - Reusable UI building blocks for lesson pages
// ============================================================================

/**
 * Header Component for Vocabulary Lessons
 *
 * Provides consistent header styling and structure across vocabulary lessons.
 * Uses theme-aware typography and responsive design patterns.
 *
 * @component
 * @param {object} props - Component props
 * @param {number} props.lessonNumber - The lesson number for display
 * @returns {JSX.Element} Styled lesson header
 */
const Header = ({ lessonNumber }) => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      Vocabulary: Lesson {lessonNumber}
    </Typography>
    <Typography variant="h6" sx={{ color: 'text.primary' }}>
      Learn and practice your new words.
    </Typography>
  </Box>
);

/**
 * Flashcard Content Renderer for Vocabulary Items
 *
 * Transforms vocabulary data into flashcard format expected by Flashcard component.
 * Handles the conversion between vocabulary item structure and flashcard data format.
 *
 * Data Transformation Pattern:
 * 1. Extract vocabulary item properties (word, definition, sampleSentence)
 * 2. Format content for flashcard front/back display
 * 3. Create data structure matching Flashcard component expectations
 * 4. Apply theme styling for consistent appearance
 *
 * @function
 * @param {object} item - Vocabulary item object
 * @param {object} theme - MUI theme object for styling
 * @returns {JSX.Element} Rendered flashcard content
 */
const FlashcardRenderer = (item, theme) => {
    const frontContent = (
        <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', transform: 'none' }}>
            {item.word}
        </Typography>
    );

    const backContent = (
        <Box sx={{ transform: 'none', position: 'static' }}>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                <strong>Definition:</strong> {item.definition}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic' }}>
                <strong>Example:</strong> "{item.sampleSentence}"
            </Typography>
        </Box>
    );

    // Create data structure that Flashcard component expects
    const flashcardData = {
        title: `${item.word} Flashcard`,
        cards: [{
            front: item.word,
            back: `Definition: ${item.definition}. Example: "${item.sampleSentence}"`
        }]
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Flashcard data={flashcardData} />
        </Box>
    );
};

/**
 * Challenge View Component for Vocabulary Quizzes
 *
 * Generates interactive vocabulary quizzes by transforming lesson data into
 * multiple-choice questions. Each word becomes a quiz question with the
 * challenge sentence as the question and distractor words as options.
 *
 * Quiz Generation Algorithm:
 * 1. Extract words from lesson data (flashcard content)
 * 2. For each word, create distractor options from other lesson words
 * 3. Generate shuffled multiple-choice questions (4 options each)
 * 4. Map correct answer to 1-indexed position for QuizComponent compatibility
 * 5. Provide contextual feedback messages for correct/incorrect answers
 *
 * @component
 * @param {object} props - Component props
 * @param {object} props.lessonData - Complete lesson data with words array
 * @param {object} props.theme - MUI theme object for styling
 * @returns {JSX.Element} Interactive vocabulary quiz
 */
const ChallengeView = ({ lessonData, theme }) => {
    // Transform lessonData.words into quiz format for QuizComponent
    const quizData = useMemo(() => {
        const questions = lessonData.words.map((wordItem, index) => {
            // Get 3 distractor words (excluding the correct answer)
            const distractorWords = lessonData.words
                .filter(w => w.word !== wordItem.word)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(w => w.word);

            // Create shuffled answers array (4 options total)
            const allAnswers = [wordItem.word, ...distractorWords].sort(() => 0.5 - Math.random());

            // Find the 1-indexed position of the correct answer
            const correctAnswerIndex = allAnswers.indexOf(wordItem.word) + 1;

            return {
                question: wordItem.challengeSentence.replace('_______', '________'),
                answers: allAnswers,
                correctAnswer: correctAnswerIndex.toString(),
                messageForCorrectAnswer: `Correct! "${wordItem.word}" is the right word for this context.`,
                messageForIncorrectAnswer: `Not quite. The correct word is "${wordItem.word}".`
            };
        });

        return {
            title: `Vocabulary Challenge: ${lessonData.lesson}`,
            questions: questions
        };
    }, [lessonData]);

    return <QuizComponent data={quizData} />;
};

// ============================================================================
// MAIN VOCABULARY PAGE COMPONENT - Standard lesson page architecture pattern
// ============================================================================

/**
 * Main Vocabulary Page Component
 *
 * This component implements the standard lesson page architecture used throughout
 * the ESL Lessons Hub. It demonstrates best practices for:
 * - URL parameter-based data loading
 * - Tab-based content organization
 * - Component composition and reusability
 * - Responsive design implementation
 * - Error handling and loading states
 *
 * Architecture Pattern Implementation:
 * 1. Extract lessonId from URL parameters using useParams()
 * 2. Use useMemo for expensive data transformations (activeLesson calculation)
 * 3. Implement useState for UI state management (activeTab)
 * 4. Use useEffect for side effects (document title updates)
 * 5. Compose UI using established component library
 * 6. Handle error states with graceful fallbacks
 *
 * Data Flow Architecture:
 * URL params → lessonId → vocabularyData lookup → activeLesson object →
 * tab selection → content filtering → component rendering
 *
 * @component
 * @returns {JSX.Element} Complete vocabulary lesson interface or error/redirect
 *
 * @example
 * ```jsx
 * // URL: /vocabulary/1
 * // Process:
 * // 1. Extract lessonId = "1" from URL params
 * // 2. Find lesson in vocabularyData.lessons array
 * // 3. Load appropriate vocabulary pack
 * // 4. Render with tab-based content organization
 * // 5. Update document title for browser tab
 * ```
 */
export default function VocabularyPage() {
    /** @type {string} Extract lesson ID from URL parameters */
    const { lessonId } = useParams();

    /** @type {[number, function]} Active tab state for content switching */
    const [activeTab, setActiveTab] = useState(0);

    /** @type {object} MUI theme object for consistent styling */
    const theme = useTheme();

    /**
     * Active Lesson Data Calculation
     *
     * This useMemo hook performs the core data transformation logic that connects
     * URL parameters to lesson content. It implements a sophisticated lookup and
     * transformation pattern that converts raw data into component-ready format.
     *
     * Data Transformation Pipeline:
     * 1. Parse lessonId from URL string to integer
     * 2. Find matching lesson info in vocabularyData.lessons array
     * 3. Determine appropriate vocabulary pack size from lesson info
     * 4. Locate specific vocabulary pack from available packs
     * 5. Extract words from flashcard content blocks
     * 6. Transform into component-expected format
     * 7. Return enriched lesson object with all necessary data
     *
     * Error Handling Strategy:
     * - Returns null if lessonId is invalid or lesson not found
     * - Returns null if no matching vocabulary pack available
     * - Graceful degradation when flashcard content is missing
     * - Logging for debugging invalid lesson configurations
     *
     * @type {object|null} Complete lesson data object or null if invalid
     */
    const activeLesson = useMemo(() => {
        /** @type {number} Convert string lessonId to integer for array lookup */
        const id = parseInt(lessonId, 10);

        /** @type {object|null} Find lesson info matching the ID */
        const lessonInfo = vocabularyData.lessons.find(l => l.lesson === id);

        if (!lessonInfo) {
            console.warn(`Lesson ${id} not found in vocabularyData.lessons`);
            return null;
        }

        // Find the appropriate pack based on lesson info
        const packSize = lessonInfo.packSize.toString();
        const packs = vocabularyData.vocabularyPacks[packSize] || [];

        // For now, use the first pack of the appropriate size
        // In a real implementation, this would map lesson numbers to specific packs
        const pack = packs.find(p => p.packId.includes(lessonInfo.lesson <= 3 ? '1' : '2')) || packs[0];

        if (!pack) {
            console.warn(`No vocabulary pack found for lesson ${id} with packSize ${packSize}`);
            return null;
        }

        // Extract words from flashcard content
        const flashcardBlock = pack.content.find(block => block.type === 'flashcard');
        const words = flashcardBlock ? flashcardBlock.data.cards.map(card => ({
            word: card.front,
            definition: card.back.split('Definition: ')[1]?.split('.')[0] || card.back,
            sampleSentence: card.back.split('Definition: ')[1]?.split('.')[1] || '',
            challengeSentence: `Complete the sentence with the correct word: The word "${card.front}" means _______ in this context.`
        })) : [];

        return {
            ...lessonInfo,
            words: words,
            pack: pack
        };
    }, [lessonId]);

    /**
     * Tab Change Handler
     *
     * Manages tab selection state for the lesson content organization.
     * Uses Material-UI Tab component's expected event signature.
     *
     * @function
     * @param {object} event - Tab change event from Material-UI
     * @param {number} newValue - New active tab index
     */
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    /**
     * Document Title Update Effect
     *
     * Updates the browser tab title when lesson data loads. This provides
     * better user experience for browser tab identification and bookmarking.
     *
     * Side Effect Management:
     * - Only runs when activeLesson changes (dependency array)
     * - Safe to run on every lesson load (idempotent operation)
     * - Provides immediate feedback in browser interface
     *
     * @effect
     * @dependency {object} activeLesson - Triggers title update when lesson loads
     */
    useEffect(() => {
        if (activeLesson) {
            document.title = `Vocab ${activeLesson.lesson} | ESL Lessons Hub`;
        }
    }, [activeLesson]);

    /**
     * Error Handling: Invalid Lesson Redirect
     *
     * Gracefully handles cases where the requested lesson ID doesn't exist.
     * Uses React Router's Navigate component for client-side redirection.
     *
     * Error Recovery Strategy:
     * - Automatic redirect to home page for invalid lesson IDs
     * - Replace navigation to prevent back button issues
     * - Silent failure (no error messages shown to user)
     *
     * @returns {JSX.Element} Redirect component if lesson not found
     */
    if (!activeLesson) {
        return <Navigate to="/" replace />;
    }

    /**
     * View Mode Configuration
     *
     * Defines the available content modes for the vocabulary lesson.
     * Each mode corresponds to a different type of learning activity.
     *
     * @type {string[]}
     */
    const viewModes = ["Flashcards", "Challenge", "Homework"];

    /**
     * Main Component Render
     *
     * Renders the complete vocabulary lesson interface using a tab-based architecture.
     * Each tab represents a different learning activity type with appropriate content.
     *
     * Render Architecture:
     * 1. Header component for lesson identification
     * 2. Tab navigation for content switching
     * 3. Content area with conditional rendering based on active tab
     * 4. Fade transitions for smooth content switching
     * 5. Responsive design for all screen sizes
     *
     * Tab Content Strategy:
     * - Tab 0: Interactive flashcards for vocabulary review
     * - Tab 1: Multiple-choice quiz for vocabulary testing
     * - Tab 2: Homework assignment with instructions
     *
     * @returns {JSX.Element} Complete lesson interface
     */
    return (
        <Box sx={{ width: '100%' }}>
            {/*
             * LESSON HEADER SECTION
             * Provides consistent lesson identification and context
             */}
            <Header lessonNumber={activeLesson.lesson} />

            {/*
             * TAB NAVIGATION SECTION
             * Allows users to switch between different learning activities
             */}
            <LessonTabs
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                sections={viewModes}
            />

            {/*
             * MAIN CONTENT AREA
             * Conditionally renders content based on active tab selection
             */}
            <Box sx={{ mt: 4 }}>
                {/*
                 * FLASHCARDS TAB (Tab 0)
                 * Interactive vocabulary review with flip cards
                 */}
                {activeTab === 0 && (
                    <Fade in={true} key={`lesson-${activeLesson.lesson}-flashcards`}>
                        <div>
                            {/**
                             * ContentSelector Component Integration
                             *
                             * Uses the ContentSelector component to provide:
                             * - Interactive word selection buttons
                             * - Flashcard display and flip functionality
                             * - Responsive grid layout for word options
                             * - Theme-aware styling and animations
                             *
                             * Data Flow:
                             * activeLesson.words → ContentSelector → FlashcardRenderer → Flashcard component
                             */}
                            <ContentSelector
                                sectionData={activeLesson.words}
                                title={`Lesson ${activeLesson.lesson}: Words`}
                                description="Select a word from the buttons below.<br /><br />Click on the flashcard to flip it over to see its definition and a sample sentence."
                                detailRenderer={FlashcardRenderer}
                                theme={theme}
                            />
                        </div>
                    </Fade>
                )}

                {/*
                 * CHALLENGE/QUIZ TAB (Tab 1)
                 * Interactive multiple-choice vocabulary quiz
                 */}
                {activeTab === 1 && (
                     <Fade in={true} key={`lesson-${activeLesson.lesson}-challenge`}>
                        <div>
                            {/**
                             * ChallengeView Component Integration
                             *
                             * Renders an interactive vocabulary quiz generated from lesson data.
                             * Each vocabulary word becomes a multiple-choice question with
                             * contextual distractors and feedback messages.
                             *
                             * Quiz Generation Process:
                             * 1. Extract words from lesson data
                             * 2. Generate distractor options from other lesson words
                             * 3. Create shuffled multiple-choice questions
                             * 4. Provide contextual feedback for learning
                             */}
                            <ChallengeView
                                lessonData={activeLesson}
                                theme={theme}
                            />
                        </div>
                    </Fade>
                )}

                {/*
                 * HOMEWORK TAB (Tab 2)
                 * Assignment instructions and learning activities
                 */}
                {activeTab === 2 && (
                    <Fade in={true} key={`lesson-${activeLesson.lesson}-homework`}>
                        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                            <Paper sx={{ p: { xs: 3, sm: 4 } }}>
                                {/*
                                 * HOMEWORK ASSIGNMENT HEADER
                                 * Clear title and instructions for the assignment
                                 */}
                                <Typography variant="h5" component="h3" textAlign="center" gutterBottom>
                                    Homework Assignment
                                </Typography>

                                {/*
                                 * HOMEWORK INSTRUCTIONS
                                 * Step-by-step instructions for completing the assignment
                                 */}
                                <Typography variant="body1" textAlign="center" paragraph>
                                    For your homework, please write each of the 10 words from this lesson in your notebook. Next to each word, write your own original sentence using the word correctly.
                                </Typography>
                                <Typography variant="body1" textAlign="center" paragraph sx={{ mb: 4 }}>
                                    We will review your sentences together in our next class.
                                </Typography>

                                {/*
                                 * VOCABULARY WORD LIST
                                 * Interactive list showing all words and definitions for reference
                                 *
                                 * Material-UI List Component Pattern:
                                 * - ListItem for each vocabulary word
                                 * - ListItemText with primary (word) and secondary (definition)
                                 * - Divider between items for visual separation
                                 * - Responsive typography with theme-aware colors
                                 */}
                                <List>
                                    {activeLesson.words.map((wordObj) => (
                                        <ListItem key={wordObj.word} divider>
                                            <ListItemText
                                                primary={wordObj.word}
                                                secondary={wordObj.definition}
                                                primaryTypographyProps={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 'bold',
                                                    // --- MODIFICATION: Changed color to secondary ---
                                                    color: 'secondary.main',
                                                }}
                                                secondaryTypographyProps={{
                                                    textAlign: 'justify'
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Box>
                    </Fade>
                )}
            </Box>
        </Box>
    );
}