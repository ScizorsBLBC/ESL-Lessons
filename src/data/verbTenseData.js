// src/data/verbTenseData.js
// Refactored to use the new schema format for better structure and interactivity

export const verbTenseData = {
  "lessonId": "english-verb-tenses-complete-guide",
  "title": "A Complete Guide to English Verb Tenses",
  "subtitle": "Learn how to talk about the past, present, and future with confidence.",
  "content": [
    {
      "blockId": "intro-what-are-tenses-01",
      "type": "text",
      "data": {
        "htmlContent": "<h2>What Are Verb Tenses?</h2><p>In English, verb tenses are tools that show <em>when</em> an action happens. Think of them like a time machine for your words! By changing the form of a verb, you can tell your listener if something happened yesterday (past), is happening right now (present), or will happen tomorrow (future). Understanding them helps you express your ideas clearly.</p>"
      }
    },
    {
      "blockId": "visualizing-time-02",
      "type": "text",
      "data": {
        "htmlContent": "<h2>Visualizing Time on a Timeline</h2><p>Imagine a straight line. The point where you are right now is the <strong>Present</strong>. Everything to the left is the <strong>Past</strong>, and everything to the right is the <strong>Future</strong>. Each verb tense places an action somewhere on this line.</p><ul><li>Is it a single dot in the past? (<em>I <strong>ate</strong>.</em>)</li><li>Is it an action that started in the past and continues to now? (<em>I <strong>have been waiting</strong>.</em>)</li><li>Is it a dot in the future? (<em>I <strong>will eat</strong>.</em>)</li></ul><p>As you learn each tense, try to picture where it belongs on this timeline. This will help you choose the right one!</p>"
      }
    },
    {
      "blockId": "present-tenses-intro-03",
      "type": "text",
      "data": {
        "htmlContent": "<h2>Part 1: The Present Tenses</h2><p>Present tenses describe what's happening now, but they can also be used for general truths, habits, and even past actions that are still important today. Let's explore them.</p>"
      }
    },
    {
      "blockId": "present-simple-04",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Simple Present</h3><p><em>(Example: \"She works\")</em></p><p>We use the Simple Present for things that are generally true or happen regularly.</p><ul><li><strong>For Habits and Routines:</strong> Things you do again and again. <em>\"I <strong>drink</strong> coffee every morning.\"</em></li><li><strong>For General Facts:</strong> Things that are always true. <em>\"The Earth <strong>goes</strong> around the Sun.\"</em></li><li><strong>For Scheduled Future Events:</strong> Like a timetable or official schedule. <em>\"The train <strong>leaves</strong> at 8:00 AM tomorrow.\"</em></li></ul>"
      }
    },
    {
      "blockId": "present-continuous-05",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Present Continuous</h3><p><em>(Example: \"I am working\")</em></p><p>This tense is for actions that are happening right now or are temporary.</p><ul><li><strong>For Actions Happening Now:</strong> What are you doing at this exact moment? <em>\"Please be quiet, I <strong>am studying</strong>.\"</em></li><li><strong>For Temporary Situations:</strong> Actions happening for a limited time (like this week or this month). <em>\"She <strong>is staying</strong> with her friend for a few days.\"</em></li><li><strong>For Future Plans:</strong> When you have already arranged to do something. <em>\"I <strong>am meeting</strong> John for lunch tomorrow.\"</em></li></ul>"
      }
    },
    {
      "blockId": "present-perfect-06",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Present Perfect</h3><p><em>(Example: \"I have finished\")</em></p><p>We use this tense when a past action has a result or connection to the present. The exact time of the action is not important.</p><ul><li><strong>For a Past Action with a Present Result:</strong> <em>\"I <strong>have lost</strong> my keys.\"</em> (The result is I can't get into my house now.)</li><li><strong>For Life Experiences:</strong> To talk about things you have or haven't done in your life. <em>\"She <strong>has traveled</strong> to Japan.\"</em></li><li><strong>For Recently Completed Actions:</strong> <em>\"I've just finished my homework.\"</em></li></ul>"
      }
    },
    {
      "blockId": "present-perfect-continuous-07",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Present Perfect Continuous</h3><p><em>(Example: \"I have been waiting\")</em></p><p>This tense is perfect for showing how long an action has been happening. It emphasizes the <strong>duration</strong>.</p><ul><li><strong>For Actions That Started in the Past and Continue Now:</strong> <em>\"I <strong>have been waiting</strong> for the bus for 30 minutes.\"</em> (I started waiting 30 minutes ago, and I am still waiting.)</li><li><strong>For Recent Actions with a Present Result:</strong> To explain a current situation. <em>\"I'm tired because I <strong>have been working</strong> all day.\"</em></li></ul>"
      }
    },
    {
      "blockId": "present-summary-chart-08",
      "type": "chart",
      "data": {
        "title": "Summary: Present Tenses",
        "headers": ["Tense", "Example Sentence", "Main Idea"],
        "rows": [
          ["Simple Present", "She <strong>works</strong> as a doctor.", "Habits, facts, and schedules."],
          ["Present Continuous", "I <strong>am working</strong> right now.", "Happening now, temporary, or future plans."],
          ["Present Perfect", "We <strong>have eaten</strong> there before.", "Past action with a present result or connection."],
          ["Present Perfect Continuous", "They <strong>have been working</strong> since morning.", "How long an action has been happening."]
        ]
      }
    },
    {
      "blockId": "present-tenses-quiz-09",
      "type": "quiz",
      "data": {
        "quizTitle": "Check Your Knowledge: Present Tenses",
        "questions": [
          {
            "question": "Which sentence is correct for something that happens every day?",
            "answers": [
              "I am drinking coffee now.",
              "I drink coffee.",
              "I have drunk coffee.",
              "I have been drinking coffee."
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Great job! We use the Simple Present for habits and routines.",
            "messageForIncorrectAnswer": "Not quite. For daily habits, the Simple Present ('I drink') is the best choice."
          },
          {
            "question": "Your friend asks, 'Why are you so tired?' What is the best response?",
            "answers": [
              "I studied.",
              "I study hard.",
              "I have been studying for hours.",
              "I will study."
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Exactly! You are explaining the present result (being tired) by emphasizing the duration of the past activity.",
            "messageForIncorrectAnswer": "Think about explaining the *reason* for a present result. The Present Perfect Continuous ('have been studying') is perfect for this."
          }
        ]
      }
    },
    {
      "blockId": "past-tenses-intro-10",
      "type": "text",
      "data": {
        "htmlContent": "<h2>Part 2: The Past Tenses</h2><p>Past tenses are used for actions that are finished. The key is to understand <em>when</em> in the past they happened, and in what order.</p>"
      }
    },
    {
      "blockId": "simple-past-11",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Simple Past</h3><p><em>(Example: \"He visited\")</em></p><p>Use this for an action that started and finished at a specific time in the past. We often say when it happened (e.g., <em>yesterday, last year</em>).</p><ul><li><strong>A Completed Past Action:</strong> <em>\"I <strong>visited</strong> my grandparents last week.\"</em></li><li><strong>A Series of Past Actions:</strong> <em>\"I <strong>woke up</strong>, <strong>brushed</strong> my teeth, and <strong>ate</strong> breakfast.\"</em></li></ul>"
      }
    },
    {
      "blockId": "past-continuous-12",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Past Continuous</h3><p><em>(Example: \"She was reading\")</em></p><p>This tense describes an action that was in progress at a specific moment in the past.</p><ul><li><strong>An Unfinished Action in the Past:</strong> <em>\"At 8 PM last night, I <strong>was watching</strong> TV.\"</em></li><li><strong>An Interrupted Action:</strong> For a longer background action that was interrupted by a shorter one. <em>\"I <strong>was walking</strong> home when it started to rain.\"</em></li></ul>"
      }
    },
    {
      "blockId": "past-perfect-13",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Past Perfect</h3><p><em>(Example: \"They had finished\")</em></p><p>This is the 'past before the past'. Use it to show that one past action happened *before* another past action.</p><ul><li><strong>To Show Sequence:</strong> <em>\"The train <strong>had left</strong> by the time I got to the station.\"</em> (First, the train left. Second, I arrived.)</li></ul>"
      }
    },
    {
      "blockId": "past-perfect-continuous-14",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Past Perfect Continuous</h3><p><em>(Example: \"I had been waiting\")</em></p><p>This tense shows how long a past action was happening *before* another past action started.</p><ul><li><strong>Duration Before a Past Event:</strong> <em>\"I <strong>had been waiting</strong> for an hour when my friend finally arrived.\"</em></li></ul>"
      }
    },
    {
      "blockId": "past-summary-chart-15",
      "type": "chart",
      "data": {
        "title": "Summary: Past Tenses",
        "headers": ["Tense", "Example Sentence", "Main Idea"],
        "rows": [
          ["Simple Past", "He <strong>visited</strong> Paris last year.", "A finished action at a specific past time."],
          ["Past Continuous", "She <strong>was reading</strong> when the phone rang.", "An action in progress in the past (often interrupted)."],
          ["Past Perfect", "They <strong>had finished</strong> dinner before I arrived.", "An action that happened before another past action."],
          ["Past Perfect Continuous", "I <strong>had been waiting</strong> for an hour when he came.", "How long an action continued before another past action."]
        ]
      }
    },
    {
      "blockId": "past-tenses-quiz-16",
      "type": "quiz",
      "data": {
        "quizTitle": "Check Your Knowledge: Past Tenses",
        "questions": [
          {
            "question": "Which sentence shows that one action happened before another in the past?",
            "answers": [
              "When I arrived, she cooked dinner.",
              "While I was arriving, she cooked dinner.",
              "When I arrived, she had cooked dinner.",
              "When I arrived, she was cooking dinner."
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct! The Past Perfect ('had cooked') shows the cooking was finished before the arrival.",
            "messageForIncorrectAnswer": "Try again. To show one action finished *before* another past action, we use the Past Perfect."
          }
        ]
      }
    },
    {
      "blockId": "future-tenses-intro-17",
      "type": "text",
      "data": {
        "htmlContent": "<h2>Part 3: The Future Tenses</h2><p>There are several ways to talk about the future in English. The form you choose depends on whether you are talking about a plan, a prediction, or a spontaneous decision.</p>"
      }
    },
    {
      "blockId": "future-will-18",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Future with 'will'</h3><p><em>(e.g., \"I will arrive,\" \"I will drive\")</em></p><p>A common and versatile way to express future actions. It can indicate:</p><ul><li><strong>Prediction:</strong> \"I think it will rain later.\"</li><li><strong>Spontaneous Decision (made at the moment of speaking):</strong> \"The phone is ringing, I will get it.\"</li><li><strong>Promise or Offer:</strong> \"I will arrive by noon, I promise.\"</li><li><strong>General Intention:</strong> \"She will be happy to see you.\"</li></ul>"
      }
    },
    {
      "blockId": "future-going-to-19",
      "type": "text",
      "data": {
        "htmlContent": "<h3>\"Be going to\" Structure</h3><p><em>(e.g., \"I am going to work,\" \"She is going to arrive\")</em></p><p>A very common way to talk about the future.</p><ul><li><strong>Prior Plans/Intentions:</strong> When a decision about a future action has already been made.<br><em>\"We are going to move to a new city next year.\"</em><br><em>\"I am going to visit my grandparents this weekend.\"</em></li><li><strong>Predictions Based on Present Evidence:</strong> When there's something in the present situation that suggests what will happen.<br><em>\"Look at those dark clouds! It is going to rain.\"</em><br><em>\"He's driving too fast. He is going to have an accident.\"</em></li></ul>"
      }
    },
    {
      "blockId": "future-continuous-20",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Future Continuous</h3><p><em>(e.g., \"I will be arriving,\" \"I will be working\")</em></p><p>Indicates an action that will be <strong>in progress at a specific time in the future</strong>. It can also be used for:</p><ul><li><strong>Planned Future Arrangements (can sound more formal/polite):</strong><br><em>\"The delegates will be arriving throughout the morning.\"</em></li><li><strong>Action in Progress at a Future Moment:</strong><br><em>\"This time tomorrow, I will be arriving in London.\"</em><br><em>\"Don't call between 7 and 8 PM, as we will be having dinner then.\"</em></li><li><strong>Polite Inquiry about Plans:</strong><br><em>\"Will you be joining us for the meeting?\"</em></li></ul>"
      }
    },
    {
      "blockId": "future-perfect-21",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Future Perfect</h3><p><em>(e.g., \"I will have driven,\" \"I will have finished\")</em></p><p>Describes an action that will be <strong>completed before a specific point in time in the future</strong> or before another future action occurs. It emphasizes the completion or achievement of an action from a future perspective.</p><ul><li><strong>Action Completed by a Future Deadline/Moment:</strong><br><em>\"By 8 PM tonight, I will have driven 300 miles.\"</em><br><em>\"Next month, she will have worked here for five years.\"</em></li><li><strong>Action Completed Before Another Future Event (sequencing):</strong><br><em>\"By the time you finish cooking, I will have set the table.\"</em><br><em>\"They will have finished their exams before the summer holidays begin.\"</em></li></ul>"
      }
    },
    {
      "blockId": "future-perfect-continuous-22",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Future Perfect Continuous</h3><p><em>(e.g., \"I will have been working,\" \"She will have been studying\")</em></p><p>Emphasizes the <strong>duration</strong> of an action that will continue up to a specific point in the future.</p><ul><li><em>\"By next June, I will have been working here for ten years.\" (Highlights the ten-year duration leading up to next June.)</em></li><li><em>\"When he retires next month, he will have been teaching for over 40 years.\"</em></li><li><em>\"By the time the movie ends, we will have been watching it for three hours.\"</em></li></ul>"
      }
    },
    {
      "blockId": "future-summary-chart-20",
      "type": "chart",
      "data": {
        "title": "Summary: Future Tenses",
        "headers": ["Structure", "Example Sentence", "Main Idea"],
        "rows": [
          ["'will'", "I <strong>will call</strong> you later.", "Spontaneous decision, prediction, or promise."],
          ["'be going to'", "She <strong>is going to start</strong> a new job.", "A plan made earlier or a prediction with evidence."],
          ["Future Continuous", "I <strong>will be relaxing</strong> on a beach.", "An action in progress at a future time."],
          ["Future Perfect", "They <strong>will have built</strong> the bridge by 2030.", "An action finished before a future time."]
        ]
      }
    },
    {
      "blockId": "future-tenses-quiz-21",
      "type": "quiz",
      "data": {
        "quizTitle": "Check Your Knowledge: Future Tenses",
        "questions": [
          {
            "question": "The phone is ringing. What do you say?",
            "answers": [
              "I'm going to get it.",
              "I'll get it.",
              "I get it.",
              "I will be getting it."
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Perfect! 'I'll get it' is a spontaneous decision made at the moment of speaking.",
            "messageForIncorrectAnswer": "Not quite. For a decision made at the moment of speaking, we use 'will'."
          }
        ]
      }
    },
    {
      "blockId": "final-practice-fill-blanks-22",
      "type": "fillInTheBlanks",
      "data": {
        "title": "Final Practice: Context is Key",
        "instructions": "Read the story and choose the verb that best fits the context.",
        "sentences": [
          {
            "text": "Yesterday was a strange day. I {blank} home from work when I saw a bright light in the sky.",
            "options": ["walked", "was walking"],
            "correctAnswer": "was walking"
          },
          {
            "text": "I stopped and stared. I {blank} anything like it before in my entire life.",
            "options": ["never saw", "had never seen"],
            "correctAnswer": "had never seen"
          },
          {
            "text": "While I {blank} there, my phone rang.",
            "options": ["stood", "was standing"],
            "correctAnswer": "was standing"
          },
          {
            "text": "By next week, I think everyone {blank} all about it.",
            "options": ["will forget", "will have forgotten"],
            "correctAnswer": "will have forgotten"
          }
        ]
      }
    },
    {
      "blockId": "final-practice-quiz-23",
      "type": "quiz",
      "data": {
        "quizTitle": "Final Practice: Sentence Transformation",
        "questions": [
          {
            "question": "Original: 'She cooked dinner. The guests arrived.' How can you combine these to show she finished cooking *before* the guests arrived?",
            "answers": [
              "She was cooking when the guests arrived.",
              "She cooked when the guests arrived.",
              "She had cooked dinner by the time the guests arrived.",
              "She has been cooking dinner."
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Excellent! Using the Past Perfect ('had cooked') correctly shows the sequence of events.",
            "messageForIncorrectAnswer": "The Past Perfect ('had cooked') is the best choice to show that one action was completed before another past action."
          },
          {
            "question": "Original: 'He will finish the report.' How do you rewrite this to show he will finish it *before* his boss arrives tomorrow?",
            "answers": [
              "He will be finishing the report when his boss arrives.",
              "He will have finished the report by the time his boss arrives.",
              "He is going to finish the report when his boss arrives.",
              "He finishes the report."
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "That's right! The Future Perfect ('will have finished') is used for an action that will be completed before another future point.",
            "messageForIncorrectAnswer": "To show an action will be completed before a future deadline, use the Future Perfect ('will have finished')."
          }
        ]
      }
    }
  ]
};
