// Debug script to examine article data structure
import { getNewsArticle } from './src/services/api.js';

async function debugArticle() {
  console.log('Debugging article data structure...\n');

  try {
    const rawArticle = await getNewsArticle('man-swallowed-by-whale');
    console.log('Raw article fields:');
    console.log(JSON.stringify(rawArticle.fields, null, 2));

  } catch (error) {
    console.error('Debug failed:', error);
  }
}

debugArticle();
