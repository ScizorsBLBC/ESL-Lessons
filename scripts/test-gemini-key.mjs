/**
 * Diagnose Gemini API key access (does not print the key).
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const db = path.join(process.env.HOME, 'Library/Application Support/Cursor/User/globalStorage/state.vscdb');
const key = process.env.GEMINI_API_KEY
  || process.env.GOOGLE_API_KEY
  || (fs.existsSync(db)
    ? execSync(`sqlite3 ${JSON.stringify(db)} "SELECT value FROM ItemTable WHERE key='cursorAuth/googleKey';"`, { encoding: 'utf8' }).trim()
    : '');

if (!key) {
  console.error('No API key found');
  process.exit(1);
}

const source = process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY env' : process.env.GOOGLE_API_KEY ? 'GOOGLE_API_KEY env' : 'Cursor settings';
console.log(`Key source: ${source} (length ${key.length}, prefix ${key.slice(0, 7)}...)`);

const modelsToTry = [
  'gemini-3.1-pro-preview',
  'gemini-3.1-pro-preview-customtools',
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
];

// List available models
try {
  const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const listData = await listRes.json();
  const proModels = (listData.models || [])
    .map((m) => m.name?.replace('models/', ''))
    .filter((n) => n && /gemini-(2\.5|3)/.test(n))
    .slice(0, 12);
  console.log('Available API models (sample):', proModels.join(', ') || '(none listed)');
} catch (e) {
  console.log('Could not list models:', e.message);
}

for (const model of modelsToTry) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const useThinking = /gemini-3|2\.5-pro/.test(model);
  try {
    const generationConfig = { responseMimeType: 'application/json' };
    if (useThinking) generationConfig.thinkingConfig = { thinkingLevel: 'high' };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Reply with JSON: {"ok":true}' }] }],
        generationConfig,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
      console.log(`✓ ${model}: OK — ${text.slice(0, 60)}`);
    } else {
      const msg = (data?.error?.message || res.statusText).replace(/\n/g, ' ').slice(0, 200);
      console.log(`✗ ${model}: ${res.status} — ${msg}`);
    }
  } catch (e) {
    console.log(`✗ ${model}: ${e.message}`);
  }
}
