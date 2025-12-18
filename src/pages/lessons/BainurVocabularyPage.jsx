/**
 * ESL Lessons Hub - Bainur's Vocabulary Page Component
 *
 * This component displays specialized vocabulary lessons designed for Bainur, featuring
 * entrepreneur-focused vocabulary, modern American culture terms, and Los Angeles-specific
 * language. The page follows the standard lesson page architecture pattern used throughout
 * the ESL Lessons Hub platform.
 *
 * @component
 * @description Interactive vocabulary lesson page with flashcards, quizzes, and homework
 * @module BainurVocabularyPage
 *
 * @architecture
 * This component demonstrates the standard lesson page architecture pattern:
 * - Data fetching from centralized data files (`bainurData.js`)
 * - State management for active content selection
 * - Component composition using reusable UI components
 * - Responsive design with tab-based organization
 *
 * @data-flow
 * URL params → lessonId → entrepreneurVocabularyData lookup → activeLesson object →
 * tab selection → content filtering → component rendering
 *
 * @features
 * - **Interactive Flashcards**: Click-to-flip vocabulary cards with definitions and examples
 * - **Challenge Quizzes**: Auto-generated multiple-choice questions from challenge sentences
 * - **Homework Assignments**: Structured homework with word lists and instructions
 * - **Responsive Design**: Mobile-first layout that adapts to all screen sizes
 * - **Theme Integration**: Full support for all 5 application themes
 * - **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML
 *
 * @routing
 * - **Route Pattern**: `/bainur-vocabulary/:lessonId`
 * - **Example URLs**:
 *   - `/bainur-vocabulary/1` - Lesson 1: Managing Your Apartment & Building
 *   - `/bainur-vocabulary/5` - Lesson 5: Financial Basics for Founders
 *   - `/bainur-vocabulary/12` - Lesson 12: The LA Entrepreneur Mindset
 *
 * @props
 * This is a route component and receives props from React Router:
 * - No direct props expected
 * - Uses `useParams()` to extract `lessonId` from URL
 *
 * @dependencies
 * - `react-router-dom`: For routing and URL parameter extraction
 * - `@mui/material`: For UI components and theming
 * - `bainurData.js`: Vocabulary lesson data source
 * - `ContentSelector`: Interactive word selection component
 * - `LessonTabs`: Tab navigation component
 * - `Flashcard`: Interactive flashcard component
 * - `QuizComponent`: Multiple-choice quiz component
 *
 * @usage
 * ```jsx
 * // In App.jsx routing configuration
 * <Route path="bainur-vocabulary/:lessonId" element={<BainurVocabularyPage />} />
 *
 * // Direct navigation
 * navigate('/bainur-vocabulary/1');
 *
 * // Link generation (from DashboardPage)
 * const link = `/bainur-vocabulary/${lessonId}`;
 * ```
 *
 * @sub-components
 * - **Header**: Lesson title and description display
 * - **FlashcardRenderer**: Transforms vocabulary items into flashcard format
 * - **ChallengeView**: Generates quiz questions from challenge sentences
 *
 * @state-management
 * - `activeTab`: Controls which tab is currently displayed (0=Flashcards, 1=Challenge, 2=Homework)
 * - `activeLesson`: Computed from URL params using `useMemo` for performance
 * - `theme`: MUI theme object for consistent styling
 *
 * @error-handling
 * - Invalid lesson IDs redirect to home page using `<Navigate>` component
 * - Missing lesson data handled gracefully with null checks
 * - Document title updates only when valid lesson is loaded
 *
 * @performance
 * - `useMemo` for expensive lesson lookup operations
 * - `useEffect` for side effects (document title updates)
 * - Fade transitions for smooth tab switching
 * - Lazy evaluation of quiz data generation
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - ARIA labels on interactive elements
 * - Keyboard navigation support
 * - Screen reader friendly content structure
 * - High contrast text for readability
 *
 * @testing
 * Test cases should cover:
 * - URL parameter parsing and lesson lookup
 * - Tab switching functionality
 * - Flashcard rendering and interaction
 * - Quiz generation from challenge sentences
 * - Homework list rendering
 * - Error handling for invalid lesson IDs
 * - Responsive design breakpoints
 *
 * @maintenance
 * To modify lesson structure:
 * 1. Update `bainurData.js` with new lesson content
 * 2. Ensure data structure matches vocabulary schema
 * 3. Test all three tabs (Flashcards, Challenge, Homework)
 * 4. Verify routing and link generation in DashboardPage
 *
 * @related-files
 * - `src/data/bainurData.js` - Vocabulary data source
 * - `src/pages/lessons/VocabularyPage.jsx` - Standard vocabulary page (reference implementation)
 * - `src/pages/DashboardPage.jsx` - Teacher dashboard with link generator
 * - `src/App.jsx` - Route configuration
 * - `src/components/Flashcard.jsx` - Flashcard component
 * - `src/components/Quiz.jsx` - Quiz component
 *
 * @version 1.0.0
 * @since 2024
 * @author ESL Lessons Hub Development Team
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Typography, Fade, Paper, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { entrepreneurVocabularyData } from '../../data/bainurData.js';
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';
import DetailCard from '../../components/DetailCard';
import QuizComponent from '../../components/Quiz';
import Flashcard from '../../components/Flashcard';

// ============================================================================
// HELPER COMPONENTS - Reusable UI building blocks for lesson pages
// ============================================================================

/**
 * Header Component for Bainur's Vocabulary Lessons
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
      Bainur Vocabulary: Lesson {lessonNumber}
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
 * @function FlashcardRenderer
 * @description Creates React elements for flashcard front and back content
 * @param {object} item - Vocabulary item object with word, definition, and sampleSentence
 * @param {object} theme - MUI theme object for styling
 * @returns {JSX.Element} Rendered flashcard content wrapped in Box container
 *
 * @data-transformation
 * Input: Vocabulary item object
 * - word: The vocabulary term
 * - definition: Part of speech and definition
 * - sampleSentence: Example usage sentence
 *
 * Output: Flashcard component with:
 * - frontContent: Typography displaying the word
 * - backContent: Box with definition and example sentence
 *
 * @styling
 * - Front: Large, bold typography with primary text color
 * - Back: Secondary text color for definition, italic for example
 * - Responsive: Adapts to theme and screen size
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

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Flashcard frontContent={frontContent} backContent={backContent} />
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
 * @component
 * @description Auto-generates quiz questions from vocabulary challenge sentences
 * @param {object} props - Component props
 * @param {object} props.lessonData - Complete lesson data with words array
 * @param {object} props.theme - MUI theme object for styling (currently unused but maintained for API consistency)
 * @returns {JSX.Element} Interactive vocabulary quiz component
 *
 * @quiz-generation-algorithm
 * 1. Extract words from lesson data (flashcard content)
 * 2. For each word, create distractor options from other lesson words
 * 3. Generate shuffled multiple-choice questions (4 options each)
 * 4. Map correct answer to 1-indexed position for QuizComponent compatibility
 * 5. Provide contextual feedback messages for correct/incorrect answers
 *
 * @question-structure
 * - question: Challenge sentence with blank replaced by underscores
 * - answers: Array of 4 shuffled options (1 correct + 3 distractors)
 * - correctAnswer: 1-indexed position of correct answer (string)
 * - messageForCorrectAnswer: Positive feedback message
 * - messageForIncorrectAnswer: Constructive feedback with correct answer
 *
 * @performance
 * Uses `useMemo` to prevent regeneration on every render. Only recalculates
 * when lessonData changes, ensuring consistent quiz experience during session.
 *
 * @randomization
 * - Distractor selection: Random 3 words from other lesson words
 * - Answer order: Shuffled to prevent pattern recognition
 * - Ensures unique question sets per render
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
            quizTitle: `Vocabulary Challenge: ${lessonData.lesson}`,
            questions: questions
        };
    }, [lessonData]);

    return <QuizComponent quizData={quizData} />;
};

// ============================================================================
// MAIN BAINUR VOCABULARY PAGE COMPONENT - Standard lesson page architecture pattern
// ============================================================================

/**
 * Main Bainur's Vocabulary Page Component
 *
 * This component implements the standard lesson page architecture used throughout
 * the ESL Lessons Hub. It demonstrates best practices for:
 * - URL parameter-based data loading
 * - Tab-based content organization
 * - Component composition and reusability
 * - Responsive design implementation
 * - Error handling and loading states
 *
 * @component
 * @description Main vocabulary lesson page for Bainur's specialized content
 * @returns {JSX.Element} Complete vocabulary lesson interface or error/redirect
 *
 * @architecture-pattern-implementation
 * 1. Extract lessonId from URL parameters using useParams()
 * 2. Use useMemo for expensive data transformations (activeLesson calculation)
 * 3. Implement useState for UI state management (activeTab)
 * 4. Use useEffect for side effects (document title updates)
 * 5. Compose UI using established component library
 * 6. Handle error states with graceful fallbacks
 *
 * @tabs
 * The page features three main tabs:
 * - **Flashcards (Tab 0)**: Interactive vocabulary review with flip cards
 * - **Challenge (Tab 1)**: Multiple-choice quiz for vocabulary testing
 * - **Homework (Tab 2)**: Assignment instructions with word list
 *
 * @example
 * ```jsx
 * // URL: /bainur-vocabulary/1
 * // Process:
 * // 1. Extract lessonId = "1" from URL params
 * // 2. Find lesson in entrepreneurVocabularyData.lessons array
 * // 3. Render with tab-based content organization
 * // 4. Update document title for browser tab
 * ```
 */
