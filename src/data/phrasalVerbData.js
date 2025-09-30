// src/data/phrasalVerbData.js
export const phrasalVerbData = {
  lessonId: "phrasal-verbs-interactive-01",
  title: "Phrasal Verbs",
  subtitle: "Learn common phrasal verbs for everyday and professional communication.",
  content: [
    {
      blockId: "intro-what-are-phrasal-verbs",
      type: "text",
      data: {
        "htmlContent": "<h2>What is a Phrasal Verb?</h2><p>A <strong>phrasal verb</strong> combines a verb with a preposition or an adverb to create a new meaning that is often different from the original verb. For example, <strong>'look'</strong> means to use your eyes, but <strong>'look up'</strong> can mean to search for information. The key is to learn the phrasal verb as a completely new piece of vocabulary. <br><br>Memorizing a long, random list of phrasal verbs is difficult and not very effective. A better strategy is to group them by a common topic to learn them in the context of everyday life and at work.</p>"
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
      blockId: "communication-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Communication</h3><p><strong>Ask for</strong> – To request.<br><em>Example: "He asked for a cup of coffee."</em><br><strong>Bring up</strong> – To mention.<br><em>Example: "She brought up an interesting point in the meeting."</em><br><strong>Call back</strong> – To return a phone call.<br><em>Example: "I'll call you back later."</em><br><strong>Call up</strong> – To call someone on the phone.<br><em>Example: "I'll call him up to confirm the meeting."</em><br><strong>Get in touch</strong> – To make contact.<br><em>Example: "I need to get in touch with her about the project."</em><br><strong>Look up</strong> – To search for information.<br><em>Example: "You can look up the meaning in the dictionary."</em><br><strong>Point out</strong> – To indicate or show.<br><em>Example: "She pointed out a mistake in the report."</em><br><strong>Talk about</strong> – To discuss.<br><em>Example: "They talked about their plans for the summer."</em><br><strong>Talk over</strong> – To discuss in detail.<br><em>Example: "We need to talk over the details before making a decision."</em><br><strong>Write down</strong> – To record in writing.<br><em>Example: "Please write down your name on the form."</em></p>`
      }
    },
    {
      blockId: "socializing-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Socializing & Relationships</h3><p><strong>Back up</strong> – To support.<br><em>Example: "She backed up her friend during the argument."</em><br><strong>Break up</strong> – To end a relationship.<br><em>Example: "They decided to break up after five years together."</em><br><strong>Drop by</strong> – To visit briefly.<br><em>Example: "I'll drop by your house later."</em><br><strong>Fall out</strong> – To have an argument and stop being friends.<br><em>Example: "They fell out over a trivial issue."</em><br><strong>Get along</strong> – To have a good relationship.<br><em>Example: "They get along really well with each other."</em><br><strong>Hang out</strong> – To spend time relaxing.<br><em>Example: "We're going to hang out at the mall."</em><br><strong>Look after</strong> – To take care of.<br><em>Example: "She looks after her younger brother."</em><br><strong>Run into</strong> – To meet by chance.<br><em>Example: "I ran into an old friend at the supermarket."</em><br><strong>Take after</strong> – To resemble a family member.<br><em>Example: "He takes after his father in his personality."</em><br><strong>Show up</strong> – To arrive.<br><em>Example: "He didn't show up for the meeting."</em><br><strong>Turn up</strong> – To arrive or appear unexpectedly.<br><em>Example: "She turned up late for the meeting."</em></p>`
      }
    },
    {
      blockId: "business-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Work & Business</h3><p><strong>Bring in</strong> – To introduce.<br><em>Example: "They brought in a new manager to improve the team."</em><br><strong>Call off</strong> – To cancel.<br><em>Example: "The meeting was called off due to bad weather."</em><br><strong>Deal with</strong> – To handle.<br><em>Example: "She deals with customer complaints every day."</em><br><strong>Fill in</strong> – To complete a form.<br><em>Example: "Please fill in this form."</em><br><strong>Go over</strong> – To review.<br><em>Example: "Let's go over the report before submitting it."</em><br><strong>Hand in</strong> – To submit.<br><em>Example: "She handed in her resignation yesterday."</em><br><strong>Lay off</strong> – To dismiss from a job.<br><em>Example: "The company had to lay off several employees."</em><br><strong>Set up</strong> – To arrange or establish.<br><em>Example: "We need to set up the equipment before the presentation."</em><br><strong>Shut down</strong> – To close or stop operating.<br><em>Example: "The company shut down its operations in the region."</em><br><strong>Take over</strong> – To take control.<br><em>Example: "He will take over the project next month."</em><br><strong>Turn in</strong> – To submit.<br><em>Example: "Don't forget to turn in your homework tomorrow."</em></p>`
      }
    },
    {
      blockId: "travel-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Travel & Movement</h3><p><strong>Check out</strong> – To leave a hotel.<br><em>Example: "We need to check out of the hotel by noon."</em><br><strong>Come back</strong> – To return.<br><em>Example: "She came back from vacation yesterday."</em><br><strong>Drop off</strong> – To take someone or something to a place.<br><em>Example: "Can you drop me off at the station?"</em><br><strong>Get away</strong> – To escape.<br><em>Example: "The thief managed to get away from the police."</em><br><strong>Get back</strong> – To return.<br><em>Example: "I'll get back to you soon."</em><br><strong>Get in</strong> – To enter.<br><em>Example: "She got in the car and drove away."</em><br><strong>Go away</strong> – To leave.<br><em>Example: "The pain won't go away."</em><br><strong>Pick up</strong> – To collect someone or something.<br><em>Example: "I'll pick you up at 7 p.m."</em><br><strong>Set off</strong> – To start a journey.<br><em>Example: "They set off on their road trip early this morning."</em><br><strong>Take off</strong> – To leave the ground (airplane).<br><em>Example: "The plane took off on time."</em><br><strong>Turn around</strong> – To change direction.<br><em>Example: "Turn around and look at this beautiful view."</em></p>`
      }
    },
    {
      blockId: "action-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Starting, Stopping & Continuing</h3><p><strong>Bring about</strong> – To cause.<br><em>Example: "The new policy brought about significant changes."</em><br><strong>Carry on</strong> – To continue.<br><em>Example: "Despite the challenges, he carried on with his project."</em><br><strong>Cut off</strong> – To interrupt or stop.<br><em>Example: "The phone call was cut off suddenly."</em><br><strong>Give up</strong> – To quit.<br><em>Example: "She gave up smoking last year."</em><br><strong>Go ahead</strong> – To proceed or start.<br><em>Example: "You can go ahead and start without me."</em><br><strong>Go on</strong> – To continue.<br><em>Example: "Please go on with your story."</em><br><strong>Hold on</strong> – To wait.<br><em>Example: "Hold on a minute; I'll be right back."</em><br><strong>Hold up</strong> – To delay.<br><em>Example: "The traffic held us up for over an hour."</em><br><strong>Keep on</strong> – To continue.<br><em>Example: "He kept on talking even after the meeting ended."</em><br><strong>Move on</strong> – To proceed to the next thing.<br><em>Example: "It's time to move on after the breakup."</em><br><strong>Put off</strong> – To postpone or delay.<br><em>Example: "They decided to put off the meeting until tomorrow."</em><br><strong>Stick to</strong> – To adhere to a plan or rule.<br><em>Example: "It's important to stick to your budget."</em><br><strong>Take up</strong> – To start a new activity or hobby.<br><em>Example: "She decided to take up yoga."</em></p>`
      }
    },
    {
      blockId: "thinking-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Thinking & Discovery</h3><p><strong>Check out</strong> – To investigate.<br><em>Example: "We need to check out the strange noise."</em><br><strong>Come across</strong> – To find by chance.<br><em>Example: "I came across my old photos while cleaning."</em><br><strong>Come up with</strong> – To suggest or create an idea.<br><em>Example: "We need to come up with a new plan."</em><br><strong>Figure out</strong> – To understand or solve.<br><em>Example: "I finally figured out how to use this software."</em><br><strong>Find out</strong> – To discover information.<br><em>Example: "I found out that she's moving to another city."</em><br><strong>Look into</strong> – To investigate.<br><em>Example: "The police are looking into the matter."</em><br><strong>Make out</strong> – To distinguish or see with difficulty.<br><em>Example: "I can't make out what he's saying."</em><br><strong>Make up</strong> – To invent.<br><em>Example: "He made up an excuse for being late."</em><br><strong>Work out</strong> – To solve.<br><em>Example: "We need to work out a solution to this problem."</em></p>`
      }
    },
    {
      blockId: "problems-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Conflict & Problems</h3><p><strong>Blow up</strong> – To explode.<br><em>Example: "The bomb blew up in the middle of the street."</em><br><strong>Break down</strong> – To stop working.<br><em>Example: "My car broke down on the way home."</em><br><strong>Fall apart</strong> – To break into pieces.<br><em>Example: "Their relationship fell apart after the argument."</em><br><strong>Give in</strong> – To surrender.<br><em>Example: "After much debate, he finally gave in."</em><br><strong>Let down</strong> – To disappoint.<br><em>Example: "I'm sorry to let you down, but I can't come."</em><br><strong>Put up with</strong> – To tolerate.<br><em>Example: "I can't put up with his rude behavior anymore."</em><br><strong>Run over</strong> – To hit with a vehicle.<br><em>Example: "He was run over by a car on his way to work."</em><br><strong>Turn down</strong> – To refuse.<br><em>Example: "He turned down the job offer."</em></p>`
      }
    },
    {
      blockId: "daily-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Daily Life, Health & Appearance</h3><p><strong>Dress up</strong> – To wear formal clothes.<br><em>Example: "You don't need to dress up for the party."</em><br><strong>Grow up</strong> – To become an adult.<br><em>Example: "I grew up in a small town."</em><br><strong>Pass away</strong> – To die.<br><em>Example: "His grandfather passed away last year."</em><br><strong>Put on</strong> – To wear clothes; to turn on an appliance.<br><em>Example: "He put on his jacket and left."</em><br><strong>Sit down</strong> – To take a seat.<br><em>Example: "Please sit down and wait for your turn."</em><br><strong>Stand up</strong> – To rise to one's feet.<br><em>Example: "Everyone stood up when the teacher entered the room."</em><br><strong>Take off</strong> – To remove clothes.<br><em>Example: "He took off his wet shoes."</em><br><strong>Throw up</strong> – To vomit.<br><em>Example: "He felt so sick that he had to throw up."</em><br><strong>Turn off</strong> – To deactivate a device.<br><em>Example: "Can you turn off the lights when you leave?"</em><br><strong>Turn on</strong> – To activate a device.<br><em>Example: "Turn on the heater; it's getting cold."</em><br><strong>Wake up</strong> – To stop sleeping.<br><em>Example: "I wake up at 7 a.m. every day."</em><br><strong>Warm up</strong> – To prepare for physical activity.<br><em>Example: "She warmed up before the race."</em><br><strong>Work out</strong> – To exercise.<br><em>Example: "I work out at the gym every morning."</em></p>`
      }
    },
    {
      blockId: "finance-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Finance & Possessions</h3><p><strong>Cut back</strong> – To reduce.<br><em>Example: "We need to cut back on spending."</em><br><strong>Cut down</strong> – To reduce.<br><em>Example: "He needs to cut down on sugar."</em><br><strong>Do without</strong> – To live without something.<br><em>Example: "I can't do without my morning coffee."</em><br><strong>Get by</strong> – To manage with what you have.<br><em>Example: "He can get by with just a little money."</em><br><strong>Give away</strong> – To donate or give for free.<br><em>Example: "They gave away their old clothes to charity."</em><br><strong>Pay back</strong> – To repay money.<br><em>Example: "I'll pay you back as soon as I get my salary."</em><br><strong>Put away</strong> – To store something in its proper place.<br><em>Example: "Please put away your toys after playing."</em><br><strong>Run out of</strong> – To have no more of something.<br><em>Example: "We ran out of milk; I'll go buy more."</em><br><strong>Throw away</strong> – To discard.<br><em>Example: "Don't throw away your old clothes; donate them."</em></p>`
      }
    },
    {
      blockId: "general-vocab",
      type: "text",
      data: {
        htmlContent: `<h3>Progress & General Situations</h3><p><strong>Catch up</strong> – To reach someone's level.<br><em>Example: "She worked hard to catch up with the rest of the team."</em><br><strong>Come out</strong> – To be released or appear.<br><em>Example: "Her new book comes out next month."</em><br><strong>End up</strong> – To eventually be in a place or situation.<br><em>Example: "He ended up going to the party alone."</em><br><strong>Get over</strong> – To recover from something.<br><em>Example: "It took him months to get over the breakup."</em><br><strong>Keep up with</strong> – To stay at the same level as someone or something.<br><em>Example: "It's hard to keep up with all the changes."</em><br><strong>Show off</strong> – To boast or display proudly.<br><em>Example: "He loves to show off his new car."</em></p>`
      }
    },
    {
      blockId: "assessment-gap-fill",
      type: "fillInTheBlanks",
      data: {
        title: "Phrasal Verbs Gap Fill",
        instructions: "Select the correct phrasal verb from the multiple choice options below.",
        sentences: [
          {
            text: "If we don't have all the information, we should ________ the meeting until next week.",
            options: ["put off", "call off", "work out"],
            correctAnswer: "put off"
          },
          {
            text: "Could you please ________ your name and address on this line?",
            options: ["write down", "bring up", "talk over"],
            correctAnswer: "write down"
          },
          {
            text: "I need to ________ with my old manager to see if he can give me a reference.",
            options: ["get in touch", "call back", "ask for"],
            correctAnswer: "get in touch"
          },
          {
            text: "I might ________ your house later to drop off the book you wanted.",
            options: ["drop by", "hang out", "show up"],
            correctAnswer: "drop by"
          },
          {
            text: "It's always nice when old friends ________ unexpectedly at a party.",
            options: ["turn up", "break up", "fall out"],
            correctAnswer: "turn up"
          },
          {
            text: "Before we submit the proposal, let's ________ it one more time to check for errors.",
            options: ["go over", "take over", "bring in"],
            correctAnswer: "go over"
          },
          {
            text: "Due to the economic downturn, the company had to ________ several employees.",
            options: ["lay off", "shut down", "hand in"],
            correctAnswer: "lay off"
          },
          {
            text: "What time do we need to ________ for our road trip tomorrow morning?",
            options: ["set off", "get in", "drop off"],
            correctAnswer: "set off"
          },
          {
            text: "I'll ________ you ________ from the airport when you arrive.",
            options: ["pick up", "check out", "take off"],
            correctAnswer: "pick up"
          },
          {
            text: "I'm trying to learn guitar, so I'm going to ________ a class.",
            options: ["take up", "give up", "put off"],
            correctAnswer: "take up"
          },
          {
            text: "Despite the rain, we decided to ________ with our plan to go hiking.",
            options: ["carry on", "hold up", "cut off"],
            correctAnswer: "carry on"
          },
          {
            text: "It took me a while to ________ how to use the new software.",
            options: ["figure out", "make up", "look into"],
            correctAnswer: "figure out"
          },
          {
            text: "We need to ________ a new idea for the marketing campaign.",
            options: ["come up with", "find out", "check out"],
            correctAnswer: "come up with"
          },
          {
            text: "My car ________ on the highway this morning.",
            options: ["broke down", "blew up", "fell apart"],
            correctAnswer: "broke down"
          },
          {
            text: "I can't ________ his rude behavior any longer; I'm going to report him.",
            options: ["put up with", "let down", "give in"],
            correctAnswer: "put up with"
          },
          {
            text: "Could you please ________ the lights when you leave the room?",
            options: ["turn off", "put on", "take off"],
            correctAnswer: "turn off"
          },
          {
            text: "I like to ________ at the gym three times a week to stay healthy.",
            options: ["work out", "warm up", "dress up"],
            correctAnswer: "work out"
          },
          {
            text: "We've started to ________ coffee at home; I need to go to the store.",
            options: ["run out of", "cut back on", "get by"],
            correctAnswer: "run out of"
          },
          {
            text: "I need to ________ the money I borrowed from you last week.",
            options: ["pay back", "give away", "put away"],
            correctAnswer: "pay back"
          },
          {
            text: "It's hard to ________ all the new technology these days.",
            options: ["keep up with", "catch up", "get over"],
            correctAnswer: "keep up with"
          },
          {
            text: "Her new album will ________ next month.",
            options: ["come out", "end up", "show off"],
            correctAnswer: "come out"
          }
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