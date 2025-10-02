/**
 * ESL Lessons Hub - Vocabulary Data Structure
 *
 * This file contains the canonical vocabulary lesson data organized in a hierarchical
 * structure that supports multiple lesson formats and automatic exercise generation.
 *
 * Architecture Overview:
 * - Single vocabularyData object serves as the data source for all vocabulary lessons
 * - Hierarchical organization: lessons → packs → content blocks → individual items
 * - Supports both 5-word and 10-word lesson formats
 * - Each lesson contains multiple content types (text, flashcards, quizzes, etc.)
 * - Data structure designed for automatic exercise generation
 *
 * Key Features:
 * - 6 vocabulary lessons total (3 × 5-word packs + 3 × 10-word packs)
 * - 520 unique vocabulary words across all lessons
 * - Automatic flashcard and quiz generation from content
 * - Consistent data structure for component compatibility
 * - Extensible design for adding new vocabulary content
 *
 * Data Organization:
 * ```
 * vocabularyData = {
 *   lessonId: "unique-identifier",
 *   title: "Human-readable title",
 *   subtitle: "Descriptive subtitle",
 *   lessons: [lesson metadata array],
 *   vocabularyPacks: {
 *     "5": [5-word lesson packs],
 *     "10": [10-word lesson packs]
 *   }
 * }
 * ```
 *
 * Usage Patterns:
 * - Lesson pages extract lesson metadata and content by lessonId
 * - VocabularyService.js parses content for automatic exercise generation
 * - ContentBlockRenderer.jsx displays content blocks by type
 * - Components expect standardized data structures for consistency
 *
 * @fileoverview Vocabulary lesson data with hierarchical organization
 * @example
 * ```javascript
 * // Access vocabulary data in components
 * import { vocabularyData } from '../data/vocabularyData.js';
 *
 * // Get lesson metadata
 * const lesson = vocabularyData.lessons.find(l => l.lesson === 1);
 *
 * // Get vocabulary pack content
 * const pack = vocabularyData.vocabularyPacks['5'].find(p => p.packId === 'pack-1');
 *
 * // Use in lesson component
 * <ContentBlockRenderer content={pack.content} />
 * ```
 */

// ============================================================================
// VOCABULARY DATA STRUCTURE - Hierarchical lesson organization
// ============================================================================

