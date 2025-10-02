// src/data/culturalData.js
// Refactored to canonical schema: culturalData.content is a flat array of content blocks.
// All country data is preserved and expanded, and pedagogical explanations are added
// for student self-study.

// Comprehensive list of countries with cultural dimension scores (1-10 scale for visualization)
const countries = [
    // --- ORIGINAL COUNTRIES (Preserved) ---
    { name: 'Japan', contextScore: 10, timeScore: 1, authorityScore: 10,
        details: "<strong>Japan (High-Context):</strong> Meaning is conveyed through shared context, non-verbal cues (a long pause), and what is *not* said. Saying 'no' is avoided; disagreement is signaled with subtle phrases. **Time:** Highly Monochronic (rigid, appointments are sacred). **Authority:** High power distance; respect for hierarchy is paramount." },
    { name: 'S. Korea', contextScore: 9.5, timeScore: 2, authorityScore: 9.5,
        details: "<strong>S. Korea (High-Context):</strong> Communication is indirect to maintain harmony, heavily influenced by hierarchy. Direct contradiction of a superior is avoided. **Time:** Generally Monochronic, but flexible for relationships. **Authority:** High power distance." },
    { name: 'China', contextScore: 9, timeScore: 3, authorityScore: 9,
        details: "<strong>China (High-Context):</strong> Meaning is layered in meta-messages and depends on long-term relationships (**Guanxi**). Face-saving is crucial; avoid public criticism. **Time:** Mix of Monochronic (manufacturing) and Polychronic (relationships). **Authority:** High power distance." },
    { name: 'France', contextScore: 7, timeScore: 4, authorityScore: 8,
        details: "<strong>France (Mid-High Context):</strong> Logic and eloquence are valued, but communication often relies on a shared cultural background. **Time:** Moderately Polychronic. Interrupting is common. **Authority:** Centralized authority. Status is very important." },
    { name: 'U.S.A.', contextScore: 3, timeScore: 7, authorityScore: 3,
        details: "<strong>U.S.A. (Low-Context):</strong> Communication is direct, explicit, and factual. 'Say what you mean' is the rule. Silence is uncomfortable. **Time:** Highly Monochronic (time is money). **Authority:** Low power distance; managers are approachable, and ideas are valued over age/title." },
    { name: 'Germany', contextScore: 2, timeScore: 10, authorityScore: 6,
        details: "<strong>Germany (Very Low-Context):</strong> Precision, facts, and literal truth are paramount. Communication is task-focused and direct. **Time:** Extreme Monochronic. Punctuality is a deep sign of respect. **Authority:** Moderate power distance; expertise trumps age." },
    { name: 'Australia', contextScore: 3.5, timeScore: 6, authorityScore: 2,
        details: "<strong>Australia (Low-Context):</strong> Direct and often informal communication. Humor is common, but clarity is prioritized. **Time:** Monochronic with some flexibility. **Authority:** Very low power distance; highly egalitarian and merit-based." },
    { name: 'U.K.', contextScore: 6, timeScore: 6.5, authorityScore: 5,
        details: "<strong>U.K. (Mid-Low Context):</strong> Direct, but softened with politeness and understatement (e.g., 'Not bad' can mean 'Excellent'). **Time:** Moderately Monochronic. Punctuality is valued. **Authority:** Moderate power distance; hierarchy is present but subtle." },
    { name: 'Mexico', contextScore: 8, timeScore: 3.5, authorityScore: 8.5,
        details: "<strong>Mexico (High-Context):</strong> Relationships are the foundation of business. Communication is polite, formal, and relies on tone and non-verbal cues. **Time:** Polychronic. Flexibility is high; relationships take precedence over schedules. **Authority:** High power distance; respect for the boss is absolute." },
    { name: 'Brazil', contextScore: 7.5, timeScore: 4, authorityScore: 7.5,
        details: "<strong>Brazil (Mid-High Context):</strong> Direct communication is used with close colleagues, but formal politeness is needed with outsiders. **Time:** Polychronic. Schedules are flexible; meetings can run over. **Authority:** High power distance; decisions are centralized." },
    { name: 'India', contextScore: 8.5, timeScore: 4.5, authorityScore: 9,
        details: "<strong>India (High-Context):</strong> Hierarchy and relationships dominate communication. Meaning is often indirect and embedded in social cues. **Time:** Polychronic. Flexibility and patience are required in scheduling. **Authority:** Very high power distance; deference to elders and superiors is critical." },
    { name: 'Russia', contextScore: 7, timeScore: 5, authorityScore: 9.5,
        details: "<strong>Russia (Mid-High Context):</strong> Communication can seem brutally direct on task-related issues, but personal trust (which takes time) is essential for business success. **Time:** Semi-Polychronic. Punctuality may be relaxed, but relationships are long-term. **Authority:** High power distance; decisions flow from the top down." },

    // --- NEW EXPANDED COUNTRIES ---
    { name: 'Belgium', contextScore: 5, timeScore: 7, authorityScore: 4,
        details: "<strong>Belgium (Low-Context):</strong> Communication is straightforward and factual, similar to its neighbors, Germany and the Netherlands. Efficiency and clear agendas are appreciated. **Time:** Monochronic. Punctuality is standard business practice. **Authority:** Moderate power distance." },
    { name: 'Ecuador', contextScore: 8, timeScore: 3, authorityScore: 8,
        details: "<strong>Ecuador (High-Context):</strong> Strongly relationship-focused (similar to Mexico/Colombia). Communication is polite and formal. Trust must be established before business. **Time:** Polychronic. Schedules are highly flexible. **Authority:** High power distance." },
    { name: 'Thailand', contextScore: 9, timeScore: 2, authorityScore: 9,
        details: "<strong>Thailand (High-Context):</strong> Maintaining 'saving face' (**kreng jai**) is central. Communication is extremely indirect to avoid causing embarrassment or conflict. **Time:** Polychronic. Flexibility is expected. **Authority:** High power distance; deep respect for hierarchy and age." },
    { name: 'Poland', contextScore: 4, timeScore: 8, authorityScore: 5,
        details: "<strong>Poland (Low-Context):</strong> Communication is direct, specific, and task-oriented. Polish culture values frankness and efficiency in professional settings. **Time:** Monochronic. Punctuality is important for meetings and deadlines. **Authority:** Moderate power distance." },
    { name: 'Colombia', contextScore: 8.5, timeScore: 2.5, authorityScore: 8,
        // STUDENT NOTE INTEGRATED: Time/Lateness/Gifts/Apology Culture
        details: "<strong>Colombia (High-Context):</strong> Business is built on trust and personal relationships. Communication is formal and highly polite; frequent use of apologies is common as a sign of respect. **Time:** Highly Polychronic. Public transportation is a commonly accepted excuse for lateness. **Authority:** High power distance. *Student Note: Giving small, thoughtful gifts is common in first meetings.*" },
    { name: 'Panama', contextScore: 7, timeScore: 3, authorityScore: 7,
        details: "<strong>Panama (Mid-High Context):</strong> Communication balances directness with a need for rapport. Personal connections accelerate business. **Time:** Polychronic. Flexibility is the rule; expect meetings to start late. **Authority:** Moderate to high power distance." },
    { name: 'Chile', contextScore: 7.5, timeScore: 5, authorityScore: 6,
        details: "<strong>Chile (Mid-Context):</strong> Slightly lower context than most Latin American neighbors, but still values personal relationships greatly. Communication is formal and professional. **Time:** Mix of Monochronic and Polychronic. Respect for deadlines is rising. **Authority:** Moderate power distance." },
    { name: 'Peru', contextScore: 8, timeScore: 3, authorityScore: 7.5,
        details: "<strong>Peru (High-Context):</strong> Relationship-focused. Hierarchy is strongly respected. Communication is indirect, aiming to maintain harmony. **Time:** Polychronic. Flexibility in scheduling is necessary. **Authority:** High power distance." },
    { name: 'Italy', contextScore: 7, timeScore: 4, authorityScore: 5.5,
        details: "<strong>Italy (Mid-High Context):</strong> Communication is often passionate and expressive. Relationships are critical. **Time:** Polychronic. Interrupting is common and seen as participation. **Authority:** Moderate power distance; respect for the family/company owner is high." },
    { name: 'Spain', contextScore: 6.5, timeScore: 5, authorityScore: 5,
        details: "<strong>Spain (Mid-Context):</strong> Communication can be direct on business facts but wrapped in social pleasantries. Relationship-building is key. **Time:** Polychronic. Schedules are often flexible. **Authority:** Moderate power distance." },
    { name: 'Indonesia', contextScore: 9.5, timeScore: 1, authorityScore: 9,
        details: "<strong>Indonesia (Very High-Context):</strong> Heavily influenced by hierarchy and 'saving face.' Communication is extremely indirect to avoid confrontation or disrespect. **Time:** Highly Polychronic. Patience is a virtue in business. **Authority:** Very high power distance." },
    { name: 'Vietnam', contextScore: 9, timeScore: 2, authorityScore: 8.5,
        details: "<strong>Vietnam (High-Context):</strong> Consensus and harmony are prioritized. Communication is highly indirect, especially when dealing with seniority. **Time:** Polychronic. Schedules are suggestions rather than strict rules. **Authority:** High power distance." },
    { name: 'Argentina', contextScore: 8, timeScore: 3, authorityScore: 7.5,
        details: "<strong>Argentina (High-Context):</strong> Highly formal, relationship-based culture. Communication is expressive and often passionate. **Time:** Polychronic. Punctuality can be relaxed in social and lower-level business settings. **Authority:** High power distance." },
    { name: 'Morocco', contextScore: 9, timeScore: 2, authorityScore: 8,
        details: "<strong>Morocco (Very High-Context):</strong> Strongly relationship-based. Communication relies heavily on implicit meaning, non-verbal cues, and maintaining honor. **Time:** Polychronic. Schedules are highly flexible. **Authority:** High power distance." },
    { name: 'UAE', contextScore: 7, timeScore: 5, authorityScore: 7,
        details: "<strong>UAE (Mid-to-High Context):</strong> Business is a mix. Formal, written contracts are used (Low-Context), but relationship and trust must be established first (High-Context). **Time:** Generally Monochronic for official matters, Polychronic for internal relationships. **Authority:** High power distance. *Student Note: Men and women often do not shake hands in traditional settings.*" },
    { name: 'Iran', contextScore: 9, timeScore: 3, authorityScore: 9,
        // STUDENT NOTE INTEGRATED: Saving face/Confidence/Handshakes
        details: "<strong>Iran (High-Context):</strong> Saving face and demonstrating competence is essential. Communication is formal and highly relationship-driven (**Taarof**). Handshakes finalize a deal based on mutual respect and reputation. **Time:** Polychronic. Flexibility is expected. **Authority:** High power distance. *Student Note: Confidence is crucial; men and women do not shake hands in conservative settings.*" },
    { name: 'Dubai', contextScore: 6, timeScore: 6, authorityScore: 6,
        details: "<strong>Dubai (Mid-Context - Westernized Hub):</strong> As a global business hub, communication is more direct and rule-based than traditional Gulf nations. Contracts are essential. **Time:** Predominantly Monochronic due to the international business environment. **Authority:** Moderate power distance compared to the rest of the region." }
];

