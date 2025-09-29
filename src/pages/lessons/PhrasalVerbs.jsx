// src/pages/lessons/PhrasalVerbs.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import LessonTabs from '../../components/LessonTabs';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import GlassButtonWrapper from '../../components/GlassButtonWrapper';
import TwoPaneLayout from '../../components/TwoPaneLayout';
import { phrasalVerbData } from '../../data/phrasalVerbData.js';

// Header component for consistent styling
const Header = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      {phrasalVerbData.title}
    </Typography>
    <Typography variant="h6" sx={{ color: 'text.primary' }}>
      {phrasalVerbData.subtitle}
    </Typography>
  </Box>
);

// Vocabulary section buttons component
const VocabularySectionButtons = ({ activeSection, onSectionChange }) => {
  const sections = [
    { key: 'communication', label: 'Communication' },
    { key: 'socializing', label: 'Socializing' },
    { key: 'business', label: 'Work & Business' },
    { key: 'travel', label: 'Travel' },
    { key: 'action', label: 'Starting & Stopping' },
    { key: 'thinking', label: 'Thinking' },
    { key: 'problems', label: 'Problems' },
    { key: 'daily', label: 'Daily Life' },
    { key: 'finance', label: 'Finance' },
    { key: 'general', label: 'General' }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Choose a vocabulary section:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {sections.map((section) => (
          <Grid item key={section.key}>
            <GlassButtonWrapper>
              <Box
                component="button"
                onClick={() => onSectionChange(section.key)}
                sx={{
                  px: 3,
                  py: 2,
                  border: 'none',
                  borderRadius: 2,
                  cursor: 'pointer',
                  backgroundColor: activeSection === section.key ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  color: 'secondary.main',
                  fontWeight: activeSection === section.key ? 'bold' : 'normal',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {section.label}
              </Box>
            </GlassButtonWrapper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Practice section buttons component
const PracticeSectionButtons = ({
  activeSection,
  onSectionChange,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  totalFlashcards,
  setShowFlashcardBack
}) => {
  const sections = [
    { key: 'gap-fill', label: 'Gap Fill Exercises' },
    { key: 'quiz', label: 'Phrasal Verbs Quiz' },
    { key: 'flashcard', label: 'Flashcards' },
    { key: 'practice', label: 'Contextual Practice' },
    { key: 'homework', label: 'Homework Assignment' }
  ];

  const handleNextFlashcard = () => {
    if (totalFlashcards > 0) {
      const randomIndex = Math.floor(Math.random() * totalFlashcards);
      setCurrentFlashcardIndex(randomIndex);
      setShowFlashcardBack(false); // Reset to show front of new flashcard
    }
  };


  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Choose a practice section:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {sections.map((section) => (
          <Grid item key={section.key}>
            <GlassButtonWrapper>
              <Box
                component="button"
                onClick={() => onSectionChange(section.key)}
                sx={{
                  px: 3,
                  py: 2,
                  border: 'none',
                  borderRadius: 2,
                  cursor: 'pointer',
                  backgroundColor: activeSection === section.key ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  color: 'secondary.main',
                  fontWeight: activeSection === section.key ? 'bold' : 'normal',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {section.label}
              </Box>
            </GlassButtonWrapper>
          </Grid>
        ))}
      </Grid>

      {activeSection === 'flashcard' && totalFlashcards > 0 && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <GlassButtonWrapper>
            <Button
              onClick={handleNextFlashcard}
              variant="contained"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'secondary.main',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              Next Flashcard ({currentFlashcardIndex + 1} of {totalFlashcards})
            </Button>
          </GlassButtonWrapper>
        </Box>
      )}

    </Box>
  );
};

export default function PhrasalVerbs() {
  useEffect(() => {
    document.title = `${phrasalVerbData.title} | ESL Lessons`;
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const [activeVocabSection, setActiveVocabSection] = useState('communication');
  const [activePracticeSection, setActivePracticeSection] = useState('gap-fill');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcardBack, setShowFlashcardBack] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [gapFillQuestions, setGapFillQuestions] = useState([]);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  // Create stable onFlip function
  const handleFlipFlashcard = useCallback(() => {
    setShowFlashcardBack(prev => !prev);
  }, []);

  const { content } = phrasalVerbData;

  // Parse vocabulary data to create flashcards
  const vocabularyFlashcards = useMemo(() => {
    const flashcards = [];

    // Get all vocabulary sections
    const vocabSections = content.filter(block => {
      const blockId = block.blockId.toLowerCase();
      return blockId.includes('-vocab');
    });

    // Get all individual flashcard blocks
    const flashcardBlocks = content.filter(block => block.type === 'flashcard');

    // Get chart data as additional source
    const chartBlocks = content.filter(block => block.type === 'chart');

    // Process vocabulary sections first (highest priority)
    vocabSections.forEach(section => {
      const htmlContent = section.data.htmlContent;
      // Extract phrasal verb pairs from HTML content
      // Pattern: <strong>Phrasal Verb</strong> – Definition.<br><em>Example: "Example sentence."</em>
      const pairs = htmlContent.match(/<strong>([^<]+)<\/strong>\s*–\s*([^<]+)(?:<br><em>Example:[^<]*<\/em>)?/g);

      if (pairs) {
        pairs.forEach(pair => {
          const match = pair.match(/<strong>([^<]+)<\/strong>\s*–\s*([^<]+)(?:<br><em>Example:[^<]*<\/em>)?/);
          if (match) {
            const definition = match[2].trim();
            const exampleMatch = pair.match(/<em>Example:\s*"([^"]*)"<\/em>/);
            const example = exampleMatch ? exampleMatch[1] : '';

            flashcards.push({
              front: match[1].trim(),
              back: example ?
                `${definition}\n\nExample: "${example}"` :
                definition
            });
          }
        });
      }
    });

    // Process all text content for phrasal verbs in <strong> tags
    const textBlocks = content.filter(block => block.type === 'text');
    textBlocks.forEach(block => {
      if (block.data && block.data.htmlContent) {
        const htmlContent = block.data.htmlContent;
        // Extract phrasal verbs from <strong> tags in text content with definitions and examples
        const patterns = [
          /<strong>([^<]+)<\/strong>\s*–\s*([^<]+)(?:<br><em>Example:\s*"([^"]*)"<\/em>)?/g,
          /<strong>([^<]+)<\/strong>/g
        ];

        patterns.forEach(pattern => {
          const matches = htmlContent.match(pattern);
          if (matches) {
            matches.forEach(match => {
              const verbMatch = match.match(/<strong>([^<]+)<\/strong>/);
              if (verbMatch) {
                const verb = verbMatch[1].trim();
                // Only include if it looks like a phrasal verb
                if (verb.includes(' ') || verb.toLowerCase().includes('up') || verb.toLowerCase().includes('down') ||
                    verb.toLowerCase().includes('in') || verb.toLowerCase().includes('out') ||
                    verb.toLowerCase().includes('on') || verb.toLowerCase().includes('off') ||
                    verb.toLowerCase().includes('over') || verb.toLowerCase().includes('under')) {

                  const defMatch = match.match(/<strong>[^<]+<\/strong>\s*–\s*([^<]+)(?:<br><em>Example:|$)/);
                  const definition = defMatch ? defMatch[1].trim() : `Phrasal verb: ${verb}`;

                  const exampleMatch = match.match(/<em>Example:\s*"([^"]*)"<\/em>/);
                  const example = exampleMatch ? exampleMatch[1] : '';

                  flashcards.push({
                    front: verb,
                    back: example ?
                      `${definition}\n\nExample: "${example}"` :
                      definition
                  });
                }
              }
            });
          }
        });
      }
    });

    // Process individual flashcard blocks
    flashcardBlocks.forEach(block => {
      if (block.data && block.data.front && block.data.back) {
        // Extract phrasal verb from front (remove HTML tags and get the verb)
        const frontText = block.data.front.replace(/<[^>]*>/g, '').trim();
        const phrasalVerb = frontText.replace(/^(Put|Call|Carry|Deal|Fill|Hand|Hold|Set|Work)\s+/, '');

        flashcards.push({
          front: phrasalVerb || frontText,
          back: block.data.back.replace(/<[^>]*>/g, '').trim()
        });
      }
    });

    // Process chart data as additional source
    chartBlocks.forEach(block => {
      if (block.data && block.data.rows) {
        block.data.rows.forEach(row => {
          if (row.length >= 2) {
            flashcards.push({
              front: row[0], // Phrasal verb
              back: `${row[1]}${row.length > 2 ? ` - ${row[2]}` : ''}` // Meaning + example if available
            });
          }
        });
      }
    });

    // Remove duplicates based on front text
    const uniqueFlashcards = flashcards.filter((card, index, self) =>
      index === self.findIndex(c => c.front === card.front)
    );

    return uniqueFlashcards;
  }, [content]);

  // Parse vocabulary data for quiz (same format as flashcards)
  const quizVocabulary = useMemo(() => {
    const quizItems = [];

    // Get all vocabulary sections
    const vocabSections = content.filter(block => {
      const blockId = block.blockId.toLowerCase();
      return blockId.includes('-vocab');
    });

    vocabSections.forEach(section => {
      const htmlContent = section.data.htmlContent;
      // Extract phrasal verb pairs from HTML content
      // Pattern: <strong>Phrasal Verb</strong> – Definition.
      const pairs = htmlContent.match(/<strong>([^<]+)<\/strong>\s*–\s*([^.<]+)\.?/g);

      if (pairs) {
        pairs.forEach(pair => {
          const match = pair.match(/<strong>([^<]+)<\/strong>\s*–\s*([^.<]+)\.?/);
          if (match) {
            quizItems.push({
              phrasalVerb: match[1].trim(),
              meaning: match[2].trim()
            });
          }
        });
      }
    });

    return quizItems;
  }, [content]);

  // Parse gap fill data
  const gapFillData = useMemo(() => {
    const gapFillBlock = content.find(block => block.blockId === 'assessment-gap-fill');
    if (!gapFillBlock || gapFillBlock.type !== 'fillInTheBlanks') {
      return [];
    }

    const sentences = gapFillBlock.data.sentences;
    if (!Array.isArray(sentences)) {
      return [];
    }

    return sentences.map((item, index) => {
      // Handle both the simple format and the nested format
      if (typeof item === 'object' && item.text && item.options && item.correctAnswer) {
        return {
          id: index,
          text: item.text,
          options: item.options,
          correctAnswer: item.correctAnswer
        };
      }
      // Fallback for the old format
      return {
        id: index,
        text: item.text || '',
        options: item.options || [],
        correctAnswer: item.correctAnswer || ''
      };
    });
  }, [content]);

  // Generate 20 random quiz questions
  const generateQuizQuestions = useCallback(() => {
    if (quizVocabulary.length < 3) {
      return []; // Need at least 3 items for a proper quiz
    }

    const questions = [];
    const usedIndices = new Set();

    // Generate 20 unique questions
    for (let i = 0; i < 20 && usedIndices.size < quizVocabulary.length; i++) {
      let correctIndex;
      do {
        correctIndex = Math.floor(Math.random() * quizVocabulary.length);
      } while (usedIndices.has(correctIndex));

      usedIndices.add(correctIndex);
      const correctItem = quizVocabulary[correctIndex];

      // Get all meanings except the correct one
      const allMeanings = quizVocabulary
        .filter((_, index) => index !== correctIndex)
        .map(item => item.meaning);

      // Randomly select 2 incorrect meanings
      const incorrectMeanings = [];
      while (incorrectMeanings.length < 2) {
        const randomIndex = Math.floor(Math.random() * allMeanings.length);
        const meaning = allMeanings[randomIndex];
        if (!incorrectMeanings.includes(meaning)) {
          incorrectMeanings.push(meaning);
        }
      }

      // Create the answer options (correct + 2 incorrect)
      const answers = [correctItem.meaning, ...incorrectMeanings];

      // Shuffle the answers so the correct one isn't always first
      const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

      // Find the index of the correct answer in the shuffled array
      const correctAnswerIndex = shuffledAnswers.indexOf(correctItem.meaning);

      questions.push({
        question: `What does "${correctItem.phrasalVerb}" mean?`,
        questionType: "text",
        answers: shuffledAnswers,
        correctAnswer: (correctAnswerIndex + 1).toString(), // Convert to 1-based string
        messageForCorrectAnswer: "Great job! That's correct.",
        messageForIncorrectAnswer: `The correct answer is "${correctItem.meaning}". "${correctItem.phrasalVerb}" means "${correctItem.meaning}".`
      });
    }

    return questions;
  }, [quizVocabulary]);

  // Generate 20 random gap fill questions
  const generateGapFillQuestions = useCallback(() => {
    if (gapFillData.length < 3) {
      return []; // Need at least 3 items for a proper exercise
    }

    const questions = [];
    const usedIndices = new Set();

    // Generate 20 unique questions (or as many as available)
    const maxQuestions = Math.min(20, gapFillData.length);

    for (let i = 0; i < maxQuestions && usedIndices.size < gapFillData.length; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * gapFillData.length);
      } while (usedIndices.has(randomIndex));

      usedIndices.add(randomIndex);
      const gapFillItem = gapFillData[randomIndex];

      // Shuffle the options so the correct one isn't always first
      const shuffledOptions = [...gapFillItem.options].sort(() => Math.random() - 0.5);

      // Find the index of the correct answer in the shuffled array (1-based)
      const correctAnswerIndex = shuffledOptions.indexOf(gapFillItem.correctAnswer) + 1;

      questions.push({
        question: gapFillItem.text,
        questionType: "text",
        answers: shuffledOptions,
        correctAnswer: correctAnswerIndex.toString(), // Convert to 1-based string
        messageForCorrectAnswer: "Great job! That's correct.",
        messageForIncorrectAnswer: `The correct answer is "${gapFillItem.correctAnswer}".`
      });
    }

    return questions;
  }, [gapFillData]);


  // Filter content based on active tab
  const getFilteredContent = () => {
    switch (activeTab) {
      case 0: { // Introduction
        // Get intro blocks and return them as separate items for responsive layout
        const introBlocks = content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes('intro');
        });

        // Return intro blocks as they are - layout will be handled by responsive wrapper
        return introBlocks;
      }
      case 1: // Workplace Verbs
        return content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes('workplace');
        });
      case 2: { // Full Vocabulary
        // First get the main vocabulary section header
        const vocabHeader = content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes('vocabulary-section');
        });
        // Then get the specific vocabulary section based on activeVocabSection
        const vocabSection = content.filter(block => {
          const blockId = block.blockId.toLowerCase();
          return blockId.includes(activeVocabSection);
        });
        return [...vocabHeader, ...vocabSection];
      }
      case 3: { // Practice & Assess
        if (activePracticeSection === 'flashcard') {
          // For flashcards, create a custom flashcard from vocabulary data
          const currentFlashcard = vocabularyFlashcards[currentFlashcardIndex] || { front: 'No flashcards available', back: '' };
          return [{
            blockId: "dynamic-flashcard",
            type: "flashcard",
            data: {
              ...currentFlashcard,
              showBack: showFlashcardBack,
              onFlip: handleFlipFlashcard
            }
          }];
        } else if (activePracticeSection === 'quiz') {
          // For quiz, use the 20 generated questions
          if (quizQuestions.length === 0) {
            // Generate questions when quiz is first accessed
            const generatedQuestions = generateQuizQuestions();
            setQuizQuestions(generatedQuestions);
          }

          if (quizQuestions.length > 0) {
            return [{
              blockId: "dynamic-quiz",
              type: "quiz",
              data: {
                quizTitle: `Phrasal Verbs Quiz (20 Questions)`,
                quizSynopsis: "Test your knowledge of phrasal verbs",
                questions: quizQuestions
              }
            }];
          } else {
            return [{
              blockId: "dynamic-quiz",
              type: "text",
              data: {
                htmlContent: "<p>Not enough vocabulary items available for quiz. Please add more phrasal verbs to the vocabulary sections.</p>"
              }
            }];
          }
        } else if (activePracticeSection === 'gap-fill') {
          // For gap fill, use the 20 generated questions
          if (gapFillQuestions.length === 0) {
            // Generate questions when gap fill is first accessed
            const generatedQuestions = generateGapFillQuestions();
            setGapFillQuestions(generatedQuestions);
          }

          if (gapFillQuestions.length > 0) {
            return [{
              blockId: "dynamic-gap-fill",
              type: "quiz",
              data: {
                quizTitle: `Gap Fill Exercise (${gapFillQuestions.length} Questions)`,
                quizSynopsis: "Fill in the blank with the correct phrasal verb",
                questions: gapFillQuestions
              }
            }];
          } else {
            return [{
              blockId: "dynamic-gap-fill",
              type: "text",
              data: {
                htmlContent: "<p>Not enough gap fill exercises available. Please add more phrasal verb sentences to the gap fill section.</p>"
              }
            }];
          }
        } else {
          // Map practice sections to their corresponding content blocks
          const sectionMapping = {
            'practice': 'contextual-practice-text',
            'homework': 'homework-assignment-text'
          };

          const targetBlockId = sectionMapping[activePracticeSection];
          if (targetBlockId) {
            return content.filter(block => block.blockId === targetBlockId);
          }

          // Fallback to original logic for any other sections
          return content.filter(block => {
            const blockId = block.blockId.toLowerCase();
            return blockId.includes(`assessment-${activePracticeSection}`);
          });
        }
      }
      default:
        return content;
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <Box sx={{
      py: 4,
      px: { xs: 2, sm: 4, md: 6 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      <Header />

      <LessonTabs
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        sections={["Introduction", "Workplace Verbs", "Full Vocabulary", "Practice & Assess"]}
      />

      {activeTab === 2 && (
        <VocabularySectionButtons
          activeSection={activeVocabSection}
          onSectionChange={setActiveVocabSection}
        />
      )}

      {activeTab === 3 && (
        <PracticeSectionButtons
          activeSection={activePracticeSection}
          onSectionChange={setActivePracticeSection}
          currentFlashcardIndex={currentFlashcardIndex}
          setCurrentFlashcardIndex={setCurrentFlashcardIndex}
          totalFlashcards={vocabularyFlashcards.length}
          setShowFlashcardBack={setShowFlashcardBack}
        />
      )}

      <Box sx={{
        mt: 4,
        p: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        minHeight: '200px'
      }}>
        {activeTab === 0 && filteredContent.length > 0 ? (
          // Special handling for introduction tab with responsive layout
          <TwoPaneLayout
            pane1={<ContentBlockRenderer contentBlocks={[filteredContent[0]]} />}
            pane2={filteredContent[1] ? <ContentBlockRenderer contentBlocks={[filteredContent[1]]} /> : null}
          />
        ) : (
          <ContentBlockRenderer contentBlocks={filteredContent} />
        )}
      </Box>
    </Box>
  );
};