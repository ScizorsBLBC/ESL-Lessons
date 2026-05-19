/**
 * Generate unique sample + challenge sentences for Olena PMP vocab using Gemini 3.1 Pro.
 *
 * Requires GEMINI_API_KEY in environment (or server/.env).
 *
 * Usage:
 *   node scripts/generate-olena-sentences-gemini.mjs
 *   node scripts/generate-olena-sentences-gemini.mjs --lesson=1
 *   node scripts/generate-olena-sentences-gemini.mjs --from=10 --to=15
 *
 * Then rebuild data:
 *   node scripts/generate-olena-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { PMP_CURRICULUM_MODULES, sortTermsByCurriculum } from './pmp-curriculum.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GLOSSARY_PATH = path.join(__dirname, 'olena-pm-glossary.txt');
const CACHE_PATH = path.join(__dirname, 'olena-ai-sentences.json');
const WORDS_PER_LESSON = 10;

const MODEL_CANDIDATES = (process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview,gemini-2.5-pro')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);
const THINKING_LEVEL = (process.env.GEMINI_THINKING_LEVEL || 'high').toLowerCase();
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

dotenv.config({ path: path.join(ROOT, '.env') });
dotenv.config({ path: path.join(ROOT, '.env.local') });
dotenv.config({ path: path.join(ROOT, 'server/.env') });

function loadGeminiApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  if (process.env.GOOGLE_API_KEY) return process.env.GOOGLE_API_KEY;

  // Cursor: Settings → API Keys → Google (stored locally in state.vscdb)
  const cursorDb = path.join(
    process.env.HOME || '',
    'Library/Application Support/Cursor/User/globalStorage/state.vscdb',
  );
  if (fs.existsSync(cursorDb)) {
    try {
      const key = execSync(
        `sqlite3 ${JSON.stringify(cursorDb)} "SELECT value FROM ItemTable WHERE key='cursorAuth/googleKey';"`,
        { encoding: 'utf8' },
      ).trim();
      if (key) {
        console.log('Using Google API key from Cursor settings');
        return key;
      }
    } catch {
      // fall through
    }
  }
  return null;
}

const apiKey = loadGeminiApiKey();

function displayTerm(term) {
  return term.replace(/\s*\[[^\]]+\]\s*/g, '').trim();
}

function stripSeeAlso(definition) {
  const idx = definition.indexOf(' See also ');
  return idx >= 0 ? definition.slice(0, idx).trim() : definition.replace(/\s*See also.*$/i, '').trim();
}

function parseGlossary(text) {
  const terms = [];
  for (const line of text.split('\n').map((l) => l.trim()).filter(Boolean)) {
    if (/^[A-Z]$/.test(line)) continue;
    const dotIdx = line.indexOf('. ');
    if (dotIdx < 0) continue;
    const term = line.slice(0, dotIdx).trim();
    let definition = line.slice(dotIdx + 2).trim();
    if (definition.toLowerCase().startsWith('see ')) {
      const ref = definition.replace(/^see\s+/i, '').replace(/\.$/, '');
      const refTerm = terms.find((t) => t.term.toLowerCase() === ref.toLowerCase());
      if (refTerm) definition = refTerm.definition;
    }
    terms.push({ term, definition: stripSeeAlso(definition) });
  }
  return terms;
}

function chunkByCurriculum(sortedTerms, size) {
  const chunks = [];
  let current = [];
  let currentModuleId = null;
  for (const term of sortedTerms) {
    const modId = term.curriculum.id;
    if (current.length > 0 && modId !== currentModuleId) {
      chunks.push(current);
      current = [];
    }
    if (current.length >= size) {
      chunks.push(current);
      current = [];
    }
    current.push(term);
    currentModuleId = modId;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) {
    return {
      version: 2,
      model: MODEL_CANDIDATES[0],
      thinkingLevel: THINKING_LEVEL,
      generatedAt: null,
      byWord: {},
      lessonsCompleted: [],
    };
  }
  return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
}

