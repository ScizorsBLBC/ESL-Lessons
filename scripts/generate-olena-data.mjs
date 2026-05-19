/**
 * Generates src/data/olenaData.js from scripts/olena-pm-glossary.txt
 * Run: node scripts/generate-olena-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PMP_CURRICULUM_MODULES, sortTermsByCurriculum } from './pmp-curriculum.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GLOSSARY_PATH = path.join(__dirname, 'olena-pm-glossary.txt');
const AI_CACHE_PATH = path.join(__dirname, 'olena-ai-sentences.json');
const OUTPUT_PATH = path.join(__dirname, '../src/data/olenaData.js');
const WORDS_PER_LESSON = 10;

function loadAiSentenceCache() {
  if (!fs.existsSync(AI_CACHE_PATH)) return {};
  try {
    const cache = JSON.parse(fs.readFileSync(AI_CACHE_PATH, 'utf8'));
    return cache.byWord || {};
  } catch {
    console.warn('Could not read AI sentence cache; using template sentences.');
    return {};
  }
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function lcFirst(s) {
  if (!s) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function stripSeeAlso(definition) {
  const idx = definition.indexOf(' See also ');
  return idx >= 0 ? definition.slice(0, idx).trim() : definition.replace(/\s*See also.*$/i, '').trim();
}

function displayTerm(term) {
  return term.replace(/\s*\[[^\]]+\]\s*/g, '').trim();
}

function article(word) {
  return /^[aeiou]/i.test(word.replace(/^\(|\)$/g, '')) ? 'an' : 'a';
}

function parseGlossary(text) {
  const terms = [];
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    if (/^[A-Z]$/.test(line)) continue;
    const dotIdx = line.indexOf('. ');
    if (dotIdx < 0) continue;
    const term = line.slice(0, dotIdx).trim();
    let definition = line.slice(dotIdx + 2).trim();
    if (definition.toLowerCase().startsWith('see ')) {
      const ref = definition.replace(/^see\s+/i, '').replace(/\.$/, '');
      const refTerm = terms.find((t) => t.term.toLowerCase() === ref.toLowerCase());
      if (refTerm) definition = refTerm.definition;
    }
    terms.push({ term, definition: stripSeeAlso(definition) });
  }
  return terms;
}

/** Term-specific challenge sentences (highest priority). */
const TERM_CHALLENGES = [
  [/acceptance criteria/i, 'Before the user story moved to Done, the team verified that the _______ were satisfied.'],
  [/acceptance-test-driven development|\(atdd\)/i, 'The delivery team practiced _______ by writing acceptance tests before development started.'],
  [/^accountability$/i, 'The project manager reinforced _______ by naming one owner for each deliverable.'],
  [/^activity$/i, 'Each _______ on the network diagram must have a duration and a responsible resource.'],
  [/activity list/i, 'The scheduler published the _______ so every team member understood the work to be performed.'],
  [/actual cost|\(ac\)/i, 'The EVM report showed that _______ for the integration work package exceeded the plan.'],
  [/actual duration/i, 'After the delay, we updated _______ in the schedule to reflect real calendar time.'],
  [/adaptive approach/i, 'Because requirements were volatile, we chose _______ for the U.S. product rollout.'],
  [/affinity diagram/i, 'During the workshop, we built _______ to group dozens of stakeholder ideas.'],
  [/^agile$/i, 'Our PMO expects teams to deliver value using _______ principles and short iterations.'],
  [/assumption log/i, 'We recorded each risk-related guess in the _______ and reviewed it weekly.'],
  [/^assumption$/i, 'We documented _______ in the charter because we had not yet confirmed vendor pricing.'],
  [/^backlog$/i, 'The product owner reprioritized the _______ before sprint planning.'],
  [/backlog refinement/i, 'The team held _______ to clarify user stories for the next iteration.'],
  [/backward pass/i, 'The scheduler ran _______ to calculate late start and late finish dates.'],
  [/^baseline$/i, 'Change control compares all updates against the approved _______.'],
  [/burndown chart/i, 'The Scrum Master updated the _______ to show remaining work in the sprint.'],
  [/burnup chart/i, 'We tracked completed scope on _______ as we approached the release milestone.'],
  [/business case/i, 'The sponsor requested _______ before funding the ERP transformation.'],
  [/change control board|\(ccb\)/i, "The _______ reviewed our change request at Thursday's governance meeting."],
  [/change request/i, 'We submitted a _______ to add two security requirements to the scope baseline.'],
  [/critical path/i, "Any slip on the _______ will delay the project's finish date."],
  [/earned value|\(ev\)/i, 'Finance compared _______ to actual cost to explain the cost overrun.'],
  [/earned value management|\(evm\)/i, 'Our program office uses _______ to integrate scope, schedule, and cost data.'],
  [/^impediment$|^blocker$/i, 'The Scrum Master escalated _______ that blocked the API integration.'],
  [/^iteration$|^sprint$/i, 'At the end of the _______, the team demoed working software to stakeholders.'],
  [/kickoff meeting/i, 'At the _______, the PM set expectations with the U.S. delivery team.'],
  [/lessons learned/i, 'We captured _______ in the register after the pilot deployment.'],
  [/product backlog/i, 'The product owner ordered the _______ by business value.'],
  [/project charter/i, 'The sponsor signed the _______ to authorize the project manager to spend budget.'],
  [/project management plan/i, 'The _______ describes how the team will execute, monitor, and close the project.'],
  [/risk register/i, 'We logged the vendor delay as _______ and assigned a response owner.'],
  [/^risk$/i, 'The PM logged the vendor delay as a _______ after the cybersecurity audit.'],
  [/stakeholder register/i, 'We used the _______ to plan communications with legal and operations.'],
  [/user story/i, "The BA wrote a _______ so the team could estimate work from the customer's perspective."],
  [/work breakdown structure|\(wbs\)/i, 'We decomposed scope into _______ down to the work-package level.'],
  [/definition of done|\(dod\)/i, 'The team agreed on _______ before marking any story complete.'],
  [/definition of ready|\(dor\)/i, 'Stories must meet _______ before they enter sprint planning.'],
  [/gantt chart/i, 'The PM shared _______ with executives to show activity bars across the timeline.'],
  [/kanban board/i, 'Work in progress limits are visible on our _______.'],
  [/minimum viable product|\(mvp\)/i, 'We released _______ to validate demand before building the full platform.'],
  [/RACI/i, 'The PM published _______ so everyone knew who was accountable for UAT.'],
  [/statement of work|\(sow\)/i, 'Procurement attached the _______ to the vendor contract.'],
  [/scope creep/i, 'Without change control, _______ pushed the launch date by six weeks.'],
];

