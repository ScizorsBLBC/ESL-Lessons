// Test script to verify the refactored news article functionality
import { getNewsArticleForLevel, getNewsArticlesForLevel } from './src/services/api.js';

async function testRefactoredNewsArticles() {
  console.log('Testing refactored news article functionality...\n');

  try {
    // Test 1: Get all Level 6 articles
    console.log('1. Testing getNewsArticlesForLevel(6)...');
    const level6Articles = await getNewsArticlesForLevel(6);
    console.log(`   Found ${level6Articles.length} Level 6 articles`);

    if (level6Articles.length > 0) {
      console.log(`   First article: ${level6Articles[0].title}`);
      console.log(`   Content blocks: ${level6Articles[0].content.length}`);
      console.log(`   First block type: ${level6Articles[0].content[0]?.type}`);
    }

    // Test 2: Get a specific article
    console.log('\n2. Testing getNewsArticleForLevel with "man-swallowed-by-whale", 6...');
    const specificArticle = await getNewsArticleForLevel('man-swallowed-by-whale', 6);

    if (specificArticle) {
      console.log(`   Article title: ${specificArticle.title}`);
      console.log(`   Content blocks: ${specificArticle.content.length}`);

      // Check content blocks
      specificArticle.content.forEach((block, index) => {
        console.log(`   Block ${index + 1}: ${block.type} - ${block.blockId}`);
        if (block.type === 'text') {
          console.log(`     Content preview: ${block.data.content.substring(0, 50)}...`);
        } else if (block.type === 'quiz') {
          console.log(`     Questions: ${block.data.questions.length}`);
        }
      });
    } else {
      console.log('   Article not found');
    }

    console.log('\n✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testRefactoredNewsArticles();