function saveCache(cache) {
  cache.generatedAt = new Date().toISOString();
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1].trim() : text.trim();
  return JSON.parse(raw);
}

function validateEntry(word, entry) {
  const issues = [];
  if (!entry.sampleSentence || typeof entry.sampleSentence !== 'string') issues.push('missing sampleSentence');
  if (!entry.challengeSentence || typeof entry.challengeSentence !== 'string') issues.push('missing challengeSentence');
  if (entry.challengeSentence && !entry.challengeSentence.includes('_______')) {
    issues.push('challenge must contain exactly seven underscores _______');
  }
  if (entry.sampleSentence && entry.sampleSentence.length < 20) issues.push('sample too short');
  if (entry.challengeSentence && entry.challengeSentence.length < 25) issues.push('challenge too short');
  return issues;
}

function buildPrompt(lessonNum, lessonTitle, moduleTitle, words, priorChallenges) {
  const wordList = words
    .map((w) => {
      const word = displayTerm(w.term);
      return `- "${word}": ${w.definition}`;
    })
    .join('\n');

  const priorBlock =
    priorChallenges.length > 0
      ? `\nAvoid repeating these opening patterns or scenarios already used:\n${priorChallenges
          .slice(-40)
          .map((s) => `• ${s.slice(0, 100)}`)
          .join('\n')}\n`
      : '';

  return `You are an expert ESL instructor helping a Ukrainian professional prepare for the PMP exam while working as a project manager in the United States.

Write natural, grammatical American English sentences for Lesson ${lessonNum} ("${lessonTitle}") in the study module "${moduleTitle}".

TERMS (use the exact word/phrase shown as the quiz answer):
${wordList}
${priorBlock}
RULES:
1. Return ONLY valid JSON (no markdown outside the JSON object).
2. For each term, provide:
   - "word": exact term string from the list above
   - "sampleSentence": one clear example sentence using the term correctly in a realistic U.S. PM workplace context (25–45 words). The term should appear naturally in the sentence.
   - "challengeSentence": one fill-in-the-blank sentence with exactly seven underscores _______ where the student selects the term. When _______ is replaced by the term, the sentence must be grammatically correct and unambiguous (only that term should fit well).
3. Every challengeSentence in this lesson must use a DIFFERENT scenario (e.g., steering committee, sprint review, vendor negotiation, EVM report, phase gate, UAT, RAID log, change control, kickoff, etc.). Do not reuse the same sentence structure twice.
4. Use articles correctly (a/an/the). Match subject-verb agreement for plural terms like "acceptance criteria".
5. Do not define the term inside the challenge sentence; write as if speaking to a team on a real project.

JSON shape:
{
  "words": [
    {
      "word": "exact term",
      "sampleSentence": "...",
      "challengeSentence": "... _______ ..."
    }
  ]
}`;
}

function supportsThinking(model) {
  return /gemini-3|gemini-2\.5/.test(model);
}

async function callGemini(prompt, model) {
  const url = `${API_BASE}/models/${model}:generateContent`;
  const generationConfig = {
    temperature: 0.9,
    responseMimeType: 'application/json',
  };
  if (supportsThinking(model)) {
    generationConfig.thinkingConfig = { thinkingLevel: THINKING_LEVEL };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || res.statusText;
    const err = new Error(`Gemini API ${res.status}: ${msg}`);
    err.status = res.status;
    throw err;
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.map((p) => p.text || '').join('');
  if (!text) throw new Error('Empty response from Gemini');
  return { text, model };
}

async function callGeminiWithFallback(prompt) {
  let lastErr;
  for (const model of MODEL_CANDIDATES) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await callGemini(prompt, model);
      } catch (err) {
        lastErr = err;
        const is429 = err.status === 429;
        const waitMs = is429 ? 12000 * attempt : 2000 * attempt;
        if (is429 && MODEL_CANDIDATES.indexOf(model) < MODEL_CANDIDATES.length - 1) {
          console.warn(`  ${model}: quota/rate limit — trying next model`);
          break;
        }
        console.warn(`  ${model} attempt ${attempt} failed: ${err.message.slice(0, 120)}`);
        await new Promise((r) => setTimeout(r, waitMs));
      }
    }
  }
  throw lastErr;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { lesson: null, from: null, to: null };
  for (const arg of args) {
    if (arg.startsWith('--lesson=')) opts.lesson = Number(arg.split('=')[1]);
    if (arg.startsWith('--from=')) opts.from = Number(arg.split('=')[1]);
    if (arg.startsWith('--to=')) opts.to = Number(arg.split('=')[1]);
  }
  return opts;
}

