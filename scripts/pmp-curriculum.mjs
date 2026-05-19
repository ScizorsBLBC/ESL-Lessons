/**
 * PMP exam prep curriculum order for Olena vocabulary lessons.
 *
 * Sequencing follows the PMI PMP Examination Content Outline (January 2021):
 *   - Process domain tasks in a logical study path (integration → scope → schedule → cost → …)
 *   - People domain (team leadership) after core knowledge-area planning
 *   - Agile/hybrid practices after predictive fundamentals
 *   - Business Environment & emerging topics toward the end
 *
 * Terms are classified by keyword/pattern match on the glossary term + definition.
 */

export const PMP_CURRICULUM_MODULES = [
  {
    id: 'foundations',
    order: 1,
    title: 'Foundations & Project Environment',
    description: 'Projects, programs, portfolios, charters, PMO, and organizational context',
    keywords: [
      'project charter', 'program charter', 'portfolio charter', 'project manager', 'program manager',
      'portfolio manager', 'organizational process assets', 'enterprise environmental factors',
      'projectized organization', 'matrix organization', 'functional organization', 'performing organization',
      'project team', 'project management office', 'program management office', 'business case', 'business need',
      'project success', 'organizational project management', 'project governance', 'governance',
      'project life cycle', 'product life cycle', 'project phase', 'phase gate', 'kickoff meeting',
      'statement of work', 'project organization chart', 'code of accounts', 'component',
    ],
    patterns: [/^project$/, /^program$/, /^portfolio$/, /^sponsor$/],
  },
  {
    id: 'tailoring',
    order: 2,
    title: 'Tailoring & Development Approaches',
    description: 'Predictive, agile, hybrid, and life-cycle selection',
    keywords: [
      'predictive approach', 'adaptive approach', 'hybrid approach', 'iterative approach', 'incremental approach',
      'agile', 'tailoring', 'development approach', 'continuum of approaches', 'product management',
      'minimum viable product', 'minimum marketable feature', 'minimum marketable product',
      'minimum business increment', 'product owner',
      'product team', 'product scope', 'product backlog', 'value delivery',
    ],
    patterns: [/\bapproach$/, /tailoring/, /^agile$/, /^minimum (viable|marketable|business)/i],
  },
  {
    id: 'integration',
    order: 3,
    title: 'Integration Management',
    description: 'PM plan, baselines, change control, and performance measurement',
    keywords: [
      'project management plan', 'integration', 'performance measurement baseline', 'scope baseline',
      'schedule baseline', 'cost baseline', 'baseline', 'change control', 'change control board',
      'change control system', 'change management plan', 'change request', 'corrective action',
      'preventive action', 'configuration management plan', 'configuration management system',
      'project budget', 'management reserve',
      'contingency reserve', 'reserve analysis', 'reserve', 'workaround', 'issue', 'issue log',
      'artifact', 'deliverable', 'result', 'output', 'outcome', 'lessons learned', 'lessons learned register',
      'project management information system', 'dashboard', 'data date',
    ],
    patterns: [/^baseline$/, /^integration$/, /^deliverable$/],
  },
  {
    id: 'scope',
    order: 4,
    title: 'Scope & Requirements',
    description: 'Scope definition, WBS, requirements, and user-centric work',
    keywords: [
      'project scope', 'project scope statement', 'scope management plan', 'scope creep',
      'work breakdown structure', 'wbs dictionary', 'work package', 'requirement',
      'requirements management plan', 'requirements traceability matrix', 'business requirement',
      'business rule', 'definition of done', 'definition of ready', 'user story', 'use case',
      'epic', 'feature', 'backlog', 'backlog refinement', 'decomposition', 'validation', 'verification',
      'acceptance criteria', 'acceptance-test-driven', 'personas', 'story map', 'story mapping',
      'story point', 'scope baseline', 'product backlog', 'traceability',
    ],
    patterns: [/scope/, /wbs/, /requirement/, /backlog/],
  },
  {
    id: 'schedule',
    order: 5,
    title: 'Schedule Management',
    description: 'Activities, critical path, sequencing, and compression',
    keywords: [
      'schedule management plan', 'project schedule', 'schedule model', 'schedule network',
      'schedule compression', 'schedule forecasts', 'schedule performance', 'schedule variance',
      'activity list', 'activity', 'milestone', 'milestone schedule', 'gantt chart',
      'critical path', 'critical path method', 'critical path activity', 'critical chain',
      'precedence diagramming', 'project schedule network', 'network logic', 'network path', 'node',
      'predecessor activity', 'successor activity', 'summary activity', 'logical relationship',
      'finish-to-start', 'finish-to-finish', 'start-to-start', 'start-to-finish',
      'early start', 'early finish', 'late start', 'late finish', 'forward pass', 'backward pass',
      'schedule network analysis', 'free float', 'total float', 'near-critical',
      'lag', 'lead', 'duration', 'actual duration', 'cycle time', 'fixed duration',
      'crashing', 'fast tracking', 'resource leveling', 'resource smoothing', 'resource optimization',
      'optimistic duration', 'pessimistic duration', 'most likely duration', 'project calendar',
      'roadmap', 'release plan', 'release planning',
    ],
    patterns: [/schedule/, /critical path/, /float/, /milestone/],
  },
  {
    id: 'cost',
    order: 6,
    title: 'Cost Management & Earned Value',
    description: 'Estimates, budgets, EVM metrics, and cost performance',
    keywords: [
      'budget', 'budget at completion', 'actual cost', 'earned value', 'earned value management',
      'planned value', 'estimate at completion', 'estimate to complete', 'cost variance',
      'cost performance index', 'schedule performance index', 'to-complete performance index',
      'variance at completion', 'variance analysis', 'variance', 's-curve',
      'cost baseline', 'cost-benefit analysis', 'cost of quality', 'financial management plan',
      'rough order of magnitude', 'analogous estimating', 'parametric estimating', 'bottom-up estimating',
      'multipoint estimating', 'single-point estimating', 'relative estimating', 'program evaluation and review technique',
      'fixed formula method', 'weighted milestone method', 'percent complete', 'forecast',
      'total cost of ownership', 'apportioned effort', 'discrete effort', 'level of effort', 'effort',
    ],
    patterns: [/\(ac\)/, /\(ev\)/, /\(pv\)/, /\(bac\)/, /\(eac\)/, /\(etc\)/, /\(cpi\)/, /\(spi\)/, /estimating/, /variance/],
  },
  {
    id: 'quality',
    order: 7,
    title: 'Quality Management',
    description: 'Quality planning, assurance, and improvement',
    keywords: [
      'quality management plan', 'quality audit', 'cost of quality', 'rework', 'definition of done',
      'test plan', 'test-driven development', 'behavior-driven development', 'verification', 'validation',
    ],
    patterns: [/quality/, /test-driven/, /behavior-driven/],
  },
  {
    id: 'resources',
    order: 8,
    title: 'Resource Management',
    description: 'Resource planning, calendars, and optimization',
    keywords: [
      'resource management plan', 'resource breakdown structure', 'resource calendar',
      'resource leveling', 'resource smoothing', 'resource optimization', 'make-or-buy',
      'sourcing strategy plan', 'control account', 'responsibility assignment matrix',
      'raci', 'responsibility', 'work in process',
    ],
    patterns: [/resource /, /raci/, /make-or-buy/],
  },
  {
    id: 'communications',
    order: 9,
    title: 'Communications Management',
    description: 'Information flow, plans, and radiators',
    keywords: [
      'communications management plan', 'information radiator', 'demonstrations', 'review', 'iteration review',
      'sprint review', 'daily coordination meeting',
    ],
    patterns: [/communication/],
  },
  {
    id: 'risk',
    order: 10,
    title: 'Risk Management',
    description: 'Identification, analysis, responses, and reserves',
    keywords: [
      'risk', 'risk register', 'risk management plan', 'risk management framework', 'risk management life cycle',
      'risk management', 'threat', 'opportunity', 'issue', 'emergent risk', 'residual risk', 'secondary risk',
      'risk identification', 'risk analysis', 'risk assessment', 'risk owner', 'risk action', 'risk response',
      'risk acceptance', 'risk avoidance', 'risk mitigation', 'risk transference', 'risk sharing',
      'risk exploitation', 'risk enhancement', 'risk escalation', 'risk exposure', 'risk appetite',
      'risk threshold', 'risk attitude', 'risk category', 'risk breakdown structure', 'response strategy',
      'probability and impact matrix', 'qualitative risk analysis', 'quantitative risk analysis',
      'expected monetary value', 'monte carlo', 'decision tree analysis', 'sensitivity', 'contingency',
      'contingency plan', 'contingency reserve', 'trigger condition', 'cause-and-effect diagram',
      'root cause analysis', 'what-if analysis', 'assumption', 'assumption log', 'constraint',
    ],
    patterns: [/risk/, /threat/, /opportunity/, /contingency/],
  },
  {
    id: 'procurement',
    order: 11,
    title: 'Procurement & Contracts',
    description: 'Seller agreements, contract types, and procurement planning',
    keywords: [
      'procurement management plan', 'firm-fixed-price', 'fixed-price', 'cost-reimbursable',
      'cost-plus', 'time and materials', 'contract', 'statement of work', 'sourcing strategy',
    ],
    patterns: [/contract/, /procurement/, /fixed-price/, /cost-plus/, /cost-reimbursable/],
  },
  {
    id: 'stakeholder',
    order: 12,
    title: 'Stakeholder Engagement',
    description: 'Stakeholder analysis, engagement, and collaboration',
    keywords: [
      'stakeholder register', 'stakeholder engagement', 'stakeholder engagement plan',
      'stakeholder engagement assessment', 'collaborate with stakeholders', 'elicitation',
      'negotiate project agreements', 'business analysis', 'process flow', 'impact mapping',
    ],
    patterns: [/stakeholder/],
  },
  {
    id: 'people',
    order: 13,
    title: 'Leading Teams (People Domain)',
    description: 'Team performance, conflict, leadership, and psychological safety',
    keywords: [
      'emotional intelligence', 'servant leadership', 'psychological safety', 'self-organizing team',
      'cross-functional team', 'generalizing specialist', 'ground rules', 'working agreements',
      'accountability', 'impediment', 'blocker', 'colocation', 'retrospective', 'lessons learned',
      'team', 'mentor', 'conflict', 'facilitation', 'human-in-the-loop', 'human-to-ai',
    ],
    patterns: [/impediment/, /blocker/, /emotional intelligence/, /servant leadership/, /ground rules/, /working agreements/, /^accountability$/],
  },
  {
    id: 'agile',
    order: 14,
    title: 'Agile & Iterative Delivery',
    description: 'Scrum, Kanban, iterations, and continuous delivery',
    keywords: [
      'sprint', 'iteration', 'timebox', 'iteration plan', 'iteration planning', 'scrum',
      'kanban board', 'burndown chart', 'burnup chart', 'velocity', 'increment', 'spike',
      'continuous delivery', 'continuous integration', 'devops', 'devsecops', 'flow', 'throughput',
      'feature-driven development', 'user experience', 'information radiator', 'demonstrations',
    ],
    patterns: [/sprint/, /iteration/, /kanban/, /burndown/, /burnup/, /velocity/, /devops/, /agile/],
  },
  {
    id: 'business',
    order: 15,
    title: 'Business Environment & Value',
    description: 'Benefits, compliance, external factors, and organizational change',
    keywords: [
      'benefit', 'benefits management plan', 'benefits realization plan', 'business value', 'business objective',
      'value proposition', 'value stream', 'value stream map', 'value breakdown structure',
      'value delivery office', 'value delivery system', 'disbenefit', 'pestle analysis', 'swot',
      'organizational change management', 'readiness assessment', 'feasibility analysis',
      'enterprise agility', 'enterprise risk management', 'organizational project management maturity',
      'portfolio management', 'portfolio balancing', 'portfolio management plan', 'portfolio charter',
      'program management', 'program management plan', 'program charter', 'go/no-go decision',
      'steering committee', 'benchmarking', 'sustainability', 'compliance',
    ],
    patterns: [/benefit/, /business value/, /value stream/, /portfolio/, /program management/],
  },
  {
    id: 'data_ai',
    order: 16,
    title: 'Data, Analytics & AI',
    description: 'Data-driven decision making and AI in project management',
    keywords: [
      'artificial intelligence', 'ai system', 'ai bias', 'data analytics', 'data science',
      'expert systems', 'rule-based systems', 'regression analysis', 'trend analysis',
      'artificial intelligence in portfolio',
    ],
    patterns: [/\bai\b/, /artificial intelligence/, /data analytics/, /data science/],
  },
  {
    id: 'tools',
    order: 17,
    title: 'Analysis Tools & Techniques',
    description: 'Cross-cutting planning and analysis methods',
    keywords: [
      'affinity diagram', 'mind mapping', 'brainstorm', 'multicriteria decision analysis',
      'alternative analysis', 'analogous estimating', 'parametric estimating', 'bottom-up estimating',
      'monte carlo', 'decision tree', 'prototype', 'modeling', 'model', 'design thinking',
      'benchmarking', 'checklist', 'expert judgment', 'facilitation',
    ],
    patterns: [/diagram$/, /mapping$/, /analysis$/, /simulation/],
  },
  {
    id: 'general',
    order: 18,
    title: 'General PM Concepts',
    description: 'Cross-cutting terms and supporting concepts',
    keywords: ['complexity', 'method', 'methodology', 'process', 'task', 'objective', 'okrs', 'kpi',
      'traceability', 'technical debt', 'waste', 'plan-do-check-act', 'progressive elaboration',
      'rolling wave planning', 'objectives and key results', 'key performance indicator'],
    patterns: [],
  },
];