// --- Helper Functions to generate standardized data blocks ---

// 1. Cultural Dimensions Data Generator (Data source for the bar charts)
const generateCulturalDimensionData = (dimension) => {
    let title;
    let minValueLabel;
    let maxValueLabel;
    let descriptionHtml;

    // Set labels and descriptions based on the dimension
    switch (dimension) {
        case 'contextScore':
            title = "Communication Context Spectrum";
            minValueLabel = "Low Context (Direct, Explicit)";
            maxValueLabel = "High Context (Indirect, Relational)";
            descriptionHtml = `
                <h2>Understanding High vs. Low Context Communication</h2>
                <p><strong>Context</strong> refers to how much a speaker relies on explicit verbal cues versus shared cultural knowledge or non-verbal signals to convey a message. Understanding where a country falls on this spectrum is critical for effective communication:</p>
                <ul>
                    <li><strong>Low-Context (e.g., Germany, USA):</strong> Communication is direct, explicit, and literal. The message is in the words themselves. **Goal:** Clarity and efficiency.</li>
                    <li><strong>High-Context (e.g., Japan, China):</strong> Communication is indirect, relational, and nuanced. The speaker relies on history, tone, and shared understanding. Saying 'no' directly is avoided. **Goal:** Harmony and saving face.</li>
                </ul>
                <p class="mt-4"><strong>Assignment Note:</strong> When viewing the chart, you can **hover over any bar** to see the score and country name, and if the chart component is interactive, clicking on a bar's tooltip may reveal more detail. Use the scores to determine if you need to be very explicit (Low Score) or pay attention to what is *not* said (High Score).</p>
            `;
            break;
        case 'timeScore':
            title = "Time Perception Spectrum";
            minValueLabel = "Polychronic (Flexible, Relationship-focused)";
            maxValueLabel = "Monochronic (Linear, Punctuality-focused)";
            descriptionHtml = `
                <h2>Understanding Time Perception (Monochronic vs. Polychronic)</h2>
                <p>How a culture views time impacts planning, meetings, and deadlines:</p>
                <ul>
                    <li><strong>Monochronic (M-Time) - (e.g., Germany, USA):</strong> Time is linear, scheduled, and segmented. Punctuality is critical; interrupting a meeting is rude. **Focus:** Finishing one task before starting the next.</li>
                    <li><strong>Polychronic (P-Time) - (e.g., Colombia, Brazil):</strong> Time is flexible, simultaneous, and circular. Relationships and immediate needs take precedence over schedules. **Focus:** Maintaining relationships, handling many things at once.</li>
                </ul>
                <p class="mt-4">The higher the Monochronic score (closer to 10), the more important punctuality and rigid scheduling are.</p>
            `;
            break;
        case 'authorityScore':
            title = "Authority / Power Distance Spectrum";
            minValueLabel = "Low Power Distance (Egalitarian, Flat)";
            maxValueLabel = "High Power Distance (Hierarchical, Respect for Rank)";
            descriptionHtml = `
                <h2>Understanding Authority (Power Distance)</h2>
                <p>This dimension measures how a culture accepts and expects power to be distributed unequally in society and organizations. It dictates the formality of titles and communication with management:</p>
                <ul>
                    <li><strong>Low Power Distance (e.g., U.S.A., Australia):</strong> Egalitarian culture. Managers are accessible, titles are used lightly, and ideas are judged on merit, not seniority. Hierarchy is for convenience.</li>
                    <li><strong>High Power Distance (e.g., Japan, China):</strong> Hierarchical culture. Decisions come from the top; subordinates show great respect and deference to superiors. Status and age are critical factors.</li>
                </ul>
                <p class="mt-4">The higher the score, the more respectful and formal your communication should be when addressing a senior manager or client.</p>
            `;
            break;
        default:
            return null;
    }

    // Map countries to the bar chart data format
    const chartData = countries.map(country => ({
        country: country.name,
        score: country[dimension]
    }));

    // Generate accessibility data
    const tableRows = countries.map(c => [c.name, c[dimension]]);

    return {
        blockId: `cultural-chart-${dimension.replace('Score', '').toLowerCase()}`,
        type: 'chart',
        data: {
            title: title,
            chartType: 'bar', // Assuming ChartSection renders a bar chart
            data: chartData,
            xAxisLabel: minValueLabel,
            yAxisLabel: maxValueLabel,
            descriptionHtml: descriptionHtml
        },
        accessibility: {
            altText: `A bar chart displaying the ${title} scores for various countries.`,
            longDescription: `The chart visualizes the spectrum from ${minValueLabel} to ${maxValueLabel}. For example, ${countries[0].name} scores ${countries[0][dimension]} on this scale, and ${countries[countries.length - 1].name} scores ${countries[countries.length - 1][dimension]}.`,
            dataTable: {
                headers: ["Country", "Score (1-10)"],
                rows: tableRows
            }
        }
    };
};