function classifyTerm(term, definition) {
  const t = displayTerm(term).toLowerCase();
  const d = definition.toLowerCase();

  if (/\bcriteria\b/.test(t)) return 'criteria';
  if (/\b(activities|requirements|deliverables|objectives|assumptions|constraints|agreements|principles|factors|metrics)\b/.test(t)) {
    return 'plural';
  }
  if (/\b(method|technique|approach|practice|development|estimating|analysis|mapping|thinking|integration|delivery)\b/.test(t) ||
      (/\b(method|technique|approach|practice)\b/.test(d) && !/\bdocument\b/.test(d))) {
    return 'method';
  }
  if (/\b(chart|diagram|map|matrix|curve|board)\b/.test(t) || /\b(diagram|chart|matrix|map)\b/.test(d.split('.')[0])) {
    return 'visual';
  }
  if (/\b(plan|log|register|charter|backlog|statement|dictionary|artifact|document)\b/.test(t) ||
      (/\b(document|repository|tabulation)\b/.test(d) && !/\bmethod\b/.test(d))) {
    return 'document';
  }
  if (/\([A-Z][A-Z0-9-]*\)/.test(term) && /\b(measure|ratio|index|variance|cost|value|duration|performance|estimate)\b/.test(d)) {
    return 'metric';
  }
  if (t === 'activity' || (/\bportion of work\b/.test(d) && /\bscheduled\b/.test(d))) return 'activity';
  if (/\bcontract\b/.test(t)) return 'contract';
  if (t === 'agile' || /\bmindset\b/.test(d)) return 'mindset';
  if (/\bprocess\b/.test(d) && !/\bproduct\b/.test(t)) return 'process';
  if (/\b(condition|ability|degree|uncertainty|integration|accountability|complexity|governance|flow)\b/.test(d) &&
      !/\b(document|diagram|list|plan|register)\b/.test(t)) {
    return 'abstract';
  }
  return 'concept';
}