export const vocabularyData = {
  "lessonId": "essential-english-vocabulary-base",
  "title": "Essential Academic and Business Vocabulary",
  "subtitle": "Expand your high-frequency word knowledge for professional communication.",
  /**
   * Lesson Metadata Array
   *
   * Defines the available vocabulary lessons and their basic properties.
   * Each lesson entry serves as a lookup table for routing and content loading.
   *
   * Lesson Structure:
   * - lesson: Sequential lesson number (1-6)
   * - title: Human-readable lesson title
   * - packSize: Number of words in this lesson (5 or 10)
   *
   * Lesson Organization:
   * - Lessons 1-3: 5-word packs for focused learning
   * - Lessons 4-6: 10-word packs for comprehensive practice
   * - Progressive difficulty and vocabulary complexity
   * - Each lesson maps to specific vocabulary packs
   *
   * @type {Array<{lesson: number, title: string, packSize: number}>}
   */
  "lessons": [
    { "lesson": 1, "title": "5-Word Pack 1", "packSize": 5 },
    { "lesson": 2, "title": "5-Word Pack 2", "packSize": 5 },
    { "lesson": 3, "title": "5-Word Pack 3", "packSize": 5 },
    { "lesson": 4, "title": "10-Word Pack 1", "packSize": 10 },
    { "lesson": 5, "title": "10-Word Pack 2", "packSize": 10 },
    { "lesson": 6, "title": "10-Word Pack 3", "packSize": 10 }
  ],

  /**
   * Vocabulary Packs Collection
   *
   * Contains the actual lesson content organized by pack size.
   * Each pack is a complete lesson with multiple content blocks that
   * support different learning activities and exercise types.
   *
   * Pack Organization:
   * - "5": Array of 5-word lesson packs (3 total)
   * - "10": Array of 10-word lesson packs (3 total)
   * - Each pack contains multiple content blocks (text, flashcards, etc.)
   * - Content blocks follow the canonical schema defined in schema.js
   *
   * Content Block Types:
   * - text: Instructional content and explanations
   * - flashcard: Vocabulary word-definition pairs
   * - quiz: Interactive vocabulary assessments
   * - fillInTheBlanks: Gap-fill exercises for practice
   *
   * @type {object}
   * @property {Array} 5 - 5-word lesson packs array
   * @property {Array} 10 - 10-word lesson packs array
   */
  "vocabularyPacks": {
    "5": [
      {
        "packId": "pack-1",
        "title": "5-Word Pack 1",
        /**
         * Lesson Content Blocks
         *
         * Each vocabulary pack contains multiple content blocks that provide
         * different types of learning experiences and exercises.
         *
         * Content Block Structure:
         * ```
         * content: [
         *   {
         *     blockId: "unique-identifier",
         *     type: "content-type",
         *     data: { content-specific data },
         *     accessibility?: { a11y metadata }
         *   }
         * ]
         * ```
         *
         * Typical Content Flow:
         * 1. Introduction text block (lesson overview)
         * 2. Flashcard block (vocabulary review)
         * 3. Quiz block (vocabulary assessment)
         * 4. Fill-in-the-blanks block (contextual practice)
         *
         * @type {Array}
         */
        "content": [
          {
            /**
             * Introduction Text Block
             *
             * Provides lesson overview and learning objectives.
             * Uses HTML content for rich formatting and structure.
             *
             * @type {object}
             */
            "blockId": "pack-1-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 1</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            /**
             * Flashcard Content Block
             *
             * Contains vocabulary word-definition pairs for interactive review.
             * Each flashcard has front (word) and back (definition + example) content.
             *
             * Flashcard Data Structure:
             * ```
             * {
             *   title: "Lesson Title",
             *   cards: [
             *     {
             *       front: "vocabulary word",
             *       back: "Definition: meaning. Example: sentence."
             *     }
             *   ]
             * }
             * ```
             *
             * @type {object}
             */
            "blockId": "pack-1-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 1)",
              "cards": [
                {
                  "front": "hierarchy",
                  "back": "Definition: A system in which members of an organization or society are ranked according to relative status or authority."
                },
                {
                  "front": "evolve",
                  "back": "Definition: To develop gradually from a simple to a more complex form."
                },
                {
                  "front": "couple",
                  "back": "Definition: Two individuals of the same sort considered together."
                },
                {
                  "front": "formula",
                  "back": "Definition: A mathematical relationship or rule expressed in symbols."
                },
                {
                  "front": "automate",
                  "back": "Definition: To convert (a process or facility) to be operated by largely automatic equipment."
                }
              ]
            }
          },
          {
            "blockId": "pack-1-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 1: Contextual Application",
              "sentence": "In the military, there is a clear _______ of command. Languages _______ over time, with new words being added and old ones falling out of use. It will only take a _______ of minutes to finish this task. There is no magic _______ for success; it requires hard work and dedication. We can _______ many repetitive tasks using software.",
              "words": [
                "hierarchy",
                "evolve",
                "couple",
                "formula",
                "automate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-2",
        "title": "5-Word Pack 2",
        "content": [
          {
            "blockId": "pack-2-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 2</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-2-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 2)",
              "cards": [
                {
                  "front": "final",
                  "back": "Definition: Coming at the end of a series."
                },
                {
                  "front": "identical",
                  "back": "Definition: Similar in every detail; exactly alike."
                },
                {
                  "front": "distinct",
                  "back": "Definition: Recognizably different in nature from something else of a similar type."
                },
                {
                  "front": "respond",
                  "back": "Definition: To say something in reply."
                },
                {
                  "front": "incorporate",
                  "back": "Definition: To take in or contain (something) as part of a whole; include."
                }
              ]
            }
          },
          {
            "blockId": "pack-2-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 2: Contextual Application",
              "sentence": "The _______ decision will be made by the board of directors. The two paintings looked _______ to the untrained eye. There is a _______ smell of garlic in the kitchen. It is important to _______ to emails in a timely manner. The new model will _______ several advanced safety features.",
              "words": [
                "final",
                "identical",
                "distinct",
                "respond",
                "incorporate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-3",
        "title": "5-Word Pack 3",
        "content": [
          {
            "blockId": "pack-3-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 3</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-3-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 3)",
              "cards": [
                {
                  "front": "similar",
                  "back": "Definition: Resembling without being identical."
                },
                {
                  "front": "medium",
                  "back": "Definition: An agency or means of doing something."
                },
                {
                  "front": "link",
                  "back": "Definition: A relationship between two things or situations, especially where one affects the other."
                },
                {
                  "front": "amend",
                  "back": "Definition: To make minor changes to (a text, piece of legislation, etc.) in order to make it fairer or more accurate."
                },
                {
                  "front": "community",
                  "back": "Definition: A group of people living in the same place or having a particular characteristic in common."
                }
              ]
            }
          },
          {
            "blockId": "pack-3-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 3: Contextual Application",
              "sentence": "I have had a _______ experience to the one you described. Art can be a _______ for expressing emotions. The police are trying to find a _______ between the two crimes. You may need to _______ your contract before signing it. There is a strong sense of _______ in our neighborhood.",
              "words": [
                "similar",
                "medium",
                "link",
                "amend",
                "community"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-4",
        "title": "5-Word Pack 4",
        "content": [
          {
            "blockId": "pack-4-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 4</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-4-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 4)",
              "cards": [
                {
                  "front": "compatible",
                  "back": "Definition: (of two things) able to exist or occur together without conflict."
                },
                {
                  "front": "emphasis",
                  "back": "Definition: Special importance, value, or prominence given to something."
                },
                {
                  "front": "edit",
                  "back": "Definition: To prepare (written material) for publication by correcting, condensing, or otherwise modifying it."
                },
                {
                  "front": "maximize",
                  "back": "Definition: To make as large or great as possible."
                },
                {
                  "front": "initial",
                  "back": "Definition: Existing or occurring at the beginning."
                }
              ]
            }
          },
          {
            "blockId": "pack-4-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 4: Contextual Application",
              "sentence": "Their personalities are not _______; they argue all the time. The teacher put _______ on the importance of studying for the exam. The director will _______ the film to create the final version. To _______ your chances of winning, you should practice every day. The _______ phase of the project will focus on research and planning.",
              "words": [
                "compatible",
                "emphasis",
                "edit",
                "maximize",
                "initial"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-5",
        "title": "5-Word Pack 5",
        "content": [
          {
            "blockId": "pack-5-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 5</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-5-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 5)",
              "cards": [
                {
                  "front": "constant",
                  "back": "Definition: Occurring continuously over a period of time."
                },
                {
                  "front": "apparent",
                  "back": "Definition: Clearly visible or understood; obvious."
                },
                {
                  "front": "forthcoming",
                  "back": "Definition: About to happen or appear."
                },
                {
                  "front": "aspect",
                  "back": "Definition: A particular part or feature of something."
                },
                {
                  "front": "appropriate",
                  "back": "Definition: Suitable or proper in the circumstances."
                }
              ]
            }
          },
          {
            "blockId": "pack-5-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 5: Contextual Application",
              "sentence": "He has been a _______ source of support for me. The _______ cause of the accident was a mechanical failure. The company has announced its _______ product launch. The most challenging _______ of the job is the long hours. His comment was not _______ for the serious occasion.",
              "words": [
                "constant",
                "apparent",
                "forthcoming",
                "aspect",
                "appropriate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-6",
        "title": "5-Word Pack 6",
        "content": [
          {
            "blockId": "pack-6-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 6</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-6-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 6)",
              "cards": [
                {
                  "front": "manipulate",
                  "back": "Definition: To handle or control (a tool, mechanism, etc.), typically in a skillful manner."
                },
                {
                  "front": "shift",
                  "back": "Definition: A slight change in position, direction, or tendency."
                },
                {
                  "front": "assist",
                  "back": "Definition: To help (someone), typically by doing a share of the work."
                },
                {
                  "front": "presume",
                  "back": "Definition: To suppose that something is the case on the basis of probability."
                },
                {
                  "front": "remove",
                  "back": "Definition: To take (something) away or off from the position occupied."
                }
              ]
            }
          },
          {
            "blockId": "pack-6-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 6: Contextual Application",
              "sentence": "He was accused of trying to _______ the stock market. The company is planning a _______ in its marketing strategy. The new software is designed to _______ users with their tasks. We should not _______ to know what is best for others. The government plans to _______ the old regulations.",
              "words": [
                "manipulate",
                "shift",
                "assist",
                "presume",
                "remove"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-7",
        "title": "5-Word Pack 7",
        "content": [
          {
            "blockId": "pack-7-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 7</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-7-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 7)",
              "cards": [
                {
                  "front": "restore",
                  "back": "Definition: To bring back (a previous right, practice, custom, or situation); reinstate."
                },
                {
                  "front": "objective",
                  "back": "Definition: A thing aimed at or sought; a goal."
                },
                {
                  "front": "proportion",
                  "back": "Definition: A part, share, or number considered in comparative relation to a whole."
                },
                {
                  "front": "appreciate",
                  "back": "Definition: To recognize the full worth of."
                },
                {
                  "front": "instance",
                  "back": "Definition: An example or single occurrence of something."
                }
              ]
            }
          },
          {
            "blockId": "pack-7-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 7: Contextual Application",
              "sentence": "They are working to _______ the old building to its original condition. My _______ is to graduate with honors. The _______ of students who go to college has increased in recent years. It is important to _______ the beauty of nature. This is a classic _______ of a company putting profits before people.",
              "words": [
                "restore",
                "objective",
                "proportion",
                "appreciate",
                "instance"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-8",
        "title": "5-Word Pack 8",
        "content": [
          {
            "blockId": "pack-8-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 8</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-8-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 8)",
              "cards": [
                {
                  "front": "consent",
                  "back": "Definition: Permission for something to happen or agreement to do something."
                },
                {
                  "front": "constitute",
                  "back": "Definition: To be (a part) of a whole."
                },
                {
                  "front": "index",
                  "back": "Definition: (in a book or set of books) an alphabetical list of names, subjects, etc., with references to the places where they occur."
                },
                {
                  "front": "dimension",
                  "back": "Definition: A measurable extent of a particular kind, such as length, breadth, depth, or height."
                },
                {
                  "front": "compensate",
                  "back": "Definition: To reduce or counteract (something unwelcome or unpleasant) by exerting an opposite force or effect."
                }
              ]
            }
          },
          {
            "blockId": "pack-8-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 8: Contextual Application",
              "sentence": "He gave his _______ to the medical procedure. These actions _______ a violation of the company’s policy. The stock market _______ fell sharply today. The problem has a political _______ as well as an economic one. The company will _______ its employees for their overtime work.",
              "words": [
                "consent",
                "constitute",
                "index",
                "dimension",
                "compensate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-9",
        "title": "5-Word Pack 9",
        "content": [
          {
            "blockId": "pack-9-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 9</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-9-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 9)",
              "cards": [
                {
                  "front": "primary",
                  "back": "Definition: Of chief importance; principal."
                },
                {
                  "front": "equivalent",
                  "back": "Definition: Equal in value, amount, function, meaning, etc."
                },
                {
                  "front": "significant",
                  "back": "Definition: Sufficiently great or important to be worthy of attention; noteworthy."
                },
                {
                  "front": "assume",
                  "back": "Definition: To suppose to be the case, without proof."
                },
                {
                  "front": "minimize",
                  "back": "Definition: To reduce (something, especially something undesirable) to the smallest possible amount or degree."
                }
              ]
            }
          },
          {
            "blockId": "pack-9-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 9: Contextual Application",
              "sentence": "The _______ cause of the accident is still under investigation. His silence was _______ to an admission of guilt. The discovery of penicillin was a _______ medical breakthrough. We should not _______ that everyone agrees with us. The company is trying to _______ its environmental impact.",
              "words": [
                "primary",
                "equivalent",
                "significant",
                "assume",
                "minimize"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-10",
        "title": "5-Word Pack 10",
        "content": [
          {
            "blockId": "pack-10-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 10</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-10-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 10)",
              "cards": [
                {
                  "front": "motive",
                  "back": "Definition: A reason for doing something, especially one that is hidden or not obvious."
                },
                {
                  "front": "medical",
                  "back": "Definition: Relating to the science or practice of medicine."
                },
                {
                  "front": "normal",
                  "back": "Definition: Conforming to a standard; usual, typical, or expected."
                },
                {
                  "front": "ethnic",
                  "back": "Definition: Relating to a population subgroup (within a larger or dominant national or cultural group) with a common national or cultural tradition."
                },
                {
                  "front": "perspective",
                  "back": "Definition: A particular attitude toward or way of regarding something; a point of view."
                }
              ]
            }
          },
          {
            "blockId": "pack-10-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 10: Contextual Application",
              "sentence": "His _______ for helping me was not entirely clear. He has a _______ condition that requires him to take medication every day. After the storm, life in the city slowly returned to _______. The restaurant serves _______ cuisine from around the world. It is important to consider the problem from different _______.",
              "words": [
                "motive",
                "medical",
                "normal",
                "ethnic",
                "perspective"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-11",
        "title": "5-Word Pack 11",
        "content": [
          {
            "blockId": "pack-11-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 11</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-11-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 11)",
              "cards": [
                {
                  "front": "induce",
                  "back": "Definition: To succeed in persuading or influencing (someone) to do something."
                },
                {
                  "front": "philosophy",
                  "back": "Definition: The study of the fundamental nature of knowledge, reality, and existence."
                },
                {
                  "front": "media",
                  "back": "Definition: The main means of mass communication (broadcasting, publishing, and the internet) regarded collectively."
                },
                {
                  "front": "purchase",
                  "back": "Definition: To acquire (something) by paying for it; buy."
                },
                {
                  "front": "straightforward",
                  "back": "Definition: Uncomplicated and easy to do or understand."
                }
              ]
            }
          },
          {
            "blockId": "pack-11-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 11: Contextual Application",
              "sentence": "The doctor tried to _______ labor. The company’s _______ is to put the customer first. The government has been accused of trying to control the _______. The company announced the _______ of a smaller rival. He is a _______ and honest person.",
              "words": [
                "induce",
                "philosophy",
                "media",
                "purchase",
                "straightforward"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-12",
        "title": "5-Word Pack 12",
        "content": [
          {
            "blockId": "pack-12-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 12</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-12-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 12)",
              "cards": [
                {
                  "front": "contrast",
                  "back": "Definition: The state of being strikingly different from something else, typically something in juxtaposition or close association."
                },
                {
                  "front": "partner",
                  "back": "Definition: A person who takes part in an undertaking with another or others, especially in a business or company with shared risks and profits."
                },
                {
                  "front": "labor",
                  "back": "Definition: Work, especially hard physical work."
                },
                {
                  "front": "found",
                  "back": "Definition: To establish or originate (an institution or organization), especially by providing an endowment."
                },
                {
                  "front": "cooperate",
                  "back": "Definition: To act jointly; work toward the same end."
                }
              ]
            }
          },
          {
            "blockId": "pack-12-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 12: Contextual Application",
              "sentence": "In _______ to his brother, he is very shy. The two companies have formed a strategic _______. The company has a shortage of skilled _______. He _______ a successful company at a young age. It is important that we all _______ to achieve our common goals.",
              "words": [
                "contrast",
                "partner",
                "labor",
                "found",
                "cooperate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-13",
        "title": "5-Word Pack 13",
        "content": [
          {
            "blockId": "pack-13-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 13</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-13-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 13)",
              "cards": [
                {
                  "front": "sole",
                  "back": "Definition: One and only."
                },
                {
                  "front": "mechanism",
                  "back": "Definition: A system of parts working together in a machine; a piece of machinery."
                },
                {
                  "front": "recover",
                  "back": "Definition: To return to a normal state of health, mind, or strength."
                },
                {
                  "front": "finite",
                  "back": "Definition: Having limits or bounds."
                },
                {
                  "front": "fluctuate",
                  "back": "Definition: To rise and fall irregularly in number or amount."
                }
              ]
            }
          },
          {
            "blockId": "pack-13-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 13: Contextual Application",
              "sentence": "Her _______ purpose in life is to help others. The government has put in place a _______ for resolving disputes. The police have recovered the stolen car. We have a _______ amount of time to complete this project. His mood seems to _______ from day to day.",
              "words": [
                "sole",
                "mechanism",
                "recover",
                "finite",
                "fluctuate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-14",
        "title": "5-Word Pack 14",
        "content": [
          {
            "blockId": "pack-14-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 14</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-14-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 14)",
              "cards": [
                {
                  "front": "fee",
                  "back": "Definition: A payment made to a professional person or to a professional or public body in exchange for advice or services."
                },
                {
                  "front": "convert",
                  "back": "Definition: To cause to change in form, character, or function."
                },
                {
                  "front": "advocate",
                  "back": "Definition: A person who publicly supports or recommends a particular cause or policy."
                },
                {
                  "front": "component",
                  "back": "Definition: A part or element of a larger whole, especially a part of a machine or vehicle."
                },
                {
                  "front": "communicate",
                  "back": "Definition: To share or exchange information, news, or ideas."
                }
              ]
            }
          },
          {
            "blockId": "pack-14-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 14: Contextual Application",
              "sentence": "There is an entrance _______ to the museum. He converted to a new religion. He _______ for a more peaceful solution to the conflict. Trust is a key _______ of a healthy relationship. We can _______ with people all over the world thanks to the internet.",
              "words": [
                "fee",
                "convert",
                "advocate",
                "component",
                "communicate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-15",
        "title": "5-Word Pack 15",
        "content": [
          {
            "blockId": "pack-15-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 15</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-15-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 15)",
              "cards": [
                {
                  "front": "seek",
                  "back": "Definition: To attempt to find (something)."
                },
                {
                  "front": "paradigm",
                  "back": "Definition: A typical example or pattern of something; a model."
                },
                {
                  "front": "sector",
                  "back": "Definition: An area or portion that is distinct from others."
                },
                {
                  "front": "derive",
                  "back": "Definition: To obtain something from (a specified source)."
                },
                {
                  "front": "assess",
                  "back": "Definition: To evaluate or estimate the nature, ability, or quality of."
                }
              ]
            }
          },
          {
            "blockId": "pack-15-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 15: Contextual Application",
              "sentence": "He came to the city to _______ his fortune. The company is a _______ of success in the industry. The company is a leader in the technology _______. She _______ great pleasure from her work. It is important to _______ the risks before making a decision.",
              "words": [
                "seek",
                "paradigm",
                "sector",
                "derive",
                "assess"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-16",
        "title": "5-Word Pack 16",
        "content": [
          {
            "blockId": "pack-16-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 16</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-16-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 16)",
              "cards": [
                {
                  "front": "adjacent",
                  "back": "Definition: Next to or adjoining something else."
                },
                {
                  "front": "abundant",
                  "back": "Definition: Existing or available in large quantities; plentiful."
                },
                {
                  "front": "distort",
                  "back": "Definition: To pull or twist out of shape."
                },
                {
                  "front": "core",
                  "back": "Definition: The part of something that is central to its existence or character."
                },
                {
                  "front": "dominate",
                  "back": "Definition: To have a commanding influence on; exercise control over."
                }
              ]
            }
          },
          {
            "blockId": "pack-16-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 16: Contextual Application",
              "sentence": "The park is _______ to the river. There was _______ evidence to support his claim. The media has been accused of _______ the facts. Honesty is one of his _______ values. He is a player who can _______ a game.",
              "words": [
                "adjacent",
                "abundant",
                "distort",
                "core",
                "dominate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-17",
        "title": "5-Word Pack 17",
        "content": [
          {
            "blockId": "pack-17-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 17</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-17-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 17)",
              "cards": [
                {
                  "front": "region",
                  "back": "Definition: An area or division, especially part of a country or the world having definable characteristics but not always fixed boundaries."
                },
                {
                  "front": "definite",
                  "back": "Definition: Clearly stated or decided; not vague or doubtful."
                },
                {
                  "front": "exploit",
                  "back": "Definition: To make full use of and derive benefit from (a resource)."
                },
                {
                  "front": "mutual",
                  "back": "Definition: (of a feeling or action) experienced or done by each of two or more parties toward the other or others."
                },
                {
                  "front": "route",
                  "back": "Definition: A way or course taken in getting from a starting point to a destination."
                }
              ]
            }
          },
          {
            "blockId": "pack-17-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 17: Contextual Application",
              "sentence": "He is the regional manager for the company. There has been a _______ improvement in his work. We need to _______ our natural resources in a sustainable way. We have a _______ respect for each other. The package is on its _______ to you.",
              "words": [
                "region",
                "definite",
                "exploit",
                "mutual",
                "route"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-18",
        "title": "5-Word Pack 18",
        "content": [
          {
            "blockId": "pack-18-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 18</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-18-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 18)",
              "cards": [
                {
                  "front": "colleague",
                  "back": "Definition: A person with whom one works in a profession or business."
                },
                {
                  "front": "consume",
                  "back": "Definition: To eat, drink, or ingest (food or drink)."
                },
                {
                  "front": "secure",
                  "back": "Definition: Fixed or fastened so as not to give way, become loose, or be lost."
                },
                {
                  "front": "accommodate",
                  "back": "Definition: (of physical space, especially a building) provide lodging or sufficient space for."
                },
                {
                  "front": "classic",
                  "back": "Definition: Judged over a period of time to be of the highest quality and outstanding of its kind."
                }
              ]
            }
          },
          {
            "blockId": "pack-18-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 18: Contextual Application",
              "sentence": "He is a well-respected _______ in the legal community. The fire _______ the entire building. He has a _______ job with a good salary. We will do our best to _______ your needs. He has a _______ car that he only drives on weekends.",
              "words": [
                "colleague",
                "consume",
                "secure",
                "accommodate",
                "classic"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-19",
        "title": "5-Word Pack 19",
        "content": [
          {
            "blockId": "pack-19-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 19</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-19-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 19)",
              "cards": [
                {
                  "front": "inevitable",
                  "back": "Definition: Certain to happen; unavoidable."
                },
                {
                  "front": "involve",
                  "back": "Definition: (of a situation or event) include (something) as a necessary part or result."
                },
                {
                  "front": "major",
                  "back": "Definition: Important, serious, or significant."
                },
                {
                  "front": "levy",
                  "back": "Definition: To impose (a tax, fee, or fine)."
                },
                {
                  "front": "commission",
                  "back": "Definition: An instruction, command, or duty given to a person or group of people."
                }
              ]
            }
          },
          {
            "blockId": "pack-19-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 19: Contextual Application",
              "sentence": "Change is an _______ part of life. He was involved in a car accident. He is a _______ figure in the world of art. The court can _______ a fine for contempt of court. The company pays its salespeople a _______ on every sale.",
              "words": [
                "inevitable",
                "involve",
                "major",
                "levy",
                "commission"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-20",
        "title": "5-Word Pack 20",
        "content": [
          {
            "blockId": "pack-20-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 20</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-20-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 20)",
              "cards": [
                {
                  "front": "restrict",
                  "back": "Definition: To put a limit on; keep under control."
                },
                {
                  "front": "integral",
                  "back": "Definition: Necessary to make a whole complete; essential or fundamental."
                },
                {
                  "front": "psychology",
                  "back": "Definition: The scientific study of the human mind and its functions, especially those affecting behavior in a given context."
                },
                {
                  "front": "behalf",
                  "back": "Definition: In the interests of a person, group, or principle."
                },
                {
                  "front": "consist",
                  "back": "Definition: To be composed or made up of."
                }
              ]
            }
          },
          {
            "blockId": "pack-20-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 20: Contextual Application",
              "sentence": "You need to _______ your calorie intake to lose weight. The engine is an _______ part of the car. The _______ of advertising is a fascinating subject. He accepted the award on _______ of the entire team. A healthy diet should _______ of a variety of foods.",
              "words": [
                "restrict",
                "integral",
                "psychology",
                "behalf",
                "consist"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-21",
        "title": "5-Word Pack 21",
        "content": [
          {
            "blockId": "pack-21-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 21</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-21-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 21)",
              "cards": [
                {
                  "front": "grade",
                  "back": "Definition: A particular level of rank, quality, proficiency, or value."
                },
                {
                  "front": "confer",
                  "back": "Definition: To grant or bestow (a title, degree, benefit, or right)."
                },
                {
                  "front": "obvious",
                  "back": "Definition: Easily perceived or understood; clear, self-evident, or apparent."
                },
                {
                  "front": "achieve",
                  "back": "Definition: To successfully bring about or reach (a desired objective, level, or result) by effort, skill, or courage."
                },
                {
                  "front": "evident",
                  "back": "Definition: Plain or obvious; clearly seen or understood."
                }
              ]
            }
          },
          {
            "blockId": "pack-21-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 21: Contextual Application",
              "sentence": "The beef is of the highest _______. The two leaders met to _______ on the current crisis. The answer to the question is _______. It is important to set goals and work to _______ them. The evidence of his guilt was _______.",
              "words": [
                "grade",
                "confer",
                "obvious",
                "achieve",
                "evident"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-22",
        "title": "5-Word Pack 22",
        "content": [
          {
            "blockId": "pack-22-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 22</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-22-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 22)",
              "cards": [
                {
                  "front": "deduce",
                  "back": "Definition: To arrive at (a fact or a conclusion) by reasoning; draw as a logical conclusion."
                },
                {
                  "front": "internal",
                  "back": "Definition: Of or situated on the inside."
                },
                {
                  "front": "document",
                  "back": "Definition: A piece of written, printed, or electronic matter that provides information or evidence or that serves as an official record."
                },
                {
                  "front": "exhibit",
                  "back": "Definition: To publicly display (a work of art or item of interest) in an art gallery or museum or at a trade fair."
                },
                {
                  "front": "parallel",
                  "back": "Definition: (of lines, planes, surfaces, or objects) side by side and having the same distance continuously between them."
                }
              ]
            }
          },
          {
            "blockId": "pack-22-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 22: Contextual Application",
              "sentence": "She _______ from his silence that he was angry. He suffered from _______ bleeding after the accident. It is important to _______ your sources when writing a research paper. He _______ great courage in the face of danger. There are some interesting _______ between the two novels.",
              "words": [
                "deduce",
                "internal",
                "document",
                "exhibit",
                "parallel"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-23",
        "title": "5-Word Pack 23",
        "content": [
          {
            "blockId": "pack-23-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 23</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-23-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 23)",
              "cards": [
                {
                  "front": "infrastructure",
                  "back": "Definition: The basic physical and organizational structures and facilities (e.g., buildings, roads, and power supplies) needed for the operation of a society or enterprise."
                },
                {
                  "front": "contemporary",
                  "back": "Definition: Living or occurring at the same time."
                },
                {
                  "front": "image",
                  "back": "Definition: A representation of the external form of a person or thing in art."
                },
                {
                  "front": "accustomed",
                  "back": "Definition: Customary or usual."
                },
                {
                  "front": "orient",
                  "back": "Definition: To align or position (something) relative to the points of a compass or other specified positions."
                }
              ]
            }
          },
          {
            "blockId": "pack-23-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 23: Contextual Application",
              "sentence": "The company is building a new _______ to support its growing business. The museum has a collection of _______ art. He has a very positive _______ of himself. She is _______ to getting her own way. The company is trying to _______ itself to the new market conditions.",
              "words": [
                "infrastructure",
                "contemporary",
                "image",
                "accustomed",
                "orient"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-24",
        "title": "5-Word Pack 24",
        "content": [
          {
            "blockId": "pack-24-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 24</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-24-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 24)",
              "cards": [
                {
                  "front": "mode",
                  "back": "Definition: A way or manner in which something occurs or is experienced, expressed, or done."
                },
                {
                  "front": "initiate",
                  "back": "Definition: To cause (a process or action) to begin."
                },
                {
                  "front": "precise",
                  "back": "Definition: Marked by exactness and accuracy of expression or detail."
                },
                {
                  "front": "flexible",
                  "back": "Definition: Capable of bending easily without breaking."
                },
                {
                  "front": "revenue",
                  "back": "Definition: Income, especially when of a company or organization and of a substantial nature."
                }
              ]
            }
          },
          {
            "blockId": "pack-24-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 24: Contextual Application",
              "sentence": "He is in a bad _______ today. He was _______ into the secret society. He is a very _______ and detail-oriented person. She has a _______ work schedule. The government gets most of its _______ from taxes.",
              "words": [
                "mode",
                "initiate",
                "precise",
                "flexible",
                "revenue"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-25",
        "title": "5-Word Pack 25",
        "content": [
          {
            "blockId": "pack-25-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 25</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-25-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 25)",
              "cards": [
                {
                  "front": "equate",
                  "back": "Definition: To consider (one thing) to be the same as or equivalent to another."
                },
                {
                  "front": "hypothesis",
                  "back": "Definition: A supposition or proposed explanation made on the basis of limited evidence as a starting point for further investigation."
                },
                {
                  "front": "factor",
                  "back": "Definition: A circumstance, fact, or influence that contributes to a result or outcome."
                },
                {
                  "front": "radical",
                  "back": "Definition: (especially of change or action) relating to or affecting the fundamental nature of something; far-reaching or thorough."
                },
                {
                  "front": "export",
                  "back": "Definition: To send (goods or services) to another country for sale."
                }
              ]
            }
          },
          {
            "blockId": "pack-25-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 25: Contextual Application",
              "sentence": "He _______ success with money. The _______ was not supported by the data. The weather was a major _______ in our decision to cancel the trip. He has some _______ ideas about how to solve the problem. The company is looking for new markets to _______ its products to.",
              "words": [
                "equate",
                "hypothesis",
                "factor",
                "radical",
                "export"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-26",
        "title": "5-Word Pack 26",
        "content": [
          {
            "blockId": "pack-26-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 26</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-26-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 26)",
              "cards": [
                {
                  "front": "entity",
                  "back": "Definition: A thing with distinct and independent existence."
                },
                {
                  "front": "define",
                  "back": "Definition: To state or describe exactly the nature, scope, or meaning of."
                },
                {
                  "front": "element",
                  "back": "Definition: A part or aspect of something abstract, especially one that is essential or characteristic."
                },
                {
                  "front": "enable",
                  "back": "Definition: To give (someone or something) the authority or means to do something; make it possible for."
                },
                {
                  "front": "scheme",
                  "back": "Definition: A large-scale systematic plan or arrangement for attaining a particular object or putting a particular idea into effect."
                }
              ]
            }
          },
          {
            "blockId": "pack-26-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 26: Contextual Application",
              "sentence": "The two organizations have merged to form a single _______. It is important to _______ your goals clearly. The movie has all the _______ of a classic thriller. The scholarship will _______ her to go to college. He was involved in a _______ to defraud the company.",
              "words": [
                "entity",
                "define",
                "element",
                "enable",
                "scheme"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-27",
        "title": "5-Word Pack 27",
        "content": [
          {
            "blockId": "pack-27-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 27</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-27-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 27)",
              "cards": [
                {
                  "front": "arbitrary",
                  "back": "Definition: Based on random choice or personal whim, rather than any reason or system."
                },
                {
                  "front": "error",
                  "back": "Definition: A mistake."
                },
                {
                  "front": "inspect",
                  "back": "Definition: To look at (someone or something) closely, typically to assess their condition or to discover any shortcomings."
                },
                {
                  "front": "transport",
                  "back": "Definition: To take or carry (people or goods) from one place to another by means of a vehicle, aircraft, or ship."
                },
                {
                  "front": "comply",
                  "back": "Definition: (of a person or group) to act in accordance with a wish or command."
                }
              ]
            }
          },
          {
            "blockId": "pack-27-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 27: Contextual Application",
              "sentence": "The rules of the game seemed _______ and unfair. It was an _______ to trust him. The health inspector will _______ the restaurant tomorrow. The company provides _______ for its employees. The company has been fined for failing to _______ with environmental laws.",
              "words": [
                "arbitrary",
                "error",
                "inspect",
                "transport",
                "comply"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-28",
        "title": "5-Word Pack 28",
        "content": [
          {
            "blockId": "pack-28-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 28</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-28-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 28)",
              "cards": [
                {
                  "front": "ignorant",
                  "back": "Definition: Lacking knowledge or awareness in general; uneducated or unsophisticated."
                },
                {
                  "front": "subordinate",
                  "back": "Definition: Lower in rank or position."
                },
                {
                  "front": "surplus",
                  "back": "Definition: An amount of something left over when requirements have been met; an excess of production or supply over demand."
                },
                {
                  "front": "subsequent",
                  "back": "Definition: Coming after something in time; following."
                },
                {
                  "front": "violate",
                  "back": "Definition: To break or fail to comply with (a rule or formal agreement)."
                }
              ]
            }
          },
          {
            "blockId": "pack-28-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 28: Contextual Application",
              "sentence": "It is _______ to believe that all stereotypes are true. In the army, you must obey the orders of your _______ officers. There is a _______ of food in the world, but many people are still hungry. In _______ years, the company grew to become a major player in the industry. The company has been accused of _______ human rights.",
              "words": [
                "ignorant",
                "subordinate",
                "surplus",
                "subsequent",
                "violate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-29",
        "title": "5-Word Pack 29",
        "content": [
          {
            "blockId": "pack-29-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 29</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-29-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 29)",
              "cards": [
                {
                  "front": "vehicle",
                  "back": "Definition: A thing used for transporting people or goods, especially on land, such as a car, truck, or cart."
                },
                {
                  "front": "cite",
                  "back": "Definition: To quote (a passage, book, or author) as evidence for or justification of an argument or statement, especially in a scholarly work."
                },
                {
                  "front": "tense",
                  "back": "Definition: (of a situation, etc.) stretched tight or rigid."
                },
                {
                  "front": "nonetheless",
                  "back": "Definition: In spite of that; nevertheless."
                },
                {
                  "front": "tense",
                  "back": "Definition: A set of forms taken by a verb to indicate the time (and sometimes the continuance or completeness) of the action in relation to the time of the utterance."
                }
              ]
            }
          },
          {
            "blockId": "pack-29-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 29: Contextual Application",
              "sentence": "The car is a very popular _______ of transportation. The lawyer _______ a previous case that was similar to her own. He was feeling _______ before his job interview. He was tired, but he went to the party _______. It is important to use the correct verb _______ when writing.",
              "words": [
                "vehicle",
                "cite",
                "tense",
                "nonetheless",
                "tense"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-30",
        "title": "5-Word Pack 30",
        "content": [
          {
            "blockId": "pack-30-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 30</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-30-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 30)",
              "cards": [
                {
                  "front": "furthermore",
                  "back": "Definition: In addition; besides (used to add a point to an argument)."
                },
                {
                  "front": "whereby",
                  "back": "Definition: By which."
                },
                {
                  "front": "uniform",
                  "back": "Definition: Remaining the same in all cases and at all times; unchanging in form or character."
                },
                {
                  "front": "preliminary",
                  "back": "Definition: Preceding or done in preparation for something fuller or more important."
                },
                {
                  "front": "successor",
                  "back": "Definition: A person or thing that succeeds another."
                }
              ]
            }
          },
          {
            "blockId": "pack-30-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 30: Contextual Application",
              "sentence": "I don’t want to go to the party; _______, I have a lot of work to do. He has a plan _______ he can make a lot of money. The company has a _______ policy for all its employees. He made some _______ remarks before starting his speech. The new model is the _______ to the best-selling car.",
              "words": [
                "furthermore",
                "whereby",
                "uniform",
                "preliminary",
                "successor"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-31",
        "title": "5-Word Pack 31",
        "content": [
          {
            "blockId": "pack-31-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 31</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-31-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 31)",
              "cards": [
                {
                  "front": "phenomenon",
                  "back": "Definition: A fact or situation that is observed to exist or happen, especially one whose cause or explanation is in question."
                },
                {
                  "front": "qualitative",
                  "back": "Definition: Relating to, measuring, or measured by the quality of something rather than its quantity."
                },
                {
                  "front": "implicit",
                  "back": "Definition: Suggested though not directly expressed."
                },
                {
                  "front": "precede",
                  "back": "Definition: To come before (something) in time."
                },
                {
                  "front": "route",
                  "back": "Definition: A way or course taken in getting from a starting point to a destination."
                }
              ]
            }
          },
          {
            "blockId": "pack-31-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 31: Contextual Application",
              "sentence": "The rise of social media is a recent _______. She has a _______ understanding of the subject, but she needs to learn more about the details. She has an _______ trust in her friends. The dark clouds _______ the storm. The package is on its _______ to you.",
              "words": [
                "phenomenon",
                "qualitative",
                "implicit",
                "precede",
                "route"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-32",
        "title": "5-Word Pack 32",
        "content": [
          {
            "blockId": "pack-32-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 32</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-32-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 32)",
              "cards": [
                {
                  "front": "so-called",
                  "back": "Definition: Of a kind that is generally so described, but that you think is not rightly so."
                },
                {
                  "front": "supplement",
                  "back": "Definition: Something that completes or enhances something else when added to it."
                },
                {
                  "front": "somewhat",
                  "back": "Definition: To a moderate extent or degree."
                },
                {
                  "front": "thereby",
                  "back": "Definition: By that means; as a result of that."
                },
                {
                  "front": "whereas",
                  "back": "Definition: In contrast or comparison with the fact that."
                }
              ]
            }
          },
          {
            "blockId": "pack-32-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 32: Contextual Application",
              "sentence": "He is one of those _______ artists who is more famous for his personality than for his work. The book includes a _______ with additional information. The weather is _______ colder today. The company cut its costs and _______ increased its profits. Some people like to travel, _______ others prefer to stay at home.",
              "words": [
                "so-called",
                "supplement",
                "somewhat",
                "thereby",
                "whereas"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-33",
        "title": "5-Word Pack 33",
        "content": [
          {
            "blockId": "pack-33-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 33</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-33-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 33)",
              "cards": [
                {
                  "front": "transmit",
                  "back": "Definition: To cause (something) to pass on from one place or person to another."
                },
                {
                  "front": "via",
                  "back": "Definition: By way of; through."
                },
                {
                  "front": "widespread",
                  "back": "Definition: Found or distributed over a large area or number of people."
                },
                {
                  "front": "eventual",
                  "back": "Definition: Occurring or existing at the end of a process or period of time."
                },
                {
                  "front": "plus",
                  "back": "Definition: With the addition of."
                }
              ]
            }
          },
          {
            "blockId": "pack-33-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 33: Contextual Application",
              "sentence": "The radio station will _______ the concert live. You can contact me _______ email. The disease is _______ in the region. He hopes for an _______ return to his home country. The job has a good salary, _______ excellent benefits.",
              "words": [
                "transmit",
                "via",
                "widespread",
                "eventual",
                "plus"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-34",
        "title": "5-Word Pack 34",
        "content": [
          {
            "blockId": "pack-34-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 34</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-34-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 34)",
              "cards": [
                {
                  "front": "analyst",
                  "back": "Definition: A person who conducts analysis."
                },
                {
                  "front": "confirm",
                  "back": "Definition: To establish the truth or correctness of (something previously believed, suspected, or feared to be the case)."
                },
                {
                  "front": "thesis",
                  "back": "Definition: A statement or theory that is put forward as a premise to be maintained or proved."
                },
                {
                  "front": "prospect",
                  "back": "Definition: The possibility or likelihood of some future event occurring."
                },
                {
                  "front": "revise",
                  "back": "Definition: To re-examine and make alterations to (written or printed matter)."
                }
              ]
            }
          },
          {
            "blockId": "pack-34-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 34: Contextual Application",
              "sentence": "The political _______ predicted that the election would be very close. The test results _______ that she has the disease. He is writing his doctoral _______ on the history of the internet. The company has good _______ for growth. The company has decided to _______ its business plan.",
              "words": [
                "analyst",
                "confirm",
                "thesis",
                "prospect",
                "revise"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-35",
        "title": "5-Word Pack 35",
        "content": [
          {
            "blockId": "pack-35-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 35</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-35-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 35)",
              "cards": [
                {
                  "front": "scenario",
                  "back": "Definition: A postulated sequence or development of events."
                },
                {
                  "front": "ultimate",
                  "back": "Definition: Being or happening at the end of a process; final."
                },
                {
                  "front": "acquire",
                  "back": "Definition: To buy or obtain (an asset or object) for oneself."
                },
                {
                  "front": "aid",
                  "back": "Definition: Help, typically of a practical nature."
                },
                {
                  "front": "chemical",
                  "back": "Definition: Relating to chemistry, or the interactions of substances as studied in chemistry."
                }
              ]
            }
          },
          {
            "blockId": "pack-35-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 35: Contextual Application",
              "sentence": "The movie is based on a _______ written by a famous author. He is the _______ authority on the subject. He has _______ a reputation for being a hard worker. She came to my _______ when I was in trouble. There was a _______ reaction between the two substances.",
              "words": [
                "scenario",
                "ultimate",
                "acquire",
                "aid",
                "chemical"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-36",
        "title": "5-Word Pack 36",
        "content": [
          {
            "blockId": "pack-36-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 36</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-36-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 36)",
              "cards": [
                {
                  "front": "cooperate",
                  "back": "Definition: To act jointly; work toward the same end."
                },
                {
                  "front": "complement",
                  "back": "Definition: A thing that completes or brings to perfection."
                },
                {
                  "front": "currency",
                  "back": "Definition: A system of money in general use in a particular country."
                },
                {
                  "front": "demonstrate",
                  "back": "Definition: To clearly show the existence or truth of (something) by giving proof or evidence."
                },
                {
                  "front": "ensure",
                  "back": "Definition: To make certain that (something) shall occur or be the case."
                }
              ]
            }
          },
          {
            "blockId": "pack-36-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 36: Contextual Application",
              "sentence": "It is important that we all _______ to achieve our common goals. The two partners _______ each other perfectly. The idea has gained _______ in recent years. The study _______ the effectiveness of the new drug. The company has taken steps to _______ the safety of its employees.",
              "words": [
                "cooperate",
                "complement",
                "currency",
                "demonstrate",
                "ensure"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-37",
        "title": "5-Word Pack 37",
        "content": [
          {
            "blockId": "pack-37-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 37</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-37-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 37)",
              "cards": [
                {
                  "front": "denote",
                  "back": "Definition: To be a sign of; indicate."
                },
                {
                  "front": "explicit",
                  "back": "Definition: Stated clearly and in detail, leaving no room for confusion or doubt."
                },
                {
                  "front": "exploit",
                  "back": "Definition: To make full use of and derive benefit from (a resource)."
                },
                {
                  "front": "guarantee",
                  "back": "Definition: A formal promise or assurance (typically in writing) that certain conditions will be fulfilled, especially that a product will be repaired or replaced if not of a specified quality and durability."
                },
                {
                  "front": "induce",
                  "back": "Definition: To succeed in persuading or influencing (someone) to do something."
                }
              ]
            }
          },
          {
            "blockId": "pack-37-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 37: Contextual Application",
              "sentence": "His silence _______ his disapproval. The movie contains _______ violence. We need to _______ our natural resources in a sustainable way. I can’t _______ that you will get the job. The doctor tried to _______ labor.",
              "words": [
                "denote",
                "explicit",
                "exploit",
                "guarantee",
                "induce"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-38",
        "title": "5-Word Pack 38",
        "content": [
          {
            "blockId": "pack-38-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 38</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-38-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 38)",
              "cards": [
                {
                  "front": "inevitable",
                  "back": "Definition: Certain to happen; unavoidable."
                },
                {
                  "front": "infrastructure",
                  "back": "Definition: The basic physical and organizational structures and facilities (e.g., buildings, roads, and power supplies) needed for the operation of a society or enterprise."
                },
                {
                  "front": "inspect",
                  "back": "Definition: To look at (someone or something) closely, typically to assess their condition or to discover any shortcomings."
                },
                {
                  "front": "manipulate",
                  "back": "Definition: To handle or control (a tool, mechanism, etc.), typically in a skillful manner."
                },
                {
                  "front": "minimize",
                  "back": "Definition: To reduce (something, especially something undesirable) to the smallest possible amount or degree."
                }
              ]
            }
          },
          {
            "blockId": "pack-38-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 38: Contextual Application",
              "sentence": "Change is an _______ part of life. The company is building a new _______ to support its growing business. The health inspector will _______ the restaurant tomorrow. He was accused of trying to _______ the stock market. The company is trying to _______ its environmental impact.",
              "words": [
                "inevitable",
                "infrastructure",
                "inspect",
                "manipulate",
                "minimize"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-39",
        "title": "5-Word Pack 39",
        "content": [
          {
            "blockId": "pack-39-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 39</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-39-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 39)",
              "cards": [
                {
                  "front": "nuclear",
                  "back": "Definition: Relating to the nucleus of an atom."
                },
                {
                  "front": "offset",
                  "back": "Definition: A consideration or amount that diminishes or balances the effect of a contrary one."
                },
                {
                  "front": "parameter",
                  "back": "Definition: A numerical or other measurable factor forming one of a set that defines a system or sets the conditions of its operation."
                },
                {
                  "front": "phenomenon",
                  "back": "Definition: A fact or situation that is observed to exist or happen, especially one whose cause or explanation is in question."
                },
                {
                  "front": "preliminary",
                  "back": "Definition: Preceding or done in preparation for something fuller or more important."
                }
              ]
            }
          },
          {
            "blockId": "pack-39-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 39: Contextual Application",
              "sentence": "The use of _______ weapons is a threat to world peace. The increase in sales was _______ by a rise in costs. The project is within the _______ of the budget. The rise of social media is a recent _______. He made some _______ remarks before starting his speech.",
              "words": [
                "nuclear",
                "offset",
                "parameter",
                "phenomenon",
                "preliminary"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-40",
        "title": "5-Word Pack 40",
        "content": [
          {
            "blockId": "pack-40-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 40</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-40-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 40)",
              "cards": [
                {
                  "front": "proportion",
                  "back": "Definition: A part, share, or number considered in comparative relation to a whole."
                },
                {
                  "front": "qualitative",
                  "back": "Definition: Relating to, measuring, or measured by the quality of something rather than its quantity."
                },
                {
                  "front": "quote",
                  "back": "Definition: To repeat or copy out (a group of words from a text or speech), typically with an indication that one is not the original author or speaker."
                },
                {
                  "front": "release",
                  "back": "Definition: To allow or enable to escape from confinement; set free."
                },
                {
                  "front": "restore",
                  "back": "Definition: To bring back (a previous right, practice, custom, or situation); reinstate."
                }
              ]
            }
          },
          {
            "blockId": "pack-40-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 40: Contextual Application",
              "sentence": "The _______ of students who go to college has increased in recent years. She has a _______ understanding of the subject, but she needs to learn more about the details. Can you give me a _______ for the cost of the repairs? The company has _______ a statement about the recent incident. They are working to _______ the old building to its original condition.",
              "words": [
                "proportion",
                "qualitative",
                "quote",
                "release",
                "restore"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-41",
        "title": "5-Word Pack 41",
        "content": [
          {
            "blockId": "pack-41-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 41</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-41-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 41)",
              "cards": [
                {
                  "front": "revise",
                  "back": "Definition: To re-examine and make alterations to (written or printed matter)."
                },
                {
                  "front": "schedule",
                  "back": "Definition: A plan for carrying out a process or procedure, giving lists of intended events and times."
                },
                {
                  "front": "subsidy",
                  "back": "Definition: A sum of money granted by the government or a public body to assist an industry or business so that the price of a commodity or service may remain low or competitive."
                },
                {
                  "front": "terminate",
                  "back": "Definition: To bring to an end."
                },
                {
                  "front": "theme",
                  "back": "Definition: The subject of a talk, a piece of writing, a person's thoughts, or an exhibition; a topic."
                }
              ]
            }
          },
          {
            "blockId": "pack-41-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 41: Contextual Application",
              "sentence": "The company has decided to _______ its business plan. I have a busy _______ this week. The company is receiving a _______ from the government. The train will _______ at the next station. The movie has a dark and serious _______.",
              "words": [
                "revise",
                "schedule",
                "subsidy",
                "terminate",
                "theme"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-42",
        "title": "5-Word Pack 42",
        "content": [
          {
            "blockId": "pack-42-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 42</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-42-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 42)",
              "cards": [
                {
                  "front": "trace",
                  "back": "Definition: To find or discover by investigation."
                },
                {
                  "front": "transport",
                  "back": "Definition: To take or carry (people or goods) from one place to another by means of a vehicle, aircraft, or ship."
                },
                {
                  "front": "trend",
                  "back": "Definition: A general direction in which something is developing or changing."
                },
                {
                  "front": "uniform",
                  "back": "Definition: Remaining the same in all cases and at all times; unchanging in form or character."
                },
                {
                  "front": "valid",
                  "back": "Definition: (of an argument or point) having a sound basis in logic or fact; reasonable or cogent."
                }
              ]
            }
          },
          {
            "blockId": "pack-42-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 42: Contextual Application",
              "sentence": "He can _______ his family history back to the 16th century. The company provides _______ for its employees. The new fashion _______ is very popular with young people. The company has a _______ policy for all its employees. He made a _______ point about the need for more funding.",
              "words": [
                "trace",
                "transport",
                "trend",
                "uniform",
                "valid"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-43",
        "title": "5-Word Pack 43",
        "content": [
          {
            "blockId": "pack-43-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 43</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-43-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 43)",
              "cards": [
                {
                  "front": "virtue",
                  "back": "Definition: Behavior showing high moral standards."
                },
                {
                  "front": "voluntary",
                  "back": "Definition: Done, given, or acting of one's own free will."
                },
                {
                  "front": "welfare",
                  "back": "Definition: The health, happiness, and fortunes of a person or group."
                },
                {
                  "front": "whereby",
                  "back": "Definition: By which."
                },
                {
                  "front": "abstain",
                  "back": "Definition: To restrain oneself from doing or enjoying something."
                }
              ]
            }
          },
          {
            "blockId": "pack-43-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 43: Contextual Application",
              "sentence": "She is a woman of great _______. Attendance at the meeting is _______. The company has a good _______ program for its employees. He has a plan _______ he can make a lot of money. She has decided to _______ from alcohol.",
              "words": [
                "virtue",
                "voluntary",
                "welfare",
                "whereby",
                "abstain"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-44",
        "title": "5-Word Pack 44",
        "content": [
          {
            "blockId": "pack-44-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 44</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-44-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 44)",
              "cards": [
                {
                  "front": "adjacent",
                  "back": "Definition: Next to or adjoining something else."
                },
                {
                  "front": "advocate",
                  "back": "Definition: A person who publicly supports or recommends a particular cause or policy."
                },
                {
                  "front": "allege",
                  "back": "Definition: To claim or assert that someone has done something illegal or wrong, typically without proof."
                },
                {
                  "front": "allocate",
                  "back": "Definition: To distribute (resources or duties) for a particular purpose."
                },
                {
                  "front": "ambiguous",
                  "back": "Definition: Open to more than one interpretation; having a double meaning."
                }
              ]
            }
          },
          {
            "blockId": "pack-44-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 44: Contextual Application",
              "sentence": "The park is _______ to the river. He _______ for a more peaceful solution to the conflict. The company _______ that its competitor has been engaging in unfair business practices. The company has _______ a budget for marketing. His answer was _______ and evasive.",
              "words": [
                "adjacent",
                "advocate",
                "allege",
                "allocate",
                "ambiguous"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-45",
        "title": "5-Word Pack 45",
        "content": [
          {
            "blockId": "pack-45-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 45</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-45-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 45)",
              "cards": [
                {
                  "front": "amend",
                  "back": "Definition: To make minor changes to (a text, piece of legislation, etc.) in order to make it fairer or more accurate."
                },
                {
                  "front": "appendix",
                  "back": "Definition: A section or table of additional matter at the end of a book or document."
                },
                {
                  "front": "arbitrary",
                  "back": "Definition: Based on random choice or personal whim, rather than any reason or system."
                },
                {
                  "front": "assure",
                  "back": "Definition: To tell someone something positively or confidently to dispel any doubts they may have."
                },
                {
                  "front": "attain",
                  "back": "Definition: To succeed in achieving (something that one desires and has worked for)."
                }
              ]
            }
          },
          {
            "blockId": "pack-45-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 45: Contextual Application",
              "sentence": "You may need to _______ your contract before signing it. The book includes an _______ with a list of all the sources cited. The rules of the game seemed _______ and unfair. He _______ me that he would be on time. He is working hard to _______ his goals.",
              "words": [
                "amend",
                "appendix",
                "arbitrary",
                "assure",
                "attain"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-46",
        "title": "5-Word Pack 46",
        "content": [
          {
            "blockId": "pack-46-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 46</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-46-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 46)",
              "cards": [
                {
                  "front": "attribute",
                  "back": "Definition: A quality or feature regarded as a characteristic or inherent part of someone or something."
                },
                {
                  "front": "bias",
                  "back": "Definition: Prejudice in favor of or against one thing, person, or group compared with another, usually in a way considered to be unfair."
                },
                {
                  "front": "bulk",
                  "back": "Definition: The mass or size of something large."
                },
                {
                  "front": "cease",
                  "back": "Definition: To bring or come to an end."
                },
                {
                  "front": "chart",
                  "back": "Definition: A sheet of information in the form of a table, graph, or diagram."
                }
              ]
            }
          },
          {
            "blockId": "pack-46-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 46: Contextual Application",
              "sentence": "The company _______ its success to its dedicated employees. It is important to be aware of your own _______. He is a man of great _______. The rain will _______ soon. The doctor is monitoring the patient’s _______.",
              "words": [
                "attribute",
                "bias",
                "bulk",
                "cease",
                "chart"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-47",
        "title": "5-Word Pack 47",
        "content": [
          {
            "blockId": "pack-47-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 47</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-47-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 47)",
              "cards": [
                {
                  "front": "circumstance",
                  "back": "Definition: A fact or condition connected with or relevant to an event or action."
                },
                {
                  "front": "cite",
                  "back": "Definition: To quote (a passage, book, or author) as evidence for or justification of an argument or statement, especially in a scholarly work."
                },
                {
                  "front": "civil",
                  "back": "Definition: Relating to ordinary citizens and their concerns, as distinct from military or ecclesiastical matters."
                },
                {
                  "front": "clarify",
                  "back": "Definition: To make (a statement or situation) less confused and more clearly comprehensible."
                },
                {
                  "front": "coherent",
                  "back": "Definition: (of an argument, theory, or policy) logical and consistent."
                }
              ]
            }
          },
          {
            "blockId": "pack-47-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 47: Contextual Application",
              "sentence": "We need to consider all the _______ before making a decision. The lawyer _______ a previous case that was similar to her own. The country is in a state of _______ unrest. The new guidelines are intended to _______ the company’s policy. The story was not very _______.",
              "words": [
                "circumstance",
                "cite",
                "civil",
                "clarify",
                "coherent"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-48",
        "title": "5-Word Pack 48",
        "content": [
          {
            "blockId": "pack-48-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 48</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-48-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 48)",
              "cards": [
                {
                  "front": "coincide",
                  "back": "Definition: To occur at or during the same time."
                },
                {
                  "front": "commence",
                  "back": "Definition: To begin; start."
                },
                {
                  "front": "commodity",
                  "back": "Definition: A raw material or primary agricultural product that can be bought and sold, such as copper or coffee."
                },
                {
                  "front": "complement",
                  "back": "Definition: A thing that completes or brings to perfection."
                },
                {
                  "front": "comprehensive",
                  "back": "Definition: Complete; including all or nearly all elements or aspects of something."
                }
              ]
            }
          },
          {
            "blockId": "pack-48-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 48: Contextual Application",
              "sentence": "Our views on this issue do not _______. The company has _______ legal proceedings against its former employee. The company trades in a variety of _______. The two partners _______ each other perfectly. The company has a _______ benefits package for its employees.",
              "words": [
                "coincide",
                "commence",
                "commodity",
                "complement",
                "comprehensive"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-49",
        "title": "5-Word Pack 49",
        "content": [
          {
            "blockId": "pack-49-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 49</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-49-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 49)",
              "cards": [
                {
                  "front": "comprise",
                  "back": "Definition: To consist of; be made up of."
                },
                {
                  "front": "conceive",
                  "back": "Definition: To form or devise (a plan or idea) in the mind."
                },
                {
                  "front": "concurrent",
                  "back": "Definition: Existing, happening, or done at the same time."
                },
                {
                  "front": "confine",
                  "back": "Definition: To keep or restrict someone or something within certain limits of (space, scope, quantity, or time)."
                },
                {
                  "front": "conform",
                  "back": "Definition: To comply with rules, standards, or laws."
                }
              ]
            }
          },
          {
            "blockId": "pack-49-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 49: Contextual Application",
              "sentence": "The book is _______ of a series of essays. It is difficult to _______ of a world without technology. He is serving two _______ prison sentences. The discussion should be _______ to the topic at hand. He refuses to _______ to social norms.",
              "words": [
                "comprise",
                "conceive",
                "concurrent",
                "confine",
                "conform"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-50",
        "title": "5-Word Pack 50",
        "content": [
          {
            "blockId": "pack-50-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 50</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-50-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 50)",
              "cards": [
                {
                  "front": "consequent",
                  "back": "Definition: Following as a result or effect."
                },
                {
                  "front": "considerable",
                  "back": "Definition: Notably large in size, amount, or extent."
                },
                {
                  "front": "constitute",
                  "back": "Definition: To be (a part) of a whole."
                },
                {
                  "front": "constrain",
                  "back": "Definition: To severely restrict the scope, extent, or activity of."
                },
                {
                  "front": "contemporary",
                  "back": "Definition: Living or occurring at the same time."
                }
              ]
            }
          },
          {
            "blockId": "pack-50-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 50: Contextual Application",
              "sentence": "He was late for work and _______ missed the important meeting. He has made a _______ contribution to the company. These actions _______ a violation of the company’s policy. He felt _______ by the rules and regulations. The museum has a collection of _______ art.",
              "words": [
                "consequent",
                "considerable",
                "constitute",
                "constrain",
                "contemporary"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-51",
        "title": "5-Word Pack 51",
        "content": [
          {
            "blockId": "pack-51-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 51</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-51-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 51)",
              "cards": [
                {
                  "front": "contradict",
                  "back": "Definition: To deny the truth of (a statement) by asserting the opposite."
                },
                {
                  "front": "contrary",
                  "back": "Definition: Opposite in nature, direction, or meaning."
                },
                {
                  "front": "contribute",
                  "back": "Definition: To give (something, especially money) in order to help achieve or provide something."
                },
                {
                  "front": "controversy",
                  "back": "Definition: Disagreement, typically when prolonged, public, and heated."
                },
                {
                  "front": "convene",
                  "back": "Definition: To come or bring together for a meeting or activity; assemble."
                }
              ]
            }
          },
          {
            "blockId": "pack-51-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 51: Contextual Application",
              "sentence": "The evidence _______ his claim of innocence. His actions are _______ to his words. Everyone is expected to _______ to the discussion. He is a controversial figure in the world of politics. The president has _______ a meeting of his top advisors.",
              "words": [
                "contradict",
                "contrary",
                "contribute",
                "controversy",
                "convene"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-52",
        "title": "5-Word Pack 52",
        "content": [
          {
            "blockId": "pack-52-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 52</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-52-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 52)",
              "cards": [
                {
                  "front": "converse",
                  "back": "Definition: To engage in conversation."
                },
                {
                  "front": "convince",
                  "back": "Definition: To cause (someone) to believe firmly in the truth of something."
                },
                {
                  "front": "correspond",
                  "back": "Definition: To have a close similarity; match or agree almost exactly."
                },
                {
                  "front": "credit",
                  "back": "Definition: The ability of a customer to obtain goods or services before payment, based on the trust that payment will be made in the future."
                },
                {
                  "front": "crucial",
                  "back": "Definition: Decisive or critical, especially in the success or failure of something."
                }
              ]
            }
          },
          {
            "blockId": "pack-52-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 52: Contextual Application",
              "sentence": "The _______ of love is hate. I am not _______ by his arguments. She corresponds with her pen pal in Japan. She deserves _______ for her hard work. The next few weeks will be _______ for the company.",
              "words": [
                "converse",
                "convince",
                "correspond",
                "credit",
                "crucial"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-53",
        "title": "5-Word Pack 53",
        "content": [
          {
            "blockId": "pack-53-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 53</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-53-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 53)",
              "cards": [
                {
                  "front": "culture",
                  "back": "Definition: The arts and other manifestations of human intellectual achievement regarded collectively."
                },
                {
                  "front": "cycle",
                  "back": "Definition: A series of events that are regularly repeated in the same order."
                },
                {
                  "front": "data",
                  "back": "Definition: Facts and statistics collected together for reference or analysis."
                },
                {
                  "front": "debate",
                  "back": "Definition: A formal discussion on a particular topic in a public meeting or legislative assembly, in which opposing arguments are put forward."
                },
                {
                  "front": "decade",
                  "back": "Definition: A period of ten years."
                }
              ]
            }
          },
          {
            "blockId": "pack-53-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 53: Contextual Application",
              "sentence": "It is important to learn about the _______ of other countries. The economy goes through a _______ of boom and bust. The study is based on _______ from a survey of 1,000 people. The two candidates will _______ each other on television tonight. He has lived in this city for the past _______.",
              "words": [
                "culture",
                "cycle",
                "data",
                "debate",
                "decade"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-54",
        "title": "5-Word Pack 54",
        "content": [
          {
            "blockId": "pack-54-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 54</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-54-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 54)",
              "cards": [
                {
                  "front": "decline",
                  "back": "Definition: (typically of something regarded as good) to become smaller, fewer, or less; decrease."
                },
                {
                  "front": "deduce",
                  "back": "Definition: To arrive at (a fact or a conclusion) by reasoning; draw as a logical conclusion."
                },
                {
                  "front": "define",
                  "back": "Definition: To state or describe exactly the nature, scope, or meaning of."
                },
                {
                  "front": "demonstrate",
                  "back": "Definition: To clearly show the existence or truth of (something) by giving proof or evidence."
                },
                {
                  "front": "denote",
                  "back": "Definition: To be a sign of; indicate."
                }
              ]
            }
          },
          {
            "blockId": "pack-54-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 54: Contextual Application",
              "sentence": "He declined the invitation to the party. She _______ from his silence that he was angry. It is important to _______ your goals clearly. The study _______ the effectiveness of the new drug. His silence _______ his disapproval.",
              "words": [
                "decline",
                "deduce",
                "define",
                "demonstrate",
                "denote"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-55",
        "title": "5-Word Pack 55",
        "content": [
          {
            "blockId": "pack-55-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 55</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-55-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 55)",
              "cards": [
                {
                  "front": "deny",
                  "back": "Definition: To state that one refuses to admit the truth or existence of."
                },
                {
                  "front": "depress",
                  "back": "Definition: To make (someone) feel utterly dispirited or dejected."
                },
                {
                  "front": "derive",
                  "back": "Definition: To obtain something from (a specified source)."
                },
                {
                  "front": "design",
                  "back": "Definition: A plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is made."
                },
                {
                  "front": "despite",
                  "back": "Definition: Without being affected by; in spite of."
                }
              ]
            }
          },
          {
            "blockId": "pack-55-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 55: Contextual Application",
              "sentence": "The company has _______ any wrongdoing. The company is trying to _______ costs. She _______ great pleasure from her work. She has a good sense of _______. _______ her ails, she remains cheerful.",
              "words": [
                "deny",
                "depress",
                "derive",
                "design",
                "despite"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-56",
        "title": "5-Word Pack 56",
        "content": [
          {
            "blockId": "pack-56-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 56</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-56-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 56)",
              "cards": [
                {
                  "front": "detect",
                  "back": "Definition: To discover or identify the presence or existence of."
                },
                {
                  "front": "deviate",
                  "back": "Definition: To depart from an established course."
                },
                {
                  "front": "device",
                  "back": "Definition: A thing made or adapted for a particular purpose, especially a piece of mechanical or electronic equipment."
                },
                {
                  "front": "devote",
                  "back": "Definition: To give all or a large part of one's time or resources to (a person, activity, or cause)."
                },
                {
                  "front": "differentiate",
                  "back": "Definition: To recognize or ascertain what makes (someone or something) different."
                }
              ]
            }
          },
          {
            "blockId": "pack-56-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 56: Contextual Application",
              "sentence": "The new technology can _______ even the smallest traces of the chemical. The company has _______ from its original business plan. He has a clever _______ for opening jars. He has _______ a lot of time and energy to this project. The company is trying to _______ its products from those of its competitors.",
              "words": [
                "detect",
                "deviate",
                "device",
                "devote",
                "differentiate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-57",
        "title": "5-Word Pack 57",
        "content": [
          {
            "blockId": "pack-57-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 57</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-57-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 57)",
              "cards": [
                {
                  "front": "dimension",
                  "back": "Definition: A measurable extent of a particular kind, such as length, breadth, depth, or height."
                },
                {
                  "front": "diminish",
                  "back": "Definition: To make or become less."
                },
                {
                  "front": "discrete",
                  "back": "Definition: Individually separate and distinct."
                },
                {
                  "front": "discriminate",
                  "back": "Definition: To recognize a distinction; differentiate."
                },
                {
                  "front": "displace",
                  "back": "Definition: To take over the place, position, or role of (someone or something)."
                }
              ]
            }
          },
          {
            "blockId": "pack-57-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 57: Contextual Application",
              "sentence": "The problem has a political _______ as well as an economic one. His influence has _______ since he retired. The two events are _______ and unrelated. He has a good ear for music and can _______ between different instruments. The war has _______ thousands of people from their homes.",
              "words": [
                "dimension",
                "diminish",
                "discrete",
                "discriminate",
                "displace"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-58",
        "title": "5-Word Pack 58",
        "content": [
          {
            "blockId": "pack-58-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 58</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-58-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 58)",
              "cards": [
                {
                  "front": "display",
                  "back": "Definition: To put (something) in a prominent place in order that it may readily be seen."
                },
                {
                  "front": "dispose",
                  "back": "Definition: To get rid of by throwing away or giving or selling to someone else."
                },
                {
                  "front": "distinct",
                  "back": "Definition: Recognizably different in nature from something else of a similar type."
                },
                {
                  "front": "distort",
                  "back": "Definition: To pull or twist out of shape."
                },
                {
                  "front": "distribute",
                  "back": "Definition: To give shares of (something); deal out."
                }
              ]
            }
          },
          {
            "blockId": "pack-58-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 58: Contextual Application",
              "sentence": "He _______ great courage in the face of danger. He is disposed to be friendly. There is a _______ smell of garlic in the kitchen. The media has been accused of _______ the facts. The charity will _______ food and clothing to the needy.",
              "words": [
                "display",
                "dispose",
                "distinct",
                "distort",
                "distribute"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-59",
        "title": "5-Word Pack 59",
        "content": [
          {
            "blockId": "pack-59-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 59</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-59-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 59)",
              "cards": [
                {
                  "front": "diverse",
                  "back": "Definition: Showing a great deal of variety; very different."
                },
                {
                  "front": "document",
                  "back": "Definition: A piece of written, printed, or electronic matter that provides information or evidence or that serves as an official record."
                },
                {
                  "front": "domain",
                  "back": "Definition: An area of territory owned or controlled by a ruler or government."
                },
                {
                  "front": "domestic",
                  "back": "Definition: Relating to the running of a home or to family relations."
                },
                {
                  "front": "dominate",
                  "back": "Definition: To have a commanding influence on; exercise control over."
                }
              ]
            }
          },
          {
            "blockId": "pack-59-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 59: Contextual Application",
              "sentence": "The company has a _______ range of products. It is important to _______ your sources when writing a research paper. The website has a new _______ name. He is a _______ animal, not a wild one. He is a player who can _______ a game.",
              "words": [
                "diverse",
                "document",
                "domain",
                "domestic",
                "dominate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-60",
        "title": "5-Word Pack 60",
        "content": [
          {
            "blockId": "pack-60-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 60</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-60-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 60)",
              "cards": [
                {
                  "front": "draft",
                  "back": "Definition: A preliminary version of a piece of writing."
                },
                {
                  "front": "drama",
                  "back": "Definition: A play for theater, radio, or television."
                },
                {
                  "front": "duration",
                  "back": "Definition: The time during which something continues."
                },
                {
                  "front": "dynamic",
                  "back": "Definition: (of a process or system) characterized by constant change, activity, or progress."
                },
                {
                  "front": "economy",
                  "back": "Definition: The wealth and resources of a country or region, especially in terms of the production and consumption of goods and services."
                }
              ]
            }
          },
          {
            "blockId": "pack-60-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 60: Contextual Application",
              "sentence": "The government has published a _______ of the new law. The movie is a _______ about a young woman who overcomes adversity. He has been a member of the company for the _______ of its existence. He has a _______ personality. He is an expert on the global _______.",
              "words": [
                "draft",
                "drama",
                "duration",
                "dynamic",
                "economy"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-61",
        "title": "5-Word Pack 61",
        "content": [
          {
            "blockId": "pack-61-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 61</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-61-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 61)",
              "cards": [
                {
                  "front": "element",
                  "back": "Definition: A part or aspect of something abstract, especially one that is essential or characteristic."
                },
                {
                  "front": "eliminate",
                  "back": "Definition: To completely remove or get rid of (something)."
                },
                {
                  "front": "emerge",
                  "back": "Definition: To move out of or away from something and come into view."
                },
                {
                  "front": "emphasis",
                  "back": "Definition: Special importance, value, or prominence given to something."
                },
                {
                  "front": "empirical",
                  "back": "Definition: Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic."
                }
              ]
            }
          },
          {
            "blockId": "pack-61-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 61: Contextual Application",
              "sentence": "The movie has all the _______ of a classic thriller. The new vaccine can _______ the disease. She has emerged as a leader in the company. The teacher put _______ on the importance of studying for the exam. He has an _______ approach to problem-solving.",
              "words": [
                "element",
                "eliminate",
                "emerge",
                "emphasis",
                "empirical"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-62",
        "title": "5-Word Pack 62",
        "content": [
          {
            "blockId": "pack-62-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 62</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-62-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 62)",
              "cards": [
                {
                  "front": "enable",
                  "back": "Definition: To give (someone or something) the authority or means to do something; make it possible for."
                },
                {
                  "front": "encounter",
                  "back": "Definition: To unexpectedly experience or be faced with (something difficult or hostile)."
                },
                {
                  "front": "energy",
                  "back": "Definition: The strength and vitality required for sustained physical or mental activity."
                },
                {
                  "front": "enforce",
                  "back": "Definition: To compel observance of or compliance with (a law, rule, or obligation)."
                },
                {
                  "front": "enhance",
                  "back": "Definition: To intensify, increase, or further improve the quality, value, or extent of."
                }
              ]
            }
          },
          {
            "blockId": "pack-62-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 62: Contextual Application",
              "sentence": "The scholarship will _______ her to go to college. He had a chance _______ with an old friend. The company is investing in renewable _______. The company has a strict policy that is _______ by the management. She uses makeup to _______ her natural beauty.",
              "words": [
                "enable",
                "encounter",
                "energy",
                "enforce",
                "enhance"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-63",
        "title": "5-Word Pack 63",
        "content": [
          {
            "blockId": "pack-63-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 63</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-63-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 63)",
              "cards": [
                {
                  "front": "enormous",
                  "back": "Definition: Very large in size, quantity, or extent."
                },
                {
                  "front": "ensure",
                  "back": "Definition: To make certain that (something) shall occur or be the case."
                },
                {
                  "front": "entity",
                  "back": "Definition: A thing with distinct and independent existence."
                },
                {
                  "front": "environment",
                  "back": "Definition: The surroundings or conditions in which a person, animal, or plant lives or operates."
                },
                {
                  "front": "equate",
                  "back": "Definition: To consider (one thing) to be the same as or equivalent to another."
                }
              ]
            }
          },
          {
            "blockId": "pack-63-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 63: Contextual Application",
              "sentence": "He has an _______ appetite. The company has taken steps to _______ the safety of its employees. The two organizations have merged to form a single _______. The company has a friendly and supportive work _______. He _______ success with money.",
              "words": [
                "enormous",
                "ensure",
                "entity",
                "environment",
                "equate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-64",
        "title": "5-Word Pack 64",
        "content": [
          {
            "blockId": "pack-64-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 64</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-64-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 64)",
              "cards": [
                {
                  "front": "equip",
                  "back": "Definition: To supply with the necessary items for a particular purpose."
                },
                {
                  "front": "equivalent",
                  "back": "Definition: Equal in value, amount, function, meaning, etc."
                },
                {
                  "front": "erode",
                  "back": "Definition: (of wind, water, or other natural agents) to gradually wear away (soil, rock, or land)."
                },
                {
                  "front": "establish",
                  "back": "Definition: To set up (an organization, system, or set of rules) on a firm or permanent basis."
                },
                {
                  "front": "estate",
                  "back": "Definition: An area or amount of land or property, especially of considerable extent."
                }
              ]
            }
          },
          {
            "blockId": "pack-64-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 64: Contextual Application",
              "sentence": "The new school is well-_______ with modern facilities. His silence was _______ to an admission of guilt. The constant criticism has _______ his confidence. He has _______ himself as a leader in his field. She left her entire _______ to her children.",
              "words": [
                "equip",
                "equivalent",
                "erode",
                "establish",
                "estate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-65",
        "title": "5-Word Pack 65",
        "content": [
          {
            "blockId": "pack-65-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 65</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-65-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 65)",
              "cards": [
                {
                  "front": "estimate",
                  "back": "Definition: To roughly calculate or judge the value, number, quantity, or extent of."
                },
                {
                  "front": "ethic",
                  "back": "Definition: A set of moral principles, especially ones relating to or affirming a specified group, field, or form of conduct."
                },
                {
                  "front": "ethnic",
                  "back": "Definition: Relating to a population subgroup (within a larger or dominant national or cultural group) with a common national or cultural tradition."
                },
                {
                  "front": "evaluate",
                  "back": "Definition: To form an idea of the amount, number, or value of; assess."
                },
                {
                  "front": "eventual",
                  "back": "Definition: Occurring or existing at the end of a process or period of time."
                }
              ]
            }
          },
          {
            "blockId": "pack-65-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 65: Contextual Application",
              "sentence": "Can you give me an _______ of how long it will take to complete the work? The company has a strict code of _______. The restaurant serves _______ cuisine from around the world. It is important to _______ the risks before making a decision. He hopes for an _______ return to his home country.",
              "words": [
                "estimate",
                "ethic",
                "ethnic",
                "evaluate",
                "eventual"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-66",
        "title": "5-Word Pack 66",
        "content": [
          {
            "blockId": "pack-66-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 66</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-66-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 66)",
              "cards": [
                {
                  "front": "evident",
                  "back": "Definition: Plain or obvious; clearly seen or understood."
                },
                {
                  "front": "evolve",
                  "back": "Definition: To develop gradually from a simple to a more complex form."
                },
                {
                  "front": "exceed",
                  "back": "Definition: To be greater in number or size than (a quantity, number, or other measurable thing)."
                },
                {
                  "front": "exclude",
                  "back": "Definition: To deny (someone) access to or bar (someone) from a place, group, or privilege."
                },
                {
                  "front": "exhibit",
                  "back": "Definition: To publicly display (a work of art or item of interest) in an art gallery or museum or at a trade fair."
                }
              ]
            }
          },
          {
            "blockId": "pack-66-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 66: Contextual Application",
              "sentence": "The evidence of his guilt was _______. Languages _______ over time, with new words being added and old ones falling out of use. He _______ all our expectations. The price of the tour _______ airfare. He _______ great courage in the face of danger.",
              "words": [
                "evident",
                "evolve",
                "exceed",
                "exclude",
                "exhibit"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-67",
        "title": "5-Word Pack 67",
        "content": [
          {
            "blockId": "pack-67-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 67</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-67-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 67)",
              "cards": [
                {
                  "front": "notion",
                  "back": "Definition: A conception of or belief about something."
                },
                {
                  "front": "enforce",
                  "back": "Definition: To compel observance of or compliance with (a law, rule, or obligation)."
                },
                {
                  "front": "rational",
                  "back": "Definition: Based on or in accordance with reason or logic."
                },
                {
                  "front": "display",
                  "back": "Definition: To put (something) in a prominent place in order that it may readily be seen."
                },
                {
                  "front": "logic",
                  "back": "Definition: Reasoning conducted or assessed according to strict principles of validity."
                }
              ]
            }
          },
          {
            "blockId": "pack-67-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 67: Contextual Application",
              "sentence": "The _______ of a four-day work week is gaining popularity. The company has a strict policy that is _______ by the management. There must be a _______ explanation for what happened. He _______ great courage in the face of danger. There is a certain _______ to his madness.",
              "words": [
                "notion",
                "enforce",
                "rational",
                "display",
                "logic"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-68",
        "title": "5-Word Pack 68",
        "content": [
          {
            "blockId": "pack-68-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 68</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-68-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 68)",
              "cards": [
                {
                  "front": "benefit",
                  "back": "Definition: An advantage or profit gained from something."
                },
                {
                  "front": "decline",
                  "back": "Definition: (typically of something regarded as good) to become smaller, fewer, or less; decrease."
                },
                {
                  "front": "modify",
                  "back": "Definition: To make partial or minor changes to (something), typically so as to improve it or to make it less extreme."
                },
                {
                  "front": "grant",
                  "back": "Definition: To agree to give or allow (something requested) to."
                },
                {
                  "front": "regulate",
                  "back": "Definition: To control or supervise (something, especially a company or business activity) by means of rules and regulations."
                }
              ]
            }
          },
          {
            "blockId": "pack-68-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 68: Contextual Application",
              "sentence": "The company offers a good _______ package to its employees. He declined the invitation to the party. The company has _______ its policy on working from home. She was _______ a scholarship to study at a top university. The new law is designed to _______ the use of pesticides.",
              "words": [
                "benefit",
                "decline",
                "modify",
                "grant",
                "regulate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-69",
        "title": "5-Word Pack 69",
        "content": [
          {
            "blockId": "pack-69-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 69</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-69-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 69)",
              "cards": [
                {
                  "front": "contact",
                  "back": "Definition: The state or condition of physical touching."
                },
                {
                  "front": "debate",
                  "back": "Definition: A formal discussion on a particular topic in a public meeting or legislative assembly, in which opposing arguments are put forward."
                },
                {
                  "front": "implement",
                  "back": "Definition: To put (a decision, plan, agreement, etc.) into effect."
                },
                {
                  "front": "nevertheless",
                  "back": "Definition: In spite of that; nevertheless."
                },
                {
                  "front": "clause",
                  "back": "Definition: A unit of grammatical organization next below the sentence in rank and in traditional grammar said to consist of a subject and predicate."
                }
              ]
            }
          },
          {
            "blockId": "pack-69-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 69: Contextual Application",
              "sentence": "He has lost _______ with his old friends. The two candidates will _______ each other on television tonight. The government has failed to _______ its promises. He was tired, but he went to the party _______. The sentence has two _______.",
              "words": [
                "contact",
                "debate",
                "implement",
                "nevertheless",
                "clause"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-70",
        "title": "5-Word Pack 70",
        "content": [
          {
            "blockId": "pack-70-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 70</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-70-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 70)",
              "cards": [
                {
                  "front": "project",
                  "back": "Definition: An individual or collaborative enterprise that is carefully planned and designed to achieve a particular aim."
                },
                {
                  "front": "protocol",
                  "back": "Definition: The official procedure or system of rules governing affairs of state or diplomatic occasions."
                },
                {
                  "front": "coincide",
                  "back": "Definition: To occur at or during the same time."
                },
                {
                  "front": "panel",
                  "back": "Definition: A flat or curved component, typically rectangular, that forms or is set into the surface of a door, wall, or ceiling."
                },
                {
                  "front": "expand",
                  "back": "Definition: To become or make larger or more extensive."
                }
              ]
            }
          },
          {
            "blockId": "pack-70-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 70: Contextual Application",
              "sentence": "She is _______ a movie about her life. It is important to follow the correct _______ in a formal meeting. Our views on this issue do not _______. The company has set up a _______ to investigate the incident. The universe is _______.",
              "words": [
                "project",
                "protocol",
                "coincide",
                "panel",
                "expand"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-71",
        "title": "5-Word Pack 71",
        "content": [
          {
            "blockId": "pack-71-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 71</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-71-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 71)",
              "cards": [
                {
                  "front": "domain",
                  "back": "Definition: An area of territory owned or controlled by a ruler or government."
                },
                {
                  "front": "considerable",
                  "back": "Definition: Notably large in size, amount, or extent."
                },
                {
                  "front": "overlap",
                  "back": "Definition: To extend over so as to cover partly."
                },
                {
                  "front": "comprise",
                  "back": "Definition: To consist of; be made up of."
                },
                {
                  "front": "manual",
                  "back": "Definition: A book giving instructions or information."
                }
              ]
            }
          },
          {
            "blockId": "pack-71-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 71: Contextual Application",
              "sentence": "The website has a new _______ name. He has made a _______ contribution to the company. There is a lot of _______ between the two subjects. The book is _______ of a series of essays. He has a _______ labor job.",
              "words": [
                "domain",
                "considerable",
                "overlap",
                "comprise",
                "manual"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-72",
        "title": "5-Word Pack 72",
        "content": [
          {
            "blockId": "pack-72-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 72</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-72-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 72)",
              "cards": [
                {
                  "front": "category",
                  "back": "Definition: A class or division of people or things regarded as having particular shared characteristics."
                },
                {
                  "front": "perceive",
                  "back": "Definition: To become aware or conscious of (something); come to realize or understand."
                },
                {
                  "front": "circumstance",
                  "back": "Definition: A fact or condition connected with or relevant to an event or action."
                },
                {
                  "front": "readjust",
                  "back": "Definition: To adjust (something) again."
                },
                {
                  "front": "predict",
                  "back": "Definition: To say or estimate that (a specified thing) will happen in the future or will be a consequence of something."
                }
              ]
            }
          },
          {
            "blockId": "pack-72-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 72: Contextual Application",
              "sentence": "He does not fit into any particular _______. The world is not always as we _______ it to be. We need to consider all the _______ before making a decision. The company has had to _______ its business plan to the new market conditions. The weather forecast _______ rain for tomorrow.",
              "words": [
                "category",
                "perceive",
                "circumstance",
                "readjust",
                "predict"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-73",
        "title": "5-Word Pack 73",
        "content": [
          {
            "blockId": "pack-73-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 73</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-73-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 73)",
              "cards": [
                {
                  "front": "reside",
                  "back": "Definition: To have one's permanent home in a particular place."
                },
                {
                  "front": "corporate",
                  "back": "Definition: Relating to a corporation, especially a large company or group."
                },
                {
                  "front": "encounter",
                  "back": "Definition: To unexpectedly experience or be faced with (something difficult or hostile)."
                },
                {
                  "front": "impact",
                  "back": "Definition: The action of one object coming forcibly into contact with another."
                },
                {
                  "front": "device",
                  "back": "Definition: A thing made or adapted for a particular purpose, especially a piece of mechanical or electronic equipment."
                }
              ]
            }
          },
          {
            "blockId": "pack-73-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 73: Contextual Application",
              "sentence": "The problem _______ in the fact that we do not have enough money. He is a _______ lawyer. He had a chance _______ with an old friend. The _______ of the car crash was devastating. He has a clever _______ for opening jars.",
              "words": [
                "reside",
                "corporate",
                "encounter",
                "impact",
                "device"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-74",
        "title": "5-Word Pack 74",
        "content": [
          {
            "blockId": "pack-74-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 74</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-74-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 74)",
              "cards": [
                {
                  "front": "alter",
                  "back": "Definition: To change in character or composition, typically in a comparatively small but significant way."
                },
                {
                  "front": "structure",
                  "back": "Definition: The arrangement of and relations between the parts or elements of something complex."
                },
                {
                  "front": "job",
                  "back": "Definition: A paid position of regular employment."
                },
                {
                  "front": "external",
                  "back": "Definition: Belonging to or forming the outer surface or structure of something."
                },
                {
                  "front": "output",
                  "back": "Definition: The amount of something produced by a person, machine, or industry."
                }
              ]
            }
          },
          {
            "blockId": "pack-74-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 74: Contextual Application",
              "sentence": "The company has had to _______ its business plan. The building has a solid _______. He has a _______ to do. The building has an _______ staircase. The factory has a high _______.",
              "words": [
                "alter",
                "structure",
                "job",
                "external",
                "output"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-75",
        "title": "5-Word Pack 75",
        "content": [
          {
            "blockId": "pack-75-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 75</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-75-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 75)",
              "cards": [
                {
                  "front": "persist",
                  "back": "Definition: To continue firmly or obstinately in an opinion or a course of action in spite of difficulty, opposition, or failure."
                },
                {
                  "front": "context",
                  "back": "Definition: The circumstances that form the setting for an event, statement, or idea, and in terms of which it can be fully understood and assessed."
                },
                {
                  "front": "consequent",
                  "back": "Definition: Following as a result or effect."
                },
                {
                  "front": "reluctance",
                  "back": "Definition: Unwillingness or disinclination to do something."
                },
                {
                  "front": "section",
                  "back": "Definition: Any of the more or less distinct parts into which something is or may be divided or from which it is made up."
                }
              ]
            }
          },
          {
            "blockId": "pack-75-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 75: Contextual Application",
              "sentence": "The rain will _______ for the rest of the day. The book provides a historical _______ for the events. He was late for work and _______ missed the important meeting. She agreed to the plan with _______. He is in charge of the marketing _______ of the company.",
              "words": [
                "persist",
                "context",
                "consequent",
                "reluctance",
                "section"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-76",
        "title": "5-Word Pack 76",
        "content": [
          {
            "blockId": "pack-76-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 76</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-76-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 76)",
              "cards": [
                {
                  "front": "imply",
                  "back": "Definition: To strongly suggest the truth or existence of (something not expressly stated)."
                },
                {
                  "front": "ambiguous",
                  "back": "Definition: Open to more than one interpretation; having a double meaning."
                },
                {
                  "front": "outcome",
                  "back": "Definition: The way a thing turns out; a consequence."
                },
                {
                  "front": "attain",
                  "back": "Definition: To succeed in achieving (something that one desires and has worked for)."
                },
                {
                  "front": "implicit",
                  "back": "Definition: Suggested though not directly expressed."
                }
              ]
            }
          },
          {
            "blockId": "pack-76-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 76: Contextual Application",
              "sentence": "The article _______ that the company is in financial trouble. His answer was _______ and evasive. The study had a positive _______. He is working hard to _______ his goals. She has an _______ trust in her friends.",
              "words": [
                "imply",
                "ambiguous",
                "outcome",
                "attain",
                "implicit"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-77",
        "title": "5-Word Pack 77",
        "content": [
          {
            "blockId": "pack-77-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 77</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-77-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 77)",
              "cards": [
                {
                  "front": "rigid",
                  "back": "Definition: Unable to bend or be forced out of shape; not flexible."
                },
                {
                  "front": "code",
                  "back": "Definition: A system of words, letters, figures, or other symbols substituted for other words, letters, etc., especially for the purposes of secrecy."
                },
                {
                  "front": "input",
                  "back": "Definition: What is put in, taken in, or operated on by any process or system."
                },
                {
                  "front": "intermediate",
                  "back": "Definition: Coming between two things in time, place, order, character, etc."
                },
                {
                  "front": "fund",
                  "back": "Definition: A sum of money saved or made available for a particular purpose."
                }
              ]
            }
          },
          {
            "blockId": "pack-77-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 77: Contextual Application",
              "sentence": "He has a _______ and inflexible attitude. The company has a strict _______ of conduct. The computer is waiting for _______ from the user. The company is in the _______ stages of its development. The government has allocated _______ for the new project.",
              "words": [
                "rigid",
                "code",
                "input",
                "intermediate",
                "fund"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-78",
        "title": "5-Word Pack 78",
        "content": [
          {
            "blockId": "pack-78-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 78</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-78-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 78)",
              "cards": [
                {
                  "front": "regime",
                  "back": "Definition: A government, especially an authoritarian one."
                },
                {
                  "front": "role",
                  "back": "Definition: An actor's part in a play, movie, etc."
                },
                {
                  "front": "legislate",
                  "back": "Definition: To make or enact laws."
                },
                {
                  "front": "concurrent",
                  "back": "Definition: Existing, happening, or done at the same time."
                },
                {
                  "front": "fundamental",
                  "back": "Definition: Forming a necessary base or core; of central importance."
                }
              ]
            }
          },
          {
            "blockId": "pack-78-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 78: Contextual Application",
              "sentence": "The new _______ has promised to bring about change. He has an important _______ to play in the company. It is the job of the parliament to _______. He is serving two _______ prison sentences. The company has made some _______ changes to its business model.",
              "words": [
                "regime",
                "role",
                "legislate",
                "concurrent",
                "fundamental"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-79",
        "title": "5-Word Pack 79",
        "content": [
          {
            "blockId": "pack-79-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 79</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-79-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 79)",
              "cards": [
                {
                  "front": "conduct",
                  "back": "Definition: The manner in which a person behaves, especially on a particular occasion or in a particular context."
                },
                {
                  "front": "deviate",
                  "back": "Definition: To depart from an established course."
                },
                {
                  "front": "differentiate",
                  "back": "Definition: To recognize or ascertain what makes (someone or something) different."
                },
                {
                  "front": "proceed",
                  "back": "Definition: To begin or continue a course of action."
                },
                {
                  "front": "quote",
                  "back": "Definition: To repeat or copy out (a group of words from a text or speech), typically with an indication that one is not the original author or speaker."
                }
              ]
            }
          },
          {
            "blockId": "pack-79-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 79: Contextual Application",
              "sentence": "The company has a strict code of _______. The company has _______ from its original business plan. The company is trying to _______ its products from those of its competitors. Please _______ with your work. Can you give me a _______ for the cost of the repairs?",
              "words": [
                "conduct",
                "deviate",
                "differentiate",
                "proceed",
                "quote"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-80",
        "title": "5-Word Pack 80",
        "content": [
          {
            "blockId": "pack-80-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 80</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-80-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 80)",
              "cards": [
                {
                  "front": "denote",
                  "back": "Definition: To be a sign of; indicate."
                },
                {
                  "front": "aggregate",
                  "back": "Definition: A whole formed by combining several (typically disparate) elements."
                },
                {
                  "front": "illustrate",
                  "back": "Definition: To provide (a book, newspaper, etc.) with pictures."
                },
                {
                  "front": "challenge",
                  "back": "Definition: A call to take part in a contest or competition, especially a duel."
                },
                {
                  "front": "aware",
                  "back": "Definition: Having knowledge or perception of a situation or fact."
                }
              ]
            }
          },
          {
            "blockId": "pack-80-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 80: Contextual Application",
              "sentence": "His silence _______ his disapproval. The company’s _______ sales have increased this year. Let me give you an example to _______ my point. He has _______ me to a game of chess. It is important to be _______ of your surroundings.",
              "words": [
                "denote",
                "aggregate",
                "illustrate",
                "challenge",
                "aware"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-81",
        "title": "5-Word Pack 81",
        "content": [
          {
            "blockId": "pack-81-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 81</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-81-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 81)",
              "cards": [
                {
                  "front": "prepare",
                  "back": "Definition: To make (something) ready for use or consideration."
                },
                {
                  "front": "compute",
                  "back": "Definition: To calculate (a figure or amount)."
                },
                {
                  "front": "approximate",
                  "back": "Definition: Close to the actual, but not completely accurate or exact."
                },
                {
                  "front": "abolish",
                  "back": "Definition: To formally put an end to (a system, practice, or institution)."
                },
                {
                  "front": "intervene",
                  "back": "Definition: To come between so as to prevent or alter a result or course of events."
                }
              ]
            }
          },
          {
            "blockId": "pack-81-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 81: Contextual Application",
              "sentence": "The company is _______ for a new product launch. We need to _______ the total cost of the project. Can you give me an _______ idea of when you will be finished? Slavery was _______ in the 19th century. The government has _______ in the economy to prevent a recession.",
              "words": [
                "prepare",
                "compute",
                "approximate",
                "abolish",
                "intervene"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-82",
        "title": "5-Word Pack 82",
        "content": [
          {
            "blockId": "pack-82-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 82</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-82-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 82)",
              "cards": [
                {
                  "front": "stable",
                  "back": "Definition: (of an object or structure) not likely to give way or overturn; firmly fixed."
                },
                {
                  "front": "select",
                  "back": "Definition: To carefully choose as being the best or most suitable."
                },
                {
                  "front": "margin",
                  "back": "Definition: The edge or border of something."
                },
                {
                  "front": "goal",
                  "back": "Definition: (in football, hockey, etc.) a pair of posts linked by a crossbar and typically with a net between, forming a space into or over which the ball has to be sent in order to score."
                },
                {
                  "front": "empirical",
                  "back": "Definition: Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic."
                }
              ]
            }
          },
          {
            "blockId": "pack-82-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 82: Contextual Application",
              "sentence": "The patient’s condition is _______. The company has a rigorous selection process for its employees. There is a wide _______ between the two candidates. My _______ is to become a doctor. He has an _______ approach to problem-solving.",
              "words": [
                "stable",
                "select",
                "margin",
                "goal",
                "empirical"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-83",
        "title": "5-Word Pack 83",
        "content": [
          {
            "blockId": "pack-83-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 83</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-83-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 83)",
              "cards": [
                {
                  "front": "infer",
                  "back": "Definition: To deduce or conclude (information) from evidence and reasoning rather than from explicit statements."
                },
                {
                  "front": "ongoing",
                  "back": "Definition: Continuing; still in progress."
                },
                {
                  "front": "deny",
                  "back": "Definition: To state that one refuses to admit the truth or existence of."
                },
                {
                  "front": "publication",
                  "back": "Definition: The preparation and issuing of a book, journal, piece of music, or other work for public sale."
                },
                {
                  "front": "revolution",
                  "back": "Definition: A forcible overthrow of a government or social order in favor of a new system."
                }
              ]
            }
          },
          {
            "blockId": "pack-83-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 83: Contextual Application",
              "sentence": "We can _______ from the evidence that he is guilty. The company has an _______ commitment to quality. The company has _______ any wrongdoing. He is the author of several _______. The invention of the internet has caused a _______ in the way we communicate.",
              "words": [
                "infer",
                "ongoing",
                "deny",
                "publication",
                "revolution"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-84",
        "title": "5-Word Pack 84",
        "content": [
          {
            "blockId": "pack-84-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 84</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-84-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 84)",
              "cards": [
                {
                  "front": "assemble",
                  "back": "Definition: (of people) to gather together in one place for a common purpose."
                },
                {
                  "front": "resolve",
                  "back": "Definition: To settle or find a solution to (a problem, dispute, or contentious matter)."
                },
                {
                  "front": "despite",
                  "back": "Definition: Without being affected by; in spite of."
                },
                {
                  "front": "liberal",
                  "back": "Definition: Willing to respect or accept behavior or opinions different from one's own; open to new ideas."
                },
                {
                  "front": "legal",
                  "back": "Definition: Relating to the law."
                }
              ]
            }
          },
          {
            "blockId": "pack-84-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 84: Contextual Application",
              "sentence": "He is _______ a team of experts to work on the project. He has a strong _______ to succeed. _______ her ails, she remains cheerful. The government has a _______ trade policy. The company is facing a _______ battle.",
              "words": [
                "assemble",
                "resolve",
                "despite",
                "liberal",
                "legal"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-85",
        "title": "5-Word Pack 85",
        "content": [
          {
            "blockId": "pack-85-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 85</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-85-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 85)",
              "cards": [
                {
                  "front": "incentive",
                  "back": "Definition: A thing that motivates or encourages one to do something."
                },
                {
                  "front": "globe",
                  "back": "Definition: The earth."
                },
                {
                  "front": "somewhat",
                  "back": "Definition: To a moderate extent or degree."
                },
                {
                  "front": "scenario",
                  "back": "Definition: A postulated sequence or development of events."
                },
                {
                  "front": "drama",
                  "back": "Definition: A play for theater, radio, or television."
                }
              ]
            }
          },
          {
            "blockId": "pack-85-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 85: Contextual Application",
              "sentence": "The government is offering a tax _______ to companies that invest in renewable energy. The company has a _______ presence. The weather is _______ colder today. The movie is based on a _______ written by a famous author. The movie is a _______ about a young woman who overcomes adversity.",
              "words": [
                "incentive",
                "globe",
                "somewhat",
                "scenario",
                "drama"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-86",
        "title": "5-Word Pack 86",
        "content": [
          {
            "blockId": "pack-86-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 86</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-86-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 86)",
              "cards": [
                {
                  "front": "identify",
                  "back": "Definition: To establish or indicate who or what (someone or something) is."
                },
                {
                  "front": "focus",
                  "back": "Definition: The center of interest or activity."
                },
                {
                  "front": "accurate",
                  "back": "Definition: (of information, measurements, statistics, etc.) correct in all details; exact."
                },
                {
                  "front": "statistic",
                  "back": "Definition: A fact or piece of data from a study of a large quantity of numerical data."
                },
                {
                  "front": "diminish",
                  "back": "Definition: To make or become less."
                }
              ]
            }
          },
          {
            "blockId": "pack-86-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 86: Contextual Application",
              "sentence": "It is important to _______ the cause of the problem. He needs to _______ on his studies. It is important to have an _______ understanding of the situation. He is a _______ian who works for the government. His influence has _______ since he retired.",
              "words": [
                "identify",
                "focus",
                "accurate",
                "statistic",
                "diminish"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-87",
        "title": "5-Word Pack 87",
        "content": [
          {
            "blockId": "pack-87-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 87</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-87-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 87)",
              "cards": [
                {
                  "front": "insight",
                  "back": "Definition: The capacity to gain an accurate and deep intuitive understanding of a person or thing."
                },
                {
                  "front": "accelerate",
                  "back": "Definition: (of a vehicle or other physical object) to begin to move more quickly."
                },
                {
                  "front": "negate",
                  "back": "Definition: To nullify; make ineffective."
                },
                {
                  "front": "range",
                  "back": "Definition: The area of variation between upper and lower limits on a particular scale."
                },
                {
                  "front": "discriminate",
                  "back": "Definition: To recognize a distinction; differentiate."
                }
              ]
            }
          },
          {
            "blockId": "pack-87-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 87: Contextual Application",
              "sentence": "He has a great deal of _______ into human nature. The company is trying to _______ its growth. The new evidence _______ the original theory. The price of the car is out of my _______. He has a good ear for music and can _______ between different instruments.",
              "words": [
                "insight",
                "accelerate",
                "negate",
                "range",
                "discriminate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-88",
        "title": "5-Word Pack 88",
        "content": [
          {
            "blockId": "pack-88-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 88</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-88-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 88)",
              "cards": [
                {
                  "front": "channel",
                  "back": "Definition: A length of water wider than a strait, joining two larger areas of water, especially two seas."
                },
                {
                  "front": "reverse",
                  "back": "Definition: To move backward."
                },
                {
                  "front": "item",
                  "back": "Definition: An individual article or unit, especially one that is part of a list, collection, or set."
                },
                {
                  "front": "insert",
                  "back": "Definition: To place, fit, or thrust (something) into another thing."
                },
                {
                  "front": "analogy",
                  "back": "Definition: A comparison between two things, typically for the purpose of explanation or clarification."
                }
              ]
            }
          },
          {
            "blockId": "pack-88-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 88: Contextual Application",
              "sentence": "The company is using a new _______ to distribute its products. The company has _______ its decision to close the factory. The most expensive _______ in the store is a diamond necklace. The author has _______ a new chapter into the book. The teacher used an _______ to explain the complex concept.",
              "words": [
                "channel",
                "reverse",
                "item",
                "insert",
                "analogy"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-89",
        "title": "5-Word Pack 89",
        "content": [
          {
            "blockId": "pack-89-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 89</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-89-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 89)",
              "cards": [
                {
                  "front": "likewise",
                  "back": "Definition: In the same way; also."
                },
                {
                  "front": "criteria",
                  "back": "Definition: A principle or standard by which something may be judged or decided."
                },
                {
                  "front": "priority",
                  "back": "Definition: A thing that is regarded as more important than another."
                },
                {
                  "front": "issue",
                  "back": "Definition: An important topic or problem for debate or discussion."
                },
                {
                  "front": "compound",
                  "back": "Definition: A thing that is composed of two or more separate elements; a mixture."
                }
              ]
            }
          },
          {
            "blockId": "pack-89-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 89: Contextual Application",
              "sentence": "I enjoyed the movie, and my friend did _______. The main _______ for the job is a degree in engineering. The company has made customer satisfaction a _______. The government is trying to address the _______ of climate change. The problem is _______ by a lack of resources.",
              "words": [
                "likewise",
                "criteria",
                "priority",
                "issue",
                "compound"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-90",
        "title": "5-Word Pack 90",
        "content": [
          {
            "blockId": "pack-90-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 90</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-90-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 90)",
              "cards": [
                {
                  "front": "contribute",
                  "back": "Definition: To give (something, especially money) in order to help achieve or provide something."
                },
                {
                  "front": "conform",
                  "back": "Definition: To comply with rules, standards, or laws."
                },
                {
                  "front": "isolate",
                  "back": "Definition: To cause (a person or place) to be or remain alone or apart from others."
                },
                {
                  "front": "domestic",
                  "back": "Definition: Relating to the running of a home or to family relations."
                },
                {
                  "front": "decade",
                  "back": "Definition: A period of ten years."
                }
              ]
            }
          },
          {
            "blockId": "pack-90-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 90: Contextual Application",
              "sentence": "Everyone is expected to _______ to the discussion. He refuses to _______ to social norms. The country has been _______ from the international community. He is a _______ animal, not a wild one. He has lived in this city for the past _______.",
              "words": [
                "contribute",
                "conform",
                "isolate",
                "domestic",
                "decade"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-91",
        "title": "5-Word Pack 91",
        "content": [
          {
            "blockId": "pack-91-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 91</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-91-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 91)",
              "cards": [
                {
                  "front": "gender",
                  "back": "Definition: Either of the two sexes (male and female), especially when considered with reference to social and cultural differences rather than biological ones."
                },
                {
                  "front": "scope",
                  "back": "Definition: The extent of the area or subject matter that something deals with or to which it is relevant."
                },
                {
                  "front": "invest",
                  "back": "Definition: To expend money with the expectation of achieving a profit or material result by putting it into financial schemes, shares, or property, or by using it to develop a commercial venture."
                },
                {
                  "front": "ethic",
                  "back": "Definition: A set of moral principles, especially ones relating to or affirming a specified group, field, or form of conduct."
                },
                {
                  "front": "exceed",
                  "back": "Definition: To be greater in number or size than (a quantity, number, or other measurable thing)."
                }
              ]
            }
          },
          {
            "blockId": "pack-91-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 91: Contextual Application",
              "sentence": "The toy is suitable for children of either _______. The problem is beyond the _______ of my knowledge. The company is _______ in new technology. The company has a strict code of _______. He _______ all our expectations.",
              "words": [
                "gender",
                "scope",
                "invest",
                "ethic",
                "exceed"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-92",
        "title": "5-Word Pack 92",
        "content": [
          {
            "blockId": "pack-92-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 92</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-92-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 92)",
              "cards": [
                {
                  "front": "approach",
                  "back": "Definition: A way of dealing with something."
                },
                {
                  "front": "expert",
                  "back": "Definition: A person who has a comprehensive and authoritative knowledge of or skill in a particular area."
                },
                {
                  "front": "impose",
                  "back": "Definition: To force (something unwelcome or unfamiliar) to be accepted or put in place."
                },
                {
                  "front": "immigrate",
                  "back": "Definition: To come to live permanently in a foreign country."
                },
                {
                  "front": "method",
                  "back": "Definition: A particular form of procedure for accomplishing or approaching something, especially a systematic or established one."
                }
              ]
            }
          },
          {
            "blockId": "pack-92-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 92: Contextual Application",
              "sentence": "He has a very positive _______ to life. The company has hired an _______ to help with the project. I don’t want to _______ my views on you. The country has a large immigrant population. There are many different _______ for learning a new language.",
              "words": [
                "approach",
                "expert",
                "impose",
                "immigrate",
                "method"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-93",
        "title": "5-Word Pack 93",
        "content": [
          {
            "blockId": "pack-93-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 93</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-93-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 93)",
              "cards": [
                {
                  "front": "intense",
                  "back": "Definition: Of extreme force, degree, or strength."
                },
                {
                  "front": "reinforce",
                  "back": "Definition: To strengthen or support, especially with additional personnel or material."
                },
                {
                  "front": "reveal",
                  "back": "Definition: To make (previously unknown or secret information) known to others."
                },
                {
                  "front": "practitioner",
                  "back": "Definition: A person actively engaged in an art, discipline, or profession, especially medicine."
                },
                {
                  "front": "simulate",
                  "back": "Definition: To imitate the appearance or character of."
                }
              ]
            }
          },
          {
            "blockId": "pack-93-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 93: Contextual Application",
              "sentence": "He is a very _______ person. The new evidence _______ my belief that he is innocent. The study _______ some interesting findings. The book is for _______ of the art of negotiation. The training exercise is designed to _______ a real-life emergency.",
              "words": [
                "intense",
                "reinforce",
                "reveal",
                "practitioner",
                "simulate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-94",
        "title": "5-Word Pack 94",
        "content": [
          {
            "blockId": "pack-94-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 94</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-94-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 94)",
              "cards": [
                {
                  "front": "physical",
                  "back": "Definition: Relating to the body as opposed to the mind."
                },
                {
                  "front": "allocate",
                  "back": "Definition: To distribute (resources or duties) for a particular purpose."
                },
                {
                  "front": "maintain",
                  "back": "Definition: To cause or enable (a condition or state of affairs) to continue."
                },
                {
                  "front": "commodity",
                  "back": "Definition: A raw material or primary agricultural product that can be bought and sold, such as copper or coffee."
                },
                {
                  "front": "journal",
                  "back": "Definition: A newspaper or magazine that deals with a particular subject or professional activity."
                }
              ]
            }
          },
          {
            "blockId": "pack-94-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 94: Contextual Application",
              "sentence": "The job requires a lot of _______ labor. The company has _______ a budget for marketing. It is important to _______ a healthy lifestyle. The company trades in a variety of _______. She keeps a _______ of her thoughts and feelings.",
              "words": [
                "physical",
                "allocate",
                "maintain",
                "commodity",
                "journal"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-95",
        "title": "5-Word Pack 95",
        "content": [
          {
            "blockId": "pack-95-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 95</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-95-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 95)",
              "cards": [
                {
                  "front": "justify",
                  "back": "Definition: To show or prove to be right or reasonable."
                },
                {
                  "front": "layer",
                  "back": "Definition: A sheet, quantity, or thickness of material, typically one of several, covering a surface or body."
                },
                {
                  "front": "licence",
                  "back": "Definition: A permit from an authority to own or use something, do a particular thing, or carry on a trade."
                },
                {
                  "front": "locate",
                  "back": "Definition: To discover the exact place or position of."
                },
                {
                  "front": "logic",
                  "back": "Definition: Reasoning conducted or assessed according to strict principles of validity."
                }
              ]
            }
          },
          {
            "blockId": "pack-95-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 95: Contextual Application",
              "sentence": "The company has to _______ its decision to close the factory. The company has a complex organizational _______. The company has a _______ to operate in the country. The company is _______ in a new office building. There is a certain _______ to his madness.",
              "words": [
                "justify",
                "layer",
                "licence",
                "locate",
                "logic"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-96",
        "title": "5-Word Pack 96",
        "content": [
          {
            "blockId": "pack-96-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 96</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-96-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 96)",
              "cards": [
                {
                  "front": "mature",
                  "back": "Definition: Fully developed physically; full-grown."
                },
                {
                  "front": "mental",
                  "back": "Definition: Relating to the mind."
                },
                {
                  "front": "migrate",
                  "back": "Definition: (of an animal, typically a bird or fish) to move from one region or habitat to another according to the seasons."
                },
                {
                  "front": "military",
                  "back": "Definition: Relating to or characteristic of soldiers or armed forces."
                },
                {
                  "front": "minimal",
                  "back": "Definition: Of a minimum amount, quantity, or degree; negligible."
                }
              ]
            }
          },
          {
            "blockId": "pack-96-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 96: Contextual Application",
              "sentence": "The wine has _______ over the years. The job requires a lot of _______ effort. He migrated to the city in search of work. The country has a strong _______. The changes to the plan were _______.",
              "words": [
                "mature",
                "mental",
                "migrate",
                "military",
                "minimal"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-97",
        "title": "5-Word Pack 97",
        "content": [
          {
            "blockId": "pack-97-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 97</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-97-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 97)",
              "cards": [
                {
                  "front": "ministry",
                  "back": "Definition: A government department headed by a minister of state."
                },
                {
                  "front": "monitor",
                  "back": "Definition: To observe and check the progress or quality of (something) over a period of time; keep under systematic review."
                },
                {
                  "front": "motive",
                  "back": "Definition: A reason for doing something, especially one that is hidden or not obvious."
                },
                {
                  "front": "network",
                  "back": "Definition: An arrangement of intersecting horizontal and vertical lines."
                },
                {
                  "front": "neutral",
                  "back": "Definition: Not helping or supporting either side in a conflict, disagreement, etc.; impartial."
                }
              ]
            }
          },
          {
            "blockId": "pack-97-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 97: Contextual Application",
              "sentence": "The government has a _______ of education. The company is _______ its sales figures closely. His _______ for helping me was not entirely clear. He has a wide _______ of contacts in the industry. The referee must be _______.",
              "words": [
                "ministry",
                "monitor",
                "motive",
                "network",
                "neutral"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-98",
        "title": "5-Word Pack 98",
        "content": [
          {
            "blockId": "pack-98-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 98</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-98-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 98)",
              "cards": [
                {
                  "front": "nevertheless",
                  "back": "Definition: In spite of that; nevertheless."
                },
                {
                  "front": "notion",
                  "back": "Definition: A conception of or belief about something."
                },
                {
                  "front": "objective",
                  "back": "Definition: A thing aimed at or sought; a goal."
                },
                {
                  "front": "obtain",
                  "back": "Definition: To get, acquire, or secure (something)."
                },
                {
                  "front": "obvious",
                  "back": "Definition: Easily perceived or understood; clear, self-evident, or apparent."
                }
              ]
            }
          },
          {
            "blockId": "pack-98-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 98: Contextual Application",
              "sentence": "He was tired, but he went to the party _______. The _______ of a four-day work week is gaining popularity. My _______ is to graduate with honors. She has _______ a degree in law. The answer to the question is _______.",
              "words": [
                "nevertheless",
                "notion",
                "objective",
                "obtain",
                "obvious"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-99",
        "title": "5-Word Pack 99",
        "content": [
          {
            "blockId": "pack-99-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 99</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-99-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 99)",
              "cards": [
                {
                  "front": "occupy",
                  "back": "Definition: To reside or have one's place of business in (a building)."
                },
                {
                  "front": "occur",
                  "back": "Definition: To happen; take place."
                },
                {
                  "front": "odd",
                  "back": "Definition: Different to what is usual or expected; strange."
                },
                {
                  "front": "option",
                  "back": "Definition: A thing that is or may be chosen."
                },
                {
                  "front": "orient",
                  "back": "Definition: To align or position (something) relative to the points of a compass or other specified positions."
                }
              ]
            }
          },
          {
            "blockId": "pack-99-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 99: Contextual Application",
              "sentence": "He has _______ the same position for ten years. It never _______ to me that he might be lying. The _______ thing is that he never mentioned it to me. The company offers a variety of _______ to its customers. The company is trying to _______ itself to the new market conditions.",
              "words": [
                "occupy",
                "occur",
                "odd",
                "option",
                "orient"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-100",
        "title": "5-Word Pack 100",
        "content": [
          {
            "blockId": "pack-100-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 100</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-100-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 100)",
              "cards": [
                {
                  "front": "outcome",
                  "back": "Definition: The way a thing turns out; a consequence."
                },
                {
                  "front": "overall",
                  "back": "Definition: Taking everything into account."
                },
                {
                  "front": "panel",
                  "back": "Definition: A flat or curved component, typically rectangular, that forms or is set into the surface of a door, wall, or ceiling."
                },
                {
                  "front": "paradigm",
                  "back": "Definition: A typical example or pattern of something; a model."
                },
                {
                  "front": "paragraph",
                  "back": "Definition: A distinct section of a piece of writing, usually dealing with a single theme and indicated by a new line, indentation, or numbering."
                }
              ]
            }
          },
          {
            "blockId": "pack-100-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 100: Contextual Application",
              "sentence": "The study had a positive _______. _______, I am satisfied with the results. The company has set up a _______ to investigate the incident. The company is a _______ of success in the industry. Please write a _______ about your favorite hobby.",
              "words": [
                "outcome",
                "overall",
                "panel",
                "paradigm",
                "paragraph"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-101",
        "title": "5-Word Pack 101",
        "content": [
          {
            "blockId": "pack-101-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 101</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-101-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 101)",
              "cards": [
                {
                  "front": "parallel",
                  "back": "Definition: (of lines, planes, surfaces, or objects) side by side and having the same distance continuously between them."
                },
                {
                  "front": "participate",
                  "back": "Definition: To take part."
                },
                {
                  "front": "partner",
                  "back": "Definition: A person who takes part in an undertaking with another or others, especially in a business or company with shared risks and profits."
                },
                {
                  "front": "passive",
                  "back": "Definition: Accepting or allowing what happens or what others do, without active response or resistance."
                },
                {
                  "front": "perceive",
                  "back": "Definition: To become aware or conscious of (something); come to realize or understand."
                }
              ]
            }
          },
          {
            "blockId": "pack-101-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 101: Contextual Application",
              "sentence": "There are some interesting _______ between the two novels. The company is _______ in a trade fair. The two companies have formed a strategic _______. The company has a _______ role in the market. The world is not always as we _______ it to be.",
              "words": [
                "parallel",
                "participate",
                "partner",
                "passive",
                "perceive"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-102",
        "title": "5-Word Pack 102",
        "content": [
          {
            "blockId": "pack-102-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 102</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-102-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 102)",
              "cards": [
                {
                  "front": "period",
                  "back": "Definition: A length or portion of time."
                },
                {
                  "front": "persist",
                  "back": "Definition: To continue firmly or obstinately in an opinion or a course of action in spite of difficulty, opposition, or failure."
                },
                {
                  "front": "perspective",
                  "back": "Definition: A particular attitude toward or way of regarding something; a point of view."
                },
                {
                  "front": "phase",
                  "back": "Definition: A distinct period or stage in a series of events or a process of change or development."
                },
                {
                  "front": "philosophy",
                  "back": "Definition: The study of the fundamental nature of knowledge, reality, and existence."
                }
              ]
            }
          },
          {
            "blockId": "pack-102-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 102: Contextual Application",
              "sentence": "He was a famous writer of the Victorian _______. The rain will _______ for the rest of the day. It is important to consider the problem from different _______. The company is going through a _______ of transition. The company’s _______ is to put the customer first.",
              "words": [
                "period",
                "persist",
                "perspective",
                "phase",
                "philosophy"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-103",
        "title": "5-Word Pack 103",
        "content": [
          {
            "blockId": "pack-103-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 103</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-103-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 103)",
              "cards": [
                {
                  "front": "physical",
                  "back": "Definition: Relating to the body as opposed to the mind."
                },
                {
                  "front": "plus",
                  "back": "Definition: With the addition of."
                },
                {
                  "front": "policy",
                  "back": "Definition: A course or principle of action adopted or proposed by a government, party, business, or individual."
                },
                {
                  "front": "portion",
                  "back": "Definition: A part of a whole; a share."
                },
                {
                  "front": "pose",
                  "back": "Definition: To present or constitute (a problem, danger, or difficulty)."
                }
              ]
            }
          },
          {
            "blockId": "pack-103-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 103: Contextual Application",
              "sentence": "The job requires a lot of _______ labor. The job has a good salary, _______ excellent benefits. The government has a new _______ on education. The company has a _______ of the market. He _______ for a photograph.",
              "words": [
                "physical",
                "plus",
                "policy",
                "portion",
                "pose"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-104",
        "title": "5-Word Pack 104",
        "content": [
          {
            "blockId": "pack-104-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>5-Word Pack 104</h2><p>5-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-104-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "5-Word Flashcards (Pack 104)",
              "cards": [
                {
                  "front": "positive",
                  "back": "Definition: Consisting in or characterized by the presence or possession of features or qualities rather than their absence."
                },
                {
                  "front": "potential",
                  "back": "Definition: Having or showing the capacity to become or develop into something in the future."
                },
                {
                  "front": "practitioner",
                  "back": "Definition: A person actively engaged in an art, discipline, or profession, especially medicine."
                },
                {
                  "front": "precede",
                  "back": "Definition: To come before (something) in time."
                },
                {
                  "front": "precise",
                  "back": "Definition: Marked by exactness and accuracy of expression or detail."
                }
              ]
            }
          },
          {
            "blockId": "pack-104-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 104: Contextual Application",
              "sentence": "The test results were _______. He is a _______ candidate for the job. The book is for _______ of the art of negotiation. The dark clouds _______ the storm. He is a very _______ and detail-oriented person.",
              "words": [
                "positive",
                "potential",
                "practitioner",
                "precede",
                "precise"
              ]
            }
          }
        ]
      }
    ],
    "10": [
      {
        "packId": "pack-1",
        "title": "10-Word Pack 1",
        "content": [
          {
            "blockId": "pack-1-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 1</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-1-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 1)",
              "cards": [
                {
                  "front": "hierarchy",
                  "back": "Definition: A system in which members of an organization or society are ranked according to relative status or authority."
                },
                {
                  "front": "evolve",
                  "back": "Definition: To develop gradually from a simple to a more complex form."
                },
                {
                  "front": "couple",
                  "back": "Definition: Two individuals of the same sort considered together."
                },
                {
                  "front": "formula",
                  "back": "Definition: A mathematical relationship or rule expressed in symbols."
                },
                {
                  "front": "automate",
                  "back": "Definition: To convert (a process or facility) to be operated by largely automatic equipment."
                },
                {
                  "front": "final",
                  "back": "Definition: Coming at the end of a series."
                },
                {
                  "front": "identical",
                  "back": "Definition: Similar in every detail; exactly alike."
                },
                {
                  "front": "distinct",
                  "back": "Definition: Recognizably different in nature from something else of a similar type."
                },
                {
                  "front": "respond",
                  "back": "Definition: To say something in reply."
                },
                {
                  "front": "incorporate",
                  "back": "Definition: To take in or contain (something) as part of a whole; include."
                }
              ]
            }
          },
          {
            "blockId": "pack-1-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 1: Contextual Application",
              "sentence": "In the military, there is a clear _______ of command. Languages _______ over time, with new words being added and old ones falling out of use. It will only take a _______ of minutes to finish this task. There is no magic _______ for success; it requires hard work and dedication. We can _______ many repetitive tasks using software. The _______ decision will be made by the board of directors. The two paintings looked _______ to the untrained eye. There is a _______ smell of garlic in the kitchen. It is important to _______ to emails in a timely manner. The new model will _______ several advanced safety features.",
              "words": [
                "hierarchy",
                "evolve",
                "couple",
                "formula",
                "automate",
                "final",
                "identical",
                "distinct",
                "respond",
                "incorporate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-2",
        "title": "10-Word Pack 2",
        "content": [
          {
            "blockId": "pack-2-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 2</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-2-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 2)",
              "cards": [
                {
                  "front": "similar",
                  "back": "Definition: Resembling without being identical."
                },
                {
                  "front": "medium",
                  "back": "Definition: An agency or means of doing something."
                },
                {
                  "front": "link",
                  "back": "Definition: A relationship between two things or situations, especially where one affects the other."
                },
                {
                  "front": "amend",
                  "back": "Definition: To make minor changes to (a text, piece of legislation, etc.) in order to make it fairer or more accurate."
                },
                {
                  "front": "community",
                  "back": "Definition: A group of people living in the same place or having a particular characteristic in common."
                },
                {
                  "front": "compatible",
                  "back": "Definition: (of two things) able to exist or occur together without conflict."
                },
                {
                  "front": "emphasis",
                  "back": "Definition: Special importance, value, or prominence given to something."
                },
                {
                  "front": "edit",
                  "back": "Definition: To prepare (written material) for publication by correcting, condensing, or otherwise modifying it."
                },
                {
                  "front": "maximize",
                  "back": "Definition: To make as large or great as possible."
                },
                {
                  "front": "initial",
                  "back": "Definition: Existing or occurring at the beginning."
                }
              ]
            }
          },
          {
            "blockId": "pack-2-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 2: Contextual Application",
              "sentence": "I have had a _______ experience to the one you described. Art can be a _______ for expressing emotions. The police are trying to find a _______ between the two crimes. You may need to _______ your contract before signing it. There is a strong sense of _______ in our neighborhood. Their personalities are not _______; they argue all the time. The teacher put _______ on the importance of studying for the exam. The director will _______ the film to create the final version. To _______ your chances of winning, you should practice every day. The _______ phase of the project will focus on research and planning.",
              "words": [
                "similar",
                "medium",
                "link",
                "amend",
                "community",
                "compatible",
                "emphasis",
                "edit",
                "maximize",
                "initial"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-3",
        "title": "10-Word Pack 3",
        "content": [
          {
            "blockId": "pack-3-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 3</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-3-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 3)",
              "cards": [
                {
                  "front": "constant",
                  "back": "Definition: Occurring continuously over a period of time."
                },
                {
                  "front": "apparent",
                  "back": "Definition: Clearly visible or understood; obvious."
                },
                {
                  "front": "forthcoming",
                  "back": "Definition: About to happen or appear."
                },
                {
                  "front": "aspect",
                  "back": "Definition: A particular part or feature of something."
                },
                {
                  "front": "appropriate",
                  "back": "Definition: Suitable or proper in the circumstances."
                },
                {
                  "front": "manipulate",
                  "back": "Definition: To handle or control (a tool, mechanism, etc.), typically in a skillful manner."
                },
                {
                  "front": "shift",
                  "back": "Definition: A slight change in position, direction, or tendency."
                },
                {
                  "front": "assist",
                  "back": "Definition: To help (someone), typically by doing a share of the work."
                },
                {
                  "front": "presume",
                  "back": "Definition: To suppose that something is the case on the basis of probability."
                },
                {
                  "front": "remove",
                  "back": "Definition: To take (something) away or off from the position occupied."
                }
              ]
            }
          },
          {
            "blockId": "pack-3-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 3: Contextual Application",
              "sentence": "He has been a _______ source of support for me. The _______ cause of the accident was a mechanical failure. The company has announced its _______ product launch. The most challenging _______ of the job is the long hours. His comment was not _______ for the serious occasion. He was accused of trying to _______ the stock market. The company is planning a _______ in its marketing strategy. The new software is designed to _______ users with their tasks. We should not _______ to know what is best for others. The government plans to _______ the old regulations.",
              "words": [
                "constant",
                "apparent",
                "forthcoming",
                "aspect",
                "appropriate",
                "manipulate",
                "shift",
                "assist",
                "presume",
                "remove"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-4",
        "title": "10-Word Pack 4",
        "content": [
          {
            "blockId": "pack-4-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 4</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-4-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 4)",
              "cards": [
                {
                  "front": "restore",
                  "back": "Definition: To bring back (a previous right, practice, custom, or situation); reinstate."
                },
                {
                  "front": "objective",
                  "back": "Definition: A thing aimed at or sought; a goal."
                },
                {
                  "front": "proportion",
                  "back": "Definition: A part, share, or number considered in comparative relation to a whole."
                },
                {
                  "front": "appreciate",
                  "back": "Definition: To recognize the full worth of."
                },
                {
                  "front": "instance",
                  "back": "Definition: An example or single occurrence of something."
                },
                {
                  "front": "consent",
                  "back": "Definition: Permission for something to happen or agreement to do something."
                },
                {
                  "front": "constitute",
                  "back": "Definition: To be (a part) of a whole."
                },
                {
                  "front": "index",
                  "back": "Definition: (in a book or set of books) an alphabetical list of names, subjects, etc., with references to the places where they occur."
                },
                {
                  "front": "dimension",
                  "back": "Definition: A measurable extent of a particular kind, such as length, breadth, depth, or height."
                },
                {
                  "front": "compensate",
                  "back": "Definition: To reduce or counteract (something unwelcome or unpleasant) by exerting an opposite force or effect."
                }
              ]
            }
          },
          {
            "blockId": "pack-4-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 4: Contextual Application",
              "sentence": "They are working to _______ the old building to its original condition. My _______ is to graduate with honors. The _______ of students who go to college has increased in recent years. It is important to _______ the beauty of nature. This is a classic _______ of a company putting profits before people. He gave his _______ to the medical procedure. These actions _______ a violation of the company’s policy. The stock market _______ fell sharply today. The problem has a political _______ as well as an economic one. The company will _______ its employees for their overtime work.",
              "words": [
                "restore",
                "objective",
                "proportion",
                "appreciate",
                "instance",
                "consent",
                "constitute",
                "index",
                "dimension",
                "compensate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-5",
        "title": "10-Word Pack 5",
        "content": [
          {
            "blockId": "pack-5-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 5</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-5-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 5)",
              "cards": [
                {
                  "front": "primary",
                  "back": "Definition: Of chief importance; principal."
                },
                {
                  "front": "equivalent",
                  "back": "Definition: Equal in value, amount, function, meaning, etc."
                },
                {
                  "front": "significant",
                  "back": "Definition: Sufficiently great or important to be worthy of attention; noteworthy."
                },
                {
                  "front": "assume",
                  "back": "Definition: To suppose to be the case, without proof."
                },
                {
                  "front": "minimize",
                  "back": "Definition: To reduce (something, especially something undesirable) to the smallest possible amount or degree."
                },
                {
                  "front": "motive",
                  "back": "Definition: A reason for doing something, especially one that is hidden or not obvious."
                },
                {
                  "front": "medical",
                  "back": "Definition: Relating to the science or practice of medicine."
                },
                {
                  "front": "normal",
                  "back": "Definition: Conforming to a standard; usual, typical, or expected."
                },
                {
                  "front": "ethnic",
                  "back": "Definition: Relating to a population subgroup (within a larger or dominant national or cultural group) with a common national or cultural tradition."
                },
                {
                  "front": "perspective",
                  "back": "Definition: A particular attitude toward or way of regarding something; a point of view."
                }
              ]
            }
          },
          {
            "blockId": "pack-5-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 5: Contextual Application",
              "sentence": "The _______ cause of the accident is still under investigation. His silence was _______ to an admission of guilt. The discovery of penicillin was a _______ medical breakthrough. We should not _______ that everyone agrees with us. The company is trying to _______ its environmental impact. His _______ for helping me was not entirely clear. He has a _______ condition that requires him to take medication every day. After the storm, life in the city slowly returned to _______. The restaurant serves _______ cuisine from around the world. It is important to consider the problem from different _______.",
              "words": [
                "primary",
                "equivalent",
                "significant",
                "assume",
                "minimize",
                "motive",
                "medical",
                "normal",
                "ethnic",
                "perspective"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-6",
        "title": "10-Word Pack 6",
        "content": [
          {
            "blockId": "pack-6-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 6</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-6-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 6)",
              "cards": [
                {
                  "front": "induce",
                  "back": "Definition: To succeed in persuading or influencing (someone) to do something."
                },
                {
                  "front": "philosophy",
                  "back": "Definition: The study of the fundamental nature of knowledge, reality, and existence."
                },
                {
                  "front": "media",
                  "back": "Definition: The main means of mass communication (broadcasting, publishing, and the internet) regarded collectively."
                },
                {
                  "front": "purchase",
                  "back": "Definition: To acquire (something) by paying for it; buy."
                },
                {
                  "front": "straightforward",
                  "back": "Definition: Uncomplicated and easy to do or understand."
                },
                {
                  "front": "contrast",
                  "back": "Definition: The state of being strikingly different from something else, typically something in juxtaposition or close association."
                },
                {
                  "front": "partner",
                  "back": "Definition: A person who takes part in an undertaking with another or others, especially in a business or company with shared risks and profits."
                },
                {
                  "front": "labor",
                  "back": "Definition: Work, especially hard physical work."
                },
                {
                  "front": "found",
                  "back": "Definition: To establish or originate (an institution or organization), especially by providing an endowment."
                },
                {
                  "front": "cooperate",
                  "back": "Definition: To act jointly; work toward the same end."
                }
              ]
            }
          },
          {
            "blockId": "pack-6-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 6: Contextual Application",
              "sentence": "The doctor tried to _______ labor. The company’s _______ is to put the customer first. The government has been accused of trying to control the _______. The company announced the _______ of a smaller rival. He is a _______ and honest person. In _______ to his brother, he is very shy. The two companies have formed a strategic _______. The company has a shortage of skilled _______. He _______ a successful company at a young age. It is important that we all _______ to achieve our common goals.",
              "words": [
                "induce",
                "philosophy",
                "media",
                "purchase",
                "straightforward",
                "contrast",
                "partner",
                "labor",
                "found",
                "cooperate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-7",
        "title": "10-Word Pack 7",
        "content": [
          {
            "blockId": "pack-7-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 7</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-7-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 7)",
              "cards": [
                {
                  "front": "sole",
                  "back": "Definition: One and only."
                },
                {
                  "front": "mechanism",
                  "back": "Definition: A system of parts working together in a machine; a piece of machinery."
                },
                {
                  "front": "recover",
                  "back": "Definition: To return to a normal state of health, mind, or strength."
                },
                {
                  "front": "finite",
                  "back": "Definition: Having limits or bounds."
                },
                {
                  "front": "fluctuate",
                  "back": "Definition: To rise and fall irregularly in number or amount."
                },
                {
                  "front": "fee",
                  "back": "Definition: A payment made to a professional person or to a professional or public body in exchange for advice or services."
                },
                {
                  "front": "convert",
                  "back": "Definition: To cause to change in form, character, or function."
                },
                {
                  "front": "advocate",
                  "back": "Definition: A person who publicly supports or recommends a particular cause or policy."
                },
                {
                  "front": "component",
                  "back": "Definition: A part or element of a larger whole, especially a part of a machine or vehicle."
                },
                {
                  "front": "communicate",
                  "back": "Definition: To share or exchange information, news, or ideas."
                }
              ]
            }
          },
          {
            "blockId": "pack-7-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 7: Contextual Application",
              "sentence": "Her _______ purpose in life is to help others. The government has put in place a _______ for resolving disputes. The police have recovered the stolen car. We have a _______ amount of time to complete this project. His mood seems to _______ from day to day. There is an entrance _______ to the museum. He converted to a new religion. He _______ for a more peaceful solution to the conflict. Trust is a key _______ of a healthy relationship. We can _______ with people all over the world thanks to the internet.",
              "words": [
                "sole",
                "mechanism",
                "recover",
                "finite",
                "fluctuate",
                "fee",
                "convert",
                "advocate",
                "component",
                "communicate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-8",
        "title": "10-Word Pack 8",
        "content": [
          {
            "blockId": "pack-8-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 8</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-8-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 8)",
              "cards": [
                {
                  "front": "seek",
                  "back": "Definition: To attempt to find (something)."
                },
                {
                  "front": "paradigm",
                  "back": "Definition: A typical example or pattern of something; a model."
                },
                {
                  "front": "sector",
                  "back": "Definition: An area or portion that is distinct from others."
                },
                {
                  "front": "derive",
                  "back": "Definition: To obtain something from (a specified source)."
                },
                {
                  "front": "assess",
                  "back": "Definition: To evaluate or estimate the nature, ability, or quality of."
                },
                {
                  "front": "adjacent",
                  "back": "Definition: Next to or adjoining something else."
                },
                {
                  "front": "abundant",
                  "back": "Definition: Existing or available in large quantities; plentiful."
                },
                {
                  "front": "distort",
                  "back": "Definition: To pull or twist out of shape."
                },
                {
                  "front": "core",
                  "back": "Definition: The part of something that is central to its existence or character."
                },
                {
                  "front": "dominate",
                  "back": "Definition: To have a commanding influence on; exercise control over."
                }
              ]
            }
          },
          {
            "blockId": "pack-8-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 8: Contextual Application",
              "sentence": "He came to the city to _______ his fortune. The company is a _______ of success in the industry. The company is a leader in the technology _______. She _______ great pleasure from her work. It is important to _______ the risks before making a decision. The park is _______ to the river. There was _______ evidence to support his claim. The media has been accused of _______ the facts. Honesty is one of his _______ values. He is a player who can _______ a game.",
              "words": [
                "seek",
                "paradigm",
                "sector",
                "derive",
                "assess",
                "adjacent",
                "abundant",
                "distort",
                "core",
                "dominate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-9",
        "title": "10-Word Pack 9",
        "content": [
          {
            "blockId": "pack-9-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 9</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-9-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 9)",
              "cards": [
                {
                  "front": "region",
                  "back": "Definition: An area or division, especially part of a country or the world having definable characteristics but not always fixed boundaries."
                },
                {
                  "front": "definite",
                  "back": "Definition: Clearly stated or decided; not vague or doubtful."
                },
                {
                  "front": "exploit",
                  "back": "Definition: To make full use of and derive benefit from (a resource)."
                },
                {
                  "front": "mutual",
                  "back": "Definition: (of a feeling or action) experienced or done by each of two or more parties toward the other or others."
                },
                {
                  "front": "route",
                  "back": "Definition: A way or course taken in getting from a starting point to a destination."
                },
                {
                  "front": "colleague",
                  "back": "Definition: A person with whom one works in a profession or business."
                },
                {
                  "front": "consume",
                  "back": "Definition: To eat, drink, or ingest (food or drink)."
                },
                {
                  "front": "secure",
                  "back": "Definition: Fixed or fastened so as not to give way, become loose, or be lost."
                },
                {
                  "front": "accommodate",
                  "back": "Definition: (of physical space, especially a building) provide lodging or sufficient space for."
                },
                {
                  "front": "classic",
                  "back": "Definition: Judged over a period of time to be of the highest quality and outstanding of its kind."
                }
              ]
            }
          },
          {
            "blockId": "pack-9-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 9: Contextual Application",
              "sentence": "He is the regional manager for the company. There has been a _______ improvement in his work. We need to _______ our natural resources in a sustainable way. We have a _______ respect for each other. The package is on its _______ to you. He is a well-respected _______ in the legal community. The fire _______ the entire building. He has a _______ job with a good salary. We will do our best to _______ your needs. He has a _______ car that he only drives on weekends.",
              "words": [
                "region",
                "definite",
                "exploit",
                "mutual",
                "route",
                "colleague",
                "consume",
                "secure",
                "accommodate",
                "classic"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-10",
        "title": "10-Word Pack 10",
        "content": [
          {
            "blockId": "pack-10-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 10</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-10-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 10)",
              "cards": [
                {
                  "front": "inevitable",
                  "back": "Definition: Certain to happen; unavoidable."
                },
                {
                  "front": "involve",
                  "back": "Definition: (of a situation or event) include (something) as a necessary part or result."
                },
                {
                  "front": "major",
                  "back": "Definition: Important, serious, or significant."
                },
                {
                  "front": "levy",
                  "back": "Definition: To impose (a tax, fee, or fine)."
                },
                {
                  "front": "commission",
                  "back": "Definition: An instruction, command, or duty given to a person or group of people."
                },
                {
                  "front": "restrict",
                  "back": "Definition: To put a limit on; keep under control."
                },
                {
                  "front": "integral",
                  "back": "Definition: Necessary to make a whole complete; essential or fundamental."
                },
                {
                  "front": "psychology",
                  "back": "Definition: The scientific study of the human mind and its functions, especially those affecting behavior in a given context."
                },
                {
                  "front": "behalf",
                  "back": "Definition: In the interests of a person, group, or principle."
                },
                {
                  "front": "consist",
                  "back": "Definition: To be composed or made up of."
                }
              ]
            }
          },
          {
            "blockId": "pack-10-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 10: Contextual Application",
              "sentence": "Change is an _______ part of life. He was involved in a car accident. He is a _______ figure in the world of art. The court can _______ a fine for contempt of court. The company pays its salespeople a _______ on every sale. You need to _______ your calorie intake to lose weight. The engine is an _______ part of the car. The _______ of advertising is a fascinating subject. He accepted the award on _______ of the entire team. A healthy diet should _______ of a variety of foods.",
              "words": [
                "inevitable",
                "involve",
                "major",
                "levy",
                "commission",
                "restrict",
                "integral",
                "psychology",
                "behalf",
                "consist"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-11",
        "title": "10-Word Pack 11",
        "content": [
          {
            "blockId": "pack-11-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 11</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-11-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 11)",
              "cards": [
                {
                  "front": "grade",
                  "back": "Definition: A particular level of rank, quality, proficiency, or value."
                },
                {
                  "front": "confer",
                  "back": "Definition: To grant or bestow (a title, degree, benefit, or right)."
                },
                {
                  "front": "obvious",
                  "back": "Definition: Easily perceived or understood; clear, self-evident, or apparent."
                },
                {
                  "front": "achieve",
                  "back": "Definition: To successfully bring about or reach (a desired objective, level, or result) by effort, skill, or courage."
                },
                {
                  "front": "evident",
                  "back": "Definition: Plain or obvious; clearly seen or understood."
                },
                {
                  "front": "deduce",
                  "back": "Definition: To arrive at (a fact or a conclusion) by reasoning; draw as a logical conclusion."
                },
                {
                  "front": "internal",
                  "back": "Definition: Of or situated on the inside."
                },
                {
                  "front": "document",
                  "back": "Definition: A piece of written, printed, or electronic matter that provides information or evidence or that serves as an official record."
                },
                {
                  "front": "exhibit",
                  "back": "Definition: To publicly display (a work of art or item of interest) in an art gallery or museum or at a trade fair."
                },
                {
                  "front": "parallel",
                  "back": "Definition: (of lines, planes, surfaces, or objects) side by side and having the same distance continuously between them."
                }
              ]
            }
          },
          {
            "blockId": "pack-11-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 11: Contextual Application",
              "sentence": "The beef is of the highest _______. The two leaders met to _______ on the current crisis. The answer to the question is _______. It is important to set goals and work to _______ them. The evidence of his guilt was _______. She _______ from his silence that he was angry. He suffered from _______ bleeding after the accident. It is important to _______ your sources when writing a research paper. He _______ great courage in the face of danger. There are some interesting _______ between the two novels.",
              "words": [
                "grade",
                "confer",
                "obvious",
                "achieve",
                "evident",
                "deduce",
                "internal",
                "document",
                "exhibit",
                "parallel"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-12",
        "title": "10-Word Pack 12",
        "content": [
          {
            "blockId": "pack-12-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 12</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-12-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 12)",
              "cards": [
                {
                  "front": "infrastructure",
                  "back": "Definition: The basic physical and organizational structures and facilities (e.g., buildings, roads, and power supplies) needed for the operation of a society or enterprise."
                },
                {
                  "front": "contemporary",
                  "back": "Definition: Living or occurring at the same time."
                },
                {
                  "front": "image",
                  "back": "Definition: A representation of the external form of a person or thing in art."
                },
                {
                  "front": "accustomed",
                  "back": "Definition: Customary or usual."
                },
                {
                  "front": "orient",
                  "back": "Definition: To align or position (something) relative to the points of a compass or other specified positions."
                },
                {
                  "front": "mode",
                  "back": "Definition: A way or manner in which something occurs or is experienced, expressed, or done."
                },
                {
                  "front": "initiate",
                  "back": "Definition: To cause (a process or action) to begin."
                },
                {
                  "front": "precise",
                  "back": "Definition: Marked by exactness and accuracy of expression or detail."
                },
                {
                  "front": "flexible",
                  "back": "Definition: Capable of bending easily without breaking."
                },
                {
                  "front": "revenue",
                  "back": "Definition: Income, especially when of a company or organization and of a substantial nature."
                }
              ]
            }
          },
          {
            "blockId": "pack-12-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 12: Contextual Application",
              "sentence": "The company is building a new _______ to support its growing business. The museum has a collection of _______ art. He has a very positive _______ of himself. She is _______ to getting her own way. The company is trying to _______ itself to the new market conditions. He is in a bad _______ today. He was _______ into the secret society. He is a very _______ and detail-oriented person. She has a _______ work schedule. The government gets most of its _______ from taxes.",
              "words": [
                "infrastructure",
                "contemporary",
                "image",
                "accustomed",
                "orient",
                "mode",
                "initiate",
                "precise",
                "flexible",
                "revenue"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-13",
        "title": "10-Word Pack 13",
        "content": [
          {
            "blockId": "pack-13-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 13</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-13-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 13)",
              "cards": [
                {
                  "front": "equate",
                  "back": "Definition: To consider (one thing) to be the same as or equivalent to another."
                },
                {
                  "front": "hypothesis",
                  "back": "Definition: A supposition or proposed explanation made on the basis of limited evidence as a starting point for further investigation."
                },
                {
                  "front": "factor",
                  "back": "Definition: A circumstance, fact, or influence that contributes to a result or outcome."
                },
                {
                  "front": "radical",
                  "back": "Definition: (especially of change or action) relating to or affecting the fundamental nature of something; far-reaching or thorough."
                },
                {
                  "front": "export",
                  "back": "Definition: To send (goods or services) to another country for sale."
                },
                {
                  "front": "entity",
                  "back": "Definition: A thing with distinct and independent existence."
                },
                {
                  "front": "define",
                  "back": "Definition: To state or describe exactly the nature, scope, or meaning of."
                },
                {
                  "front": "element",
                  "back": "Definition: A part or aspect of something abstract, especially one that is essential or characteristic."
                },
                {
                  "front": "enable",
                  "back": "Definition: To give (someone or something) the authority or means to do something; make it possible for."
                },
                {
                  "front": "scheme",
                  "back": "Definition: A large-scale systematic plan or arrangement for attaining a particular object or putting a particular idea into effect."
                }
              ]
            }
          },
          {
            "blockId": "pack-13-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 13: Contextual Application",
              "sentence": "He _______ success with money. The _______ was not supported by the data. The weather was a major _______ in our decision to cancel the trip. He has some _______ ideas about how to solve the problem. The company is looking for new markets to _______ its products to. The two organizations have merged to form a single _______. It is important to _______ your goals clearly. The movie has all the _______ of a classic thriller. The scholarship will _______ her to go to college. He was involved in a _______ to defraud the company.",
              "words": [
                "equate",
                "hypothesis",
                "factor",
                "radical",
                "export",
                "entity",
                "define",
                "element",
                "enable",
                "scheme"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-14",
        "title": "10-Word Pack 14",
        "content": [
          {
            "blockId": "pack-14-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 14</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-14-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 14)",
              "cards": [
                {
                  "front": "arbitrary",
                  "back": "Definition: Based on random choice or personal whim, rather than any reason or system."
                },
                {
                  "front": "error",
                  "back": "Definition: A mistake."
                },
                {
                  "front": "inspect",
                  "back": "Definition: To look at (someone or something) closely, typically to assess their condition or to discover any shortcomings."
                },
                {
                  "front": "transport",
                  "back": "Definition: To take or carry (people or goods) from one place to another by means of a vehicle, aircraft, or ship."
                },
                {
                  "front": "comply",
                  "back": "Definition: (of a person or group) to act in accordance with a wish or command."
                },
                {
                  "front": "ignorant",
                  "back": "Definition: Lacking knowledge or awareness in general; uneducated or unsophisticated."
                },
                {
                  "front": "subordinate",
                  "back": "Definition: Lower in rank or position."
                },
                {
                  "front": "surplus",
                  "back": "Definition: An amount of something left over when requirements have been met; an excess of production or supply over demand."
                },
                {
                  "front": "subsequent",
                  "back": "Definition: Coming after something in time; following."
                },
                {
                  "front": "violate",
                  "back": "Definition: To break or fail to comply with (a rule or formal agreement)."
                }
              ]
            }
          },
          {
            "blockId": "pack-14-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 14: Contextual Application",
              "sentence": "The rules of the game seemed _______ and unfair. It was an _______ to trust him. The health inspector will _______ the restaurant tomorrow. The company provides _______ for its employees. The company has been fined for failing to _______ with environmental laws. It is _______ to believe that all stereotypes are true. In the army, you must obey the orders of your _______ officers. There is a _______ of food in the world, but many people are still hungry. In _______ years, the company grew to become a major player in the industry. The company has been accused of _______ human rights.",
              "words": [
                "arbitrary",
                "error",
                "inspect",
                "transport",
                "comply",
                "ignorant",
                "subordinate",
                "surplus",
                "subsequent",
                "violate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-15",
        "title": "10-Word Pack 15",
        "content": [
          {
            "blockId": "pack-15-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 15</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-15-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 15)",
              "cards": [
                {
                  "front": "vehicle",
                  "back": "Definition: A thing used for transporting people or goods, especially on land, such as a car, truck, or cart."
                },
                {
                  "front": "cite",
                  "back": "Definition: To quote (a passage, book, or author) as evidence for or justification of an argument or statement, especially in a scholarly work."
                },
                {
                  "front": "tense",
                  "back": "Definition: (of a situation, etc.) stretched tight or rigid."
                },
                {
                  "front": "nonetheless",
                  "back": "Definition: In spite of that; nevertheless."
                },
                {
                  "front": "tense",
                  "back": "Definition: A set of forms taken by a verb to indicate the time (and sometimes the continuance or completeness) of the action in relation to the time of the utterance."
                },
                {
                  "front": "furthermore",
                  "back": "Definition: In addition; besides (used to add a point to an argument)."
                },
                {
                  "front": "whereby",
                  "back": "Definition: By which."
                },
                {
                  "front": "uniform",
                  "back": "Definition: Remaining the same in all cases and at all times; unchanging in form or character."
                },
                {
                  "front": "preliminary",
                  "back": "Definition: Preceding or done in preparation for something fuller or more important."
                },
                {
                  "front": "successor",
                  "back": "Definition: A person or thing that succeeds another."
                }
              ]
            }
          },
          {
            "blockId": "pack-15-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 15: Contextual Application",
              "sentence": "The car is a very popular _______ of transportation. The lawyer _______ a previous case that was similar to her own. He was feeling _______ before his job interview. He was tired, but he went to the party _______. It is important to use the correct verb _______ when writing. I don’t want to go to the party; _______, I have a lot of work to do. He has a plan _______ he can make a lot of money. The company has a _______ policy for all its employees. He made some _______ remarks before starting his speech. The new model is the _______ to the best-selling car.",
              "words": [
                "vehicle",
                "cite",
                "tense",
                "nonetheless",
                "tense",
                "furthermore",
                "whereby",
                "uniform",
                "preliminary",
                "successor"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-16",
        "title": "10-Word Pack 16",
        "content": [
          {
            "blockId": "pack-16-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 16</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-16-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 16)",
              "cards": [
                {
                  "front": "phenomenon",
                  "back": "Definition: A fact or situation that is observed to exist or happen, especially one whose cause or explanation is in question."
                },
                {
                  "front": "qualitative",
                  "back": "Definition: Relating to, measuring, or measured by the quality of something rather than its quantity."
                },
                {
                  "front": "implicit",
                  "back": "Definition: Suggested though not directly expressed."
                },
                {
                  "front": "precede",
                  "back": "Definition: To come before (something) in time."
                },
                {
                  "front": "route",
                  "back": "Definition: A way or course taken in getting from a starting point to a destination."
                },
                {
                  "front": "so-called",
                  "back": "Definition: Of a kind that is generally so described, but that you think is not rightly so."
                },
                {
                  "front": "supplement",
                  "back": "Definition: Something that completes or enhances something else when added to it."
                },
                {
                  "front": "somewhat",
                  "back": "Definition: To a moderate extent or degree."
                },
                {
                  "front": "thereby",
                  "back": "Definition: By that means; as a result of that."
                },
                {
                  "front": "whereas",
                  "back": "Definition: In contrast or comparison with the fact that."
                }
              ]
            }
          },
          {
            "blockId": "pack-16-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 16: Contextual Application",
              "sentence": "The rise of social media is a recent _______. She has a _______ understanding of the subject, but she needs to learn more about the details. She has an _______ trust in her friends. The dark clouds _______ the storm. The package is on its _______ to you. He is one of those _______ artists who is more famous for his personality than for his work. The book includes a _______ with additional information. The weather is _______ colder today. The company cut its costs and _______ increased its profits. Some people like to travel, _______ others prefer to stay at home.",
              "words": [
                "phenomenon",
                "qualitative",
                "implicit",
                "precede",
                "route",
                "so-called",
                "supplement",
                "somewhat",
                "thereby",
                "whereas"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-17",
        "title": "10-Word Pack 17",
        "content": [
          {
            "blockId": "pack-17-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 17</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-17-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 17)",
              "cards": [
                {
                  "front": "transmit",
                  "back": "Definition: To cause (something) to pass on from one place or person to another."
                },
                {
                  "front": "via",
                  "back": "Definition: By way of; through."
                },
                {
                  "front": "widespread",
                  "back": "Definition: Found or distributed over a large area or number of people."
                },
                {
                  "front": "eventual",
                  "back": "Definition: Occurring or existing at the end of a process or period of time."
                },
                {
                  "front": "plus",
                  "back": "Definition: With the addition of."
                },
                {
                  "front": "analyst",
                  "back": "Definition: A person who conducts analysis."
                },
                {
                  "front": "confirm",
                  "back": "Definition: To establish the truth or correctness of (something previously believed, suspected, or feared to be the case)."
                },
                {
                  "front": "thesis",
                  "back": "Definition: A statement or theory that is put forward as a premise to be maintained or proved."
                },
                {
                  "front": "prospect",
                  "back": "Definition: The possibility or likelihood of some future event occurring."
                },
                {
                  "front": "revise",
                  "back": "Definition: To re-examine and make alterations to (written or printed matter)."
                }
              ]
            }
          },
          {
            "blockId": "pack-17-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 17: Contextual Application",
              "sentence": "The radio station will _______ the concert live. You can contact me _______ email. The disease is _______ in the region. He hopes for an _______ return to his home country. The job has a good salary, _______ excellent benefits. The political _______ predicted that the election would be very close. The test results _______ that she has the disease. He is writing his doctoral _______ on the history of the internet. The company has good _______ for growth. The company has decided to _______ its business plan.",
              "words": [
                "transmit",
                "via",
                "widespread",
                "eventual",
                "plus",
                "analyst",
                "confirm",
                "thesis",
                "prospect",
                "revise"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-18",
        "title": "10-Word Pack 18",
        "content": [
          {
            "blockId": "pack-18-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 18</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-18-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 18)",
              "cards": [
                {
                  "front": "scenario",
                  "back": "Definition: A postulated sequence or development of events."
                },
                {
                  "front": "ultimate",
                  "back": "Definition: Being or happening at the end of a process; final."
                },
                {
                  "front": "acquire",
                  "back": "Definition: To buy or obtain (an asset or object) for oneself."
                },
                {
                  "front": "aid",
                  "back": "Definition: Help, typically of a practical nature."
                },
                {
                  "front": "chemical",
                  "back": "Definition: Relating to chemistry, or the interactions of substances as studied in chemistry."
                },
                {
                  "front": "cooperate",
                  "back": "Definition: To act jointly; work toward the same end."
                },
                {
                  "front": "complement",
                  "back": "Definition: A thing that completes or brings to perfection."
                },
                {
                  "front": "currency",
                  "back": "Definition: A system of money in general use in a particular country."
                },
                {
                  "front": "demonstrate",
                  "back": "Definition: To clearly show the existence or truth of (something) by giving proof or evidence."
                },
                {
                  "front": "ensure",
                  "back": "Definition: To make certain that (something) shall occur or be the case."
                }
              ]
            }
          },
          {
            "blockId": "pack-18-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 18: Contextual Application",
              "sentence": "The movie is based on a _______ written by a famous author. He is the _______ authority on the subject. He has _______ a reputation for being a hard worker. She came to my _______ when I was in trouble. There was a _______ reaction between the two substances. It is important that we all _______ to achieve our common goals. The two partners _______ each other perfectly. The idea has gained _______ in recent years. The study _______ the effectiveness of the new drug. The company has taken steps to _______ the safety of its employees.",
              "words": [
                "scenario",
                "ultimate",
                "acquire",
                "aid",
                "chemical",
                "cooperate",
                "complement",
                "currency",
                "demonstrate",
                "ensure"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-19",
        "title": "10-Word Pack 19",
        "content": [
          {
            "blockId": "pack-19-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 19</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-19-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 19)",
              "cards": [
                {
                  "front": "denote",
                  "back": "Definition: To be a sign of; indicate."
                },
                {
                  "front": "explicit",
                  "back": "Definition: Stated clearly and in detail, leaving no room for confusion or doubt."
                },
                {
                  "front": "exploit",
                  "back": "Definition: To make full use of and derive benefit from (a resource)."
                },
                {
                  "front": "guarantee",
                  "back": "Definition: A formal promise or assurance (typically in writing) that certain conditions will be fulfilled, especially that a product will be repaired or replaced if not of a specified quality and durability."
                },
                {
                  "front": "induce",
                  "back": "Definition: To succeed in persuading or influencing (someone) to do something."
                },
                {
                  "front": "inevitable",
                  "back": "Definition: Certain to happen; unavoidable."
                },
                {
                  "front": "infrastructure",
                  "back": "Definition: The basic physical and organizational structures and facilities (e.g., buildings, roads, and power supplies) needed for the operation of a society or enterprise."
                },
                {
                  "front": "inspect",
                  "back": "Definition: To look at (someone or something) closely, typically to assess their condition or to discover any shortcomings."
                },
                {
                  "front": "manipulate",
                  "back": "Definition: To handle or control (a tool, mechanism, etc.), typically in a skillful manner."
                },
                {
                  "front": "minimize",
                  "back": "Definition: To reduce (something, especially something undesirable) to the smallest possible amount or degree."
                }
              ]
            }
          },
          {
            "blockId": "pack-19-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 19: Contextual Application",
              "sentence": "His silence _______ his disapproval. The movie contains _______ violence. We need to _______ our natural resources in a sustainable way. I can’t _______ that you will get the job. The doctor tried to _______ labor. Change is an _______ part of life. The company is building a new _______ to support its growing business. The health inspector will _______ the restaurant tomorrow. He was accused of trying to _______ the stock market. The company is trying to _______ its environmental impact.",
              "words": [
                "denote",
                "explicit",
                "exploit",
                "guarantee",
                "induce",
                "inevitable",
                "infrastructure",
                "inspect",
                "manipulate",
                "minimize"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-20",
        "title": "10-Word Pack 20",
        "content": [
          {
            "blockId": "pack-20-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 20</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-20-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 20)",
              "cards": [
                {
                  "front": "nuclear",
                  "back": "Definition: Relating to the nucleus of an atom."
                },
                {
                  "front": "offset",
                  "back": "Definition: A consideration or amount that diminishes or balances the effect of a contrary one."
                },
                {
                  "front": "parameter",
                  "back": "Definition: A numerical or other measurable factor forming one of a set that defines a system or sets the conditions of its operation."
                },
                {
                  "front": "phenomenon",
                  "back": "Definition: A fact or situation that is observed to exist or happen, especially one whose cause or explanation is in question."
                },
                {
                  "front": "preliminary",
                  "back": "Definition: Preceding or done in preparation for something fuller or more important."
                },
                {
                  "front": "proportion",
                  "back": "Definition: A part, share, or number considered in comparative relation to a whole."
                },
                {
                  "front": "qualitative",
                  "back": "Definition: Relating to, measuring, or measured by the quality of something rather than its quantity."
                },
                {
                  "front": "quote",
                  "back": "Definition: To repeat or copy out (a group of words from a text or speech), typically with an indication that one is not the original author or speaker."
                },
                {
                  "front": "release",
                  "back": "Definition: To allow or enable to escape from confinement; set free."
                },
                {
                  "front": "restore",
                  "back": "Definition: To bring back (a previous right, practice, custom, or situation); reinstate."
                }
              ]
            }
          },
          {
            "blockId": "pack-20-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 20: Contextual Application",
              "sentence": "The use of _______ weapons is a threat to world peace. The increase in sales was _______ by a rise in costs. The project is within the _______ of the budget. The rise of social media is a recent _______. He made some _______ remarks before starting his speech. The _______ of students who go to college has increased in recent years. She has a _______ understanding of the subject, but she needs to learn more about the details. Can you give me a _______ for the cost of the repairs? The company has _______ a statement about the recent incident. They are working to _______ the old building to its original condition.",
              "words": [
                "nuclear",
                "offset",
                "parameter",
                "phenomenon",
                "preliminary",
                "proportion",
                "qualitative",
                "quote",
                "release",
                "restore"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-21",
        "title": "10-Word Pack 21",
        "content": [
          {
            "blockId": "pack-21-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 21</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-21-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 21)",
              "cards": [
                {
                  "front": "revise",
                  "back": "Definition: To re-examine and make alterations to (written or printed matter)."
                },
                {
                  "front": "schedule",
                  "back": "Definition: A plan for carrying out a process or procedure, giving lists of intended events and times."
                },
                {
                  "front": "subsidy",
                  "back": "Definition: A sum of money granted by the government or a public body to assist an industry or business so that the price of a commodity or service may remain low or competitive."
                },
                {
                  "front": "terminate",
                  "back": "Definition: To bring to an end."
                },
                {
                  "front": "theme",
                  "back": "Definition: The subject of a talk, a piece of writing, a person's thoughts, or an exhibition; a topic."
                },
                {
                  "front": "trace",
                  "back": "Definition: To find or discover by investigation."
                },
                {
                  "front": "transport",
                  "back": "Definition: To take or carry (people or goods) from one place to another by means of a vehicle, aircraft, or ship."
                },
                {
                  "front": "trend",
                  "back": "Definition: A general direction in which something is developing or changing."
                },
                {
                  "front": "uniform",
                  "back": "Definition: Remaining the same in all cases and at all times; unchanging in form or character."
                },
                {
                  "front": "valid",
                  "back": "Definition: (of an argument or point) having a sound basis in logic or fact; reasonable or cogent."
                }
              ]
            }
          },
          {
            "blockId": "pack-21-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 21: Contextual Application",
              "sentence": "The company has decided to _______ its business plan. I have a busy _______ this week. The company is receiving a _______ from the government. The train will _______ at the next station. The movie has a dark and serious _______. He can _______ his family history back to the 16th century. The company provides _______ for its employees. The new fashion _______ is very popular with young people. The company has a _______ policy for all its employees. He made a _______ point about the need for more funding.",
              "words": [
                "revise",
                "schedule",
                "subsidy",
                "terminate",
                "theme",
                "trace",
                "transport",
                "trend",
                "uniform",
                "valid"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-22",
        "title": "10-Word Pack 22",
        "content": [
          {
            "blockId": "pack-22-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 22</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-22-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 22)",
              "cards": [
                {
                  "front": "virtue",
                  "back": "Definition: Behavior showing high moral standards."
                },
                {
                  "front": "voluntary",
                  "back": "Definition: Done, given, or acting of one's own free will."
                },
                {
                  "front": "welfare",
                  "back": "Definition: The health, happiness, and fortunes of a person or group."
                },
                {
                  "front": "whereby",
                  "back": "Definition: By which."
                },
                {
                  "front": "abstain",
                  "back": "Definition: To restrain oneself from doing or enjoying something."
                },
                {
                  "front": "adjacent",
                  "back": "Definition: Next to or adjoining something else."
                },
                {
                  "front": "advocate",
                  "back": "Definition: A person who publicly supports or recommends a particular cause or policy."
                },
                {
                  "front": "allege",
                  "back": "Definition: To claim or assert that someone has done something illegal or wrong, typically without proof."
                },
                {
                  "front": "allocate",
                  "back": "Definition: To distribute (resources or duties) for a particular purpose."
                },
                {
                  "front": "ambiguous",
                  "back": "Definition: Open to more than one interpretation; having a double meaning."
                }
              ]
            }
          },
          {
            "blockId": "pack-22-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 22: Contextual Application",
              "sentence": "She is a woman of great _______. Attendance at the meeting is _______. The company has a good _______ program for its employees. He has a plan _______ he can make a lot of money. She has decided to _______ from alcohol. The park is _______ to the river. He _______ for a more peaceful solution to the conflict. The company _______ that its competitor has been engaging in unfair business practices. The company has _______ a budget for marketing. His answer was _______ and evasive.",
              "words": [
                "virtue",
                "voluntary",
                "welfare",
                "whereby",
                "abstain",
                "adjacent",
                "advocate",
                "allege",
                "allocate",
                "ambiguous"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-23",
        "title": "10-Word Pack 23",
        "content": [
          {
            "blockId": "pack-23-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 23</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-23-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 23)",
              "cards": [
                {
                  "front": "amend",
                  "back": "Definition: To make minor changes to (a text, piece of legislation, etc.) in order to make it fairer or more accurate."
                },
                {
                  "front": "appendix",
                  "back": "Definition: A section or table of additional matter at the end of a book or document."
                },
                {
                  "front": "arbitrary",
                  "back": "Definition: Based on random choice or personal whim, rather than any reason or system."
                },
                {
                  "front": "assure",
                  "back": "Definition: To tell someone something positively or confidently to dispel any doubts they may have."
                },
                {
                  "front": "attain",
                  "back": "Definition: To succeed in achieving (something that one desires and has worked for)."
                },
                {
                  "front": "attribute",
                  "back": "Definition: A quality or feature regarded as a characteristic or inherent part of someone or something."
                },
                {
                  "front": "bias",
                  "back": "Definition: Prejudice in favor of or against one thing, person, or group compared with another, usually in a way considered to be unfair."
                },
                {
                  "front": "bulk",
                  "back": "Definition: The mass or size of something large."
                },
                {
                  "front": "cease",
                  "back": "Definition: To bring or come to an end."
                },
                {
                  "front": "chart",
                  "back": "Definition: A sheet of information in the form of a table, graph, or diagram."
                }
              ]
            }
          },
          {
            "blockId": "pack-23-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 23: Contextual Application",
              "sentence": "You may need to _______ your contract before signing it. The book includes an _______ with a list of all the sources cited. The rules of the game seemed _______ and unfair. He _______ me that he would be on time. He is working hard to _______ his goals. The company _______ its success to its dedicated employees. It is important to be aware of your own _______. He is a man of great _______. The rain will _______ soon. The doctor is monitoring the patient’s _______.",
              "words": [
                "amend",
                "appendix",
                "arbitrary",
                "assure",
                "attain",
                "attribute",
                "bias",
                "bulk",
                "cease",
                "chart"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-24",
        "title": "10-Word Pack 24",
        "content": [
          {
            "blockId": "pack-24-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 24</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-24-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 24)",
              "cards": [
                {
                  "front": "circumstance",
                  "back": "Definition: A fact or condition connected with or relevant to an event or action."
                },
                {
                  "front": "cite",
                  "back": "Definition: To quote (a passage, book, or author) as evidence for or justification of an argument or statement, especially in a scholarly work."
                },
                {
                  "front": "civil",
                  "back": "Definition: Relating to ordinary citizens and their concerns, as distinct from military or ecclesiastical matters."
                },
                {
                  "front": "clarify",
                  "back": "Definition: To make (a statement or situation) less confused and more clearly comprehensible."
                },
                {
                  "front": "coherent",
                  "back": "Definition: (of an argument, theory, or policy) logical and consistent."
                },
                {
                  "front": "coincide",
                  "back": "Definition: To occur at or during the same time."
                },
                {
                  "front": "commence",
                  "back": "Definition: To begin; start."
                },
                {
                  "front": "commodity",
                  "back": "Definition: A raw material or primary agricultural product that can be bought and sold, such as copper or coffee."
                },
                {
                  "front": "complement",
                  "back": "Definition: A thing that completes or brings to perfection."
                },
                {
                  "front": "comprehensive",
                  "back": "Definition: Complete; including all or nearly all elements or aspects of something."
                }
              ]
            }
          },
          {
            "blockId": "pack-24-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 24: Contextual Application",
              "sentence": "We need to consider all the _______ before making a decision. The lawyer _______ a previous case that was similar to her own. The country is in a state of _______ unrest. The new guidelines are intended to _______ the company’s policy. The story was not very _______. Our views on this issue do not _______. The company has _______ legal proceedings against its former employee. The company trades in a variety of _______. The two partners _______ each other perfectly. The company has a _______ benefits package for its employees.",
              "words": [
                "circumstance",
                "cite",
                "civil",
                "clarify",
                "coherent",
                "coincide",
                "commence",
                "commodity",
                "complement",
                "comprehensive"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-25",
        "title": "10-Word Pack 25",
        "content": [
          {
            "blockId": "pack-25-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 25</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-25-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 25)",
              "cards": [
                {
                  "front": "comprise",
                  "back": "Definition: To consist of; be made up of."
                },
                {
                  "front": "conceive",
                  "back": "Definition: To form or devise (a plan or idea) in the mind."
                },
                {
                  "front": "concurrent",
                  "back": "Definition: Existing, happening, or done at the same time."
                },
                {
                  "front": "confine",
                  "back": "Definition: To keep or restrict someone or something within certain limits of (space, scope, quantity, or time)."
                },
                {
                  "front": "conform",
                  "back": "Definition: To comply with rules, standards, or laws."
                },
                {
                  "front": "consequent",
                  "back": "Definition: Following as a result or effect."
                },
                {
                  "front": "considerable",
                  "back": "Definition: Notably large in size, amount, or extent."
                },
                {
                  "front": "constitute",
                  "back": "Definition: To be (a part) of a whole."
                },
                {
                  "front": "constrain",
                  "back": "Definition: To severely restrict the scope, extent, or activity of."
                },
                {
                  "front": "contemporary",
                  "back": "Definition: Living or occurring at the same time."
                }
              ]
            }
          },
          {
            "blockId": "pack-25-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 25: Contextual Application",
              "sentence": "The book is _______ of a series of essays. It is difficult to _______ of a world without technology. He is serving two _______ prison sentences. The discussion should be _______ to the topic at hand. He refuses to _______ to social norms. He was late for work and _______ missed the important meeting. He has made a _______ contribution to the company. These actions _______ a violation of the company’s policy. He felt _______ by the rules and regulations. The museum has a collection of _______ art.",
              "words": [
                "comprise",
                "conceive",
                "concurrent",
                "confine",
                "conform",
                "consequent",
                "considerable",
                "constitute",
                "constrain",
                "contemporary"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-26",
        "title": "10-Word Pack 26",
        "content": [
          {
            "blockId": "pack-26-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 26</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-26-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 26)",
              "cards": [
                {
                  "front": "contradict",
                  "back": "Definition: To deny the truth of (a statement) by asserting the opposite."
                },
                {
                  "front": "contrary",
                  "back": "Definition: Opposite in nature, direction, or meaning."
                },
                {
                  "front": "contribute",
                  "back": "Definition: To give (something, especially money) in order to help achieve or provide something."
                },
                {
                  "front": "controversy",
                  "back": "Definition: Disagreement, typically when prolonged, public, and heated."
                },
                {
                  "front": "convene",
                  "back": "Definition: To come or bring together for a meeting or activity; assemble."
                },
                {
                  "front": "converse",
                  "back": "Definition: To engage in conversation."
                },
                {
                  "front": "convince",
                  "back": "Definition: To cause (someone) to believe firmly in the truth of something."
                },
                {
                  "front": "correspond",
                  "back": "Definition: To have a close similarity; match or agree almost exactly."
                },
                {
                  "front": "credit",
                  "back": "Definition: The ability of a customer to obtain goods or services before payment, based on the trust that payment will be made in the future."
                },
                {
                  "front": "crucial",
                  "back": "Definition: Decisive or critical, especially in the success or failure of something."
                }
              ]
            }
          },
          {
            "blockId": "pack-26-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 26: Contextual Application",
              "sentence": "The evidence _______ his claim of innocence. His actions are _______ to his words. Everyone is expected to _______ to the discussion. He is a controversial figure in the world of politics. The president has _______ a meeting of his top advisors. The _______ of love is hate. I am not _______ by his arguments. She corresponds with her pen pal in Japan. She deserves _______ for her hard work. The next few weeks will be _______ for the company.",
              "words": [
                "contradict",
                "contrary",
                "contribute",
                "controversy",
                "convene",
                "converse",
                "convince",
                "correspond",
                "credit",
                "crucial"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-27",
        "title": "10-Word Pack 27",
        "content": [
          {
            "blockId": "pack-27-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 27</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-27-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 27)",
              "cards": [
                {
                  "front": "culture",
                  "back": "Definition: The arts and other manifestations of human intellectual achievement regarded collectively."
                },
                {
                  "front": "cycle",
                  "back": "Definition: A series of events that are regularly repeated in the same order."
                },
                {
                  "front": "data",
                  "back": "Definition: Facts and statistics collected together for reference or analysis."
                },
                {
                  "front": "debate",
                  "back": "Definition: A formal discussion on a particular topic in a public meeting or legislative assembly, in which opposing arguments are put forward."
                },
                {
                  "front": "decade",
                  "back": "Definition: A period of ten years."
                },
                {
                  "front": "decline",
                  "back": "Definition: (typically of something regarded as good) to become smaller, fewer, or less; decrease."
                },
                {
                  "front": "deduce",
                  "back": "Definition: To arrive at (a fact or a conclusion) by reasoning; draw as a logical conclusion."
                },
                {
                  "front": "define",
                  "back": "Definition: To state or describe exactly the nature, scope, or meaning of."
                },
                {
                  "front": "demonstrate",
                  "back": "Definition: To clearly show the existence or truth of (something) by giving proof or evidence."
                },
                {
                  "front": "denote",
                  "back": "Definition: To be a sign of; indicate."
                }
              ]
            }
          },
          {
            "blockId": "pack-27-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 27: Contextual Application",
              "sentence": "It is important to learn about the _______ of other countries. The economy goes through a _______ of boom and bust. The study is based on _______ from a survey of 1,000 people. The two candidates will _______ each other on television tonight. He has lived in this city for the past _______. He declined the invitation to the party. She _______ from his silence that he was angry. It is important to _______ your goals clearly. The study _______ the effectiveness of the new drug. His silence _______ his disapproval.",
              "words": [
                "culture",
                "cycle",
                "data",
                "debate",
                "decade",
                "decline",
                "deduce",
                "define",
                "demonstrate",
                "denote"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-28",
        "title": "10-Word Pack 28",
        "content": [
          {
            "blockId": "pack-28-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 28</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-28-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 28)",
              "cards": [
                {
                  "front": "deny",
                  "back": "Definition: To state that one refuses to admit the truth or existence of."
                },
                {
                  "front": "depress",
                  "back": "Definition: To make (someone) feel utterly dispirited or dejected."
                },
                {
                  "front": "derive",
                  "back": "Definition: To obtain something from (a specified source)."
                },
                {
                  "front": "design",
                  "back": "Definition: A plan or drawing produced to show the look and function or workings of a building, garment, or other object before it is made."
                },
                {
                  "front": "despite",
                  "back": "Definition: Without being affected by; in spite of."
                },
                {
                  "front": "detect",
                  "back": "Definition: To discover or identify the presence or existence of."
                },
                {
                  "front": "deviate",
                  "back": "Definition: To depart from an established course."
                },
                {
                  "front": "device",
                  "back": "Definition: A thing made or adapted for a particular purpose, especially a piece of mechanical or electronic equipment."
                },
                {
                  "front": "devote",
                  "back": "Definition: To give all or a large part of one's time or resources to (a person, activity, or cause)."
                },
                {
                  "front": "differentiate",
                  "back": "Definition: To recognize or ascertain what makes (someone or something) different."
                }
              ]
            }
          },
          {
            "blockId": "pack-28-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 28: Contextual Application",
              "sentence": "The company has _______ any wrongdoing. The company is trying to _______ costs. She _______ great pleasure from her work. She has a good sense of _______. _______ her ails, she remains cheerful. The new technology can _______ even the smallest traces of the chemical. The company has _______ from its original business plan. He has a clever _______ for opening jars. He has _______ a lot of time and energy to this project. The company is trying to _______ its products from those of its competitors.",
              "words": [
                "deny",
                "depress",
                "derive",
                "design",
                "despite",
                "detect",
                "deviate",
                "device",
                "devote",
                "differentiate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-29",
        "title": "10-Word Pack 29",
        "content": [
          {
            "blockId": "pack-29-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 29</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-29-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 29)",
              "cards": [
                {
                  "front": "dimension",
                  "back": "Definition: A measurable extent of a particular kind, such as length, breadth, depth, or height."
                },
                {
                  "front": "diminish",
                  "back": "Definition: To make or become less."
                },
                {
                  "front": "discrete",
                  "back": "Definition: Individually separate and distinct."
                },
                {
                  "front": "discriminate",
                  "back": "Definition: To recognize a distinction; differentiate."
                },
                {
                  "front": "displace",
                  "back": "Definition: To take over the place, position, or role of (someone or something)."
                },
                {
                  "front": "display",
                  "back": "Definition: To put (something) in a prominent place in order that it may readily be seen."
                },
                {
                  "front": "dispose",
                  "back": "Definition: To get rid of by throwing away or giving or selling to someone else."
                },
                {
                  "front": "distinct",
                  "back": "Definition: Recognizably different in nature from something else of a similar type."
                },
                {
                  "front": "distort",
                  "back": "Definition: To pull or twist out of shape."
                },
                {
                  "front": "distribute",
                  "back": "Definition: To give shares of (something); deal out."
                }
              ]
            }
          },
          {
            "blockId": "pack-29-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 29: Contextual Application",
              "sentence": "The problem has a political _______ as well as an economic one. His influence has _______ since he retired. The two events are _______ and unrelated. He has a good ear for music and can _______ between different instruments. The war has _______ thousands of people from their homes. He _______ great courage in the face of danger. He is disposed to be friendly. There is a _______ smell of garlic in the kitchen. The media has been accused of _______ the facts. The charity will _______ food and clothing to the needy.",
              "words": [
                "dimension",
                "diminish",
                "discrete",
                "discriminate",
                "displace",
                "display",
                "dispose",
                "distinct",
                "distort",
                "distribute"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-30",
        "title": "10-Word Pack 30",
        "content": [
          {
            "blockId": "pack-30-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 30</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-30-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 30)",
              "cards": [
                {
                  "front": "diverse",
                  "back": "Definition: Showing a great deal of variety; very different."
                },
                {
                  "front": "document",
                  "back": "Definition: A piece of written, printed, or electronic matter that provides information or evidence or that serves as an official record."
                },
                {
                  "front": "domain",
                  "back": "Definition: An area of territory owned or controlled by a ruler or government."
                },
                {
                  "front": "domestic",
                  "back": "Definition: Relating to the running of a home or to family relations."
                },
                {
                  "front": "dominate",
                  "back": "Definition: To have a commanding influence on; exercise control over."
                },
                {
                  "front": "draft",
                  "back": "Definition: A preliminary version of a piece of writing."
                },
                {
                  "front": "drama",
                  "back": "Definition: A play for theater, radio, or television."
                },
                {
                  "front": "duration",
                  "back": "Definition: The time during which something continues."
                },
                {
                  "front": "dynamic",
                  "back": "Definition: (of a process or system) characterized by constant change, activity, or progress."
                },
                {
                  "front": "economy",
                  "back": "Definition: The wealth and resources of a country or region, especially in terms of the production and consumption of goods and services."
                }
              ]
            }
          },
          {
            "blockId": "pack-30-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 30: Contextual Application",
              "sentence": "The company has a _______ range of products. It is important to _______ your sources when writing a research paper. The website has a new _______ name. He is a _______ animal, not a wild one. He is a player who can _______ a game. The government has published a _______ of the new law. The movie is a _______ about a young woman who overcomes adversity. He has been a member of the company for the _______ of its existence. He has a _______ personality. He is an expert on the global _______.",
              "words": [
                "diverse",
                "document",
                "domain",
                "domestic",
                "dominate",
                "draft",
                "drama",
                "duration",
                "dynamic",
                "economy"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-31",
        "title": "10-Word Pack 31",
        "content": [
          {
            "blockId": "pack-31-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 31</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-31-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 31)",
              "cards": [
                {
                  "front": "element",
                  "back": "Definition: A part or aspect of something abstract, especially one that is essential or characteristic."
                },
                {
                  "front": "eliminate",
                  "back": "Definition: To completely remove or get rid of (something)."
                },
                {
                  "front": "emerge",
                  "back": "Definition: To move out of or away from something and come into view."
                },
                {
                  "front": "emphasis",
                  "back": "Definition: Special importance, value, or prominence given to something."
                },
                {
                  "front": "empirical",
                  "back": "Definition: Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic."
                },
                {
                  "front": "enable",
                  "back": "Definition: To give (someone or something) the authority or means to do something; make it possible for."
                },
                {
                  "front": "encounter",
                  "back": "Definition: To unexpectedly experience or be faced with (something difficult or hostile)."
                },
                {
                  "front": "energy",
                  "back": "Definition: The strength and vitality required for sustained physical or mental activity."
                },
                {
                  "front": "enforce",
                  "back": "Definition: To compel observance of or compliance with (a law, rule, or obligation)."
                },
                {
                  "front": "enhance",
                  "back": "Definition: To intensify, increase, or further improve the quality, value, or extent of."
                }
              ]
            }
          },
          {
            "blockId": "pack-31-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 31: Contextual Application",
              "sentence": "The movie has all the _______ of a classic thriller. The new vaccine can _______ the disease. She has emerged as a leader in the company. The teacher put _______ on the importance of studying for the exam. He has an _______ approach to problem-solving. The scholarship will _______ her to go to college. He had a chance _______ with an old friend. The company is investing in renewable _______. The company has a strict policy that is _______ by the management. She uses makeup to _______ her natural beauty.",
              "words": [
                "element",
                "eliminate",
                "emerge",
                "emphasis",
                "empirical",
                "enable",
                "encounter",
                "energy",
                "enforce",
                "enhance"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-32",
        "title": "10-Word Pack 32",
        "content": [
          {
            "blockId": "pack-32-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 32</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-32-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 32)",
              "cards": [
                {
                  "front": "enormous",
                  "back": "Definition: Very large in size, quantity, or extent."
                },
                {
                  "front": "ensure",
                  "back": "Definition: To make certain that (something) shall occur or be the case."
                },
                {
                  "front": "entity",
                  "back": "Definition: A thing with distinct and independent existence."
                },
                {
                  "front": "environment",
                  "back": "Definition: The surroundings or conditions in which a person, animal, or plant lives or operates."
                },
                {
                  "front": "equate",
                  "back": "Definition: To consider (one thing) to be the same as or equivalent to another."
                },
                {
                  "front": "equip",
                  "back": "Definition: To supply with the necessary items for a particular purpose."
                },
                {
                  "front": "equivalent",
                  "back": "Definition: Equal in value, amount, function, meaning, etc."
                },
                {
                  "front": "erode",
                  "back": "Definition: (of wind, water, or other natural agents) to gradually wear away (soil, rock, or land)."
                },
                {
                  "front": "establish",
                  "back": "Definition: To set up (an organization, system, or set of rules) on a firm or permanent basis."
                },
                {
                  "front": "estate",
                  "back": "Definition: An area or amount of land or property, especially of considerable extent."
                }
              ]
            }
          },
          {
            "blockId": "pack-32-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 32: Contextual Application",
              "sentence": "He has an _______ appetite. The company has taken steps to _______ the safety of its employees. The two organizations have merged to form a single _______. The company has a friendly and supportive work _______. He _______ success with money. The new school is well-_______ with modern facilities. His silence was _______ to an admission of guilt. The constant criticism has _______ his confidence. He has _______ himself as a leader in his field. She left her entire _______ to her children.",
              "words": [
                "enormous",
                "ensure",
                "entity",
                "environment",
                "equate",
                "equip",
                "equivalent",
                "erode",
                "establish",
                "estate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-33",
        "title": "10-Word Pack 33",
        "content": [
          {
            "blockId": "pack-33-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 33</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-33-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 33)",
              "cards": [
                {
                  "front": "estimate",
                  "back": "Definition: To roughly calculate or judge the value, number, quantity, or extent of."
                },
                {
                  "front": "ethic",
                  "back": "Definition: A set of moral principles, especially ones relating to or affirming a specified group, field, or form of conduct."
                },
                {
                  "front": "ethnic",
                  "back": "Definition: Relating to a population subgroup (within a larger or dominant national or cultural group) with a common national or cultural tradition."
                },
                {
                  "front": "evaluate",
                  "back": "Definition: To form an idea of the amount, number, or value of; assess."
                },
                {
                  "front": "eventual",
                  "back": "Definition: Occurring or existing at the end of a process or period of time."
                },
                {
                  "front": "evident",
                  "back": "Definition: Plain or obvious; clearly seen or understood."
                },
                {
                  "front": "evolve",
                  "back": "Definition: To develop gradually from a simple to a more complex form."
                },
                {
                  "front": "exceed",
                  "back": "Definition: To be greater in number or size than (a quantity, number, or other measurable thing)."
                },
                {
                  "front": "exclude",
                  "back": "Definition: To deny (someone) access to or bar (someone) from a place, group, or privilege."
                },
                {
                  "front": "exhibit",
                  "back": "Definition: To publicly display (a work of art or item of interest) in an art gallery or museum or at a trade fair."
                }
              ]
            }
          },
          {
            "blockId": "pack-33-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 33: Contextual Application",
              "sentence": "Can you give me an _______ of how long it will take to complete the work? The company has a strict code of _______. The restaurant serves _______ cuisine from around the world. It is important to _______ the risks before making a decision. He hopes for an _______ return to his home country. The evidence of his guilt was _______. Languages _______ over time, with new words being added and old ones falling out of use. He _______ all our expectations. The price of the tour _______ airfare. He _______ great courage in the face of danger.",
              "words": [
                "estimate",
                "ethic",
                "ethnic",
                "evaluate",
                "eventual",
                "evident",
                "evolve",
                "exceed",
                "exclude",
                "exhibit"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-34",
        "title": "10-Word Pack 34",
        "content": [
          {
            "blockId": "pack-34-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 34</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-34-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 34)",
              "cards": [
                {
                  "front": "notion",
                  "back": "Definition: A conception of or belief about something."
                },
                {
                  "front": "enforce",
                  "back": "Definition: To compel observance of or compliance with (a law, rule, or obligation)."
                },
                {
                  "front": "rational",
                  "back": "Definition: Based on or in accordance with reason or logic."
                },
                {
                  "front": "display",
                  "back": "Definition: To put (something) in a prominent place in order that it may readily be seen."
                },
                {
                  "front": "logic",
                  "back": "Definition: Reasoning conducted or assessed according to strict principles of validity."
                },
                {
                  "front": "benefit",
                  "back": "Definition: An advantage or profit gained from something."
                },
                {
                  "front": "decline",
                  "back": "Definition: (typically of something regarded as good) to become smaller, fewer, or less; decrease."
                },
                {
                  "front": "modify",
                  "back": "Definition: To make partial or minor changes to (something), typically so as to improve it or to make it less extreme."
                },
                {
                  "front": "grant",
                  "back": "Definition: To agree to give or allow (something requested) to."
                },
                {
                  "front": "regulate",
                  "back": "Definition: To control or supervise (something, especially a company or business activity) by means of rules and regulations."
                }
              ]
            }
          },
          {
            "blockId": "pack-34-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 34: Contextual Application",
              "sentence": "The _______ of a four-day work week is gaining popularity. The company has a strict policy that is _______ by the management. There must be a _______ explanation for what happened. He _______ great courage in the face of danger. There is a certain _______ to his madness. The company offers a good _______ package to its employees. He declined the invitation to the party. The company has _______ its policy on working from home. She was _______ a scholarship to study at a top university. The new law is designed to _______ the use of pesticides.",
              "words": [
                "notion",
                "enforce",
                "rational",
                "display",
                "logic",
                "benefit",
                "decline",
                "modify",
                "grant",
                "regulate"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-35",
        "title": "10-Word Pack 35",
        "content": [
          {
            "blockId": "pack-35-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 35</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-35-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 35)",
              "cards": [
                {
                  "front": "contact",
                  "back": "Definition: The state or condition of physical touching."
                },
                {
                  "front": "debate",
                  "back": "Definition: A formal discussion on a particular topic in a public meeting or legislative assembly, in which opposing arguments are put forward."
                },
                {
                  "front": "implement",
                  "back": "Definition: To put (a decision, plan, agreement, etc.) into effect."
                },
                {
                  "front": "nevertheless",
                  "back": "Definition: In spite of that; nevertheless."
                },
                {
                  "front": "clause",
                  "back": "Definition: A unit of grammatical organization next below the sentence in rank and in traditional grammar said to consist of a subject and predicate."
                },
                {
                  "front": "project",
                  "back": "Definition: An individual or collaborative enterprise that is carefully planned and designed to achieve a particular aim."
                },
                {
                  "front": "protocol",
                  "back": "Definition: The official procedure or system of rules governing affairs of state or diplomatic occasions."
                },
                {
                  "front": "coincide",
                  "back": "Definition: To occur at or during the same time."
                },
                {
                  "front": "panel",
                  "back": "Definition: A flat or curved component, typically rectangular, that forms or is set into the surface of a door, wall, or ceiling."
                },
                {
                  "front": "expand",
                  "back": "Definition: To become or make larger or more extensive."
                }
              ]
            }
          },
          {
            "blockId": "pack-35-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 35: Contextual Application",
              "sentence": "He has lost _______ with his old friends. The two candidates will _______ each other on television tonight. The government has failed to _______ its promises. He was tired, but he went to the party _______. The sentence has two _______. She is _______ a movie about her life. It is important to follow the correct _______ in a formal meeting. Our views on this issue do not _______. The company has set up a _______ to investigate the incident. The universe is _______.",
              "words": [
                "contact",
                "debate",
                "implement",
                "nevertheless",
                "clause",
                "project",
                "protocol",
                "coincide",
                "panel",
                "expand"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-36",
        "title": "10-Word Pack 36",
        "content": [
          {
            "blockId": "pack-36-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 36</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-36-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 36)",
              "cards": [
                {
                  "front": "domain",
                  "back": "Definition: An area of territory owned or controlled by a ruler or government."
                },
                {
                  "front": "considerable",
                  "back": "Definition: Notably large in size, amount, or extent."
                },
                {
                  "front": "overlap",
                  "back": "Definition: To extend over so as to cover partly."
                },
                {
                  "front": "comprise",
                  "back": "Definition: To consist of; be made up of."
                },
                {
                  "front": "manual",
                  "back": "Definition: A book giving instructions or information."
                },
                {
                  "front": "category",
                  "back": "Definition: A class or division of people or things regarded as having particular shared characteristics."
                },
                {
                  "front": "perceive",
                  "back": "Definition: To become aware or conscious of (something); come to realize or understand."
                },
                {
                  "front": "circumstance",
                  "back": "Definition: A fact or condition connected with or relevant to an event or action."
                },
                {
                  "front": "readjust",
                  "back": "Definition: To adjust (something) again."
                },
                {
                  "front": "predict",
                  "back": "Definition: To say or estimate that (a specified thing) will happen in the future or will be a consequence of something."
                }
              ]
            }
          },
          {
            "blockId": "pack-36-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 36: Contextual Application",
              "sentence": "The website has a new _______ name. He has made a _______ contribution to the company. There is a lot of _______ between the two subjects. The book is _______ of a series of essays. He has a _______ labor job. He does not fit into any particular _______. The world is not always as we _______ it to be. We need to consider all the _______ before making a decision. The company has had to _______ its business plan to the new market conditions. The weather forecast _______ rain for tomorrow.",
              "words": [
                "domain",
                "considerable",
                "overlap",
                "comprise",
                "manual",
                "category",
                "perceive",
                "circumstance",
                "readjust",
                "predict"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-37",
        "title": "10-Word Pack 37",
        "content": [
          {
            "blockId": "pack-37-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 37</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-37-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 37)",
              "cards": [
                {
                  "front": "reside",
                  "back": "Definition: To have one's permanent home in a particular place."
                },
                {
                  "front": "corporate",
                  "back": "Definition: Relating to a corporation, especially a large company or group."
                },
                {
                  "front": "encounter",
                  "back": "Definition: To unexpectedly experience or be faced with (something difficult or hostile)."
                },
                {
                  "front": "impact",
                  "back": "Definition: The action of one object coming forcibly into contact with another."
                },
                {
                  "front": "device",
                  "back": "Definition: A thing made or adapted for a particular purpose, especially a piece of mechanical or electronic equipment."
                },
                {
                  "front": "alter",
                  "back": "Definition: To change in character or composition, typically in a comparatively small but significant way."
                },
                {
                  "front": "structure",
                  "back": "Definition: The arrangement of and relations between the parts or elements of something complex."
                },
                {
                  "front": "job",
                  "back": "Definition: A paid position of regular employment."
                },
                {
                  "front": "external",
                  "back": "Definition: Belonging to or forming the outer surface or structure of something."
                },
                {
                  "front": "output",
                  "back": "Definition: The amount of something produced by a person, machine, or industry."
                }
              ]
            }
          },
          {
            "blockId": "pack-37-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 37: Contextual Application",
              "sentence": "The problem _______ in the fact that we do not have enough money. He is a _______ lawyer. He had a chance _______ with an old friend. The _______ of the car crash was devastating. He has a clever _______ for opening jars. The company has had to _______ its business plan. The building has a solid _______. He has a _______ to do. The building has an _______ staircase. The factory has a high _______.",
              "words": [
                "reside",
                "corporate",
                "encounter",
                "impact",
                "device",
                "alter",
                "structure",
                "job",
                "external",
                "output"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-38",
        "title": "10-Word Pack 38",
        "content": [
          {
            "blockId": "pack-38-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 38</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-38-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 38)",
              "cards": [
                {
                  "front": "persist",
                  "back": "Definition: To continue firmly or obstinately in an opinion or a course of action in spite of difficulty, opposition, or failure."
                },
                {
                  "front": "context",
                  "back": "Definition: The circumstances that form the setting for an event, statement, or idea, and in terms of which it can be fully understood and assessed."
                },
                {
                  "front": "consequent",
                  "back": "Definition: Following as a result or effect."
                },
                {
                  "front": "reluctance",
                  "back": "Definition: Unwillingness or disinclination to do something."
                },
                {
                  "front": "section",
                  "back": "Definition: Any of the more or less distinct parts into which something is or may be divided or from which it is made up."
                },
                {
                  "front": "imply",
                  "back": "Definition: To strongly suggest the truth or existence of (something not expressly stated)."
                },
                {
                  "front": "ambiguous",
                  "back": "Definition: Open to more than one interpretation; having a double meaning."
                },
                {
                  "front": "outcome",
                  "back": "Definition: The way a thing turns out; a consequence."
                },
                {
                  "front": "attain",
                  "back": "Definition: To succeed in achieving (something that one desires and has worked for)."
                },
                {
                  "front": "implicit",
                  "back": "Definition: Suggested though not directly expressed."
                }
              ]
            }
          },
          {
            "blockId": "pack-38-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 38: Contextual Application",
              "sentence": "The rain will _______ for the rest of the day. The book provides a historical _______ for the events. He was late for work and _______ missed the important meeting. She agreed to the plan with _______. He is in charge of the marketing _______ of the company. The article _______ that the company is in financial trouble. His answer was _______ and evasive. The study had a positive _______. He is working hard to _______ his goals. She has an _______ trust in her friends.",
              "words": [
                "persist",
                "context",
                "consequent",
                "reluctance",
                "section",
                "imply",
                "ambiguous",
                "outcome",
                "attain",
                "implicit"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-39",
        "title": "10-Word Pack 39",
        "content": [
          {
            "blockId": "pack-39-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 39</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-39-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 39)",
              "cards": [
                {
                  "front": "rigid",
                  "back": "Definition: Unable to bend or be forced out of shape; not flexible."
                },
                {
                  "front": "code",
                  "back": "Definition: A system of words, letters, figures, or other symbols substituted for other words, letters, etc., especially for the purposes of secrecy."
                },
                {
                  "front": "input",
                  "back": "Definition: What is put in, taken in, or operated on by any process or system."
                },
                {
                  "front": "intermediate",
                  "back": "Definition: Coming between two things in time, place, order, character, etc."
                },
                {
                  "front": "fund",
                  "back": "Definition: A sum of money saved or made available for a particular purpose."
                },
                {
                  "front": "regime",
                  "back": "Definition: A government, especially an authoritarian one."
                },
                {
                  "front": "role",
                  "back": "Definition: An actor's part in a play, movie, etc."
                },
                {
                  "front": "legislate",
                  "back": "Definition: To make or enact laws."
                },
                {
                  "front": "concurrent",
                  "back": "Definition: Existing, happening, or done at the same time."
                },
                {
                  "front": "fundamental",
                  "back": "Definition: Forming a necessary base or core; of central importance."
                }
              ]
            }
          },
          {
            "blockId": "pack-39-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 39: Contextual Application",
              "sentence": "He has a _______ and inflexible attitude. The company has a strict _______ of conduct. The computer is waiting for _______ from the user. The company is in the _______ stages of its development. The government has allocated _______ for the new project. The new _______ has promised to bring about change. He has an important _______ to play in the company. It is the job of the parliament to _______. He is serving two _______ prison sentences. The company has made some _______ changes to its business model.",
              "words": [
                "rigid",
                "code",
                "input",
                "intermediate",
                "fund",
                "regime",
                "role",
                "legislate",
                "concurrent",
                "fundamental"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-40",
        "title": "10-Word Pack 40",
        "content": [
          {
            "blockId": "pack-40-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 40</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-40-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 40)",
              "cards": [
                {
                  "front": "conduct",
                  "back": "Definition: The manner in which a person behaves, especially on a particular occasion or in a particular context."
                },
                {
                  "front": "deviate",
                  "back": "Definition: To depart from an established course."
                },
                {
                  "front": "differentiate",
                  "back": "Definition: To recognize or ascertain what makes (someone or something) different."
                },
                {
                  "front": "proceed",
                  "back": "Definition: To begin or continue a course of action."
                },
                {
                  "front": "quote",
                  "back": "Definition: To repeat or copy out (a group of words from a text or speech), typically with an indication that one is not the original author or speaker."
                },
                {
                  "front": "denote",
                  "back": "Definition: To be a sign of; indicate."
                },
                {
                  "front": "aggregate",
                  "back": "Definition: A whole formed by combining several (typically disparate) elements."
                },
                {
                  "front": "illustrate",
                  "back": "Definition: To provide (a book, newspaper, etc.) with pictures."
                },
                {
                  "front": "challenge",
                  "back": "Definition: A call to take part in a contest or competition, especially a duel."
                },
                {
                  "front": "aware",
                  "back": "Definition: Having knowledge or perception of a situation or fact."
                }
              ]
            }
          },
          {
            "blockId": "pack-40-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 40: Contextual Application",
              "sentence": "The company has a strict code of _______. The company has _______ from its original business plan. The company is trying to _______ its products from those of its competitors. Please _______ with your work. Can you give me a _______ for the cost of the repairs? His silence _______ his disapproval. The company’s _______ sales have increased this year. Let me give you an example to _______ my point. He has _______ me to a game of chess. It is important to be _______ of your surroundings.",
              "words": [
                "conduct",
                "deviate",
                "differentiate",
                "proceed",
                "quote",
                "denote",
                "aggregate",
                "illustrate",
                "challenge",
                "aware"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-41",
        "title": "10-Word Pack 41",
        "content": [
          {
            "blockId": "pack-41-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 41</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-41-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 41)",
              "cards": [
                {
                  "front": "prepare",
                  "back": "Definition: To make (something) ready for use or consideration."
                },
                {
                  "front": "compute",
                  "back": "Definition: To calculate (a figure or amount)."
                },
                {
                  "front": "approximate",
                  "back": "Definition: Close to the actual, but not completely accurate or exact."
                },
                {
                  "front": "abolish",
                  "back": "Definition: To formally put an end to (a system, practice, or institution)."
                },
                {
                  "front": "intervene",
                  "back": "Definition: To come between so as to prevent or alter a result or course of events."
                },
                {
                  "front": "stable",
                  "back": "Definition: (of an object or structure) not likely to give way or overturn; firmly fixed."
                },
                {
                  "front": "select",
                  "back": "Definition: To carefully choose as being the best or most suitable."
                },
                {
                  "front": "margin",
                  "back": "Definition: The edge or border of something."
                },
                {
                  "front": "goal",
                  "back": "Definition: (in football, hockey, etc.) a pair of posts linked by a crossbar and typically with a net between, forming a space into or over which the ball has to be sent in order to score."
                },
                {
                  "front": "empirical",
                  "back": "Definition: Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic."
                }
              ]
            }
          },
          {
            "blockId": "pack-41-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 41: Contextual Application",
              "sentence": "The company is _______ for a new product launch. We need to _______ the total cost of the project. Can you give me an _______ idea of when you will be finished? Slavery was _______ in the 19th century. The government has _______ in the economy to prevent a recession. The patient’s condition is _______. The company has a rigorous selection process for its employees. There is a wide _______ between the two candidates. My _______ is to become a doctor. He has an _______ approach to problem-solving.",
              "words": [
                "prepare",
                "compute",
                "approximate",
                "abolish",
                "intervene",
                "stable",
                "select",
                "margin",
                "goal",
                "empirical"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-42",
        "title": "10-Word Pack 42",
        "content": [
          {
            "blockId": "pack-42-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 42</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-42-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 42)",
              "cards": [
                {
                  "front": "infer",
                  "back": "Definition: To deduce or conclude (information) from evidence and reasoning rather than from explicit statements."
                },
                {
                  "front": "ongoing",
                  "back": "Definition: Continuing; still in progress."
                },
                {
                  "front": "deny",
                  "back": "Definition: To state that one refuses to admit the truth or existence of."
                },
                {
                  "front": "publication",
                  "back": "Definition: The preparation and issuing of a book, journal, piece of music, or other work for public sale."
                },
                {
                  "front": "revolution",
                  "back": "Definition: A forcible overthrow of a government or social order in favor of a new system."
                },
                {
                  "front": "assemble",
                  "back": "Definition: (of people) to gather together in one place for a common purpose."
                },
                {
                  "front": "resolve",
                  "back": "Definition: To settle or find a solution to (a problem, dispute, or contentious matter)."
                },
                {
                  "front": "despite",
                  "back": "Definition: Without being affected by; in spite of."
                },
                {
                  "front": "liberal",
                  "back": "Definition: Willing to respect or accept behavior or opinions different from one's own; open to new ideas."
                },
                {
                  "front": "legal",
                  "back": "Definition: Relating to the law."
                }
              ]
            }
          },
          {
            "blockId": "pack-42-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 42: Contextual Application",
              "sentence": "We can _______ from the evidence that he is guilty. The company has an _______ commitment to quality. The company has _______ any wrongdoing. He is the author of several _______. The invention of the internet has caused a _______ in the way we communicate. He is _______ a team of experts to work on the project. He has a strong _______ to succeed. _______ her ails, she remains cheerful. The government has a _______ trade policy. The company is facing a _______ battle.",
              "words": [
                "infer",
                "ongoing",
                "deny",
                "publication",
                "revolution",
                "assemble",
                "resolve",
                "despite",
                "liberal",
                "legal"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-43",
        "title": "10-Word Pack 43",
        "content": [
          {
            "blockId": "pack-43-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 43</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-43-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 43)",
              "cards": [
                {
                  "front": "incentive",
                  "back": "Definition: A thing that motivates or encourages one to do something."
                },
                {
                  "front": "globe",
                  "back": "Definition: The earth."
                },
                {
                  "front": "somewhat",
                  "back": "Definition: To a moderate extent or degree."
                },
                {
                  "front": "scenario",
                  "back": "Definition: A postulated sequence or development of events."
                },
                {
                  "front": "drama",
                  "back": "Definition: A play for theater, radio, or television."
                },
                {
                  "front": "identify",
                  "back": "Definition: To establish or indicate who or what (someone or something) is."
                },
                {
                  "front": "focus",
                  "back": "Definition: The center of interest or activity."
                },
                {
                  "front": "accurate",
                  "back": "Definition: (of information, measurements, statistics, etc.) correct in all details; exact."
                },
                {
                  "front": "statistic",
                  "back": "Definition: A fact or piece of data from a study of a large quantity of numerical data."
                },
                {
                  "front": "diminish",
                  "back": "Definition: To make or become less."
                }
              ]
            }
          },
          {
            "blockId": "pack-43-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 43: Contextual Application",
              "sentence": "The government is offering a tax _______ to companies that invest in renewable energy. The company has a _______ presence. The weather is _______ colder today. The movie is based on a _______ written by a famous author. The movie is a _______ about a young woman who overcomes adversity. It is important to _______ the cause of the problem. He needs to _______ on his studies. It is important to have an _______ understanding of the situation. He is a _______ian who works for the government. His influence has _______ since he retired.",
              "words": [
                "incentive",
                "globe",
                "somewhat",
                "scenario",
                "drama",
                "identify",
                "focus",
                "accurate",
                "statistic",
                "diminish"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-44",
        "title": "10-Word Pack 44",
        "content": [
          {
            "blockId": "pack-44-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 44</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-44-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 44)",
              "cards": [
                {
                  "front": "insight",
                  "back": "Definition: The capacity to gain an accurate and deep intuitive understanding of a person or thing."
                },
                {
                  "front": "accelerate",
                  "back": "Definition: (of a vehicle or other physical object) to begin to move more quickly."
                },
                {
                  "front": "negate",
                  "back": "Definition: To nullify; make ineffective."
                },
                {
                  "front": "range",
                  "back": "Definition: The area of variation between upper and lower limits on a particular scale."
                },
                {
                  "front": "discriminate",
                  "back": "Definition: To recognize a distinction; differentiate."
                },
                {
                  "front": "channel",
                  "back": "Definition: A length of water wider than a strait, joining two larger areas of water, especially two seas."
                },
                {
                  "front": "reverse",
                  "back": "Definition: To move backward."
                },
                {
                  "front": "item",
                  "back": "Definition: An individual article or unit, especially one that is part of a list, collection, or set."
                },
                {
                  "front": "insert",
                  "back": "Definition: To place, fit, or thrust (something) into another thing."
                },
                {
                  "front": "analogy",
                  "back": "Definition: A comparison between two things, typically for the purpose of explanation or clarification."
                }
              ]
            }
          },
          {
            "blockId": "pack-44-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 44: Contextual Application",
              "sentence": "He has a great deal of _______ into human nature. The company is trying to _______ its growth. The new evidence _______ the original theory. The price of the car is out of my _______. He has a good ear for music and can _______ between different instruments. The company is using a new _______ to distribute its products. The company has _______ its decision to close the factory. The most expensive _______ in the store is a diamond necklace. The author has _______ a new chapter into the book. The teacher used an _______ to explain the complex concept.",
              "words": [
                "insight",
                "accelerate",
                "negate",
                "range",
                "discriminate",
                "channel",
                "reverse",
                "item",
                "insert",
                "analogy"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-45",
        "title": "10-Word Pack 45",
        "content": [
          {
            "blockId": "pack-45-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 45</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-45-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 45)",
              "cards": [
                {
                  "front": "likewise",
                  "back": "Definition: In the same way; also."
                },
                {
                  "front": "criteria",
                  "back": "Definition: A principle or standard by which something may be judged or decided."
                },
                {
                  "front": "priority",
                  "back": "Definition: A thing that is regarded as more important than another."
                },
                {
                  "front": "issue",
                  "back": "Definition: An important topic or problem for debate or discussion."
                },
                {
                  "front": "compound",
                  "back": "Definition: A thing that is composed of two or more separate elements; a mixture."
                },
                {
                  "front": "contribute",
                  "back": "Definition: To give (something, especially money) in order to help achieve or provide something."
                },
                {
                  "front": "conform",
                  "back": "Definition: To comply with rules, standards, or laws."
                },
                {
                  "front": "isolate",
                  "back": "Definition: To cause (a person or place) to be or remain alone or apart from others."
                },
                {
                  "front": "domestic",
                  "back": "Definition: Relating to the running of a home or to family relations."
                },
                {
                  "front": "decade",
                  "back": "Definition: A period of ten years."
                }
              ]
            }
          },
          {
            "blockId": "pack-45-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 45: Contextual Application",
              "sentence": "I enjoyed the movie, and my friend did _______. The main _______ for the job is a degree in engineering. The company has made customer satisfaction a _______. The government is trying to address the _______ of climate change. The problem is _______ by a lack of resources. Everyone is expected to _______ to the discussion. He refuses to _______ to social norms. The country has been _______ from the international community. He is a _______ animal, not a wild one. He has lived in this city for the past _______.",
              "words": [
                "likewise",
                "criteria",
                "priority",
                "issue",
                "compound",
                "contribute",
                "conform",
                "isolate",
                "domestic",
                "decade"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-46",
        "title": "10-Word Pack 46",
        "content": [
          {
            "blockId": "pack-46-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 46</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-46-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 46)",
              "cards": [
                {
                  "front": "gender",
                  "back": "Definition: Either of the two sexes (male and female), especially when considered with reference to social and cultural differences rather than biological ones."
                },
                {
                  "front": "scope",
                  "back": "Definition: The extent of the area or subject matter that something deals with or to which it is relevant."
                },
                {
                  "front": "invest",
                  "back": "Definition: To expend money with the expectation of achieving a profit or material result by putting it into financial schemes, shares, or property, or by using it to develop a commercial venture."
                },
                {
                  "front": "ethic",
                  "back": "Definition: A set of moral principles, especially ones relating to or affirming a specified group, field, or form of conduct."
                },
                {
                  "front": "exceed",
                  "back": "Definition: To be greater in number or size than (a quantity, number, or other measurable thing)."
                },
                {
                  "front": "approach",
                  "back": "Definition: A way of dealing with something."
                },
                {
                  "front": "expert",
                  "back": "Definition: A person who has a comprehensive and authoritative knowledge of or skill in a particular area."
                },
                {
                  "front": "impose",
                  "back": "Definition: To force (something unwelcome or unfamiliar) to be accepted or put in place."
                },
                {
                  "front": "immigrate",
                  "back": "Definition: To come to live permanently in a foreign country."
                },
                {
                  "front": "method",
                  "back": "Definition: A particular form of procedure for accomplishing or approaching something, especially a systematic or established one."
                }
              ]
            }
          },
          {
            "blockId": "pack-46-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 46: Contextual Application",
              "sentence": "The toy is suitable for children of either _______. The problem is beyond the _______ of my knowledge. The company is _______ in new technology. The company has a strict code of _______. He _______ all our expectations. He has a very positive _______ to life. The company has hired an _______ to help with the project. I don’t want to _______ my views on you. The country has a large immigrant population. There are many different _______ for learning a new language.",
              "words": [
                "gender",
                "scope",
                "invest",
                "ethic",
                "exceed",
                "approach",
                "expert",
                "impose",
                "immigrate",
                "method"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-47",
        "title": "10-Word Pack 47",
        "content": [
          {
            "blockId": "pack-47-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 47</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-47-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 47)",
              "cards": [
                {
                  "front": "intense",
                  "back": "Definition: Of extreme force, degree, or strength."
                },
                {
                  "front": "reinforce",
                  "back": "Definition: To strengthen or support, especially with additional personnel or material."
                },
                {
                  "front": "reveal",
                  "back": "Definition: To make (previously unknown or secret information) known to others."
                },
                {
                  "front": "practitioner",
                  "back": "Definition: A person actively engaged in an art, discipline, or profession, especially medicine."
                },
                {
                  "front": "simulate",
                  "back": "Definition: To imitate the appearance or character of."
                },
                {
                  "front": "physical",
                  "back": "Definition: Relating to the body as opposed to the mind."
                },
                {
                  "front": "allocate",
                  "back": "Definition: To distribute (resources or duties) for a particular purpose."
                },
                {
                  "front": "maintain",
                  "back": "Definition: To cause or enable (a condition or state of affairs) to continue."
                },
                {
                  "front": "commodity",
                  "back": "Definition: A raw material or primary agricultural product that can be bought and sold, such as copper or coffee."
                },
                {
                  "front": "journal",
                  "back": "Definition: A newspaper or magazine that deals with a particular subject or professional activity."
                }
              ]
            }
          },
          {
            "blockId": "pack-47-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 47: Contextual Application",
              "sentence": "He is a very _______ person. The new evidence _______ my belief that he is innocent. The study _______ some interesting findings. The book is for _______ of the art of negotiation. The training exercise is designed to _______ a real-life emergency. The job requires a lot of _______ labor. The company has _______ a budget for marketing. It is important to _______ a healthy lifestyle. The company trades in a variety of _______. She keeps a _______ of her thoughts and feelings.",
              "words": [
                "intense",
                "reinforce",
                "reveal",
                "practitioner",
                "simulate",
                "physical",
                "allocate",
                "maintain",
                "commodity",
                "journal"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-48",
        "title": "10-Word Pack 48",
        "content": [
          {
            "blockId": "pack-48-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 48</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-48-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 48)",
              "cards": [
                {
                  "front": "justify",
                  "back": "Definition: To show or prove to be right or reasonable."
                },
                {
                  "front": "layer",
                  "back": "Definition: A sheet, quantity, or thickness of material, typically one of several, covering a surface or body."
                },
                {
                  "front": "licence",
                  "back": "Definition: A permit from an authority to own or use something, do a particular thing, or carry on a trade."
                },
                {
                  "front": "locate",
                  "back": "Definition: To discover the exact place or position of."
                },
                {
                  "front": "logic",
                  "back": "Definition: Reasoning conducted or assessed according to strict principles of validity."
                },
                {
                  "front": "mature",
                  "back": "Definition: Fully developed physically; full-grown."
                },
                {
                  "front": "mental",
                  "back": "Definition: Relating to the mind."
                },
                {
                  "front": "migrate",
                  "back": "Definition: (of an animal, typically a bird or fish) to move from one region or habitat to another according to the seasons."
                },
                {
                  "front": "military",
                  "back": "Definition: Relating to or characteristic of soldiers or armed forces."
                },
                {
                  "front": "minimal",
                  "back": "Definition: Of a minimum amount, quantity, or degree; negligible."
                }
              ]
            }
          },
          {
            "blockId": "pack-48-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 48: Contextual Application",
              "sentence": "The company has to _______ its decision to close the factory. The company has a complex organizational _______. The company has a _______ to operate in the country. The company is _______ in a new office building. There is a certain _______ to his madness. The wine has _______ over the years. The job requires a lot of _______ effort. He migrated to the city in search of work. The country has a strong _______. The changes to the plan were _______.",
              "words": [
                "justify",
                "layer",
                "licence",
                "locate",
                "logic",
                "mature",
                "mental",
                "migrate",
                "military",
                "minimal"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-49",
        "title": "10-Word Pack 49",
        "content": [
          {
            "blockId": "pack-49-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 49</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-49-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 49)",
              "cards": [
                {
                  "front": "ministry",
                  "back": "Definition: A government department headed by a minister of state."
                },
                {
                  "front": "monitor",
                  "back": "Definition: To observe and check the progress or quality of (something) over a period of time; keep under systematic review."
                },
                {
                  "front": "motive",
                  "back": "Definition: A reason for doing something, especially one that is hidden or not obvious."
                },
                {
                  "front": "network",
                  "back": "Definition: An arrangement of intersecting horizontal and vertical lines."
                },
                {
                  "front": "neutral",
                  "back": "Definition: Not helping or supporting either side in a conflict, disagreement, etc.; impartial."
                },
                {
                  "front": "nevertheless",
                  "back": "Definition: In spite of that; nevertheless."
                },
                {
                  "front": "notion",
                  "back": "Definition: A conception of or belief about something."
                },
                {
                  "front": "objective",
                  "back": "Definition: A thing aimed at or sought; a goal."
                },
                {
                  "front": "obtain",
                  "back": "Definition: To get, acquire, or secure (something)."
                },
                {
                  "front": "obvious",
                  "back": "Definition: Easily perceived or understood; clear, self-evident, or apparent."
                }
              ]
            }
          },
          {
            "blockId": "pack-49-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 49: Contextual Application",
              "sentence": "The government has a _______ of education. The company is _______ its sales figures closely. His _______ for helping me was not entirely clear. He has a wide _______ of contacts in the industry. The referee must be _______. He was tired, but he went to the party _______. The _______ of a four-day work week is gaining popularity. My _______ is to graduate with honors. She has _______ a degree in law. The answer to the question is _______.",
              "words": [
                "ministry",
                "monitor",
                "motive",
                "network",
                "neutral",
                "nevertheless",
                "notion",
                "objective",
                "obtain",
                "obvious"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-50",
        "title": "10-Word Pack 50",
        "content": [
          {
            "blockId": "pack-50-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 50</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-50-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 50)",
              "cards": [
                {
                  "front": "occupy",
                  "back": "Definition: To reside or have one's place of business in (a building)."
                },
                {
                  "front": "occur",
                  "back": "Definition: To happen; take place."
                },
                {
                  "front": "odd",
                  "back": "Definition: Different to what is usual or expected; strange."
                },
                {
                  "front": "option",
                  "back": "Definition: A thing that is or may be chosen."
                },
                {
                  "front": "orient",
                  "back": "Definition: To align or position (something) relative to the points of a compass or other specified positions."
                },
                {
                  "front": "outcome",
                  "back": "Definition: The way a thing turns out; a consequence."
                },
                {
                  "front": "overall",
                  "back": "Definition: Taking everything into account."
                },
                {
                  "front": "panel",
                  "back": "Definition: A flat or curved component, typically rectangular, that forms or is set into the surface of a door, wall, or ceiling."
                },
                {
                  "front": "paradigm",
                  "back": "Definition: A typical example or pattern of something; a model."
                },
                {
                  "front": "paragraph",
                  "back": "Definition: A distinct section of a piece of writing, usually dealing with a single theme and indicated by a new line, indentation, or numbering."
                }
              ]
            }
          },
          {
            "blockId": "pack-50-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 50: Contextual Application",
              "sentence": "He has _______ the same position for ten years. It never _______ to me that he might be lying. The _______ thing is that he never mentioned it to me. The company offers a variety of _______ to its customers. The company is trying to _______ itself to the new market conditions. The study had a positive _______. _______, I am satisfied with the results. The company has set up a _______ to investigate the incident. The company is a _______ of success in the industry. Please write a _______ about your favorite hobby.",
              "words": [
                "occupy",
                "occur",
                "odd",
                "option",
                "orient",
                "outcome",
                "overall",
                "panel",
                "paradigm",
                "paragraph"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-51",
        "title": "10-Word Pack 51",
        "content": [
          {
            "blockId": "pack-51-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 51</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-51-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 51)",
              "cards": [
                {
                  "front": "parallel",
                  "back": "Definition: (of lines, planes, surfaces, or objects) side by side and having the same distance continuously between them."
                },
                {
                  "front": "participate",
                  "back": "Definition: To take part."
                },
                {
                  "front": "partner",
                  "back": "Definition: A person who takes part in an undertaking with another or others, especially in a business or company with shared risks and profits."
                },
                {
                  "front": "passive",
                  "back": "Definition: Accepting or allowing what happens or what others do, without active response or resistance."
                },
                {
                  "front": "perceive",
                  "back": "Definition: To become aware or conscious of (something); come to realize or understand."
                },
                {
                  "front": "period",
                  "back": "Definition: A length or portion of time."
                },
                {
                  "front": "persist",
                  "back": "Definition: To continue firmly or obstinately in an opinion or a course of action in spite of difficulty, opposition, or failure."
                },
                {
                  "front": "perspective",
                  "back": "Definition: A particular attitude toward or way of regarding something; a point of view."
                },
                {
                  "front": "phase",
                  "back": "Definition: A distinct period or stage in a series of events or a process of change or development."
                },
                {
                  "front": "philosophy",
                  "back": "Definition: The study of the fundamental nature of knowledge, reality, and existence."
                }
              ]
            }
          },
          {
            "blockId": "pack-51-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 51: Contextual Application",
              "sentence": "There are some interesting _______ between the two novels. The company is _______ in a trade fair. The two companies have formed a strategic _______. The company has a _______ role in the market. The world is not always as we _______ it to be. He was a famous writer of the Victorian _______. The rain will _______ for the rest of the day. It is important to consider the problem from different _______. The company is going through a _______ of transition. The company’s _______ is to put the customer first.",
              "words": [
                "parallel",
                "participate",
                "partner",
                "passive",
                "perceive",
                "period",
                "persist",
                "perspective",
                "phase",
                "philosophy"
              ]
            }
          }
        ]
      },
      {
        "packId": "pack-52",
        "title": "10-Word Pack 52",
        "content": [
          {
            "blockId": "pack-52-intro-01",
            "type": "text",
            "data": {
              "htmlContent": "<h2>10-Word Pack 52</h2><p>10-word lesson focusing on essential vocabulary. Use the cards and contextual practice to master these terms.</p>"
            }
          },
          {
            "blockId": "pack-52-flashcard-02",
            "type": "flashcard",
            "data": {
              "title": "10-Word Flashcards (Pack 52)",
              "cards": [
                {
                  "front": "physical",
                  "back": "Definition: Relating to the body as opposed to the mind."
                },
                {
                  "front": "plus",
                  "back": "Definition: With the addition of."
                },
                {
                  "front": "policy",
                  "back": "Definition: A course or principle of action adopted or proposed by a government, party, business, or individual."
                },
                {
                  "front": "portion",
                  "back": "Definition: A part of a whole; a share."
                },
                {
                  "front": "pose",
                  "back": "Definition: To present or constitute (a problem, danger, or difficulty)."
                },
                {
                  "front": "positive",
                  "back": "Definition: Consisting in or characterized by the presence or possession of features or qualities rather than their absence."
                },
                {
                  "front": "potential",
                  "back": "Definition: Having or showing the capacity to become or develop into something in the future."
                },
                {
                  "front": "practitioner",
                  "back": "Definition: A person actively engaged in an art, discipline, or profession, especially medicine."
                },
                {
                  "front": "precede",
                  "back": "Definition: To come before (something) in time."
                },
                {
                  "front": "precise",
                  "back": "Definition: Marked by exactness and accuracy of expression or detail."
                }
              ]
            }
          },
          {
            "blockId": "pack-52-fill-in-blanks-03",
            "type": "fillInTheBlanks",
            "data": {
              "title": "Practice Pack 52: Contextual Application",
              "sentence": "The job requires a lot of _______ labor. The job has a good salary, _______ excellent benefits. The government has a new _______ on education. The company has a _______ of the market. He _______ for a photograph. The test results were _______. He is a _______ candidate for the job. The book is for _______ of the art of negotiation. The dark clouds _______ the storm. He is a very _______ and detail-oriented person.",
              "words": [
                "physical",
                "plus",
                "policy",
                "portion",
                "pose",
                "positive",
                "potential",
                "practitioner",
                "precede",
                "precise"
              ]
            }
          }
        ]
      }
    ]
  }
};