/**
 * Vocabulary Exercise Service
 *
 * This service parses lesson content to automatically generate
 * flashcards, quizzes, and other practice exercises.
 *
 * Supports multiple data formats:
 * - Content blocks with HTML (phrasal verbs)
 * - Structured vocabulary data (vocabulary lessons)
 * - Structured idiom data (idiom lessons)
 */

/**
 * Parses content blocks to extract vocabulary items.
 * Assumes a convention of: <strong>Term</strong> – Definition.<br><em>Example: "..."</em>
 * @param {Array} contentBlocks - The content array from a lesson data file.
 * @returns {Array} An array of vocabulary objects, e.g., [{ term, definition, example }].
 */
const parseVocabulary = (contentBlocks) => {
    const vocabulary = [];
    const textBlocks = contentBlocks.filter(block => block.type === 'text');
  
    textBlocks.forEach(block => {
      const htmlContent = block.data.htmlContent || '';

      // Regex patterns for term-definition and examples
      const termDefRegex = /<strong>([^<]+)<\/strong>\s*–\s*([^<]+?)(?=<br><em>|$)/g;
      const exampleRegex = /<br><em>Example:\s*"([^"]*)"<\/em>/g;

      let match;
      while ((match = termDefRegex.exec(htmlContent)) !== null) {
        const term = match[1].trim();
        const definition = match[2].trim();

        // Look for example after this position
        const afterMatch = htmlContent.substring(match.index + match[0].length);
        const exampleMatch = exampleRegex.exec(afterMatch);

        const example = exampleMatch ? exampleMatch[1].trim() : '';

        vocabulary.push({
          term,
          definition,
          example
        });

        // Reset example regex for next search
        exampleRegex.lastIndex = 0;
      }
    });
  
    // Remove duplicates
    return vocabulary.filter((item, index, self) =>
      index === self.findIndex((t) => t.term === item.term)
    );
  };

/**
 * Parses structured vocabulary data from vocabularyData.js format.
 * @param {Object} vocabularyData - The vocabularyData object with lessons array.
 * @returns {Array} An array of vocabulary objects, e.g., [{ term, definition, example }].
 */
const parseVocabularyData = (vocabularyData) => {
  const vocabulary = [];

  if (!vocabularyData.lessons || !Array.isArray(vocabularyData.lessons)) {
    return vocabulary;
  }

  vocabularyData.lessons.forEach(lesson => {
    if (lesson.words && Array.isArray(lesson.words)) {
      lesson.words.forEach(word => {
        vocabulary.push({
          term: word.word,
          definition: word.definition,
          example: word.sampleSentence || word.challengeSentence || ''
        });
      });
    }
  });

  // Remove duplicates
  return vocabulary.filter((item, index, self) =>
    index === self.findIndex((t) => t.term === item.term)
  );
};

/**
 * Parses structured idiom data from idiomData.js format.
 * @param {Object} idiomData - The idiomData object with lessons array.
 * @returns {Array} An array of vocabulary objects, e.g., [{ term, definition, example }].
 */
const parseIdiomData = (idiomData) => {
  const vocabulary = [];

  if (!idiomData.lessons || !Array.isArray(idiomData.lessons)) {
    return vocabulary;
  }

  idiomData.lessons.forEach(lesson => {
    if (lesson.idioms && Array.isArray(lesson.idioms)) {
      lesson.idioms.forEach(idiom => {
        vocabulary.push({
          term: idiom.idiom,
          definition: idiom.meaning,
          example: idiom.example || '',
          story: idiom.story || ''
        });
      });
    }
  });

  // Remove duplicates
  return vocabulary.filter((item, index, self) =>
    index === self.findIndex((t) => t.term === item.term)
  );
};

/**
 * Parses structured preposition data from prepositionData.js format.
 * @param {Object} prepositionData - The prepositionData object with place, time, movement, other arrays.
 * @returns {Array} An array of vocabulary objects, e.g., [{ term, definition, example }].
 */
