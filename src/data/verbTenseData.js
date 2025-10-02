// src/data/verbTenseData.js
/**
 * @fileoverview Canonical JSON data for the English Verb Tenses lesson.
 * All content conforms to the schema defined in src/data/schema.js,
 * including a comprehensive interactive timeline visualization.
 */

export const verbTenseData = {
  "lessonId": "english-verb-tenses-complete-guide",
  "title": "Verb Tenses: The Grammar of Time",
  "subtitle": "Learn how to talk about the past, present, and future with clear visual guides.",
  "content": [
    // --- INTRODUCTORY CONTENT BLOCK ---
    {
      "blockId": "intro-what-are-tenses-01",
      "type": "text",
      "data": {
        "htmlContent": "<h2>What Are Verb Tenses?</h2><p>In English, verb tenses are tools that show <strong>when</strong> an action happens. Think of them like a time machine for your words! By changing the form of a verb, you can tell your listener if something happened yesterday (past), is happening right now (present), or will happen tomorrow (future). Understanding them helps you express your ideas clearly.</p>"
      }
    },
    
    // --- THE CORE INTERACTIVE TIMELINE VISUALIZATION ---
    {
      "blockId": "visualizing-tenses-timeline-02",
      "type": "timeline",
      "data": {
        "title": "The Full Spectrum: Visualizing All Tenses in Time",
        "description": "The line below represents all time, with 'Now' at the center (50%). Click any point or span to see its definition and key example. The boxes above the line are 'points' (simple and perfect tenses), and the boxes below the line are 'spans' (continuous tenses).",
        "timePoints": [
          // Simple Tenses (Points)
          { "id": "simple-past", "label": "Simple Past", "position": 20, "contentHtml": "<h3>Simple Past: Completed Action</h3><p>An action finished at a specific point in the past.</p><strong>Example:</strong> <em>I **walked** home.</em>" },
          { "id": "simple-present", "label": "Simple Present", "position": 50, "contentHtml": "<h3>Simple Present: Habit or Fact</h3><p>An action happening regularly, or a general truth.</p><strong>Example:</strong> <em>I **walk** every day.</em>" },
          { "id": "simple-future", "label": "Simple Future", "position": 80, "contentHtml": "<h3>Simple Future: Future Action</h3><p>An action that will happen in the future.</p><strong>Example:</strong> <em>I **will walk** tomorrow.</em>" },
          
          // Perfect Tenses (Points anchored to a later point)
          { "id": "past-perfect", "label": "Past Perfect", "position": 10, "contentHtml": "<h3>Past Perfect: Completed Before a Past Event</h3><p>An action that was finished *before* another past action.</p><strong>Example:</strong> <em>I **had walked** before it rained.</em>" },
          { "id": "present-perfect", "label": "Present Perfect", "position": 40, "contentHtml": "<h3>Present Perfect: Past to Now (No specific time)</h3><p>An action that started in the past and is either continuing or has an effect *now*.</p><strong>Example:</strong> <em>I **have walked** this path many times.</em>" },
          { "id": "future-perfect", "label": "Future Perfect", "position": 90, "contentHtml": "<h3>Future Perfect: Completed Before a Future Event</h3><p>An action that will be completed *before* a specific point in the future.</p><strong>Example:</strong> <em>I **will have walked** by noon.</em>" }
        ],
        "timeSpans": [
          // Continuous Tenses (Spans) - Represented below the timeline (style: wavy, default: solid)
          { "id": "past-continuous", "label": "Past Continuous", "startPosition": 25, "endPosition": 35, "style": "solid", "contentHtml": "<h3>Past Continuous: Ongoing Past Action</h3><p>An action that was interrupted or happening over a period in the past.</p><strong>Example:</strong> <em>I **was walking** when I saw him.</em>" },
          { "id": "present-continuous", "label": "Present Continuous", "startPosition": 45, "endPosition": 55, "style": "solid", "contentHtml": "<h3>Present Continuous: Action Happening Now</h3><p>An action taking place at the moment of speaking.</p><strong>Example:</strong> <em>I **am walking** right now.</em>" },
          { "id": "future-continuous", "label": "Future Continuous", "startPosition": 75, "endPosition": 85, "style": "solid", "contentHtml": "<h3>Future Continuous: Ongoing Future Action</h3><p>An action that will be happening over a period in the future.</p><strong>Example:</strong> <em>I **will be walking** at 5 PM.</em>" },

          // Perfect Continuous Tenses (Spans emphasizing duration)
          { "id": "past-perfect-continuous", "label": "Past Perfect Continuous", "startPosition": 5, "endPosition": 15, "style": "wavy", "contentHtml": "<h3>Past Perfect Continuous: Duration Before a Past Event</h3><p>An action that started and continued up to another point in the past.</p><strong>Example:</strong> <em>I **had been walking** for an hour when it rained.</em>" },
          { "id": "present-perfect-continuous", "label": "Present Perfect Continuous", "startPosition": 10, "endPosition": 50, "style": "wavy", "contentHtml": "<h3>Present Perfect Continuous: Duration from Past to Now</h3><p>An action that started in the past and is still continuing now, emphasizing the duration.</p><strong>Example:</strong> <em>I **have been walking** for two hours.</em>" },
          { "id": "future-perfect-continuous", "label": "Future Perfect Continuous", "startPosition": 60, "endPosition": 80, "style": "wavy", "contentHtml": "<h3>Future Perfect Continuous: Duration Up to a Future Event</h3><p>An action that will continue up to a specified time in the future.</p><strong>Example:</strong> <em>By 5 PM, I **will have been walking** for three hours.</em>" }
        ]
      },
      "accessibility": {
        "altText": "An interactive timeline illustrating the temporal meaning of all 12 English verb tenses.",
        "longDescription": "The timeline spans from the deep past to the far future, with 50% representing the present moment. Each tense is mapped to a specific position (point or span) on this continuum to visualize its usage. Points are for simple/perfect events; spans (lines) are for continuous actions.",
        "dataTable": {
          "headers": ["Tense", "Type", "Position/Duration", "Key Concept"],
          "rows": [
            ["Simple Past", "Point", "20%", "Finished action in the past."],
            ["Past Perfect", "Point", "10%", "Action completed before another past event."],
            ["Past Continuous", "Span", "25% to 35%", "Ongoing action in the past."],
            ["Past Perfect Continuous", "Span", "5% to 15%", "Duration leading up to a past event."],
            ["Simple Present", "Point", "50%", "Habits or universal facts."],
            ["Present Perfect", "Point", "40%", "Action with relevance to the present."],
            ["Present Continuous", "Span", "45% to 55%", "Action happening right now."],
            ["Present Perfect Continuous", "Span", "10% to 50%", "Duration starting in the past and continuing now."],
            ["Simple Future", "Point", "80%", "Action that will happen."],
            ["Future Perfect", "Point", "90%", "Action completed before a future event."],
            ["Future Continuous", "Span", "75% to 85%", "Ongoing action in the future."],
            ["Future Perfect Continuous", "Span", "60% to 80%", "Duration leading up to a future event."]
          ]
        }
      }
    },

    // --- TENSE DETAIL BLOCKS (CONTENT FOR TABS) ---
    {
      "blockId": "present-simple-tense-03",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Present Simple: Habits and Facts</h3><p>The Present Simple is used for things that happen repeatedly (habits) or things that are always true (facts).</p><ul><li><strong>Form:</strong> Base form (verb) or base form + <strong>-s/-es</strong> (for he/she/it)</li><li><strong>Keywords:</strong> always, often, usually, sometimes, never, every day, often.</li></ul><p><em>Example:</em> The sun **rises** in the East. / I **drink** coffee every morning.</p>"
      }
    },
    {
      "blockId": "present-continuous-tense-04",
      "type": "text",
      "data": {
        "htmlContent": "<h3>Present Continuous: Right Now</h3><p>This tense describes actions happening <strong>at the moment of speaking</strong> or temporary situations.</p><ul><li><strong>Form:</strong> <strong>am/is/are</strong> + verb + <strong>-ing</strong></li><li><strong>Keywords:</strong> now, right now, currently, at the moment.</li></ul><p><em>Example:</em> We **are studying** English tenses now. / She **is wearing** a blue dress today.</p>"
      }
    },
    // ... (Blocks 05 - 14 are detailed below for the old structure simulation)
    
    // --- PRACTICE QUIZ BLOCK ---
    {
      "blockId": "practice-quiz-tense-challenge-15",
      "type": "quiz",
      "data": {
        "title": "Tense Challenge: Apply Your Knowledge",
        "questions": [
          {
            "text": "Which tense is used for an action that was finished *before* another action in the past?",
            "answers": [
              "Past Continuous",
              "Past Perfect",
              "Simple Past",
              "Present Perfect"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Excellent! The Past Perfect ('had + V3') correctly shows the sequence of events.",
            "messageForIncorrectAnswer": "The Past Perfect is the right choice to show that one action was completed before another past action."
          },
          {
            "text": "Original: 'He will finish the report.' How do you rewrite this to show he will finish it *before* his boss arrives tomorrow?",
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
