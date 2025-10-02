/**
 * @fileoverview Defines the canonical JSON schema for all ESL Lesson data structures.
 * This schema is the single source of truth for the entire application, enforcing
 * the "data-driven" architecture and enabling universal rendering.
 */

// Core types used by all visualization blocks for accessibility data structure
const accessibilityBase = {
  type: "object",
  description: "Required accessibility metadata for complex blocks like visualizations.",
  properties: {
    altText: { type: "string", description: "A brief, descriptive alternative text for screen readers." },
    longDescription: { type: "string", description: "A detailed description of the visualization content/relationships." },
    dataTable: {
      type: "object",
      description: "A tabular representation of the visual data for accessibility and data export.",
      properties: {
        headers: { type: "array", items: { type: "string" } },
        rows: { type: "array", items: { type: "array", items: { type: "string" } } }
      },
      required: ["headers", "rows"]
    }
  },
  required: ["altText", "longDescription", "dataTable"]
};

// --- Block Definitions (for use in the main 'content' array) ---

// 1. Text Block
const textBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["text"] },
    data: {
      type: "object",
      properties: {
        htmlContent: { type: "string", description: "The core text content, expected to contain structured HTML (p, ul, strong, em, h2, etc.)" }
      },
      required: ["htmlContent"]
    }
  },
  required: ["blockId", "type", "data"]
};

// 2. Quiz Block
const quizBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["quiz"] },
    data: {
      type: "object",
      properties: {
        title: { type: "string" },
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              text: { type: "string" },
              answers: { type: "array", items: { type: "string" } },
              correctAnswer: { type: "string", description: "1-based index string (e.g., '1', '2') of the correct answer in the answers array." }
            },
            required: ["text", "answers", "correctAnswer"]
          }
        }
      },
      required: ["questions"]
    }
  },
  required: ["blockId", "type", "data"]
};

// 3. Fill-in-the-Blanks Block
const fillInTheBlanksBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["fillInTheBlanks"] },
    data: {
      type: "object",
      properties: {
        title: { type: "string" },
        // The sentence should use underscores to mark blanks, e.g., "I _ to the store _ morning."
        sentence: { type: "string" },
        // The words array contains the correct answers in order of the blanks.
        words: { type: "array", items: { type: "string" } }
      },
      required: ["sentence", "words"]
    }
  },
  required: ["blockId", "type", "data"]
};

// 4. Flashcard Block
const flashcardBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["flashcard"] },
    data: {
      type: "object",
      properties: {
        title: { type: "string" },
        cards: {
          type: "array",
          items: {
            type: "object",
            properties: {
              front: { type: "string" },
              back: { type: "string" }
            },
            required: ["front", "back"]
          }
        }
      },
      required: ["cards"]
    }
  },
  required: ["blockId", "type", "data"]
};

// 5. YouTube Embed Block
const youtubeEmbedBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["youtubeEmbed"] },
    data: {
      type: "object",
      properties: {
        embedUrl: { type: "string", format: "url", description: "The YouTube embed URL, e.g., 'https://www.youtube.com/embed/dQw4w9WgXcQ'" },
        title: { type: "string", description: "The title of the video for context and accessibility" }
      },
      required: ["embedUrl", "title"]
    }
  },
  required: ["blockId", "type", "data"]
};

// 6. Chart Block (for quantitative comparison/distribution)
const chartBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["chart"] },
    data: {
      type: "object",
      properties: {
        title: { type: "string" },
        chartType: { type: "string", enum: ["bar", "pie", "line"], default: "bar" },
        labels: { type: "array", items: { type: "string" }, description: "Labels for x-axis/segments (e.g., 'USA', 'China')" },
        datasets: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              data: { type: "array", items: { type: "number" } }
            },
            required: ["label", "data"]
          }
        }
      },
      required: ["title", "labels", "datasets"]
    },
    accessibility: accessibilityBase
  },
  required: ["blockId", "type", "data", "accessibility"]
};

