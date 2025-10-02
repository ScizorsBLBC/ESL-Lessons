#!/usr/bin/env node

/**
 * VOCABULARY MIGRATION VERIFICATION SCRIPT
 *
 * This script verifies that the migration was successful and all data is preserved correctly.
 */

const { oldVocabularyData: oldData } = require('./src/data/oldVocabularyData.js');
const { vocabularyData } = require('./src/data/vocabularyData.js');

function verifyMigration() {
  console.log('🔍 Starting migration verification...\n');

  // Step 1: Verify old data structure
  const oldWordCount = oldData.lessons.reduce((total, lesson) => {
    return total + (lesson.words ? lesson.words.length : 0);
  }, 0);

  console.log(`📊 OLD DATA:`);
  console.log(`   - Lessons: ${oldData.lessons.length}`);
  console.log(`   - Total words: ${oldWordCount}`);
  console.log(`   - Expected: 52 lessons × 10 words = 520 words`);

  // Step 2: Verify new data structure
  const newFiveWordPacks = vocabularyData.vocabularyPacks['5'];
  const newTenWordPacks = vocabularyData.vocabularyPacks['10'];

  console.log(`\n📦 NEW DATA:`);
  console.log(`   - 5-word packs: ${newFiveWordPacks.length}`);
  console.log(`   - 10-word packs: ${newTenWordPacks.length}`);

  // Step 3: Calculate total words in new structure
  const totalFiveWords = newFiveWordPacks.reduce((total, pack) => {
    return total + pack.content[1].data.cards.length;
  }, 0);

  const totalTenWords = newTenWordPacks.reduce((total, pack) => {
    return total + pack.content[1].data.cards.length;
  }, 0);

  const totalNewWords = totalFiveWords + totalTenWords;

  console.log(`   - Total words in 5-word packs: ${totalFiveWords}`);
  console.log(`   - Total words in 10-word packs: ${totalTenWords}`);
  console.log(`   - Total words: ${totalNewWords}`);

  // Step 4: Verify data integrity
  console.log(`\n🔍 DATA INTEGRITY CHECKS:`);

  // Check if all words are preserved
  if (totalNewWords === oldWordCount) {
    console.log(`✅ Word count matches: ${totalNewWords} = ${oldWordCount}`);
  } else {
    console.log(`❌ Word count mismatch: ${totalNewWords} ≠ ${oldWordCount}`);
  }

  // Check if pack counts are correct
  const expectedFivePacks = Math.ceil(oldWordCount / 5);
  const expectedTenPacks = Math.ceil(oldWordCount / 10);

  if (newFiveWordPacks.length === expectedFivePacks) {
    console.log(`✅ 5-word packs correct: ${newFiveWordPacks.length} = ${expectedFivePacks}`);
  } else {
    console.log(`❌ 5-word packs incorrect: ${newFiveWordPacks.length} ≠ ${expectedFivePacks}`);
  }

  if (newTenWordPacks.length === expectedTenPacks) {
    console.log(`✅ 10-word packs correct: ${newTenWordPacks.length} = ${expectedTenPacks}`);
  } else {
    console.log(`❌ 10-word packs incorrect: ${newTenWordPacks.length} ≠ ${expectedTenPacks}`);
  }

  // Step 5: Verify word distribution
  const fiveWordTotal = newFiveWordPacks.length * 5;
  const tenWordTotal = newTenWordPacks.length * 10;
  const distributedTotal = fiveWordTotal + tenWordTotal;

  if (distributedTotal === oldWordCount * 2) {
    console.log(`✅ Word distribution correct: ${distributedTotal} total slots for ${oldWordCount} words`);
  } else {
    console.log(`❌ Word distribution incorrect: ${distributedTotal} total slots for ${oldWordCount} words`);
  }

  // Step 6: Check for duplicates by examining a sample pack
  console.log(`\n🔍 SAMPLE VERIFICATION:`);

  if (newFiveWordPacks.length > 0) {
    const firstFivePack = newFiveWordPacks[0];
    const words = firstFivePack.content[1].data.cards.map(card => card.front);
    const uniqueWords = new Set(words);

    if (uniqueWords.size === words.length) {
      console.log(`✅ No duplicate words in first 5-word pack`);
    } else {
      console.log(`❌ Found duplicate words in first 5-word pack`);
    }

    console.log(`   Sample pack words: ${words.join(', ')}`);
  }

  if (newTenWordPacks.length > 0) {
    const firstTenPack = newTenWordPacks[0];
    const words = firstTenPack.content[1].data.cards.map(card => card.front);
    const uniqueWords = new Set(words);

    if (uniqueWords.size === words.length) {
      console.log(`✅ No duplicate words in first 10-word pack`);
    } else {
      console.log(`❌ Found duplicate words in first 10-word pack`);
    }

    console.log(`   Sample pack words: ${words.join(', ')}`);
  }

  // Step 7: Verify lesson structure
  console.log(`\n🔍 LESSON STRUCTURE VERIFICATION:`);

  if (newFiveWordPacks.length > 0) {
    const samplePack = newFiveWordPacks[0];
    const hasRequiredBlocks = samplePack.content.length >= 3 &&
      samplePack.content[0].type === 'text' &&
      samplePack.content[1].type === 'flashcard' &&
      samplePack.content[2].type === 'fillInTheBlanks';

    if (hasRequiredBlocks) {
      console.log(`✅ Lesson structure correct for 5-word packs`);
    } else {
      console.log(`❌ Lesson structure incorrect for 5-word packs`);
    }
  }

  console.log(`\n🎯 MIGRATION VERIFICATION COMPLETE`);
}

// Run verification
verifyMigration();
