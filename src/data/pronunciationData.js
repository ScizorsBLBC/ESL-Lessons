// src/data/pronunciationData.js
// Complete refactoring to the canonical schema. All original detailed instructions,
// word lists, and minimal pairs are preserved and converted into HTML within 'text' and 'chart' blocks.

export const pronunciationData = {
    "lessonId": "american-english-pronunciation-guide",
    "title": "American English Pronunciation Guide",
    "subtitle": "Mastering Vowels, Consonants, and Rhythm for Clear Communication.",
    "content": [
      // --- INTRODUCTORY CONTENT BLOCK ---
      {
        "blockId": "pron-intro-01",
        "type": "text",
        "data": {
          "htmlContent": "<h2>The Fundamentals of Clear Speech</h2><p>English pronunciation is a blend of individual sounds (vowels and consonants) and the melody of the language (rhythm and stress). Focusing on these elements reduces confusion and helps you communicate with confidence.</p><h3>Video Practice Note</h3><p><strong>Each sound link below provides two videos. The first video focuses on the physical mouth position and includes initial practice words. If you allow it to auto-play, it will proceed immediately to a second video with a continuous list of practice words for extended listening and repetition.</strong></p>"
        }
      },
  
      // ----------------------------------------------------------------------
      //                               VOWEL SOUNDS
      // ----------------------------------------------------------------------
  
      // --- VOWEL 1: Long E /iː/ vs Short I /ɪ/ ---
      {
        "blockId": "vowels-long-e-short-i-instructions-02",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Vowel Contrast: Long 'ee' /iː/ vs. Short 'i' /ɪ/</h3><p>Differentiating between the tense /iː/ (as in **seat**) and the lax /ɪ/ (as in **sit**) is vital, as this contrast changes the meaning of many common words.</p><h4>How to Make the Sounds:</h4><ul><li><strong>Long 'ee' /iː/:</strong> Tense sound. Tongue high and forward in the mouth; lips spread, similar to a slight smile.</li><li><strong>Short 'i' /ɪ/:</strong> Lax sound. Tongue slightly lower and more relaxed than /iː/.</li></ul>"
        }
      },
      {
        "blockId": "vowels-long-e-short-i-chart-03",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /iː/ vs. /ɪ/",
          "descriptionHtml": "<p>Listen to these pairs and focus on the length and tension differences.</p>",
          "headers": ["/iː/ (Long E)", "/ɪ/ (Short I)", "Video Link"],
          "rows": [
            ["seat", "sit", "https://youtu.be/ANSOvkPAuvc?si=4FyuWpOop9FcP2fV"],
            ["leave", "live", "https://youtu.be/Vb8tEGbOEt4?si=cf19CJL8_FcFqzBv"],
            ["sheep", "ship", "https://youtu.be/Q7vj-786m5c"],
            ["heat", "hit", "https://youtu.be/w_Ea2z9M2K0"],
            ["feel", "fill", "https://youtu.be/O5n7YJ_3q0A"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for Long E and Short I.", "longDescription": "The chart lists minimal pairs that contrast the Long E /iː/ (e.g., leave) and Short I /ɪ/ (e.g., live) vowels.", "dataTable": { "headers": ["/iː/", "/ɪ/"], "rows": [["seat", "sit"], ["leave", "live"], ["sheep", "ship"], ["heat", "hit"], ["feel", "fill"]] } }
      },
  
      // --- VOWEL 2: Long U /uː/ vs Short U /ʊ/ ---
      {
        "blockId": "vowels-long-u-short-u-instructions-04",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Vowel Contrast: Long 'oo' /uː/ vs. Short 'oo' /ʊ/</h3><p>These sounds are both back vowels, but /uː/ is tense and longer, while /ʊ/ is lax and shorter. Think of the difference between a pool and a puddle.</p><h4>How to Make the Sounds:</h4><ul><li><strong>Long 'oo' /uː/:</strong> Tense sound. Tongue high and far back; lips tightly rounded.</li><li><strong>Short 'oo' /ʊ/:</strong> Lax sound. Tongue slightly lower; lips loosely rounded.</li></ul>"
        }
      },
      {
        "blockId": "vowels-long-u-short-u-chart-05",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /uː/ vs. /ʊ/",
          "headers": ["/uː/ (Long OO)", "/ʊ/ (Short OO)", "Video Link"],
          "rows": [
            ["pool", "pull", "https://youtu.be/i2-m1R0G4u0"],
            ["who'd", "hood", "https://youtu.be/n0N3e-k8j_g"],
            ["suit", "soot", "https://youtu.be/4e9gT3W5w0c"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for Long U and Short U.", "longDescription": "The chart contrasts the long /uː/ (pool) and short /ʊ/ (pull) vowels.", "dataTable": { "headers": ["/uː/", "/ʊ/"], "rows": [["pool", "pull"], ["who'd", "hood"], ["suit", "soot"]] } }
      },
      
      // --- VOWEL 3: E /e/ vs Short A /æ/ ---
      {
        "blockId": "vowels-e-vs-short-a-instructions-06",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Vowel Contrast: Short 'e' /e/ vs. Short 'a' /æ/</h3><p>The short 'a' /æ/ is a low front vowel (as in **cat**). It requires the mouth to be wide open and the tongue low. Learners often confuse it with the short 'e' /e/ (as in **bed**).</p><h4>How to Make the Sounds:</h4><ul><li><strong>Short 'e' /e/:</strong> Tongue is mid-front; lips are neutral.</li><li><strong>Short 'a' /æ/:</strong> Tongue is low-front; drop your jaw and tense your throat slightly.</li></ul>"
        }
      },
      {
        "blockId": "vowels-e-vs-short-a-chart-07",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /e/ vs. /æ/",
          "headers": ["/e/ (Short E)", "/æ/ (Short A)", "Video Link"],
          "rows": [
            ["bed", "bad", "https://youtu.be/t2h9wz5x_mQ"],
            ["pen", "pan", "https://youtu.be/S0bYm7y4V3U"],
            ["said", "sad", "https://youtu.be/L8Wk3iA5h20"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for Short E and Short A.", "longDescription": "The chart contrasts the short /e/ (bed) and short /æ/ (bad) vowels.", "dataTable": { "headers": ["/e/", "/æ/"], "rows": [["bed", "bad"], ["pen", "pan"], ["said", "sad"]] } }
      },
  
      // --- VOWEL 4: Short O /ɑː/ vs Short U /ʌ/ ---
      {
        "blockId": "vowels-o-vs-u-instructions-08",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Vowel Contrast: 'Ah' /ɑː/ vs. Short 'u' /ʌ/</h3><p>The **open 'ah' /ɑː/** (as in **father**) is a low, unrounded back sound. The **short 'u' /ʌ/** (as in **cup**) is a central, relaxed sound. These are frequently confused, especially by Spanish or Italian speakers.</p><h4>How to Make the Sounds:</h4><ul><li><strong>'Ah' /ɑː/:</strong> Drop your jaw fully; tongue low and back.</li><li><strong>Short 'u' /ʌ/:</strong> Tongue is mid-central; mouth is only slightly open (like a grunt).</li></ul>"
        }
      },
      {
        "blockId": "vowels-o-vs-u-chart-09",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /ɑː/ vs. /ʌ/",
          "headers": ["/ɑː/ (Ah)", "/ʌ/ (Short U)", "Video Link"],
          "rows": [
            ["cop", "cup", "https://youtu.be/6e7xX3x5B1g"],
            ["lock", "luck", "https://youtu.be/2b8t6W4c4x0"],
            ["hot", "hut", "https://youtu.be/7t9y_j4M2K4"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for the 'Ah' and Short U vowels.", "longDescription": "The chart contrasts the open /ɑː/ (cop) and central /ʌ/ (cup) vowels.", "dataTable": { "headers": ["/ɑː/", "/ʌ/"], "rows": [["cop", "cup"], ["lock", "luck"], ["hot", "hut"]] } }
      },
      
      // ----------------------------------------------------------------------
      //                              CONSONANT SOUNDS
      // ----------------------------------------------------------------------
  
      // --- CONSONANT 1: Voiced TH /ð/ vs Voiceless TH /θ/ ---
      {
        "blockId": "consonants-th-instructions-10",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Consonant Contrast: Voiced /ð/ vs. Voiceless /θ/ 'Th'</h3><p>English uses two 'th' sounds. The only difference is whether you use your vocal cords.</p><h4>How to Make the Sounds:</h4><ul><li><strong>Voiced 'th' /ð/:</strong> Use vocal cord vibration (buzzing sound) as air passes between your tongue and teeth. (e.g., **this**)</li><li><strong>Voiceless 'th' /θ/:</strong> Use only air (hissing sound); vocal cords are silent. (e.g., **think**)</li></ul>"
        }
      },
      {
        "blockId": "consonants-th-chart-11",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /ð/ vs. /θ/",
          "headers": ["/ð/ (Voiced TH)", "/θ/ (Voiceless TH)", "Video Link"],
          "rows": [
            ["this", "think (initial)", "https://youtu.be/vQ8822v9F4U?si=1m5e8N4e9O0q8kE2"],
            ["mother", "mouth (final)", "https://youtu.be/q8y7i_yS2A8?si=9k3V6j0a1X6oE3hD"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for voiced and voiceless TH.", "longDescription": "The chart contrasts the voiced /ð/ (this) and voiceless /θ/ (think) consonant sounds.", "dataTable": { "headers": ["/ð/", "/θ/"], "rows": [["this", "think (initial)"], ["mother", "mouth (final)"]] } }
      },
      
      // --- CONSONANT 2: P /p/ vs B /b/ ---
      {
        "blockId": "consonants-p-vs-b-instructions-12",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Consonant Contrast: Voiceless /p/ vs. Voiced /b/</h3><p>These are plosive sounds. The difference is the puff of air (aspiration) for /p/ and the vibration for /b/.</p><h4>How to Make the Sounds:</h4><ul><li><strong>Voiceless /p/:</strong> Lips together, then release quickly with a strong puff of air (aspiration) before the vowel.</li><li><strong>Voiced /b/:</strong> Lips together, release quickly, and start vocal cord vibration immediately. No strong puff of air.</li></ul>"
        }
      },
      {
        "blockId": "consonants-p-vs-b-chart-13",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /p/ vs. /b/",
          "headers": ["/p/ (Voiceless)", "/b/ (Voiced)", "Video Link"],
          "rows": [
            ["pat", "bat", "https://youtu.be/a-k0L5F02oQ"],
            ["pin", "bin", "https://youtu.be/8Z4g5u7F9hQ"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for P and B.", "longDescription": "The chart contrasts the voiceless /p/ (pat) and voiced /b/ (bat) plosive consonant sounds.", "dataTable": { "headers": ["/p/", "/b/"], "rows": [["pat", "bat"], ["pin", "bin"]] } }
      },
  
      // --- CONSONANT 3: T /t/ vs D /d/ ---
      {
        "blockId": "consonants-t-vs-d-instructions-14",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Consonant Contrast: Voiceless /t/ vs. Voiced /d/</h3><p>Similar to /p/ vs /b/, these sounds are made in the same spot (the ridge behind your teeth), but one uses air only, and the other uses vibration.</p><h4>How to Make the Sounds:</h4><ul><li><strong>Voiceless /t/:</strong> Tip of tongue against the alveolar ridge; release quickly with aspiration.</li><li><strong>Voiced /d/:</strong> Tongue in the same position; start vocal cord vibration immediately upon release.</li></ul>"
        }
      },
      {
        "blockId": "consonants-t-vs-d-chart-15",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /t/ vs. /d/",
          "headers": ["/t/ (Voiceless)", "/d/ (Voiced)", "Video Link"],
          "rows": [
            ["team", "deem", "https://youtu.be/xJ1p8F0F7rA"],
            ["try", "dry", "https://youtu.be/M9D8Q5Gv3vI"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for T and D.", "longDescription": "The chart contrasts the voiceless /t/ (team) and voiced /d/ (deem) consonant sounds.", "dataTable": { "headers": ["/t/", "/d/"], "rows": [["team", "deem"], ["try", "dry"]] } }
      },
  
      // --- CONSONANT 4: K /k/ vs G /g/ ---
      {
        "blockId": "consonants-k-vs-g-instructions-16",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Consonant Contrast: Voiceless /k/ vs. Voiced /g/</h3><p>These sounds are articulated in the back of the throat. English learners often find the distinction challenging.</p><h4>How to Make the Sounds:</h4><ul><li><strong>Voiceless /k/:</strong> Back of tongue raises to touch the soft palate; release with strong aspiration.</li><li><strong>Voiced /g/:</strong> Same position; vocal cords vibrate immediately.</li></ul>"
        }
      },
      {
        "blockId": "consonants-k-vs-g-chart-17",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /k/ vs. /g/",
          "headers": ["/k/ (Voiceless)", "/g/ (Voiced)", "Video Link"],
          "rows": [
            ["coat", "goat", "https://youtu.be/V2oW6E3M6R4"],
            ["clue", "glue", "https://youtu.be/h6q0w9L8w4g"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for K and G.", "longDescription": "The chart contrasts the voiceless /k/ (coat) and voiced /g/ (goat) plosive consonant sounds.", "dataTable": { "headers": ["/k/", "/g/"], "rows": [["coat", "goat"], ["clue", "glue"]] } }
      },
      
      // --- CONSONANT 5: S /s/ vs Z /z/ ---
      {
        "blockId": "consonants-s-vs-z-instructions-18",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Consonant Contrast: Voiceless /s/ vs. Voiced /z/</h3><p>These are fricative sounds, meaning air is forced through a narrow channel. The only difference is the presence of vocal cord vibration.</p><h4>How to Make the Sounds:</h4><ul><li><strong>Voiceless /s/:</strong> Hissing air forced through the teeth. (e.g., **sink**)</li><li><strong>Voiced /z/:</strong> Buzzing sound made by vibrating the vocal cords while hissing. (e.g., **zinc**)</li></ul>"
        }
      },
      {
        "blockId": "consonants-s-vs-z-chart-19",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /s/ vs. /z/",
          "headers": ["/s/ (Voiceless)", "/z/ (Voiced)", "Video Link"],
          "rows": [
            ["sip", "zip", "https://youtu.be/Yp8x7o7K8tE"],
            ["peace", "peas", "https://youtu.be/9w4G8f1L0qY"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for S and Z.", "longDescription": "The chart contrasts the voiceless /s/ (sip) and voiced /z/ (zip) fricative consonant sounds.", "dataTable": { "headers": ["/s/", "/z/"], "rows": [["sip", "zip"], ["peace", "peas"]] } }
      },
      
      // --- CONSONANT 6: SH /ʃ/ vs ZH /ʒ/ ---
      {
        "blockId": "consonants-sh-vs-zh-instructions-20",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Consonant Contrast: Voiceless /ʃ/ vs. Voiced /ʒ/</h3><p>The 'sh' sound is common, but the voiced 'zh' sound is less common, usually appearing in words of French origin (e.g., **measure**).</p><h4>How to Make the Sounds:</h4><ul><li><strong>Voiceless /ʃ/:</strong> Air forced through rounded lips. (e.g., **sheep**)</li><li><strong>Voiced /ʒ/:</strong> Same position; add vocal cord vibration. (e.g., **measure**)</li></ul>"
        }
      },
      {
        "blockId": "consonants-sh-vs-zh-chart-21",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /ʃ/ vs. /ʒ/",
          "headers": ["/ʃ/ (Voiceless)", "/ʒ/ (Voiced)", "Video Link"],
          "rows": [
            ["ship", "measure (middle)", "https://youtu.be/4e9gT3W5w0c"],
            ["cash", "casual (middle)", "https://youtu.be/h_y6v6B7w7k"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for SH and ZH.", "longDescription": "The chart contrasts the voiceless /ʃ/ (ship) and voiced /ʒ/ (measure) fricative consonant sounds.", "dataTable": { "headers": ["/ʃ/", "/ʒ/"], "rows": [["ship", "measure (middle)"], ["cash", "casual (middle)"]] } }
      },
  
      // --- CONSONANT 7: CH /ʧ/ vs J /ʤ/ ---
      {
        "blockId": "consonants-ch-vs-j-instructions-22",
        "type": "text",
        "data": {
          "htmlContent": "<h3>Consonant Contrast: Voiceless /ʧ/ vs. Voiced /ʤ/</h3><p>These are affricates, meaning they start as a stop sound (air is completely blocked) and end as a fricative (air is released slowly).</p><h4>How to Make the Sounds:</h4><ul><li><strong>Voiceless /ʧ/:</strong> Start like a /t/, release like a /ʃ/. Air only. (e.g., **chip**)</li><li><strong>Voiced /ʤ/:</strong> Start like a /d/, release like a /ʒ/. Add vocal cord vibration. (e.g., **jeep**)</li></ul>"
        }
      },
      {
        "blockId": "consonants-ch-vs-j-chart-23",
        "type": "chart",
        "data": {
          "title": "Practice Minimal Pairs: /ʧ/ vs. /ʤ/",
          "headers": ["/ʧ/ (Voiceless CH)", "/ʤ/ (Voiced J)", "Video Link"],
          "rows": [
            ["chip", "jeep", "https://youtu.be/a-k0L5F02oQ"],
            ["rich", "ridge", "https://youtu.be/8Z4g5u7F9hQ"]
          ]
        },
        "accessibility": { "altText": "Minimal pair chart for CH and J.", "longDescription": "The chart contrasts the voiceless /ʧ/ (chip) and voiced /ʤ/ (jeep) affricate consonant sounds.", "dataTable": { "headers": ["/ʧ/", "/ʤ/"], "rows": [["chip", "jeep"], ["rich", "ridge"]] } }
      },
  
      // ----------------------------------------------------------------------
      //                           RHYTHM AND TECHNIQUES
      // ----------------------------------------------------------------------
  
      // --- RHYTHM AND STRESS SECTION ---
      {
        "blockId": "rhythm-stress-24",
        "type": "text",
        "data": {
          "htmlContent": "<h2>Rhythm and Word Stress</h2><p>American English is a stress-timed language. This means some syllables and words are emphasized and elongated, while others are reduced and spoken quickly. This rhythm is crucial for natural speech.</p><ul><li><strong>Content Words get Stress:</strong> Nouns, main verbs, adjectives, and adverbs carry the main meaning and are stressed.</li><li><strong>Function Words are Reduced:</strong> Prepositions, articles (a, an, the), and auxiliary verbs are often shortened and spoken quickly (schwa sound /ə/).</li></ul><h3>Practice Example</h3><p>Compare: <strong>I</strong> *am* **going** *to* **the** **store** (stress indicated by bold)</p>"
        }
      },
  
      // --- PRACTICE TECHNIQUES SECTION ---
      {
        "blockId": "techniques-25",
        "type": "text",
        "data": {
          "htmlContent": "<h2>Effective Practice Techniques</h2><p>Improving pronunciation requires active listening and focused repetition. Use these techniques:</p><ul><li><strong>Shadowing:</strong> Listen to a native speaker and immediately repeat, trying to match their rhythm, tone, and sound precisely.</li><li><strong>Minimal Pair Focus:</strong> Practice words that differ by only one sound (e.g., 'ship' vs. 'sheep'). This forces your mouth to focus on the exact point of contrast.</li><li><strong>Record Yourself:</strong> This is the most critical step for self-correction. Record yourself speaking, then compare your recording word-by-word with the native speaker model. Repeat this cycle to refine your production.</li><li><strong>Aim for Clarity, Not Perfection:</strong> The goal is clear communication. A slight accent is a natural part of your linguistic identity.</li></ul>"
        }
      },
      
      // --- QUIZ BLOCK ---
      {
        "blockId": "pron-quiz-26",
        "type": "quiz",
        "data": {
          "title": "Pronunciation Review Quiz",
          "questions": [
            {
              "text": "Which sound is TENSE and requires the tongue to be high and forward?",
              "answers": [
                "Short I /ɪ/ (as in 'sit')",
                "Long E /iː/ (as in 'seat')",
                "Short U /ʌ/ (as in 'cup')"
              ],
              "correctAnswer": "2",
              "messageForCorrectAnswer": "Correct! The Long E /iː/ is a tense sound, made high and forward in the mouth.",
              "messageForIncorrectAnswer": "The tense sound is the Long E /iː/. The other two are lax (relaxed) sounds."
            },
            {
              "text": "Which word contains the VOICED 'th' sound /ð/ (buzzing)?",
              "answers": [
                "Think",
                "Three",
                "Mother"
              ],
              "correctAnswer": "3",
              "messageForCorrectAnswer": "Exactly! The 'th' in 'mother' is voiced.",
              "messageForIncorrectAnswer": "The voiced 'th' /ð/ vibrates your vocal cords, as in 'mother' or 'this'."
            },
            {
              "text": "In American English rhythm, which word type is typically stressed?",
              "answers": [
                "Articles (a, an, the)",
                "Prepositions (in, on, at)",
                "Content words (Nouns, Main Verbs)"
              ],
              "correctAnswer": "3",
              "messageForCorrectAnswer": "That's right! Nouns, verbs, adjectives, and adverbs carry the stress.",
              "messageForIncorrectAnswer": "Only content words (nouns, main verbs, etc.) are typically stressed to carry the main meaning."
            }
          ]
        }
      }
    ]
  };
  