// 2. Vocabulary Data (Words used in the lesson)
const culturalVocabulary = [
    { front: 'High-Context', back: 'A communication style where most of the message is implied or understood through shared cultural background, tone, and non-verbal cues. (e.g., Japan)' },
    { front: 'Low-Context', back: 'A communication style where the message is explicitly stated through words and facts. Nothing is left to interpretation. (e.g., Germany)' },
    { front: 'Monochronic (M-Time)', back: 'A view of time as linear and segmented. Focus is on one task at a time, and punctuality/schedules are extremely important. (e.g., USA)' },
    { front: 'Polychronic (P-Time)', back: 'A view of time as fluid and flexible. Focus is on relationships and multi-tasking; schedules are secondary. (e.g., Colombia)' },
    { front: 'Power Distance', back: 'The extent to which less powerful members of a society accept and expect power to be distributed unequally. (High = hierarchical)' },
    { front: 'Saving Face', back: 'The act of preserving one\'s dignity and reputation, or preventing others from being embarrassed, especially in public. Crucial in many Asian cultures.' },
    { front: 'Guanxi', back: 'The Chinese term for a system of social networks and influential relationships that facilitate business and other dealings.' },
    { front: 'Taarof', back: 'The complex Iranian system of verbal deference and politeness, where people often offer something that they secretly hope will be refused, out of respect.' },
    { front: 'Egalitarian', back: 'A belief in the principle that all people are equal and deserve equal rights and opportunities (Low Power Distance).' }
];