// 7. Timeline Block (for sequence, duration, or history)
const timelineBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["timeline"] },
    data: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string", description: "Optional introductory text for the visualization." },
        timePoints: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              label: { type: "string" },
              position: { type: "number", minimum: 0, maximum: 100, description: "Position on the line (0=past/start, 100=future/end)" },
              contentHtml: { type: "string" }
            },
            required: ["id", "label", "position", "contentHtml"]
          }
        },
        timeSpans: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              label: { type: "string" },
              startPosition: { type: "number", minimum: 0, maximum: 100 },
              endPosition: { type: "number", minimum: 0, maximum: 100 },
              style: { type: "string", enum: ["solid", "dashed", "wavy"], default: "solid" },
              contentHtml: { type: "string" }
            },
            required: ["id", "label", "startPosition", "endPosition", "contentHtml"]
          }
        }
      },
      required: ["title"]
    },
    accessibility: accessibilityBase
  },
  required: ["blockId", "type", "data", "accessibility"]
};

// 8. Concept Map Block (for relationships and hierarchical ideas)
const conceptMapBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["conceptMap"] },
    data: {
      type: "object",
      properties: {
        title: { type: "string" },
        nodes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              label: { type: "string", description: "The concept name (e.g., 'Noun Clause')" },
              description: { type: "string", description: "A brief explanation/definition for the concept." }
            },
            required: ["id", "label", "description"]
          }
        },
        links: {
          type: "array",
          items: {
            type: "object",
            properties: {
              source: { type: "string", description: "ID of the source node" },
              target: { type: "string", description: "ID of the target node" },
              label: { type: "string", description: "The relationship phrase (e.g., 'is a type of', 'contains')" }
            },
            required: ["source", "target"]
          }
        }
      },
      required: ["title", "nodes", "links"]
    },
    accessibility: accessibilityBase
  },
  required: ["blockId", "type", "data", "accessibility"]
};

// 9. Flowchart Block (for processes and conditional logic)
const flowchartBlock = {
  type: "object",
  properties: {
    blockId: { type: "string" },
    type: { type: "string", enum: ["flowchart"] },
    data: {
      type: "object",
      properties: {
        title: { type: "string" },
        steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              label: { type: "string", description: "The title of the step." },
              content: { type: "string", description: "The main instruction or description." },
              type: { type: "string", enum: ["start", "process", "decision", "end"], default: "process" },
              nextStepId: { type: "string", description: "ID of the next step (for process/start). Required if not a decision/end." },
              // For decision nodes
              trueNextId: { type: "string", description: "ID of the next step if decision is true." },
              falseNextId: { type: "string", description: "ID of the next step if decision is false." }
            },
            required: ["id", "label", "content", "type"]
          }
        }
      },
      required: ["title", "steps"]
    },
    accessibility: accessibilityBase
  },
  required: ["blockId", "type", "data", "accessibility"]
};


/**
 * The full ESL Lesson Hub Schema.
 */
export const EslLessonSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ESL Lesson Schema",
  "description": "The canonical data structure for all lesson content.",
  "type": "object",
  "properties": {
    "lessonId": { "type": "string", "pattern": "^[a-zA-Z0-9-]+$", "description": "Unique, URL-safe ID for the lesson." },
    "title": { "type": "string", "description": "The main lesson title." },
    "subtitle": { "type": "string", "description": "A short, engaging subtitle." },
    "content": {
      "type": "array",
      "items": {
        "oneOf": [
          textBlock,
          quizBlock,
          fillInTheBlanksBlock,
          flashcardBlock,
          youtubeEmbedBlock,
          chartBlock,
          timelineBlock,
          conceptMapBlock,
          flowchartBlock
        ]
      },
      "description": "An ordered array of content blocks to be rendered sequentially."
    }
  },
  "required": ["lessonId", "title", "subtitle", "content"]
};
