/**
 * @fileoverview Canonical JSON data for the "Phrasal Verbs" lesson.
 * Content is structured to reduce cognitive load by grouping verbs visually
 * and emphasizing practice through flashcards and quizzes.
 */

export const phrasalVerbData = {
  "lessonId": "english-phrasal-verbs-core-concepts",
  "title": "Mastering Phrasal Verbs",
  "subtitle": "Essential combinations of verbs and particles that make English fluent.",
  "content": [
    // --- INTRODUCTORY CONTENT BLOCK ---
    {
      "blockId": "phrasal-verb-intro-01",
      "type": "text",
      "data": {
        "htmlContent": "<h2>What Exactly Are Phrasal Verbs?</h2><p>A phrasal verb is a combination of a main verb and one or two particles (prepositions or adverbs), and together they create a **new meaning** that is often different from the original verb. This non-literal meaning is what makes them challenging, but vital for sounding natural in English.</p><h3>Why Learn Phrasal Verbs?</h3><ul><li>**Fluency:** Native speakers use them constantly in daily conversation.</li><li>**Clarity:** They are direct and expressive.</li><li>**Cognitive Strategy:** Grouping them by particle (e.g., all verbs ending in **'up'**) can help you spot subtle patterns and reduce the learning effort.</li></ul>"
      }
    },

    // --- FLASHCARDS - GROUPED BY PARTICLE ('UP') ---
    {
      "blockId": "phrasal-verb-flashcards-up-02",
      "type": "flashcard",
      "data": {
        "title": "Flashcards: Phrasal Verbs with 'UP'",
        "cards": [
          { "front": "Look up", "back": "To search for information in a dictionary or reference book. (e.g., *I need to look up this word.*)" },
          { "front": "Give up", "back": "To stop trying to do something; surrender. (e.g., *Don't give up on your dreams.*)" },
          { "front": "Pick up", "back": "To lift someone or something; also, to learn a new skill easily. (e.g., *I picked up Spanish quickly.*)" },
          { "front": "Catch up", "back": "To reach the same point or level as someone else. (e.g., *We need to catch up on our work.*)" },
          { "front": "Set up", "back": "To prepare equipment or arrange something. (e.g., *Let's set up the meeting room.*)" }
        ]
      },
      "accessibility": {
        "altText": "A set of digital flashcards displaying common phrasal verbs ending in 'up' and their definitions.",
        "longDescription": "Five flashcards are presented: Look up (search information), Give up (surrender), Pick up (lift or learn), Catch up (reach the same level), and Set up (prepare).",
        "dataTable": {
            "headers": ["Phrasal Verb", "Definition", "Example"],
            "rows": [
                ["Look up", "To search for information.", "I need to look up this word."],
                ["Give up", "To stop trying; surrender.", "Don't give up on your dreams."],
                ["Pick up", "To lift; learn a skill easily.", "I picked up Spanish quickly."],
                ["Catch up", "To reach the same level.", "We need to catch up on our work."],
                ["Set up", "To prepare or arrange.", "Let's set up the meeting room."]
            ]
        }
      }
    },
    
    // --- FLASHCARDS - GROUPED BY PARTICLE ('OUT') ---
    {
      "blockId": "phrasal-verb-flashcards-out-03",
      "type": "flashcard",
      "data": {
        "title": "Flashcards: Phrasal Verbs with 'OUT'",
        "cards": [
          { "front": "Find out", "back": "To discover a fact or piece of information. (e.g., *I need to find out who won the game.*)" },
          { "front": "Work out", "back": "To exercise or to find a solution to a problem. (e.g., *The plan didn't work out.*)" },
          { "front": "Run out of", "back": "To use all of something and have none left. (e.g., *We ran out of milk this morning.*)" },
          { "front": "Hand out", "back": "To distribute something to a group of people. (e.g., *The teacher handed out the papers.*)" }
        ]
      },
      "accessibility": {
        "altText": "A set of digital flashcards displaying common phrasal verbs ending in 'out' and their definitions.",
        "longDescription": "Four flashcards are presented: Find out (discover), Work out (exercise or solve), Run out of (use all), and Hand out (distribute).",
        "dataTable": {
            "headers": ["Phrasal Verb", "Definition", "Example"],
            "rows": [
                ["Find out", "To discover a fact.", "I need to find out who won the game."],
                ["Work out", "To exercise or find a solution.", "The plan didn't work out."],
                ["Run out of", "To use all of something.", "We ran out of milk this morning."],
                ["Hand out", "To distribute something.", "The teacher handed out the papers."]
            ]
        }
      }
    },
    
    // --- PRACTICE QUIZ (Multiple Choice) ---
    {
      "blockId": "phrasal-verb-quiz-04",
      "type": "quiz",
      "data": {
        "title": "Quiz: Test Your Phrasal Verb Knowledge",
        "questions": [
          {
            "text": "The detective tried to _______ the truth about the missing documents.",
            "answers": [
              "set up",
              "find out",
              "look up"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Correct! 'Find out' means to discover the truth.",
            "messageForIncorrectAnswer": "'Find out' is the correct choice, meaning to discover or learn the truth."
          },
          {
            "text": "I was late, so I had to _______ my friend who left ten minutes ago.",
            "answers": [
              "give up on",
              "catch up with",
              "run out of"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Excellent! 'Catch up with' means to reach the same level or location as someone ahead of you.",
            "messageForIncorrectAnswer": "The correct verb is 'catch up with,' meaning to reach the same point as another person."
          }
        ]
      }
    },

    // --- FILL IN THE BLANKS (Kept as requested) ---
    {
      "blockId": "phrasal-verb-fill-in-blanks-05",
      "type": "fillInTheBlanks",
      "data": {
        "title": "Advanced Practice: Fill in the Blanks",
        "sentence": "We can't just **give up** on the project. We have to find a way to **work out** a solution, or we'll **run out of** time before the deadline. I should **look up** some advice online to help us **set up** a new timeline.",
        "words": ["give up", "work out", "run out of", "look up", "set up"]
      }
    }
  ]
};