function buildLessonTitle(words, modulePartCounts) {
  const primaryModule = words[0].curriculum;
  const modId = primaryModule.id;
  modulePartCounts[modId] = (modulePartCounts[modId] || 0) + 1;
  const part = modulePartCounts[modId];
  const first = displayTerm(words[0].term);
  const last = displayTerm(words[words.length - 1].term);
  const partLabel = part > 1 ? ` (Part ${part})` : '';
  return `${primaryModule.title}${partLabel}: ${first} – ${last}`;
}

async function main() {
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY. Add it to server/.env or .env.local');
    process.exit(1);
  }

  const opts = parseArgs();
  const raw = fs.readFileSync(GLOSSARY_PATH, 'utf8');
  const terms = sortTermsByCurriculum(parseGlossary(raw), displayTerm);
  const modulePartCounts = {};
  const lessonChunks = chunkByCurriculum(terms, WORDS_PER_LESSON);

  const lessons = lessonChunks.map((words, idx) => {
    const lessonNum = idx + 1;
    return {
      lessonNum,
      title: buildLessonTitle(words, modulePartCounts),
      module: words[0].curriculum.title,
      words,
    };
  });

  const cache = loadCache();
  const priorChallenges = Object.values(cache.byWord).map((e) => e.challengeSentence).filter(Boolean);

  let processed = 0;
  for (const lesson of lessons) {
    const { lessonNum, title, module, words } = lesson;
    if (opts.lesson != null && lessonNum !== opts.lesson) continue;
    if (opts.from != null && lessonNum < opts.from) continue;
    if (opts.to != null && lessonNum > opts.to) continue;
    if (cache.lessonsCompleted?.includes(lessonNum)) {
      console.log(`Skip lesson ${lessonNum} (already in cache)`);
      continue;
    }

    console.log(`\nLesson ${lessonNum}/${lessons.length}: ${title}`);
    const prompt = buildPrompt(lessonNum, title, module, words, priorChallenges);

    const { text, model: usedModel } = await callGeminiWithFallback(prompt);
    const parsed = extractJson(text);
    if (!cache.modelUsed) cache.modelUsed = usedModel;

    const entries = parsed.words || parsed;
    if (!Array.isArray(entries)) throw new Error('Response JSON must have a "words" array');

    const expected = new Set(words.map((w) => displayTerm(w.term)));
    for (const entry of entries) {
      const issues = validateEntry(entry.word, entry);
      if (issues.length) console.warn(`  ⚠ ${entry.word}: ${issues.join(', ')}`);
      if (!expected.has(entry.word)) {
        console.warn(`  ⚠ unexpected word in response: ${entry.word}`);
        continue;
      }
      cache.byWord[entry.word] = {
        sampleSentence: entry.sampleSentence.trim(),
        challengeSentence: entry.challengeSentence.trim(),
        lesson: lessonNum,
      };
      priorChallenges.push(entry.challengeSentence);
    }

    if (!cache.lessonsCompleted) cache.lessonsCompleted = [];
    cache.lessonsCompleted.push(lessonNum);
    cache.model = cache.modelUsed || MODEL_CANDIDATES[0];
    cache.thinkingLevel = THINKING_LEVEL;
    saveCache(cache);
    processed++;
    console.log(`  ✓ Saved ${entries.length} terms`);

    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\nDone. Processed ${processed} lesson(s). Cache: ${CACHE_PATH}`);
  console.log('Run: node scripts/generate-olena-data.mjs');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