// 3. Homework Data
const homeworkData = [
    {
        topic: 'Briefing Documents', 
        title: 'International Briefing Assignment', 
        details: `
            <p class="mb-4">Imagine you are managing two crucial business trips: one to Seoul for a critical negotiation, followed by a trip to Moscow to solidify a partnership.</p>
            <p>Your task is to write two one-page briefing documents that include specific, actionable advice for the traveling executive. This should be submitted before our next class discussion.</p>
            <ul class="list-disc list-inside space-y-2">
                <li><strong>Seoul Briefing:</strong> Specific, actionable advice on: exchanging business cards, seating arrangements at a meeting, the first toast at dinner, and what to do when receiving a drink from a senior executive.</li>
                <li><strong>Moscow Briefing:</strong> Specific, actionable advice on: the proper handshake, the correct response to a vodka toast, a good topic for small talk, and a culturally appropriate gift to bring.</li>
            </ul>
        `
    },
    { 
        topic: 'Cultural DNA', 
        title: 'The Cultural DNA Essay', 
        details: `
            <p class="mb-4">Choose two countries from the **Low-Context** group and two countries from the **High-Context** group and write a 500-750 word comparative essay that answers the question: "How have the core cultural foundations of these countries created their distinctly different approaches to business negotiation?"</p>
            <p><strong>Required Comparisons:</strong> Your essay must explicitly compare their approach to:</p>
            <ul class="list-disc list-inside font-semibold mb-4">
                <li>The use of legal contracts (written agreement vs. handshake/respect).</li>
                <li>How 'bad news' or disagreement is handled (direct confrontation vs. indirect signal).</li>
                <li>The speed of decision-making.</li>
            </ul>
            <p>Your essay should go beyond surface-level observations and connect specific negotiation tactics (e.g., long-term vs. short-term focus, emphasis on data vs. relationship) to deeper cultural drivers analyzed in this lesson.</p>
        `
    }
];

