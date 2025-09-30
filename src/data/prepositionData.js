/**
 * prepositionData.js
 * This file contains the complete, unabridged content for the "English Prepositions" lesson,
 * structured for use with ContentSelector and DetailCard components.
 */
export const prepositionData = {
    // --- NEW INTRODUCTION OBJECT ---
    introduction: {
        title: 'English Prepositions: Location, Time, and Movement',
        description: `Prepositions are small words that help us connect words in a sentence. They often tell us WHERE something is (Location), WHEN something happens (Time), or HOW something is done or in what DIRECTION (Movement/Manner). Think of them as little helper words that give us more details!<br><br>
        Prepositions are very important because they make our sentences clear and help people understand where things are, when things happen, or how things are connected. Without them, sentences can be very confusing!
        <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">Tips for Learning Prepositions</h3>
                <p style="margin-bottom: 1em;">Learning prepositions takes practice! Here are some tips: </p>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>Read a lot in English. Pay attention to how prepositions are used in sentences. </li>
                    <li>Listen to English. Notice the prepositions you hear in songs, movies, and conversations. </li>
                    <li>Practice using them. Try to make your own sentences with new prepositions you learn. </li>
                    <li>Especially practice the difference between "to" and "at" for places! </li>
                    <li>Think of prepositions in common phrases. For example, "on the table," "in the morning," "at school," "go to the park." </li>
                    <li>Don't worry about making mistakes! Everyone makes mistakes when learning. The most important thing is to keep trying. </li>
                </ul>
        `
    },
    // --- Section 1: Place Prepositions ---
    place: [
        {
            name: 'IN',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">IN (Location)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Inside something; surrounded by something. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>The cat is <strong>in</strong> the box. (The cat is located inside the box.) </li>
                    <li>My keys are <strong>in</strong> my bag. (The keys are located inside the bag.) </li>
                    <li>There is milk <strong>in</strong> the glass. </li>
                </ul>
            `
        },
        {
            name: 'ON',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">ON (Location)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Touching the surface of something; on top of something. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>The book is <strong>on</strong> the table. (The book is located on the surface of the table.) </li>
                    <li>The picture is <strong>on</strong> the wall. </li>
                    <li>I put my hat <strong>on</strong> my head. </li>
                </ul>
            `
        },
        {
            name: 'AT',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">AT (Location)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Shows a specific point, place, or location. When you use "at," you are already at that place; you are not moving towards it. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>I am <strong>at</strong> the bus stop. (I am located at the bus stop now.) </li>
                    <li>We will meet <strong>at</strong> the park entrance. (Our meeting location is at the entrance.) </li>
                    <li>She is waiting <strong>at</strong> the door. </li>
                    <li>They are <strong>at</strong> the stadium. (This means they are inside or at the location of the stadium, watching the game or present there.) </li>
                </ul>
            `
        },
        {
            name: 'UNDER',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">UNDER (Location)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Below something; beneath something. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>The dog is <strong>under</strong> the chair. (The dog is located below the chair.) </li>
                    <li>Your shoes are <strong>under</strong> the bed. </li>
                    <li>The ball rolled <strong>under</strong> the car. </li>
                </ul>
            `
        },
        {
            name: 'NEAR / CLOSE TO',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">NEAR / CLOSE TO (Location)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Not far away from something. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>The school is <strong>near</strong> my house. </li>
                    <li>I live <strong>close to</strong> the supermarket. </li>
                </ul>
            `
        },
        {
            name: 'BEHIND',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">BEHIND (Location)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> At the back of something or someone. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>The garden is <strong>behind</strong> the house. </li>
                    <li>He is hiding <strong>behind</strong> the tree. </li>
                </ul>
            `
        },
        {
            name: 'IN FRONT OF',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">IN FRONT OF (Location)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Directly before something or someone; at the front part of something. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>The car is parked <strong>in front of</strong> the building. </li>
                    <li>The teacher stands <strong>in front of</strong> the students. </li>
                </ul>
            `
        },
    ],

    // --- Section 2: Movement Prepositions ---
    movement: [
        {
            name: 'TO',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">TO (Movement)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Shows movement in a direction towards a place, person, or thing. When you use "to," you are going from one point and aiming to arrive at another. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>I walk <strong>to</strong> school every day. (This describes the movement from my home towards school.) </li>
                    <li>She is going <strong>to</strong> the store. (She is moving towards the store.) </li>
                    <li>Can you give this <strong>to</strong> him? </li>
                    <li>They are going <strong>to</strong> the stadium. (This means they are traveling towards the stadium; they are not there yet.) </li>
                </ul>
            `
        },
        {
            name: 'FROM',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">FROM (Movement/Origin)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Shows the starting point of movement or origin. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>I came <strong>from</strong> my house. </li>
                    <li>The gift is <strong>from</strong> my friend. </li>
                    <li>This train travels <strong>from</strong> London <strong>to</strong> Paris. (Here you see "from" for starting and "to" for destination.) </li>
                </ul>
            `
        },
        {
            name: 'INTO',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">INTO (Movement)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Shows movement from outside to inside something. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>He jumped <strong>into</strong> the pool. </li>
                    <li>Please put the toys <strong>into</strong> the box. </li>
                    <li>She walked <strong>into</strong> the room. </li>
                </ul>
            `
        },
        {
            name: 'OUT OF',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">OUT OF (Movement)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Shows movement from inside to outside something. </p>
                <strong style="font-size: 1.1em;">Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>She took the book <strong>out of</strong> her bag. </li>
                    <li>Get <strong>out of</strong> the car! </li>
                    <li>The cat jumped <strong>out of</strong> the window. </li>
                </ul>
            `
        }
    ],

    // --- Section 3: Time Prepositions ---
    time: [
        {
            name: 'IN (Time)',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">IN (Time)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Used for longer periods of time. </p>
                <strong style="font-size: 1.1em;">Usage:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>Months: My birthday is <strong>in</strong> July. </li>
                    <li>Years: I was born <strong>in</strong> 1995. </li>
                    <li>Seasons: We go to the beach <strong>in</strong> the summer. </li>
                    <li>Parts of the day: I drink coffee <strong>in</strong> the morning. She reads <strong>in</strong> the evening. </li>
                    <li>Decades/Centuries: Life was different <strong>in</strong> the 90s. </li>
                </ul>
                <strong style="font-size: 1.1em;">Other Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>School starts <strong>in</strong> September. </li>
                    <li>He will arrive <strong>in</strong> two hours. </li>
                </ul>
            `
        },
        {
            name: 'ON (Time)',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">ON (Time)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Used for specific days and dates. </p>
                <strong style="font-size: 1.1em;">Usage:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>Days of the week: We have a party <strong>on</strong> Saturday. </li>
                    <li>Specific dates: The meeting is <strong>on</strong> May 25th. </li>
                    <li>Holidays with "Day": We eat turkey <strong>on</strong> Thanksgiving Day. </li>
                </ul>
                <strong style="font-size: 1.1em;">Other Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>I have an English lesson <strong>on</strong> Monday. </li>
                    <li>My vacation starts <strong>on</strong> June 10th. </li>
                </ul>
            `
        },
        {
            name: 'AT (Time)',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">AT (Time)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning:</strong> Used for specific times of the day or for night. </p>
                <strong style="font-size: 1.1em;">Usage:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>Clock times: The movie starts <strong>at</strong> 7:00 PM. </li>
                    <li>Meal times: What do you want to eat <strong>at</strong> lunchtime? </li>
                    <li>Night: I go to bed <strong>at</strong> night. </li>
                    <li>Specific points in time: <strong>At</strong> that moment, the phone rang. </li>
                </ul>
                <strong style="font-size: 1.1em;">Other Examples:</strong>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>Let's meet <strong>at</strong> noon. </li>
                    <li>He wakes up <strong>at</strong> 6:30 AM. </li>
                </ul>
            `
        },
    ],

    // --- Section 4: Other Prepositions ---
    other: [
        {
            name: 'WITH',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">WITH (Manner/Companion)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning 1 (Companion):</strong> Together, accompanied by someone or something. </p>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>I go to the park <strong>with</strong> my friend. </li>
                </ul>
                <p style="margin-bottom: 1em;"><strong>Meaning 2 (Instrument):</strong> Using something (an instrument, tool, or object). </p>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>I write <strong>with</strong> a pen. She cut the paper <strong>with</strong> scissors. </li>
                </ul>
                <p style="margin-bottom: 1em;"><strong>Meaning 3 (Possession):</strong> Having or possessing something. </p>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>The girl <strong>with</strong> blue eyes is my sister. </li>
                </ul>
            `
        },
        {
            name: 'FOR',
            details: `
                <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">FOR (Purpose/Duration)</h3>
                <p style="margin-bottom: 1em;"><strong>Meaning 1 (Purpose/Recipient):</strong> Indicates purpose, reason, or the person/thing intended to receive something. </p>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>This gift is <strong>for</strong> you. I study English <strong>for</strong> my job. </li>
                </ul>
                <p style="margin-bottom: 1em;"><strong>Meaning 2 (Duration):</strong> Indicates a duration of time. </p>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>We waited <strong>for</strong> an hour. She lived there <strong>for</strong> ten years. </li>
                </ul>
                <p style="margin-bottom: 1em;"><strong>Meaning 3 (Support):</strong> In support of; in favor of. </p>
                <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                    <li>Are you <strong>for</strong> or against the new plan? </li>
                </ul>
            `
        },
    ],

    // --- Section 5: Comparison and Summary ---
    comparison: {
        name: 'TO vs. AT (Movement vs. Location)',
        title: 'Special Note: "To" (Movement) vs. "At" (Location) for Places',
        details: `
            <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">"TO" (Movement) vs. "AT" (Location)</h3>
            <p style="margin-bottom: 1em;">It's important to understand the difference between "to" and "at" when we talk about places. </p>
            <p>Use <strong>TO</strong> when you talk about MOVEMENT towards a place. </p>
            <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                <li><strong>Example:</strong> "I am going <strong>to</strong> the park." (This means I am moving, on my way to the park.) </li>
                <li><strong>Example:</strong> "She drives <strong>to</strong> work." (This is her action of moving towards work.) </li>
                <li><strong>Example:</strong> "Let's go <strong>to</strong> the stadium!" (This suggests we should start moving towards the stadium.) </li>
            </ul>
            <p style="margin-top: 1.5em;">Use <strong>AT</strong> when you talk about your LOCATION at a place (you are already there, not moving towards it). </p>
            <ul style="list-style-type: disc; list-style-position: inside; padding-left: 0; margin-top: 0.5em; display: grid; gap: 1em;">
                <li><strong>Example:</strong> "I am <strong>at</strong> the park." (This means I am currently in the park.) </li>
                <li><strong>Example:</strong> "She is <strong>at</strong> work." (This means she is currently in her workplace.) </li>
                <li><strong>Example:</strong> "We are <strong>at</strong> the stadium." (This means we have arrived and are now at the location of the stadium.) </li>
            </ul>
            <p style="margin-top: 1.5em; font-weight: bold;">Think of it like this:</p>
            <p style="font-size: 1.2em; margin-bottom: 0;"><strong>To = Arrow</strong> (---> shows direction) </p>
            <p style="font-size: 1.2em;"><strong>At = Dot</strong> (• shows a point or location) </p>
        `
    },

    // --- Section 6: Homework/Practice ---
    homework: [
        {
            topic: 'Place',
            title: 'Activity 1: Fill in the Blanks (Place)',
            details: `
                <p class="mb-4">Choose the best preposition for location ('at' or 'in' or 'on' or 'under' or 'near'). </p>
                <div class="homework-email">
                    <p>The apple is ______ the table.</p>
                    <p>My phone is ______ my pocket.</p>
                    <p>The cat sleeps ______ the bed.</p>
                    <p>We are waiting ______ the cinema entrance. (Are you moving or are you there?)</p>
                    <p>The park is ______ the school, just a five-minute walk.</p>
                    <p style="margin-top: 1.5em; font-style: italic; font-weight: bold;">(Answers: 1. on, 2. in, 3. under, 4. at, 5. near)</p>
                </div>
            `
        },
        {
            topic: 'Time',
            title: 'Activity 2: Fill in the Blanks (Time)',
            details: `
                <p class="mb-4">Choose the best preposition for time ('in', 'on', or 'at'). </p>
                <div class="homework-email">
                    <p>His birthday is ______ March.</p>
                    <p>The class starts ______ 9:00 AM.</p>
                    <p>I have an English lesson ______ Monday.</p>
                    <p>I usually watch TV ______ the evening.</p>
                    <p>The shop closes ______ midnight.</p>
                    <p style="margin-top: 1.5em; font-style: italic; font-weight: bold;">(Answers: 1. in, 2. at, 3. on, 4. in, 5. at)</p>
                </div>
            `
        },
        {
            topic: 'Movement',
            title: 'Activity 3: Choose the Correct Preposition (Movement vs. Location)',
            details: `
                <p class="mb-4">Focus on whether it's movement ('to') or location ('at'). </p>
                <div class="homework-email">
                    <p>Yesterday, I went (to / at) the library.</p>
                    <p>My friends are (to / at) the beach now.</p>
                    <p>Are you going (to / at) the supermarket later?</p>
                    <p>He is (to / at) home.</p>
                    <p>Let's walk (to / at) the new cafe.</p>
                    <p style="margin-top: 1.5em; font-style: italic; font-weight: bold;">(Answers: 1. to, 2. at, 3. to, 4. at, 5. to)</p>
                </div>
            `
        }
    ],

    // --- Quiz Content Blocks ---
    quizContent: [
        {
            blockId: "prepositions-place-quiz",
            type: "quiz",
            data: {
                quizTitle: "Place Prepositions Quiz",
                questions: [
                    {
                        question: "The apple is ______ the table.",
                        answers: ["on", "in", "at"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Correct! We use 'on' when something is touching the surface of something else.",
                        messageForIncorrectAnswer: "Not quite. 'On' is used when something is touching the surface of something else."
                    },
                    {
                        question: "My phone is ______ my pocket.",
                        answers: ["in", "on", "at"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Perfect! 'In' is used for something that is inside another thing.",
                        messageForIncorrectAnswer: "Not quite. 'In' is used when something is inside another thing."
                    },
                    {
                        question: "The cat sleeps ______ the bed.",
                        answers: ["under", "on", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Great! 'Under' means below or beneath something.",
                        messageForIncorrectAnswer: "Not quite. 'Under' means below or beneath something."
                    },
                    {
                        question: "We are waiting ______ the cinema entrance.",
                        answers: ["at", "to", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Excellent! 'At' is used for specific locations where you are already present.",
                        messageForIncorrectAnswer: "Not quite. 'At' is used for specific locations where you are already present."
                    },
                    {
                        question: "The park is ______ the school.",
                        answers: ["near", "to", "at"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Correct! 'Near' means close to or not far from something.",
                        messageForIncorrectAnswer: "Not quite. 'Near' means close to or not far from something."
                    }
                ]
            }
        },
        {
            blockId: "prepositions-time-quiz",
            type: "quiz",
            data: {
                quizTitle: "Time Prepositions Quiz",
                questions: [
                    {
                        question: "His birthday is ______ March.",
                        answers: ["in", "on", "at"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Perfect! We use 'in' for months.",
                        messageForIncorrectAnswer: "Not quite. 'In' is used for months like March."
                    },
                    {
                        question: "The class starts ______ 9:00 AM.",
                        answers: ["at", "on", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Great! 'At' is used for specific times like 9:00 AM.",
                        messageForIncorrectAnswer: "Not quite. 'At' is used for specific times like 9:00 AM."
                    },
                    {
                        question: "I have an English lesson ______ Monday.",
                        answers: ["on", "in", "at"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Excellent! 'On' is used for days of the week.",
                        messageForIncorrectAnswer: "Not quite. 'On' is used for days of the week like Monday."
                    },
                    {
                        question: "I usually watch TV ______ the evening.",
                        answers: ["in", "on", "at"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Correct! 'In' is used for parts of the day like evening.",
                        messageForIncorrectAnswer: "Not quite. 'In' is used for parts of the day like evening."
                    },
                    {
                        question: "The shop closes ______ midnight.",
                        answers: ["at", "in", "on"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Perfect! 'At' is used for specific times like midnight.",
                        messageForIncorrectAnswer: "Not quite. 'At' is used for specific times like midnight."
                    }
                ]
            }
        },
        {
            blockId: "prepositions-movement-quiz",
            type: "quiz",
            data: {
                quizTitle: "Movement vs Location Quiz",
                questions: [
                    {
                        question: "Yesterday, I went ______ the library.",
                        answers: ["to", "at", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Perfect! 'To' shows movement towards a place.",
                        messageForIncorrectAnswer: "Not quite. 'To' shows movement towards a place, while 'at' shows location."
                    },
                    {
                        question: "My friends are ______ the beach now.",
                        answers: ["at", "to", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Great! 'At' shows that they are already at the location.",
                        messageForIncorrectAnswer: "Not quite. 'At' shows location, while 'to' shows movement towards a place."
                    },
                    {
                        question: "Are you going ______ the supermarket later?",
                        answers: ["to", "at", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Excellent! 'To' shows movement towards the supermarket.",
                        messageForIncorrectAnswer: "Not quite. 'To' shows movement towards a place."
                    },
                    {
                        question: "He is ______ home.",
                        answers: ["at", "to", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Correct! 'At' shows he is already at the location.",
                        messageForIncorrectAnswer: "Not quite. 'At' shows location, while 'to' shows movement."
                    },
                    {
                        question: "Let's walk ______ the new cafe.",
                        answers: ["to", "at", "in"],
                        correctAnswer: "1",
                        messageForCorrectAnswer: "Perfect! 'To' shows movement towards the cafe.",
                        messageForIncorrectAnswer: "Not quite. 'To' shows movement towards a place."
                    }
                ]
            }
        }
    ]
};