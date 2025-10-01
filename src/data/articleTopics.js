// src/data/articleTopics.js
// Topic categorization for news articles to help teachers find relevant content

export const articleTopics = {
  // Technology & Innovation
  'technology': {
    name: 'Technology & Innovation',
    icon: '💻',
    description: 'Articles about technology, gadgets, AI, and digital innovation'
  },

  // Environment & Nature
  'environment': {
    name: 'Environment & Nature',
    icon: '🌍',
    description: 'Articles about climate, wildlife, natural disasters, and environmental issues'
  },

  // Society & Culture
  'society': {
    name: 'Society & Culture',
    icon: '👥',
    description: 'Articles about social issues, culture, laws, and human interest stories'
  },

  // Business & Economy
  'business': {
    name: 'Business & Economy',
    icon: '💼',
    description: 'Articles about companies, markets, finance, and economic trends'
  },

  // Health & Science
  'health': {
    name: 'Health & Science',
    icon: '🔬',
    description: 'Articles about medical discoveries, health trends, and scientific research'
  },

  // Sports & Entertainment
  'entertainment': {
    name: 'Sports & Entertainment',
    icon: '🎮',
    description: 'Articles about sports, games, celebrities, and entertainment industry'
  },

  // Travel & Lifestyle
  'travel': {
    name: 'Travel & Lifestyle',
    icon: '✈️',
    description: 'Articles about travel, food, lifestyle, and cultural experiences'
  },

  // Education & Learning
  'education': {
    name: 'Education & Learning',
    icon: '📚',
    description: 'Articles about education, learning methods, and academic topics'
  }
};

// Article-to-topic mapping
// This maps article slugs to their primary topics
export const articleTopicMap = {
  // Technology articles
  'nintendo-switch-2': 'technology',
  'ai-fashion-models': 'technology',
  'data-centers': 'technology',
  'data-centers-water': 'technology',
  'anti-drone-weapon': 'technology',
  'target-sound': 'technology',

  // Environment articles
  'man-swallowed-by-whale': 'environment',
  'sharks': 'environment',
  'greener-trees-volcano': 'environment',
  'fog-harvesting': 'environment',
  'water-purification': 'environment',
  'matcha-shortage': 'environment',
  'zoo-pet-food': 'environment',
  'alien-life': 'environment',

  // Society articles
  'surnames': 'society',
  'jeans-video-debate': 'society',
  'school-discipline': 'society',
  'uk-voting-age': 'society',
  'tourist-arrested': 'society',
  'pakind-ceasefire': 'society',
  'pope-laid-to-rest': 'society',

  // Business articles
  'airline-staff-bonus': 'business',
  'disney-job-cuts': 'business',
  'korean-air-award': 'business',
  '74-nations-visit-china': 'business',

  // Health articles
  'france-bans-smoking': 'health',
  'doctors-angry': 'health',
  'intermittent-fasting': 'health',
  'cheese-nightmare': 'health',
  'birth-rate-crisis': 'health',
  'baby-memories': 'health',

  // Entertainment articles
  'grow-a-garden': 'entertainment',
  'drinkable-mayonaise': 'entertainment',
  'music-memory': 'entertainment',
  'carnivore-diet': 'entertainment',
  'oblique-seville': 'entertainment',

  // Travel articles
  'nepal-walking': 'travel',
  'nepal-trekking': 'travel',
  'new-zealand-digital-nomads': 'travel',
  'north-korea-resort': 'travel',
  'reopen-alcatraz': 'travel',
  'tourist-damages-painting': 'travel',

  // Education articles
  'carspreading': 'education',
  'map-of-africa': 'education',
  'corpse-flower': 'education',
  'sherpa': 'education',
  'library-battles-beetles': 'education',
  'career-apocalypse': 'education',
  'japanese-walking': 'education',
  'asian-markets-in-bloodbath': 'education',
  'asian-markets-in-bloodbath-after-trade-tariffs': 'education',
  'carlo-ancelotti': 'education',
  'oasaka-expo': 'education',
  'osaka-expo': 'education',

  // Uncategorized (need review)
  'broken-hearts': 'society',
  'animal-puppets': 'entertainment',
  'sesame-street': 'entertainment',
  'de-extinction': 'environment',
  'happiness': 'health',
  'drinkable-mayonaise': 'entertainment',
};

/**
 * Get topic for an article slug
 * @param {string} slug - Article slug
 * @returns {string|null} Topic key or null if not found
 */
export const getArticleTopic = (slug) => {
  return articleTopicMap[slug] || null;
};

/**
 * Get all articles for a specific topic
 * @param {string} topicKey - Topic key
 * @returns {Array} Articles in this topic
 */
export const getArticlesByTopic = (topicKey) => {
  return Object.keys(articleTopicMap)
    .filter(slug => articleTopicMap[slug] === topicKey)
    .map(slug => ({ slug, topic: topicKey }));
};

/**
 * Get topic info by key
 * @param {string} topicKey - Topic key
 * @returns {Object|null} Topic information or null
 */
export const getTopicInfo = (topicKey) => {
  return articleTopics[topicKey] || null;
};

/**
 * Get all available topics
 * @returns {Array} All topic objects with keys
 */
export const getAllTopics = () => {
  return Object.keys(articleTopics).map(key => ({
    key,
    ...articleTopics[key]
  }));
};
