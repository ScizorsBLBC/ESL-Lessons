// src/utils/textParser.js
// Dedicated utility for parsing news article text content

/**
 * Parses article content and separates homework sections
 * @param {string} fullText - The complete article text including homework
 * @param {number} level - The difficulty level (1, 3, or 6)
 * @returns {object} Parsed content with article text, instruction, questions, and writing prompt
 */
export const parseLevelContent = (fullText, level) => {
  if (!fullText) return { articleText: '', questions: '', instruction: '', writingPrompt: '' };

  // Look for "Homework:" section
  const homeworkIndex = fullText.indexOf('Homework:');
  if (homeworkIndex === -1) {
    return { articleText: fullText, questions: '', instruction: '', writingPrompt: '' };
  }

  // Split at "Homework:" - everything before is article text
  const articleText = fullText.substring(0, homeworkIndex).trim();

  // Get content after "Homework:"
  const afterHomework = fullText.substring(homeworkIndex + 'Homework:'.length).trim();

  // For Level 6, look for writing prompts
  if (level === 6) {
    return parseLevel6Content(articleText, afterHomework);
  }

  // For Level 1 and Level 3, extract questions and instruction
  return parseLevel1And3Content(articleText, afterHomework);
};

/**
 * Parses Level 6 content which includes writing prompts
 */
const parseLevel6Content = (articleText, afterHomework) => {
  // Look for actual writing prompt sections
  const writingPromptMarkers = ['Free Writing', 'Academic Writing', 'Writing Practice', 'writing practice'];
  let writingIndex = -1;

  for (const marker of writingPromptMarkers) {
    const index = afterHomework.toLowerCase().indexOf(marker.toLowerCase());
    if (index !== -1) {
      writingIndex = index;
      break;
    }
  }

  if (writingIndex !== -1) {
    // Split at the writing prompt section
    const beforeWriting = afterHomework.substring(0, writingIndex).trim();
    const writingPrompt = afterHomework.substring(writingIndex).trim();

    // Extract instruction and questions from before writing
    const { instruction, questions } = extractInstructionAndQuestions(beforeWriting);

    return { articleText, instruction, questions, writingPrompt };
  }

  // If no writing prompt section found, check if there's just questions
  const { instruction, questions } = extractInstructionAndQuestions(afterHomework);

  return { articleText, instruction, questions, writingPrompt: '' };
};

/**
 * Parses Level 1 and Level 3 content
 */
const parseLevel1And3Content = (articleText, afterHomework) => {
  const { instruction, questions } = extractInstructionAndQuestions(afterHomework);

  return { articleText, instruction, questions, writingPrompt: '' };
};

/**
 * Extracts instruction and questions from homework content
 */
const extractInstructionAndQuestions = (homeworkContent) => {
  const instructionMarkers = ['Write a full sentence', 'Write a full-sentence', 'Answer each question', 'Write full sentences', 'In your Vocab Notebook'];
  let instruction = '';
  let questions = homeworkContent;

  for (const marker of instructionMarkers) {
    const index = homeworkContent.toLowerCase().indexOf(marker.toLowerCase());
    if (index !== -1) {
      const parts = homeworkContent.split('\n');
      let instructionFound = false;

      for (let i = 0; i < parts.length; i++) {
        if (parts[i].toLowerCase().includes(marker.toLowerCase())) {
          instruction = parts[i].trim();
          questions = parts.slice(i + 1).join('\n').trim();
          instructionFound = true;
          break;
        }
      }

      if (instructionFound) break;
    }
  }

  return { instruction, questions };
};

/**
 * Converts raw article data to canonical schema format
 * @param {object} articleData - Raw article data from newsData.js
 * @param {number} level - The difficulty level
 * @returns {object} Article in canonical schema format
 */
export const transformArticleToCanonicalSchema = (articleData, level) => {
  const contentBlocks = [];

  // Get the already-parsed content from the data structure
  const articleText = articleData.fields[`Level ${level} Text`];
  const questions = articleData.fields[`Level ${level} Questions`];
  const instruction = articleData.fields[`Level ${level} Instruction`];
  const writingPrompt = articleData.fields[`Level ${level} Writing Prompt`];

  // Add article text block
  if (articleText) {
    contentBlocks.push({
      blockId: `${articleData.fields.Slug}-article-text`,
      type: 'text',
      data: {
        htmlContent: articleText
      },
      accessibility: {
        ariaLabel: `Level ${level} article text`
      }
    });
  }

  // Add comprehension questions block as formatted text
  if (questions) {
    // Format questions as an ordered list
    const formattedQuestions = questions.split('\n')
      .filter(line => line.trim())
      .map(line => `<li>${line.trim()}</li>`)
      .join('');

    // Include instruction if present
    const instructionHtml = instruction ?
      `<p style="margin-bottom: 1em; font-weight: bold; text-align: center; color: inherit;">${instruction}</p>` : '';

    const questionsHtml = `
      <h4 style="font-weight: bold; margin-bottom: 1em; color: inherit; text-align: center;">Comprehension Questions:</h4>
      ${instructionHtml}
      <ol style="list-style-position: inside; padding-left: 0; margin: 0; display: grid; gap: 1em;">
        ${formattedQuestions}
      </ol>
    `;

    contentBlocks.push({
      blockId: `${articleData.fields.Slug}-comprehension-questions`,
      type: 'text',
      data: {
        htmlContent: questionsHtml
      },
      accessibility: {
        ariaLabel: `Comprehension questions for level ${level}`
      }
    });
  }

  // Add writing prompt block for level 6
  if (writingPrompt && level === 6) {
    // Remove "Free Writing" from the beginning of the prompt if it exists
    const cleanWritingPrompt = writingPrompt.replace(/^Free Writing[\s\n]*/, '').trim();

    const writingPromptHtml = `
      <h4 style="font-weight: bold; margin-bottom: 1em; color: inherit; text-align: center;">Free Writing</h4>
      <p style="margin: 0; text-align: center;">${cleanWritingPrompt}</p>
    `;

    contentBlocks.push({
      blockId: `${articleData.fields.Slug}-writing-prompt`,
      type: 'text',
      data: {
        htmlContent: writingPromptHtml
      },
      accessibility: {
        ariaLabel: `Writing prompt for level ${level}`
      }
    });
  }

  return {
    lessonId: `${articleData.fields.Slug}-level-${level}`,
    title: articleData.fields.Headline,
    subtitle: `Level ${level} News Article`,
    content: contentBlocks
  };
};

/**
 * Transforms all articles for a specific level to canonical schema format
 * @param {array} articlesData - Array of article data from newsData.js
 * @param {number} level - The difficulty level
 * @returns {array} Array of articles in canonical schema format
 */
export const transformAllArticlesForLevel = (articlesData, level) => {
  return articlesData
    .filter(article => article.fields[`Level ${level} Text`])
    .map(article => transformArticleToCanonicalSchema(article, level));
};
