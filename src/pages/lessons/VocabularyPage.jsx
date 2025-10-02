import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Typography, Fade, Paper, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { vocabularyData } from '../../data/vocabularyData.js';
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';
import DetailCard from '../../components/DetailCard';
import QuizComponent from '../../components/Quiz';
import Flashcard from '../../components/Flashcard';

// --- Helper Components ---
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

// --- Main Page Component ---
export default function VocabularyPage() {
    const { lessonId } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();

    const activeLesson = useMemo(() => {
        const id = parseInt(lessonId, 10);
        const lessonInfo = vocabularyData.lessons.find(l => l.lesson === id);

        if (!lessonInfo) return null;

        // Find the appropriate pack based on lesson info
        const packSize = lessonInfo.packSize.toString();
        const packs = vocabularyData.vocabularyPacks[packSize] || [];

        // For now, use the first pack of the appropriate size
        // In a real implementation, this would map lesson numbers to specific packs
        const pack = packs.find(p => p.packId.includes(lessonInfo.lesson <= 3 ? '1' : '2')) || packs[0];

        if (!pack) return null;

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

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        if (activeLesson) {
            document.title = `Vocab ${activeLesson.lesson} | ESL Lessons Hub`;
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
                                title={`Lesson ${activeLesson.lesson}: Words`}
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
                                    For your homework, please write each of the 10 words from this lesson in your notebook. Next to each word, write your own original sentence using the word correctly.
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