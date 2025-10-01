// Debug script to test the transformation logic
import { transformArticleToCanonicalSchema } from './src/utils/textParser.js';

async function debugTransform() {
  console.log('Debugging transformation logic...\n');

  try {
    const mockArticleData = {
      fields: {
        "Headline": "Man briefly 'swallowed' by humpback whale",
        "Slug": "man-swallowed-by-whale",
        "Level 6 Text": "Man briefly 'swallowed' by humpback whale\nA packrafter had a lucky escape earlier this week after ending up in the jaws of a whale. Adrian Simancas, 23, was paddling through the icy waters of Patagonia, Chile, when an enormous humpback whale emerged from the deep and engulfed him and his inflatable raft in its mouth. Luckily for Mr Simancas, the esophagus of a humpback can only stretch to a diameter of 40 cm, and is ordinarily the width of a human fist. No sooner had Simancas been gulped up by the humpback than he was spat out into the choppy Southern Ocean. Simancas' father captured the whole horrifying incident on video. He said: \"Suddenly, I saw Adrian emerge from the waves, along with what looked like a gigantic animal.\"\nMr Simancas recounted his terrifying ordeal to journalists back on dry land. He said: \"I felt something hit me from behind. All this happened in a second. Something dark blue or white enveloped me, and a slimy texture brushed my face.\" He continued: \"I started to sink, and I just closed my eyes, expecting an impact… I was surrounded by water. I realized that I was in something's mouth and I had been eaten.\" He added: \"I felt like I was in a whirlpool… spinning around.\" The Guardian newspaper reported: \"For a few fleeting moments, Adrian's fate was in the jaws of the 40-ton [mammal].\" Adrian said his close encounter would not deter him from future rafting outings.",
        "Level 6 Questions": "What does the article say about the temperature of the ocean?\nWhat kind of craft was Adrian Simancas in?\nHow wide can a humpback whale's throat stretch?\nWhat part of the human body is compared to a humpback's throat?\nWho caught the encounter with the whale on video?\nWhere did journalists interview Adrian Simancas?\nWhat was the texture of the thing that touch Adrian Simancas' face?\nWhat did Mr Simancas think would happen after he closed his eyes?\nWhat did Mr Simancas feel like he was in?\nHow much did the whale weigh?",
        "Level 6 Instruction": "Write a full sentence answer for each question below.",
        "Level 6 Writing Prompt": "Academic Writing\nWrite 7-10 sentences about the topic below:\nWhales are Earth's most wonderful creatures. Discuss."
      }
    };

    console.log('Input data:');
    console.log('Level 6 Text length:', mockArticleData.fields['Level 6 Text'].length);
    console.log('Level 6 Questions length:', mockArticleData.fields['Level 6 Questions'].length);
    console.log('Level 6 Writing Prompt length:', mockArticleData.fields['Level 6 Writing Prompt'].length);

    const result = transformArticleToCanonicalSchema(mockArticleData, 6);
    console.log('\nTransformation result:');
    console.log('Title:', result.title);
    console.log('Content blocks:', result.content.length);

    result.content.forEach((block, index) => {
      console.log(`Block ${index + 1}: ${block.type} - ${block.blockId}`);
    });

  } catch (error) {
    console.error('Debug failed:', error);
  }
}

debugTransform();