const CHALLENGE_BY_CLASS = {
  criteria: [
    'Before UAT, the product owner confirmed that all _______ were met.',
    'Developers cannot close the story until the _______ are satisfied.',
  ],
  plural: [
    'The PM updated _______ in the baseline after the steering committee review.',
    'Stakeholders asked us to clarify _______ before we lock the scope.',
  ],
  method: [
    'The U.S. program team adopted _______ to reduce rework on changing requirements.',
    'We chose _______ because our integration work had high uncertainty.',
  ],
  visual: [
    'The facilitator drew _______ on the whiteboard during the risk workshop.',
    'Executives reviewed _______ in the status deck to see trends at a glance.',
  ],
  document: [
    'The project manager uploaded the _______ to the shared repository for approval.',
    'Before the phase gate, we updated the _______ to reflect the latest baseline.',
  ],
  metric: [
    'The monthly EVM report showed that _______ explained the budget variance.',
    'Finance asked the PM to report _______ for each control account.',
  ],
  activity: [
    'The scheduler added _______ to the network diagram with clear dependencies.',
    'Each _______ must have an owner before we publish the baseline schedule.',
  ],
  contract: [
    'Legal negotiated _______ with the vendor before work could begin.',
    'Procurement selected _______ based on the level of scope uncertainty.',
  ],
  mindset: [
    'Leadership wants the delivery team to follow _______ values during the rollout.',
    'Coaches help matrixed teams adopt _______ ways of working in the U.S. market.',
  ],
  process: [
    'All scope changes must go through _______ before we update the baseline.',
    'The PMO standardized _______ across programs in North America.',
  ],
  abstract: [
    'The steering committee discussed _______ when roles on the matrix team were unclear.',
    'Strong _______ helped the PM resolve the integration delay with vendors.',
  ],
  concept: [
    'In the kickoff deck, the PM defined _______ for the cross-functional U.S. team.',
    'The sponsor asked for a clearer explanation of _______ during the status meeting.',
  ],
};

function buildChallengeFromSuffix(term) {
  const t = displayTerm(term).toLowerCase();
  if (/ estimating$/.test(t)) return 'The planner used _______ based on data from a similar U.S. rollout last year.';
  if (/ analysis$/.test(t)) return 'The PM presented _______ to compare options before the steering committee decision.';
  if (/ management plan$/.test(t)) return 'The _______ explains how the team will monitor scope, schedule, and cost.';
  if (/ register$/.test(t)) return 'We updated the _______ after the risk workshop in Chicago.';
  if (/ log$/.test(t)) return 'The PM added the issue to the _______ and assigned an owner.';
  if (/ chart$/.test(t)) return 'The status deck included _______ so executives could see progress at a glance.';
  if (/ diagram$/.test(t)) return 'The facilitator drew _______ to explain the root cause of the defect.';
  if (/ matrix$/.test(t)) return 'We completed _______ to show who was responsible, accountable, consulted, and informed.';
  if (/ reserve$/.test(t)) return 'Finance approved _______ to cover known risks in the integration phase.';
  if (/ contract$/.test(t)) return 'Procurement signed _______ with the vendor before development began.';
  if (/ meeting$/.test(t)) return 'At the _______, the PM aligned the U.S. team on goals and ground rules.';
  if (/ approach$/.test(t)) return 'Given uncertain requirements, the program selected _______ for delivery.';
  if (/ technique$/.test(t)) return 'The scheduler applied _______ to shorten the path without cutting scope.';
  if (/ index$/.test(t)) return 'The EVM report showed _______ below 1.0, signaling poor performance.';
  if (/ variance$/.test(t)) return 'The controller explained _______ using earned value and actual cost data.';
  return null;
}

function buildChallengeSentence(term, definition) {
  const word = displayTerm(term);

  for (const [pattern, sentence] of TERM_CHALLENGES) {
    if (pattern.test(term) || pattern.test(word)) return sentence;
  }

  const suffixSentence = buildChallengeFromSuffix(term);
  if (suffixSentence) return suffixSentence;

  const cls = classifyTerm(term, definition);
  const templates = CHALLENGE_BY_CLASS[cls] || CHALLENGE_BY_CLASS.concept;
  return templates[hashString(term + 'c') % templates.length];
}

function buildSampleSentence(term, definition) {
  const label = displayTerm(term);
  const gloss = lcFirst(stripSeeAlso(definition).replace(/\.$/, ''));
  const h = hashString(term);

  const patterns = [
    () => `Before UAT, our U.S. project manager reviewed ${label} with the product owner.`,
    () => `In sprint planning, the team aligned on ${label} for the next release.`,
    () => `The steering committee asked for an update on ${label} during the monthly status review.`,
    () => `We documented ${label} in the project management plan after the cross-functional workshop.`,
    () => `During the RAID review, the PM explained how ${label} affects the go-live date.`,
  ];

  if (gloss.length <= 90) {
    const withContext = [
      () => `Our U.S. PM clarified ${label}: ${gloss}.`,
      () => `In the status deck, ${label} means ${gloss}.`,
    ];
    return withContext[h % withContext.length]();
  }

  return patterns[h % patterns.length]();
}

