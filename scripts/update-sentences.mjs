import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { olenaVocabularyCurriculum, olenaVocabularyData } from '../src/data/olenaData.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateSentences(word, definition) {
  const prompt = `
    You are an Executive Business English Coach helping an ESL student prepare for the PMP exam. 
    Write a 'sampleSentence' and a 'challengeSentence' for the following vocabulary term.
    
    Term: "${word}"
    Definition: "${definition}"
    
    Rules:
    1. The context MUST be a realistic U.S. corporate/project management scenario (e.g., steering committee, sprint planning, procurement).
    2. Use clear, standard Business English suitable for an advanced ESL learner.
    3. The challengeSentence MUST contain exactly 7 underscores (_______) where the term should go.
    4. Provide ONLY a raw JSON object in the exact format below, with no markdown formatting, no backticks, and no extra text:
    {
      "sampleSentence": "...",
      "challengeSentence": "..."
    }
  `;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      const cleanJson = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      return JSON.parse(cleanJson);
    } catch (error) {
      const status = error?.status;
      const retriable = status === 429 || status === 503 || error instanceof SyntaxError;
      console.error(`Error generating sentences for "${word}" (attempt ${attempt}/5):`, error?.message || error);
      if (!retriable || attempt === 5) {
        return null;
      }
      await delay(2000 * attempt);
    }
  }
  return null;
}

async function processLessons() {
  console.log('Starting sentence generation...');
  const updatedData = JSON.parse(JSON.stringify(olenaVocabularyData)); 

  for (let i = 0; i < updatedData.lessons.length; i++) {
    const lesson = updatedData.lessons[i];
    console.log(`Processing Lesson ${lesson.lesson}: ${lesson.title}`);

    for (let j = 0; j < lesson.words.length; j++) {
      const currentWord = lesson.words[j];
      console.log(`  -> Updating: ${currentWord.word}`);

      const generatedData = await generateSentences(currentWord.word, currentWord.definition);

      if (generatedData) {
        currentWord.sampleSentence = generatedData.sampleSentence;
        currentWord.challengeSentence = generatedData.challengeSentence;
      }

      await delay(4000); 
    }
  }

  console.log('Finished processing all words. Assembling new file...');

  const fileContent = `/**
 * ESL Lessons Hub - Olena's Project Management Vocabulary Data (UPDATED)
 * PMI-style glossary terms for PMP exam preparation (U.S. project management context).
 */

export const olenaVocabularyCurriculum = ${JSON.stringify(olenaVocabularyCurriculum, null, 2)};

export const olenaVocabularyData = ${JSON.stringify(updatedData, null, 2)};
`;

  fs.writeFileSync('./src/data/olenaData_updated.js', fileContent, 'utf8');
  console.log('Success! Data written to src/data/olenaData_updated.js');
}

processLessons();