// 4. Country Detail Section (Text Block that displays the country details)
const countryDetailBlock = {
    blockId: 'country-details-text-block',
    type: 'text',
    data: {
        title: 'Country Details & Cultural Notes',
        htmlContent: `
            <h2>In-Depth Country Profiles</h2>
            <p>Use the data visualizations above to compare countries, then review the individual notes below to understand the 'why' behind the scores. These notes, including feedback from other students, provide crucial context for your independent study.</p>
            <div class="space-y-4 mt-6">
                ${countries.map(c => `
                    <div class="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <h3 class="text-xl font-bold text-blue-800 mb-1">${c.name}</h3>
                        <p class="text-gray-700">${c.details}</p>
                    </div>
                `).join('')}
            </div>
        `
    }
};

// --- FINAL EXPORTED DATA STRUCTURE ---
export const culturalData = {
    "lessonId": "global-business-cultures-guide",
    "title": "Global Business Cultures",
    "subtitle": "Navigating the complexities of international communication and etiquette.",
    "content": [
        // 1. INTRODUCTION
        {
            "blockId": "cultural-intro-01",
            "type": "text",
            "data": {
                "htmlContent": "<h2>The Invisible Rules of International Business</h2><p>International business is often won or lost not on the quality of a product, but on cultural mistakes. This lesson breaks down three core cultural dimensions—Context, Time, and Authority—to help you predict communication patterns and build rapport anywhere in the world.</p>"
            }
        },

        // 2. COMMUNICATION CONTEXT (CHART + EXPLANATION)
        generateCulturalDimensionData('contextScore'),
        
        // 3. TIME PERCEPTION (CHART + EXPLANATION)
        generateCulturalDimensionData('timeScore'),

        // 4. AUTHORITY (CHART + EXPLANATION)
        generateCulturalDimensionData('authorityScore'),

        // 5. VOCABULARY FLASHCARDS
        {
            "blockId": "cultural-vocabulary-flashcards-05",
            "type": "flashcard",
            "data": {
                "title": "Key Cultural Vocabulary: Concepts",
                "cards": culturalVocabulary
            }
        },
        
        // 6. DETAILED COUNTRY NOTES
        countryDetailBlock,

        // 7. HOMEWORK/ASSIGNMENTS
        {
            "blockId": "cultural-homework-07",
            "type": "text",
            "data": {
                "title": homeworkData[0].title,
                "htmlContent": `<h3>${homeworkData[0].title}</h3>${homeworkData[0].details}`
            }
        },
        {
            "blockId": "cultural-homework-08",
            "type": "text",
            "data": {
                "title": homeworkData[1].title,
                "htmlContent": `<h3>${homeworkData[1].title}</h3>${homeworkData[1].details}`
            }
        }
    ]
};