function textIncludesKeyword(text, kw) {
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
}

/**
 * Assign the best-matching curriculum module for a glossary term.
 * @returns {{ id: string, order: number, title: string, score: number }}
 */
export function assignCurriculumModule(term, definition, displayTermFn) {
  const word = displayTermFn(term);
  const wordLower = word.toLowerCase();
  const text = `${word} ${definition}`.toLowerCase();

  let best = { ...PMP_CURRICULUM_MODULES[PMP_CURRICULUM_MODULES.length - 1], score: 0 };

  for (const mod of PMP_CURRICULUM_MODULES) {
    let score = 0;
    for (const kw of mod.keywords) {
      if (textIncludesKeyword(text, kw)) {
        // Stronger weight when the term name itself contains the phrase
        score += textIncludesKeyword(wordLower, kw) ? Math.min(kw.length, 30) + 25 : Math.min(kw.length, 30);
      }
    }
    for (const re of mod.patterns) {
      if (re.test(word) || re.test(definition)) score += 20;
    }
    if (score > best.score) {
      best = { id: mod.id, order: mod.order, title: mod.title, description: mod.description, score };
    }
  }

  return best;
}

export function sortTermsByCurriculum(terms, displayTermFn) {
  const enriched = terms.map((entry, originalIndex) => {
    const mod = assignCurriculumModule(entry.term, entry.definition, displayTermFn);
    return { ...entry, curriculum: mod, originalIndex };
  });

  enriched.sort((a, b) => {
    if (a.curriculum.order !== b.curriculum.order) return a.curriculum.order - b.curriculum.order;
    const termA = displayTermFn(a.term).toLowerCase();
    const termB = displayTermFn(b.term).toLowerCase();
    if (termA < termB) return -1;
    if (termA > termB) return 1;
    return a.originalIndex - b.originalIndex;
  });

  return enriched;
}
