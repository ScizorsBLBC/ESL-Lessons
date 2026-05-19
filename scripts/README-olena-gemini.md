# Olena PMP vocabulary — AI sentence generation

Quiz and flashcard sentences can be generated with **Gemini 3.1 Pro** (extended thinking) for unique, grammatically correct fill-in-the-blank questions.

## Setup

The script picks up your key in this order:

1. `GEMINI_API_KEY` or `GOOGLE_API_KEY` in `server/.env` / `.env.local`
2. **Cursor Settings → API Keys → Google** (read automatically on macOS)

Or add manually:

```bash
# server/.env
GEMINI_API_KEY=your_key_here
```

Optional:

```bash
GEMINI_MODEL=gemini-3.1-pro-preview
GEMINI_THINKING_LEVEL=high
```

## Generate all lessons (~48 API calls)

```bash
npm run generate:olena-ai
node scripts/generate-olena-data.mjs
```

Or in one step:

```bash
npm run generate:olena
```

## Generate a single lesson (testing)

```bash
node scripts/generate-olena-sentences-gemini.mjs --lesson=1
```

## Resume after interruption

Progress is saved in `scripts/olena-ai-sentences.json` after each lesson. Re-run the same command to skip completed lessons.

## Output

- Cache: `scripts/olena-ai-sentences.json` (gitignored)
- App data: `src/data/olenaData.js` (built by `generate-olena-data.mjs`)
