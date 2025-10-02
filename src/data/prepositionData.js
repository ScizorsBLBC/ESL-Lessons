/**
 * @fileoverview Canonical JSON data for the "English Prepositions" lesson.
 * Content is structured using the defined schema, focusing on visual aids
 * like the concept map to reduce cognitive load.
 */

export const prepositionData = {
    "lessonId": "english-prepositions-essential-guide",
    "title": "Essential English Prepositions",
    "subtitle": "Mastering Location, Time, and Movement with At, On, In, To, and From.",
    "content": [
      // --- INTRODUCTORY CONTENT BLOCK ---
      {
        "blockId": "prepositions-intro-01",
        "type": "text",
        "data": {
          "htmlContent": "<h2>What Are Prepositions?</h2><p>Prepositions are small, functional words (like <strong>in</strong>, <strong>on</strong>, <strong>at</strong>, <strong>to</strong>) that establish a relationship between two words in a sentence. They typically link nouns, pronouns, or phrases to other parts of the sentence to show **location**, **time**, or **direction**.</p><p>While the rules can be tricky, the core function is to add context. For example, knowing if a cat is <strong>on</strong>, <strong>in</strong>, or <strong>at</strong> the table changes the entire picture!</p><h3>Tips for Learning Prepositions</h3><ul><li>**Read and Listen:** Pay attention to how native speakers use prepositions in natural language.</li><li>**Context is Key:** Always learn them in phrases or sentences, not as single words.</li><li>**Visualize!** Use the concept map below to understand the core relationships visually.</li></ul>"
        }
      },
  
      // --- CONCEPT MAP VISUALIZATION (Cognitive Offloading) ---
      {
        "blockId": "prepositions-concept-map-02",
        "type": "conceptMap",
        "data": {
          "title": "Mapping Prepositional Concepts: At, On, In",
          "nodes": [
            { "id": "main-prep", "label": "Prepositions", "description": "Relate Nouns/Pronouns to Time, Place, or Movement." },
            { "id": "at", "label": "AT", "description": "Used for specific points in space or time. The most precise/narrow use." },
            { "id": "on", "label": "ON", "description": "Used for surfaces, days, and transportation methods (buses, trains)." },
            { "id": "in", "label": "IN", "description": "Used for enclosed spaces, large areas (cities/countries), months, and years. The least precise/broad use." },
            { "id": "place", "label": "PLACE", "description": "Where something is located." },
            { "id": "time", "label": "TIME", "description": "When something happens." }
          ],
          "links": [
            { "source": "main-prep", "target": "place", "label": "Classifies" },
            { "source": "main-prep", "target": "time", "label": "Classifies" },
  
            // Location Relationships (Place)
            { "source": "place", "target": "at", "label": "Specific Point (e.g., 'at the door')" },
            { "source": "place", "target": "on", "label": "Surface / Line (e.g., 'on the floor')" },
            { "source": "place", "target": "in", "label": "Enclosed Space / Area (e.g., 'in the city')" },
  
            // Time Relationships (Time)
            { "source": "time", "target": "at", "label": "Specific Hour (e.g., 'at 7 PM')" },
            { "source": "time", "target": "on", "label": "Days/Dates (e.g., 'on Monday')" },
            { "source": "time", "target": "in", "label": "Months/Years/Seasons (e.g., 'in August')" }
          ]
        },
        "accessibility": {
          "altText": "A concept map showing the hierarchical relationships between 'Prepositions' and the uses of 'At', 'On', and 'In' for Location and Time.",
          "longDescription": "The map starts with 'Prepositions' connecting to 'PLACE' and 'TIME'. Under PLACE and TIME, the prepositions AT, ON, and IN are listed, showing their relative precision: AT is for points, ON is for surfaces/days, and IN is for enclosed spaces/periods.",
          "dataTable": {
            "headers": ["Preposition", "Usage for PLACE", "Usage for TIME"],
            "rows": [
              ["AT", "Specific Point (at the corner, at the door)", "Specific Hour (at 5 o'clock)"],
              ["ON", "Surface (on the table, on the wall)", "Days/Dates (on Monday, on May 5th)"],
              ["IN", "Enclosed Space/Large Area (in the box, in Canada)", "Longer periods (in July, in 2025, in the morning)"]
            ]
          }
        }
      },
  
      // --- MOVEMENT PREPOSITIONS TEXT ---
      {
        "blockId": "prepositions-movement-03",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Prepositions of Movement: To and From</h3><p>Movement prepositions show **direction** or **origin**. They indicate a path or a change in location. The most common are <strong>to</strong> (showing destination) and <strong>from</strong> (showing origin).</p><ul><li><strong>TO:</strong> Direction toward a destination. *Example: We drove **to** the coast.*</li><li><strong>FROM:</strong> Indicating the starting point or origin. *Example: He is coming **from** the office.*</li></ul>"
        }
      },
  
      // --- PRACTICE QUIZ: FILL IN THE BLANKS ---
      {
        "blockId": "prepositions-practice-fill-blanks-04",
        "type": "fillInTheBlanks",
        "data": {
          "title": "Practice: Fill in the Blanks Challenge",
          "sentence": "The meeting starts _ 9:00 AM _ Monday. I need to get _ the office _ 8:30 AM, so I will take the train _ home. The train leaves _ Platform 3.",
          "words": ["at", "on", "to", "at", "from", "from", "at"]
        }
      },
  
      // --- EXPANDED QUIZ BLOCK (from old data) ---
      {
        "blockId": "prepositions-quiz-general-05",
        "type": "quiz",
        "data": {
          "title": "General Prepositions Quiz",
          "questions": [
            {
              "text": "The keys are _______ the drawer.",
              "answers": ["on", "at", "in"],
              "correctAnswer": "3",
              "messageForCorrectAnswer": "Correct! 'In' is used for enclosed spaces like a drawer.",
              "messageForIncorrectAnswer": "Try 'in'. Drawers are enclosed spaces."
            },
            {
              "text": "We have a holiday _______ December.",
              "answers": ["at", "on", "in"],
              "correctAnswer": "3",
              "messageForCorrectAnswer": "Perfect! 'In' is used for months.",
              "messageForIncorrectAnswer": "Months and years use 'in'."
            },
            {
              "text": "Are you going ______ the supermarket later?",
              "answers": ["to", "at", "in"],
              "correctAnswer": "1",
              "messageForCorrectAnswer": "Excellent! 'To' shows movement towards the supermarket.",
              "messageForIncorrectAnswer": "To show movement, use 'to'."
            },
            {
              "text": "He is ______ home.",
              "answers": ["at", "to", "in"],
              "correctAnswer": "1",
              "messageForCorrectAnswer": "Correct! 'At' shows he is already at the specific location.",
              "messageForIncorrectAnswer": "To show a general location or specific place, use 'at'."
            }
          ]
        }
      }
    ]
  };
  