export default function BainurVocabularyPage() {
    const { lessonId } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();

    const activeLesson = useMemo(() => {
        const id = parseInt(lessonId, 10);
        return entrepreneurVocabularyData.lessons.find(l => l.lesson === id);
    }, [lessonId]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        if (activeLesson) {
            document.title = `Bainur Vocab ${activeLesson.lesson} | ESL Lessons Hub`;
        }
    }, [activeLesson]);

    if (!activeLesson) {
        return <Navigate to="/" replace />;
    }

    const viewModes = ["Flashcards", "Challenge", "Homework"];

    return (
        <Box sx={{ width: '100%' }}>
            <Header lessonNumber={activeLesson.lesson} />

            <LessonTabs
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                sections={viewModes}
            />

            <Box sx={{ mt: 4 }}>
                {activeTab === 0 && (
                    <Fade in={true} key={`lesson-${activeLesson.lesson}-flashcards`}>
                        <div>
                            <ContentSelector
                                sectionData={activeLesson.words}
                                title={`Lesson ${activeLesson.lesson}: ${activeLesson.title}`}
                                description="Select a word from the buttons below.<br /><br />Click on the flashcard to flip it over to see its definition and a sample sentence."
                                detailRenderer={FlashcardRenderer}
                                theme={theme}
                            />
                        </div>
                    </Fade>
                )}

                {activeTab === 1 && (
                     <Fade in={true} key={`lesson-${activeLesson.lesson}-challenge`}>
                        <div>
                            <ChallengeView
                                lessonData={activeLesson}
                                theme={theme}
                            />
                        </div>
                    </Fade>
                )}

                {activeTab === 2 && (
                    <Fade in={true} key={`lesson-${activeLesson.lesson}-homework`}>
                        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                            <Paper sx={{ p: { xs: 3, sm: 4 } }}>
                                <Typography variant="h5" component="h3" textAlign="center" gutterBottom>
                                    Homework Assignment
                                </Typography>
                                <Typography variant="body1" textAlign="center" paragraph>
                                    For your homework, please write each of the {activeLesson.words.length} words from this lesson in your notebook. Next to each word, write your own original sentence using the word correctly.
                                </Typography>
                                <Typography variant="body1" textAlign="center" paragraph sx={{ mb: 4 }}>
                                    We will review your sentences together in our next class.
                                </Typography>

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

