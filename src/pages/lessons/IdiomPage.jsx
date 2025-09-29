import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Typography, Fade, useTheme, Button, Stack } from '@mui/material';
import { idiomData } from '../../data/idiomData.js';
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';
import DetailCard from '../../components/DetailCard';
import QuizComponent from '../../components/Quiz';
import GlassButtonWrapper from '../../components/GlassButtonWrapper';

// --- Helper Components ---
const Header = ({ lessonNumber }) => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      Interactive Idioms: Lesson {lessonNumber}
    </Typography>
    <Typography variant="h6" sx={{ color: 'text.primary' }}>
      Learn the stories behind common English idioms.
    </Typography>
  </Box>
);

const FlashcardRenderer = (item, theme) => `
    <div style="text-align: center;">
      <h3 style="font-size: 1.5em; font-weight: bold; color: ${theme.palette.text.primary};">${item.idiom}</h3>
      <p style="color: ${theme.palette.text.secondary};"><strong>Meaning:</strong> ${item.meaning}</p>
      <div style="margin-top: 1.5em; padding-top: 1em; border-top: 1px solid ${theme.palette.divider};">
        <h4 style="margin-bottom: 0.5em; color: ${theme.palette.text.primary};">Example Sentence:</h4>
        <p style="margin-top: 0; color: ${theme.palette.text.secondary};"><em>"${item.example}"</em></p>
      </div>
    </div>
`;

const StoryRenderer = (item, theme) => `
    <div style="text-align: center;">
      <h3 style="font-size: 1.5em; font-weight: bold; color: ${theme.palette.text.primary};">${item.idiom}</h3>
      <p style="color: ${theme.palette.text.secondary};"><strong>The Story Behind It:</strong> ${item.story}</p>
    </div>
`;

// --- Challenge View Component ---
const ChallengeView = ({ lessonData, theme }) => {
    // Create quiz data for all idioms in the lesson
    const quizData = useMemo(() => {
        const challengeSentences = [
            `I know he made a mistake, but it's his first day. Let's _______.`,
            `In this tourist town, souvenir shops are _______.`,
            `The weather is perfect for outdoor work, so we should _______ and finish the project.`
        ];

        // Create questions for all idioms
        const questions = lessonData.idioms.map((idiom, index) => {
            const currentSentence = challengeSentences[index] || challengeSentences[0];

            // Get 3 distractor idioms (excluding the correct one)
            const distractorIdioms = lessonData.idioms
                .filter(id => id.idiom !== idiom.idiom)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(id => id.idiom);

            // Create shuffled answers array (4 options total)
            const allAnswers = [idiom.idiom, ...distractorIdioms].sort(() => 0.5 - Math.random());

            // Find the 1-indexed position of the correct answer
            const correctAnswerIndex = allAnswers.indexOf(idiom.idiom) + 1;

            return {
                question: currentSentence.replace('_______', '________'),
                answers: allAnswers,
                correctAnswer: correctAnswerIndex.toString(),
                messageForCorrectAnswer: `Correct! "${idiom.idiom}" is the right idiom for this context.`,
                messageForIncorrectAnswer: `Not quite. The correct idiom is "${idiom.idiom}".`
            };
        });

        return {
            quizTitle: `Complete All Conversations`,
            questions: questions
        };
    }, [lessonData]);

    return <QuizComponent quizData={quizData} />;
};


// --- Main Page Component ---
export default function IdiomPage() {
    const { lessonId } = useParams();
    const [selectedIdiomIndex, setSelectedIdiomIndex] = useState(0);
    const [activeView, setActiveView] = useState(0);
    const theme = useTheme();

    const activeLesson = useMemo(() => {
        const id = parseInt(lessonId, 10);
        return idiomData.lessons.find(l => l.lesson === id);
    }, [lessonId]);

    const selectedIdiom = activeLesson?.idioms[selectedIdiomIndex];

    const handleIdiomSelect = (index) => {
        setSelectedIdiomIndex(index);
        setActiveView(0); // Reset to first view when changing idiom
    };

    const handleViewChange = (viewIndex) => {
        setActiveView(viewIndex);
    };

    useEffect(() => {
        if (activeLesson) {
            document.title = `Idioms Lesson ${activeLesson.lesson} | ESL Lessons Hub`;
        }
    }, [activeLesson]);

    if (!activeLesson) {
        return <Navigate to="/" replace />;
    }

    const idiomTabs = [...activeLesson.idioms.map((idiom, index) => `Idiom ${index + 1}`), "Challenge"];
    const viewModes = ["Meaning", "Story"];

    return (
        <Box sx={{ width: '100%' }}>
            <Header lessonNumber={activeLesson.lesson} />

            {/* Idiom/Challenge Selection Tabs */}
            <LessonTabs
                activeTab={selectedIdiomIndex}
                handleTabChange={(e, newValue) => handleIdiomSelect(newValue)}
                sections={idiomTabs}
            />

            {/* Only show view buttons if not on Challenge tab */}
            {selectedIdiomIndex < activeLesson.idioms.length && (
                <Box sx={{ mt: 4, mb: 3, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                        Choose a view for "{selectedIdiom?.idiom}":
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        flexWrap="wrap"
                        sx={{ maxWidth: '600px', mx: 'auto' }}
                    >
                        {viewModes.map((view, index) => (
                            <GlassButtonWrapper key={view} isActive={activeView === index}>
                                <Button
                                    onClick={() => handleViewChange(index)}
                                    sx={{
                                        color: theme.palette.secondary.main,
                                        minWidth: '120px',
                                        transition: 'all 0.2s ease-in-out',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover,
                                            color: theme.palette.primary.main,
                                            transform: 'scale(1.02)',
                                        },
                                    }}
                                >
                                    {view}
                                </Button>
                            </GlassButtonWrapper>
                        ))}
                    </Stack>
                </Box>
            )}

            <Box sx={{ mt: 4 }}>
                {/* Show content for individual idioms */}
                {selectedIdiomIndex < activeLesson.idioms.length && (
                    <>
                        {activeView === 0 && selectedIdiom && (
                            <Fade in={true}>
                                <div>
                                    <DetailCard content={`
                                        <div style="text-align: center;">
                                            <h3 style="font-size: 1.5em; font-weight: bold; color: ${theme.palette.text.primary};">${selectedIdiom.idiom}</h3>
                                            <p style="color: ${theme.palette.text.secondary};"><strong>Meaning:</strong> ${selectedIdiom.meaning}</p>
                                        </div>
                                    `} />
                                </div>
                            </Fade>
                        )}

                        {activeView === 1 && selectedIdiom && (
                            <Fade in={true}>
                                <div>
                                    <DetailCard content={`
                                        <div style="text-align: center;">
                                            <h3 style="font-size: 1.5em; font-weight: bold; color: ${theme.palette.text.primary};">${selectedIdiom.idiom}</h3>
                                            <p style="color: ${theme.palette.text.secondary};"><strong>Story:</strong> ${selectedIdiom.story}</p>
                                        </div>
                                    `} />
                                </div>
                            </Fade>
                        )}
                    </>
                )}

                {/* Show challenge for all idioms */}
                {selectedIdiomIndex === activeLesson.idioms.length && (
                    <Fade in={true}>
                        <div>
                            <ChallengeView lessonData={activeLesson} theme={theme} />
                        </div>
                    </Fade>
                )}
            </Box>
        </Box>
    );
}