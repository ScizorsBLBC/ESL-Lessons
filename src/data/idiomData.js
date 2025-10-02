/**
 * @fileoverview Canonical JSON data for the "Idioms" lesson.
 * Content is structured into Flashcard and Quiz blocks for focused learning
 * to manage the non-compositional meaning inherent in idioms.
 */

export const idiomData = {
    "lessonId": "english-idioms-packs",
    "title": "Essential English Idioms",
    "subtitle": "Learning common phrases that don't mean what they literally say.",
    "lessons": [
        {
            "lesson": 1,
            "title": "Idiom Pack 1",
            "packType": "common-idioms",
            "idioms": [
                { "idiom": "Cut somebody some slack", "preview": "Be less critical" },
                { "idiom": "A dime a dozen", "preview": "Very common" },
                { "idiom": "Make hay while the sun shines", "preview": "Take advantage of opportunity" }
            ]
        },
        {
            "lesson": 2,
            "title": "Idiom Pack 2",
            "packType": "body-idioms",
            "idioms": [
                { "idiom": "Cost an arm and a leg", "preview": "Very expensive" },
                { "idiom": "Read the riot act", "preview": "Scold angrily" },
                { "idiom": "Put a sock in it", "preview": "Be quiet" }
            ]
        }
    ],
    "content": [
      // --- INTRODUCTORY CONTENT BLOCK ---
      {
        "blockId": "idioms-intro-01",
        "type": "text",
        "data": {
          "htmlContent": "<h2>The Beauty and Challenge of Idioms</h2><p>Idioms are phrases whose meaning cannot be understood from the ordinary meanings of the individual words. For example, **'piece of cake'** does not mean a slice of dessert; it means something is easy. Mastering idioms is crucial for natural conversation!</p><h3>Pedagogical Tip: Learn the Story</h3><p>To reduce cognitive load, try to learn the **story or origin** behind the idiom. This connects the abstract meaning to a concrete narrative, making it much easier to remember. We use **flashcards** for quick memorization and **quizzes** for contextual practice.</p>"
        }
      },
  
      // --- IDIOM PACK 1 ---
      {
        "blockId": "idioms-pack-1-flashcards-02",
        "type": "flashcard",
        "data": {
          "title": "Idiom Pack 1: Common English Idioms (Flashcards)",
          "cards": [
            { "front": "Cut somebody some slack", "back": "Meaning: To be less critical of someone. Story: From sailors loosening a rope (slack) to ease tension. Example: *Let's cut him some slack, he's new.*" },
            { "front": "A dime a dozen", "back": "Meaning: Something very common and of little value. Story: From the late 1800s when many goods cost ten cents (a dime) for twelve items (a dozen)." },
            { "front": "Make hay while the sun shines", "back": "Meaning: To take advantage of a favorable opportunity. Story: Farmers must harvest hay when it's dry before rain ruins it." }
          ]
        },
        "accessibility": {
          "altText": "Flashcards for three idioms: 'Cut somebody some slack', 'A dime a dozen', and 'Make hay while the sun shines'.",
          "longDescription": "Three flashcards for Idiom Pack 1 are available for review.",
          "dataTable": {
              "headers": ["Idiom", "Meaning", "Origin/Story"],
              "rows": [
                  ["Cut somebody some slack", "To be less critical of someone.", "From sailors loosening a rope (slack) to ease tension."],
                  ["A dime a dozen", "Something very common and of little value.", "From common goods costing ten cents (a dime) for twelve (a dozen)."],
                  ["Make hay while the sun shines", "To take advantage of a favorable opportunity.", "Farmers harvesting dry hay before it rains."]
              ]
          }
        }
      },
      {
        "blockId": "idioms-pack-1-quiz-03",
        "type": "quiz",
        "data": {
          "title": "Quiz: Idiom Pack 1 Challenge",
          "questions": [
            {
              "text": "The CEO is always late, but we should _______ because he works 70 hours a week.",
              "answers": ["make hay", "cut him some slack", "call it a day"],
              "correctAnswer": "2",
              "messageForCorrectAnswer": "Correct! You're telling people to be less critical.",
              "messageForIncorrectAnswer": "The phrase 'cut him some slack' means to be more forgiving."
            },
            {
              "text": "Don't worry about losing your phone charger; those cables are _______ these days.",
              "answers": ["a dime a dozen", "cost an arm and a leg", "the best of both worlds"],
              "correctAnswer": "1",
              "messageForCorrectAnswer": "Exactly! They are common and inexpensive.",
              "messageForIncorrectAnswer": "'A dime a dozen' is used for items that are easily found and cheap."
            }
          ]
        }
      },
  
      // --- IDIOM PACK 2 ---
      {
        "blockId": "idioms-pack-2-flashcards-04",
        "type": "flashcard",
        "data": {
          "title": "Idiom Pack 2: Idioms of the Body (Flashcards)",
          "cards": [
            { "front": "Cost an arm and a leg", "back": "Meaning: To be extremely expensive. Story: Likely from battlefield descriptions or high-stakes bargaining, where the loss of a limb was a high price." },
            { "front": "Read the riot act", "back": "Meaning: To scold someone angrily for bad behavior. Story: From the 1714 British 'Riot Act' read to unruly crowds before arrests were made." },
            { "front": "Put a sock in it", "back": "Meaning: A rude way to tell someone to be quiet. Story: Comes from literally putting a sock into the horn of an early gramophone to muffle the loud sound." }
          ]
        },
        "accessibility": {
          "altText": "Flashcards for three body-related idioms: 'Cost an arm and a leg', 'Read the riot act', and 'Put a sock in it'.",
          "longDescription": "Three flashcards for Idiom Pack 2 are available for review.",
          "dataTable": {
              "headers": ["Idiom", "Meaning", "Origin/Story"],
              "rows": [
                  ["Cost an arm and a leg", "To be extremely expensive.", "Likely related to high cost or sacrifice."],
                  ["Read the riot act", "To scold someone angrily for bad behavior.", "From a 1714 law read to crowds before arrests."],
                  ["Put a sock in it", "To tell someone to be quiet.", "From putting a sock in a gramophone horn to quiet it."]
              ]
          }
        }
      },
      {
        "blockId": "idioms-pack-2-quiz-05",
        "type": "quiz",
        "data": {
          "title": "Quiz: Idiom Pack 2 Challenge",
          "questions": [
            {
              "text": "I can't afford that luxury car; it would ______.",
              "answers": ["break the ice", "cost an arm and a leg", "hit the nail on the head"],
              "correctAnswer": "2",
              "messageForCorrectAnswer": "Correct! It means it's extremely expensive.",
              "messageForIncorrectAnswer": "The idiom 'cost an arm and a leg' means it is very expensive."
            },
            {
              "text": "The noise in the library was terrible, so the librarian finally came and ______ to the students.",
              "answers": ["made hay", "put a sock in it", "read the riot act"],
              "correctAnswer": "3",
              "messageForCorrectAnswer": "Excellent! She gave them a stern, angry warning.",
              "messageForIncorrectAnswer": "'Read the riot act' means to give a severe scolding or warning."
            }
          ]
        }
      }
    ]
  };
  