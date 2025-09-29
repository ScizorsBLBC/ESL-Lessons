// src/data/schema.js
export const lessonSchema = `
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ESL Lesson Schema",
  "description": "The canonical data structure for all lesson content.",
  "type": "object",
  "properties": {
    "lessonId": { "type": "string", "pattern": "^[a-zA-Z0-9-]+$" },
    "title": { "type": "string" },
    "subtitle": { "type": "string" },
    "content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "blockId": { "type": "string" },
          "type": { "type": "string", "enum": ["text", "quiz", "fillInTheBlanks", "flashcard", "youtubeEmbed", "chart"] },
          "data": { "type": "object" }
        },
        "required": ["blockId", "type", "data"]
      }
    }
  },
  "required": ["lessonId", "title", "subtitle", "content"]
}
`;