function formatDefinition(term, definition) {
  const d = stripSeeAlso(definition);
  if (/^\(/.test(d) || /^\[/.test(d)) return d;
  return `(noun/phr.) ${d}`;
}

/** Chunk terms into lessons of up to `size`, never mixing curriculum modules. */
function chunkByCurriculum(sortedTerms, size) {
  const chunks = [];
  let current = [];
  let currentModuleId = null;

  for (const term of sortedTerms) {
    const modId = term.curriculum.id;
    if (current.length > 0 && modId !== currentModuleId) {
      chunks.push(current);
      current = [];
    }
    if (current.length >= size) {
      chunks.push(current);
      current = [];
    }
    current.push(term);
    currentModuleId = modId;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

function buildLessonTitle(words, modulePartCounts) {
  const primaryModule = words[0].curriculum;
  const modId = primaryModule.id;
  modulePartCounts[modId] = (modulePartCounts[modId] || 0) + 1;
  const part = modulePartCounts[modId];
  const first = displayTerm(words[0].term);
  const last = displayTerm(words[words.length - 1].term);
  const partLabel = part > 1 ? ` (Part ${part})` : '';
  return `${primaryModule.title}${partLabel}: ${first} – ${last}`;
}

function validateChallenge(word, sentence) {
  const issues = [];
  if (!sentence.includes('_______')) issues.push('missing blank');
  if (/\bour \_______ are\b/i.test(sentence) && !/criteria|activities|requirements|deliverables|objectives|assumptions|constraints|agreements|principles|factors|metrics|reserves|idioms/i.test(word)) {
    issues.push('plural verb with non-plural term');
  }
  if (/\ban \_______\b/i.test(sentence) && article(word) === 'a') issues.push('wrong article an');
  if (/\ba \_______\b/i.test(sentence) && article(word) === 'an') issues.push('wrong article a');
  return issues;
}

function generate() {
  const raw = fs.readFileSync(GLOSSARY_PATH, 'utf8');
  const parsed = parseGlossary(raw);
  const terms = sortTermsByCurriculum(parsed, displayTerm);
  console.log(`Parsed ${terms.length} terms → ${Math.ceil(terms.length / WORDS_PER_LESSON)} lessons (PMP curriculum order)`);

  const moduleCounts = {};
  terms.forEach((t) => {
    moduleCounts[t.curriculum.id] = (moduleCounts[t.curriculum.id] || 0) + 1;
  });
  console.log('Terms per curriculum module:');
  PMP_CURRICULUM_MODULES.forEach((m) => {
    const n = moduleCounts[m.id] || 0;
    if (n > 0) console.log(`  ${m.order}. ${m.title}: ${n}`);
  });

  const aiByWord = loadAiSentenceCache();
  const aiCount = Object.keys(aiByWord).length;
  if (aiCount > 0) {
    console.log(`Using ${aiCount} AI-generated sentence pairs from olena-ai-sentences.json`);
  } else {
    console.log('No AI cache found — using template sentences. Run: node scripts/generate-olena-sentences-gemini.mjs');
  }

  const warnings = [];
  const modulePartCounts = {};
  const lessonChunks = chunkByCurriculum(terms, WORDS_PER_LESSON);
  const lessons = lessonChunks.map((words, idx) => {
    const lessonNum = idx + 1;
    const primaryModule = words[0].curriculum;
    return {
      lesson: lessonNum,
      title: buildLessonTitle(words, modulePartCounts),
      module: primaryModule.title,
      moduleOrder: primaryModule.order,
      words: words.map(({ term, definition }) => {
        const word = displayTerm(term);
        const ai = aiByWord[word];
        const sampleSentence = ai?.sampleSentence || buildSampleSentence(term, definition);
        const challengeSentence = ai?.challengeSentence || buildChallengeSentence(term, definition);
        if (!ai) warnings.push({ word, issues: ['no AI sentence; used template'] });
        const issues = validateChallenge(word, challengeSentence);
        if (issues.length) warnings.push({ word, issues, challengeSentence });
        return {
          word,
          definition: formatDefinition(term, definition),
          sampleSentence,
          challengeSentence,
        };
      }),
    };
  });

  if (warnings.length) {
    console.warn(`\n${warnings.length} challenge sentences may need review (first 10):`);
    warnings.slice(0, 10).forEach((w) => console.warn(`  - ${w.word}: ${w.issues.join(', ')}`));
  }

  const curriculumOutline = PMP_CURRICULUM_MODULES.map(({ order, title, description }) => ({
    order,
    title,
    description,
  }));

  const fileContent = `/**
 * ESL Lessons Hub - Olena's Project Management Vocabulary Data
 * PMI-style glossary terms for PMP exam preparation (U.S. project management context).
 * Generated by scripts/generate-olena-data.mjs — do not hand-edit word lists; regenerate instead.
 * Quiz/flashcard sentences: node scripts/generate-olena-sentences-gemini.mjs (Gemini 3.1 Pro).
 *
 * Lesson order follows PMP study curriculum (see curriculumOutline), not alphabetical order.
 */

export const olenaVocabularyCurriculum = ${JSON.stringify(curriculumOutline, null, 2)};

export const olenaVocabularyData = ${JSON.stringify({ lessons }, null, 2)};
`;

  fs.writeFileSync(OUTPUT_PATH, fileContent, 'utf8');
  console.log(`Wrote ${OUTPUT_PATH}`);
}

generate();
