// src/data/phrasalVerbData.js
export const phrasalVerbData = {
  lessonId: "phrasal-verbs-interactive-01",
  title: "Guide to Using Common Phrasal Verbs",
  subtitle: "Learn common phrasal verbs for everyday and professional communication.",
  content: [
    {
      blockId: "intro-what-are-phrasal-verbs",
      type: "text",
      data: {
        "htmlContent": "<h2>What is a Phrasal Verb?</h2><p>A <strong>phrasal verb</strong> combines a verb with a preposition or an adverb to create a new meaning that is often different from the original verb. For example, 'look' means to use your eyes, but <strong>'look up'</strong> can mean to search for information. The key is to learn the phrasal verb as a completely new piece of vocabulary.</p>"
      }
    },
    {
      blockId: "intro-examples-chart",
      type: "chart",
      data: {
        title: "How Meaning Changes",
        headers: ["Base Verb", "Meaning", "Phrasal Verb", "New Meaning"],
        rows: [
          ["Give", "To offer something", "Give up", "To quit"],
          ["Turn", "To rotate", "Turn down", "To refuse"],
          ["Break", "To separate into pieces", "Break down", "To stop working"]
        ]
      },
      accessibility: {
        altText: "A chart comparing the meaning of base verbs to their corresponding phrasal verbs.",
        longDescription: "The chart shows three examples of how a verb's meaning changes with a particle. 'Give' (to offer) becomes 'Give up' (to quit). 'Turn' (to rotate) becomes 'Turn down' (to refuse). 'Break' (to separate) becomes 'Break down' (to stop working).",
        dataTable: {
          headers: ["Base Verb", "Phrasal Verb", "Change in Meaning"],
          rows: [
            ["Give", "Give up", "The meaning changes from offering to quitting."],
            ["Turn", "Turn down", "The meaning changes from rotating to refusing."],
            ["Break", "Break down", "The meaning changes from separating to malfunctioning."]
          ]
        }
      }
    },
    {
      blockId: "workplace-phrasal-verbs-chart",
      type: "chart",
      data: {
        title: "Essential Phrasal Verbs for the Workplace",
        headers: ["Phrasal Verb", "Meaning", "Example"],
        rows: [
          ["Carry on", "To continue with a task", "Despite the interruption, the team decided to <strong>carry on</strong>."],
          ["Call off", "To cancel", "We had to <strong>call off</strong> the client dinner."],
          ["Deal with", "To handle a problem or person", "My role is to <strong>deal with</strong> customer complaints."],
          ["Fill in", "To complete a form / take someone's place", "Please <strong>fill in</strong> this application form."],
          ["Hand in", "To submit work", "The deadline to <strong>hand in</strong> the report is Friday."],
          ["Hold on", "To wait", "Please <strong>hold on</strong> for a moment."],
          ["Put off", "To postpone or delay", "The manager decided to <strong>put off</strong> the decision."],
          ["Set up", "To arrange or organize", "Can you help me <strong>set up</strong> the conference room?"],
          ["Work out", "To solve a problem", "We need to <strong>work out</strong> the final details of the contract."]
        ]
      },
      accessibility: {
        altText: "A data chart of common phrasal verbs used in the workplace.",
        longDescription: "The chart lists nine phrasal verbs essential for professional communication. Each verb has its meaning and an example sentence. Verbs include 'Carry on' (continue), 'Call off' (cancel), 'Deal with' (handle), 'Fill in' (complete), 'Hand in' (submit), 'Hold on' (wait), 'Put off' (postpone), 'Set up' (arrange), and 'Work out' (solve).",
        dataTable: {
            headers: ["Phrasal Verb", "Meaning"],
            rows: [
              ["Carry on", "To continue"],
              ["Call off", "To cancel"],
              ["Deal with", "To handle"],
              ["Fill in", "To complete or substitute"],
              ["Hand in", "To submit"],
              ["Hold on", "To wait"],
              ["Put off", "To postpone"],
              ["Set up", "To arrange"],
              ["Work out", "To solve"]
            ]
        }
      }
    },
    {
      blockId: "workplace-fill-in-the-blanks",
      type: "fillInTheBlanks",
      data: {
        title: "Workplace Phrasal Verbs Practice",
        instructions: "Complete the sentences using a phrasal verb from the workplace list.",
        sentences: [
          { text: "If we don't have all the information, we should ________ the meeting until next week.", options: ["put off", "call off"], correctAnswer: "put off" },
          { text: "Could you please ________ this form with your name and contact details?", options: ["fill in", "hand in"], correctAnswer: "fill in" },
          { text: "I can't talk right now, can you ________ for a minute?", options: ["hold on", "carry on"], correctAnswer: "hold on" },
          { text: "The presentation was ________ due to a technical issue.", options: ["called off", "put off"], correctAnswer: "called off" },
          { text: "We need to ________ a better system for tracking our progress.", options: ["work out", "set up"], correctAnswer: "work out" }
        ]
      }
    },
    {
      blockId: "workplace-quiz",
      type: "quiz",
      data: {
        quizTitle: "Workplace Phrasal Verbs Quiz",
        quizSynopsis: "Test your knowledge of the essential workplace phrasal verbs.",
        questions: [
          { question: "Which phrasal verb means 'to cancel'?", answers: ["Put off", "Call off", "Deal with"], correctAnswer: "2" },
          { question: "If you 'hand in' a report, what are you doing?", answers: ["Reading it", "Submitting it", "Throwing it away"], correctAnswer: "2" },
          { question: "What does 'set up' mean?", answers: ["To wait", "To solve", "To arrange or organize"], correctAnswer: "3" },
          { question: "Choose the phrasal verb that means 'to continue'.", answers: ["Carry on", "Hold on", "Work out"], correctAnswer: "1" }
        ]
      }
    },
    {
      blockId: "flashcard-put-off",
      type: "flashcard",
      data: { front: "<h3>Put off</h3>", back: "<p><strong>Meaning:</strong> To postpone or delay.</p><p><em>Example: \"The manager decided to <strong>put off</strong> the decision until the next meeting.\"</em></p>" }
    },
    {
      blockId: "flashcard-call-off",
      type: "flashcard",
      data: { front: "<h3>Call off</h3>", back: "<p><strong>Meaning:</strong> To cancel.</p><p><em>Example: \"We had to <strong>call off</strong> the client dinner.\"</em></p>" }
    },
    {
      blockId: "contextual-practice-text",
      type: "text",
      data: {
        htmlContent: "<h2>Contextual Practice Exercise</h2><p>For each scenario below, write a short dialogue (2-4 lines). Try to use at least three workplace phrasal verbs.</p><h4>Scenario: Planning a Meeting</h4><p><strong>Student A:</strong> You need to organize a project meeting. <strong>Student B:</strong> You have a busy schedule.</p><p><em>Example: \"Hi, I'm calling to <strong>set up</strong> a meeting. Are you free on Tuesday?\" / \"I'm not sure, can you <strong>hold on</strong>? Can we <strong>put it off</strong> until Wednesday?\"</em></p>"
      }
    },
    {
      blockId: "homework-assignment-text",
      type: "text",
      data: {
        htmlContent: "<h2>Homework Assignment</h2><p>Write a short story (150-200 words) about a challenging day at work. Your story must use at least <strong>10 different phrasal verbs</strong> from the reference guide in this lesson.</p><p>Bring your completed story to our next lesson for review.</p>"
      }
    }
  ]
};