const parsePrepositionData = (prepositionData) => {
  const vocabulary = [];

  // Helper function to extract examples from HTML details
  const extractExamples = (details) => {
    const exampleMatch = details.match(/<ul[^>]*>(.*?)<\/ul>/s);
    if (exampleMatch) {
      const listItems = exampleMatch[1].match(/<li[^>]*>(.*?)<\/li>/g);
      return listItems ? listItems.map(li => li.replace(/<[^>]*>/g, '').trim()) : [];
    }
    return [];
  };

  // Process each category
  const categories = ['place', 'time', 'movement', 'other'];
  categories.forEach(category => {
    if (prepositionData[category] && Array.isArray(prepositionData[category])) {
      prepositionData[category].forEach(preposition => {
        if (preposition.name && preposition.details) {
          // Extract meaning from the HTML
          const meaningMatch = preposition.details.match(/<p[^>]*><strong>Meaning:<\/strong>(.*?)<\/p>/);
          const meaning = meaningMatch ? meaningMatch[1].replace(/<[^>]*>/g, '').trim() : '';

          // Extract examples
          const examples = extractExamples(preposition.details);

          vocabulary.push({
            term: preposition.name,
            definition: meaning,
            example: examples.length > 0 ? examples[0] : ''
          });
        }
      });
    }
  });

  // Remove duplicates
  return vocabulary.filter((item, index, self) =>
    index === self.findIndex((t) => t.term === item.term)
  );
};

/**
 * Detects the data format and parses accordingly.
 * @param {*} data - The data to parse (contentBlocks, vocabularyData, or idiomData).
 * @returns {Array} An array of vocabulary objects.
 */
const parseVocabularyFromData = (data) => {
  // Check if it's contentBlocks array (phrasal verbs format)
  if (Array.isArray(data) && data.length > 0 && data[0].type) {
    return parseVocabulary(data);
  }

  // Check if it's vocabularyData format
  if (data && data.lessons && Array.isArray(data.lessons) && data.lessons[0] && data.lessons[0].words) {
    return parseVocabularyData(data);
  }

  // Check if it's idiomData format
  if (data && data.lessons && Array.isArray(data.lessons) && data.lessons[0] && data.lessons[0].idioms) {
    return parseIdiomData(data);
  }

  // Check if it's prepositionData format
  if (data && (data.place || data.time || data.movement || data.other)) {
    return parsePrepositionData(data);
  }

  // Default to empty array if format not recognized
  return [];
};
  
  /**
   * Generates an array of flashcard data objects.
   * @param {*} data - The data to parse (contentBlocks, vocabularyData, or idiomData).
   * @returns {Array} An array of objects for the Flashcard component.
   */
  export const generateFlashcards = (data) => {
    const vocabulary = parseVocabularyFromData(data);
    return vocabulary.map(item => {
      const backContent = [
        `<p><strong>Meaning:</strong> ${item.definition}</p>`,
        item.example ? `<p><em>Example: "${item.example}"</em></p>` : '',
        item.story ? `<p><strong>Story:</strong> ${item.story}</p>` : ''
      ].filter(Boolean).join('');

      return {
        front: `<h3>${item.term}</h3>`,
        back: backContent
      };
    });
  };
  
  /**
   * Generates a full quiz object with randomized questions and distractors.
   * @param {*} data - The data to parse (contentBlocks, vocabularyData, or idiomData).
   * @param {string} quizTitle - The title for the quiz.
   * @param {number} questionCount - The number of questions to generate.
   * @returns {Object} A quiz data object compatible with the QuizComponent.
   */
  export const generateQuiz = (data, quizTitle = "Vocabulary Quiz", questionCount = 20) => {
    const vocabulary = parseVocabularyFromData(data).filter(item => item.definition && item.definition.trim());
    if (vocabulary.length < 4) return null; // Not enough items for a quiz with distractors
  
    const questions = [];
    const usedIndices = new Set();
    const maxQuestions = Math.min(questionCount, vocabulary.length);
  
    while (questions.length < maxQuestions) {
      let correctIndex;
      do {
        correctIndex = Math.floor(Math.random() * vocabulary.length);
      } while (usedIndices.has(correctIndex));
      usedIndices.add(correctIndex);
  
      const correctItem = vocabulary[correctIndex];
      const distractors = vocabulary
        .filter((_, i) => i !== correctIndex)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(item => item.definition);
  
      const answers = [correctItem.definition, ...distractors].sort(() => 0.5 - Math.random());
      const correctAnswer = (answers.indexOf(correctItem.definition) + 1).toString();
  
      questions.push({
        question: `What is the meaning of "${correctItem.term}"?`,
        answers: answers,
        correctAnswer: correctAnswer,
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: `Not quite. The correct answer is: ${correctItem.definition}`
      });
    }
  
    return {
      quizTitle,
      questions,
    };
  };