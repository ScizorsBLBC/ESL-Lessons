/**
 * ESL Lessons Hub - Bainur's Entrepreneur Vocabulary Data
 *
 * This module contains specialized vocabulary lessons designed for Bainur, focusing on
 * practical English vocabulary relevant to entrepreneurs, business professionals, and
 * individuals navigating modern American culture, particularly in Los Angeles.
 *
 * @module bainurData
 * @description Comprehensive vocabulary database with 12 lessons covering essential
 * topics for entrepreneurs and modern professionals living in LA
 *
 * @fileoverview
 * This data file follows the established vocabulary lesson schema used throughout
 * the ESL Lessons Hub platform. Each lesson contains:
 * - A unique lesson number (1-12)
 * - A descriptive title
 * - An array of vocabulary words with definitions, sample sentences, and challenge sentences
 *
 * @schema
 * The data structure conforms to the canonical vocabulary schema defined in
 * `src/data/schema.js`. Each word object contains:
 * - word: (string) The vocabulary term
 * - definition: (string) Part of speech and definition
 * - sampleSentence: (string) Example usage in context
 * - challengeSentence: (string) Fill-in-the-blank sentence for quiz generation
 *
 * @lessons
 * 1. Managing Your Apartment & Building - Housing and property management vocabulary
 * 2. The Business of Beauty (Product Creation) - Manufacturing and product development terms
 * 3. From Influencer to CEO (Marketing) - Social media and brand marketing vocabulary
 * 4. Professional Negotiation & Conflict - Business communication and conflict resolution
 * 5. Financial Basics for Founders - Entrepreneurship finance terminology
 * 6. Modern Dating Apps & Relationships - Contemporary dating culture vocabulary
 * 7. LGBTQ+ Culture & Slang (The Scene) - Community-specific terminology and expressions
 * 8. Expressing Emotions & Boundaries - Emotional intelligence and personal boundaries
 * 9. LA Geography & Getting Around - Los Angeles-specific location and transportation terms
 * 10. American Social Etiquette - Cultural norms and social interaction vocabulary
 * 11. Advanced Beauty Industry Words - Professional beauty and cosmetics terminology
 * 12. The LA Entrepreneur Mindset - Startup culture and business development vocabulary
 *
 * @usage
 * ```javascript
 * import { entrepreneurVocabularyData } from './data/bainurData.js';
 *
 * // Access all lessons
 * const allLessons = entrepreneurVocabularyData.lessons;
 *
 * // Access a specific lesson
 * const lesson1 = entrepreneurVocabularyData.lessons.find(l => l.lesson === 1);
 *
 * // Access words from a lesson
 * const words = lesson1.words;
 * ```
 *
 * @integration
 * This data is consumed by:
 * - `src/pages/lessons/BainurVocabularyPage.jsx` - Main lesson page component
 * - `src/pages/DashboardPage.jsx` - Teacher dashboard link generator
 * - `src/App.jsx` - Route configuration
 *
 * @maintenance
 * To add new lessons:
 * 1. Add a new lesson object to the lessons array
 * 2. Ensure lesson numbers are sequential and unique
 * 3. Follow the established word object schema
 * 4. Update this documentation header with the new lesson information
 *
 * @version 1.0.0
 * @since 2024
 * @author ESL Lessons Hub Development Team
 */

export const entrepreneurVocabularyData = {
  lessons: [
    {
      lesson: 1,
      title: "Managing Your Apartment & Building",
      words: [
        {
          word: 'Lease Agreement',
          definition: '(noun) The legal contract you sign to rent an apartment. It lists the rules and the price.',
          sampleSentence: 'I need to check my lease agreement to see if I am allowed to run a business from home.',
          challengeSentence: 'Before getting the keys, you must sign the _______ which outlines the monthly rent and house rules.'
        },
        {
          word: 'Property Manager',
          definition: '(noun) The person who runs the building day-to-day. You call them for repairs or keys.',
          sampleSentence: 'The property manager said they would fix the gate by tomorrow.',
          challengeSentence: 'If your sink breaks, you should call the _______ to arrange a repair.'
        },
        {
          word: 'Tenant',
          definition: '(noun) A person who rents the apartment (you).',
          sampleSentence: 'The building is having a meeting for all tenants on Tuesday.',
          challengeSentence: 'As a _______, you are responsible for keeping your apartment clean and undamaged.'
        },
        {
          word: 'Maintenance Request',
          definition: '(noun) A formal message asking for something to be fixed.',
          sampleSentence: 'My sink is leaking, so I submitted a maintenance request online.',
          challengeSentence: 'The air conditioning stopped working, so I logged into the portal to file a _______.'
        },
        {
          word: 'Security Deposit',
          definition: '(noun) Money you pay before moving in. You get it back when you move out if nothing is broken.',
          sampleSentence: 'I cleaned the apartment perfectly so I can get my full security deposit back.',
          challengeSentence: 'If you damage the walls, the landlord might deduct the cost from your _______.'
        },
        {
          word: 'Tandem Parking',
          definition: '(noun) A parking style common in LA where two cars park one behind the other.',
          sampleSentence: 'My friend and I share tandem parking, so I have to move my car to let him out.',
          challengeSentence: 'We have _______, so if I need to leave early, you have to move your car first.'
        },
        {
          word: 'Guest Permit',
          definition: '(noun) A paper or tag that lets a visitor park in the garage or on the street legally.',
          sampleSentence: 'Do you have a guest permit I can give to my photographer so he doesn\'t get towed?',
          challengeSentence: 'You can park on the street, but make sure to display the _______ on your dashboard.'
        },
        {
          word: 'Prorated Rent',
          definition: '(noun) Rent calculated for only part of the month (if you move in/out in the middle of the month).',
          sampleSentence: 'Since I moved in on the 15th, is the rent prorated for this month?',
          challengeSentence: 'I only lived there for the last 10 days of June, so I paid _______ instead of the full amount.'
        },
        {
          word: 'Amenities',
          definition: '(noun) Extra features in the building like a gym, pool, or rooftop.',
          sampleSentence: 'I pay a lot for this building because the amenities are amazing.',
          challengeSentence: 'The apartment is small, but the building has great _______ like a swimming pool and coworking space.'
        },
        {
          word: 'Freight Elevator',
          definition: '(noun) A large elevator used for moving furniture or heavy boxes.',
          sampleSentence: 'I have a lot of inventory arriving; can I reserve the freight elevator?',
          challengeSentence: 'We need to book the _______ because our sofa won\'t fit in the regular lift.'
        },
        {
          word: 'Sublet',
          definition: '(verb) To rent your apartment to someone else while you are away.',
          sampleSentence: 'I want to sublet my apartment while I am in Paris for Fashion Week.',
          challengeSentence: 'Since I\'ll be traveling for three months, I decided to _______ my room to a student.'
        },
        {
          word: 'Utilities',
          definition: '(noun) Services like electricity, water, gas, and internet.',
          sampleSentence: 'Are utilities included in the rent, or do I pay them separately?',
          challengeSentence: 'My rent is $2000, but that doesn\'t include _______ like electricity and Wi-Fi.'
        }
      ]
    },
    {
      lesson: 2,
      title: "The Business of Beauty (Product Creation)",
      words: [
        {
          word: 'Formulation',
          definition: '(noun) The recipe or chemical mixture of your makeup product.',
          sampleSentence: 'The formulation is too dry; we need to add more oil to the lipstick.',
          challengeSentence: 'We need to change the _______ of this cream because it is causing skin irritation.'
        },
        {
          word: 'Components',
          definition: '(noun) The physical parts of the packaging (jars, lids, pumps, boxes).',
          sampleSentence: 'The cream is ready, but we are waiting for the plastic components to arrive from China.',
          challengeSentence: 'The bottle and the pump are the key _______ of this packaging design.'
        },
        {
          word: 'MOQ (Minimum Order Quantity)',
          definition: '(noun) The smallest amount of product a factory will sell to you.',
          sampleSentence: 'I want to buy these bottles, but the MOQ is 10,000, and I only need 5,000.',
          challengeSentence: 'The factory refused our order because we couldn\'t meet their _______ of 5000 units.'
        },
        {
          word: 'SKU (Stock Keeping Unit)',
          definition: '(noun) A unique ID code for every different product or color you sell.',
          sampleSentence: 'We are launching 10 different lipstick shades, so that is 10 SKUs.',
          challengeSentence: 'We have 50 different _______ in our inventory, including every size and color variation.'
        },
        {
          word: 'Lead Time',
          definition: '(noun) How long it takes from ordering something to receiving it.',
          sampleSentence: 'The lead time for these boxes is 8 weeks, so we must order today.',
          challengeSentence: 'We need to order the jars now because the _______ is three months.'
        },
        {
          word: 'Prototype / Sample',
          definition: '(noun) A test version of your product to see if you like it before making many.',
          sampleSentence: 'The lab sent a prototype, but the color isn\'t dark enough yet.',
          challengeSentence: 'Before we mass produce the bottle, can you send me a _______ to check the quality?'
        },
        {
          word: 'Private Label',
          definition: '(noun) Buying a product that is already made and just putting your logo on it.',
          sampleSentence: 'To start quickly, I will private label the mascara, but I will make the foundation from scratch.',
          challengeSentence: 'Instead of creating a new formula, we decided to _______ an existing shampoo and brand it as our own.'
        },
        {
          word: 'Pigmentation',
          definition: '(noun) How strong and bright the color is.',
          sampleSentence: 'This eyeshadow has amazing pigmentation; you only need one swipe.',
          challengeSentence: 'The lipstick looks bright in the tube, but the _______ is poor when applied to the skin.'
        },
        {
          word: 'Shelf Life',
          definition: '(noun) How long a product stays fresh before it goes bad.',
          sampleSentence: 'What is the shelf life of this serum? Does it expire in 12 months?',
          challengeSentence: 'This product contains natural ingredients, so it has a shorter _______ of only six months.'
        },
        {
          word: 'Contract Manufacturer',
          definition: '(noun) A factory you hire to make your products.',
          sampleSentence: 'I\'m visiting a contract manufacturer in Los Angeles to see if they can make my lotion.',
          challengeSentence: 'We don\'t own a factory, so we pay a _______ to produce our skincare line.'
        }
      ]
    },
    {
      lesson: 3,
      title: "From Influencer to CEO (Marketing)",
      words: [
        {
          word: 'Deliverables',
          definition: '(noun) The specific things (videos, photos) you must give a brand in a deal.',
          sampleSentence: 'The contract says the deliverables are one Reel and two Stories.',
          challengeSentence: 'I haven\'t been paid yet because I haven\'t submitted all the _______ listed in the agreement.'
        },
        {
          word: 'Engagement Rate',
          definition: '(noun) A number showing how much people like/comment on your posts compared to how many followers you have.',
          sampleSentence: 'My followers are loyal, so my engagement rate is very high.',
          challengeSentence: 'Even though she has fewer followers, her _______ is amazing because her fans comment on everything.'
        },
        {
          word: 'Brand Identity',
          definition: '(noun) The "vibe," colors, and logo that make your brand look unique.',
          sampleSentence: 'I want my brand identity to feel luxurious but edgy.',
          challengeSentence: 'Using neon colors and bold fonts is part of our _______.'
        },
        {
          word: 'Call to Action (CTA)',
          definition: '(noun) Telling your followers what to do (e.g., "Click the link," "Buy now").',
          sampleSentence: 'Don\'t forget to put a Call to Action in the caption so people know where to shop.',
          challengeSentence: 'The post got a lot of likes, but no sales because I forgot to include a clear _______.'
        },
        {
          word: 'Press Kit / PR Box',
          definition: '(noun) A box of free products sent to influencers so they will review it.',
          sampleSentence: 'We are designing a beautiful PR box that influencers will want to film.',
          challengeSentence: 'I received a _______ from the brand containing their entire new summer collection.'
        },
        {
          word: 'User-Generated Content (UGC)',
          definition: '(noun) Photos or videos created by normal customers, not by the brand.',
          sampleSentence: 'We should post some UGC to show what the makeup looks like on real people.',
          challengeSentence: 'Instead of hiring models, we are sharing _______ from happy customers on our Instagram.'
        },
        {
          word: 'Affiliate Link',
          definition: '(noun) A special link that pays you money when someone clicks it and buys something.',
          sampleSentence: 'Use my affiliate link to get 20% off your purchase.',
          challengeSentence: 'If you buy the dress through my _______, I earn a small commission.'
        },
        {
          word: 'Teaser',
          definition: '(noun) A post that gives a small hint about a new product to get people excited.',
          sampleSentence: 'I posted a teaser of the packaging, and the comments are going crazy.',
          challengeSentence: 'We posted a _______ showing just the silhouette of the new bottle to build hype.'
        },
        {
          word: 'Media Kit',
          definition: '(noun) A document (like a resume) for influencers showing their stats and prices.',
          sampleSentence: 'Can you send your media kit to the brand so they know your rates?',
          challengeSentence: 'Before we can offer you a sponsorship, please send us your _______ with your audience demographics.'
        }
      ]
    },
    {
      lesson: 4,
      title: "Professional Negotiation & Conflict",
      words: [
        {
          word: 'To reach out',
          definition: '(verb) To contact someone (email/text) to start a conversation.',
          sampleSentence: 'I wanted to reach out because I haven\'t received my rent bill yet.',
          challengeSentence: 'Feel free to _______ to me if you have any questions about the contract.'
        },
        {
          word: 'To touch base',
          definition: '(verb) To contact someone briefly just to check for updates.',
          sampleSentence: 'I\'m calling to touch base on the shipping status of my inventory.',
          challengeSentence: 'Let\'s _______ next week to see how the project is progressing.'
        },
        {
          word: 'To escalate',
          definition: '(verb) To take a problem to a boss because the first person couldn\'t solve it.',
          sampleSentence: 'If the manager doesn\'t reply, I will escalate this to the building owner.',
          challengeSentence: 'The customer service agent couldn\'t help, so I asked to _______ the issue to a supervisor.'
        },
        {
          word: 'In writing',
          definition: '(phrase) Written down (email/letter) so there is proof; not just spoken.',
          sampleSentence: 'That sounds like a good deal; can you send it to me in writing?',
          challengeSentence: 'Do not agree to the price over the phone; make sure you get the offer _______.'
        },
        {
          word: 'Discrepancy',
          definition: '(noun) A mistake or difference between two things that should be the same.',
          sampleSentence: 'There is a discrepancy in my invoice; you charged me $50 too much.',
          challengeSentence: 'The bank noticed a _______ between the signature on the check and the one on file.'
        },
        {
          word: 'Bottom line',
          definition: '(noun) The most important fact; the final result.',
          sampleSentence: 'The bottom line is that I cannot afford this apartment if you raise the rent.',
          challengeSentence: 'We can discuss the details all day, but the _______ is that we need more funding.'
        },
        {
          word: 'Liability',
          definition: '(noun) Legal responsibility if something goes wrong.',
          sampleSentence: 'I have insurance to cover my liability if a customer has an allergic reaction.',
          challengeSentence: 'The company made us sign a waiver to limit their _______ in case of an accident.'
        },
        {
          word: 'To negotiate',
          definition: '(verb) To discuss a price or contract to get a better deal.',
          sampleSentence: 'I tried to negotiate the price of the jars, but they wouldn\'t lower it.',
          challengeSentence: 'Everything at the flea market is flexible, so don\'t be afraid to _______ the price.'
        }
      ]
    },
    {
      lesson: 5,
      title: "Financial Basics for Founders",
      words: [
        {
          word: 'Invoice',
          definition: '(noun) A bill you send to someone so they pay you.',
          sampleSentence: 'I sent the invoice for the brand deal last week, but I haven\'t been paid.',
          challengeSentence: 'Please finish the work and email me the _______ so I can process your payment.'
        },
        {
          word: 'Net 30 / Net 60',
          definition: '(noun) A rule saying payment is due in 30 days or 60 days.',
          sampleSentence: 'The contract is Net 60, so I won\'t get the money for two months.',
          challengeSentence: 'Small businesses often struggle with _______ terms because they have to wait two months for cash.'
        },
        {
          word: 'Tax Write-off',
          definition: '(noun) A business expense that lowers your taxes.',
          sampleSentence: 'Since I am a beauty guru, buying makeup is a tax write-off.',
          challengeSentence: 'I use my car for business deliveries, so the gas mileage is a _______.'
        },
        {
          word: 'Overhead',
          definition: '(noun) The regular costs to run a business (rent, internet, insurance).',
          sampleSentence: 'Working from home keeps my overhead low.',
          challengeSentence: 'We need to move to a smaller office to reduce our monthly _______.'
        },
        {
          word: 'Cash Flow',
          definition: '(noun) The movement of money in and out of your business.',
          sampleSentence: 'My cash flow is tight because I spent all my money on inventory.',
          challengeSentence: 'Even though we are making a profit, our _______ is poor because clients pay us late.'
        },
        {
          word: 'LLC (Limited Liability Company)',
          definition: '(noun) A type of legal business registration that protects your personal money.',
          sampleSentence: 'I need to register my brand as an LLC before I start selling.',
          challengeSentence: 'Forming an _______ protects your personal house and car if your business gets sued.'
        },
        {
          word: 'Bootstrapping',
          definition: '(verb) Starting a business with your own money, no investors.',
          sampleSentence: 'I am bootstrapping my brand right now, so I have to be careful with spending.',
          challengeSentence: 'She grew her company by _______, using her personal savings instead of taking loans.'
        },
        {
          word: 'Wholesale vs. Retail',
          definition: '(noun) Wholesale = selling to stores (cheaper). Retail = selling to customers (full price).',
          sampleSentence: 'The wholesale price is $10, but the retail price at Sephora is $22.',
          challengeSentence: 'If you buy 1000 units, you get the _______ price, but buying just one costs the retail price.'
        }
      ]
    },
    {
      lesson: 6,
      title: "Modern Dating Apps & Relationships",
      words: [
        {
          word: 'To Swipe (Left/Right)',
          definition: '(verb) The action on a phone screen to say No (left) or Yes (right) to a person.',
          sampleSentence: 'I spent all night swiping on Tinder but didn\'t find anyone cute.',
          challengeSentence: 'If you like his profile photo, _______ right to connect with him.'
        },
        {
          word: 'A Match',
          definition: '(noun) When two people both like each other on an app.',
          sampleSentence: 'I got a match with a model, but he hasn\'t messaged me yet.',
          challengeSentence: 'We were a _______ on the app, so we started chatting immediately.'
        },
        {
          word: 'To Ghost',
          definition: '(verb) To stop texting someone suddenly with no explanation.',
          sampleSentence: 'We went on three dates and then he ghosted me. Rude!',
          challengeSentence: 'I thought the date went well, but he decided to _______ me and never replied to my text.'
        },
        {
          word: 'Red Flag',
          definition: '(noun) A warning sign that a person is bad news.',
          sampleSentence: 'He talks about his ex-boyfriend constantly. That is a huge red flag.',
          challengeSentence: 'Being rude to the waiter is a major _______ for me on a first date.'
        },
        {
          word: 'Dealbreaker',
          definition: '(noun) One specific thing that makes you reject someone (e.g., smoking).',
          sampleSentence: 'I like him, but he hates cats, and that is a dealbreaker.',
          challengeSentence: 'I want children someday, so if he doesn\'t, that is a _______.'
        },
        {
          word: 'Exclusive',
          definition: '(adjective) Agreeing to only date each other; serious relationship.',
          sampleSentence: 'We have been dating for two months, and we just decided to be exclusive.',
          challengeSentence: 'Are you still seeing other people, or are you _______ with your boyfriend?'
        },
        {
          word: 'Catfish',
          definition: '(verb/noun) Someone who uses fake photos online.',
          sampleSentence: 'He looked 20 years older than his profile. I got catfished.',
          challengeSentence: 'Be careful online; if he looks too good to be true, he might be a _______.'
        },
        {
          word: 'Thirst Trap',
          definition: '(noun) A sexy photo posted just to get attention.',
          sampleSentence: 'I posted a thirst trap at the gym to see if my crush would like it.',
          challengeSentence: 'He posted a shirtless photo as a _______ to get likes on Instagram.'
        },
        {
          word: 'Hookup',
          definition: '(noun) A meeting just for sex, not for dating.',
          sampleSentence: 'I\'m not looking for a boyfriend right now, just a hookup.',
          challengeSentence: 'He wasn\'t interested in a serious relationship, he just wanted a casual _______.'
        },
        {
          word: 'Situationship',
          definition: '(noun) A romantic relationship that is confusing and not official.',
          sampleSentence: 'I\'ve been in a situationship with him for months and I don\'t know what we are.',
          challengeSentence: 'We act like a couple but we haven\'t labelled it, so it\'s just a _______.'
        }
      ]
    },
    {
      lesson: 7,
      title: "LGBTQ+ Culture & Slang (The Scene)",
      words: [
        {
          word: 'Tea / Spill the Tea',
          definition: '(noun) Gossip or truth.',
          sampleSentence: 'Did you hear what happened at the club? Sit down, I\'m going to spill the tea.',
          challengeSentence: 'I heard a rumor about them; come here and spill the _______!'
        },
        {
          word: 'Shade / To Throw Shade',
          definition: '(noun) Making a rude comment in a clever or subtle way.',
          sampleSentence: 'He didn\'t say I looked bad, but asking if I was tired was definitely shade.',
          challengeSentence: 'She complimented my shoes but in a sarcastic way; she was definitely throwing _______.'
        },
        {
          word: 'To Read',
          definition: '(verb) To insult someone by pointing out their flaws accurately (often funny).',
          sampleSentence: 'He read me for filth about my shoes, but he was right.',
          challengeSentence: 'The drag queen started to _______ the audience members, making jokes about their outfits.'
        },
        {
          word: 'Slay',
          definition: '(verb) To look amazing or do a great job.',
          sampleSentence: 'You absolutely slayed that makeup look.',
          challengeSentence: 'Beyoncé didn\'t just perform; she came to _______ the entire show.'
        },
        {
          word: 'Chosen Family',
          definition: '(noun) Your close friends who support you like family.',
          sampleSentence: 'I\'m spending Christmas with my chosen family this year.',
          challengeSentence: 'His parents aren\'t supportive, so he spends the holidays with his _______ of close friends.'
        },
        {
          word: 'Drag Brunch',
          definition: '(noun) A daytime meal with drag queen performances. (Popular in LA).',
          sampleSentence: 'We are going to drag brunch at Hamburger Mary\'s on Sunday.',
          challengeSentence: 'Let\'s go to a _______ on Sunday; I want pancakes and a show!'
        },
        {
          word: 'Gagged',
          definition: '(adjective) Shocked or amazed (in a good way).',
          sampleSentence: 'When she walked in wearing that dress, I was gagged.',
          challengeSentence: 'The surprise guest performer was so famous that the audience was _______.'
        },
        {
          word: 'Iconic',
          definition: '(adjective) Legendary; perfect.',
          sampleSentence: 'That performance was iconic.',
          challengeSentence: 'Madonna\'s fashion style in the 80s was absolutely _______.'
        },
        {
          word: 'Ally',
          definition: '(noun) A straight person who fights for LGBTQ+ rights.',
          sampleSentence: 'She isn\'t gay, but she is a huge ally.',
          challengeSentence: 'He attends Pride parades every year to show he is an _______ to the community.'
        }
      ]
    },
    {
      lesson: 8,
      title: "Expressing Emotions & Boundaries",
      words: [
        {
          word: 'Overwhelmed',
          definition: '(adjective) Feeling too much stress; unable to cope.',
          sampleSentence: 'I am launching my brand and moving houses; I feel totally overwhelmed.',
          challengeSentence: 'With so many deadlines this week, I am feeling completely _______.'
        },
        {
          word: 'Burnout',
          definition: '(noun) Exhaustion from working too hard for too long.',
          sampleSentence: 'I need a vacation to avoid burnout.',
          challengeSentence: 'Working 12 hours a day for months led to severe _______, and he had to quit.'
        },
        {
          word: 'To set a boundary',
          definition: '(verb) To tell people how you want to be treated; saying "no."',
          sampleSentence: 'I had to set a boundary with my friend; he cannot call me after midnight.',
          challengeSentence: 'It is healthy to _______ with your boss by not checking emails on weekends.'
        },
        {
          word: 'Vibe',
          definition: '(noun) The feeling or mood of a person or place.',
          sampleSentence: 'I didn\'t like the vibe of that party; the people were mean.',
          challengeSentence: 'This cafe has a really chill _______; it\'s perfect for studying.'
        },
        {
          word: 'Imposter Syndrome',
          definition: '(noun) Feeling like you aren\'t actually good at your job, even if you are successful.',
          sampleSentence: 'Even though I worked with Pat McGrath, I still get imposter syndrome.',
          challengeSentence: 'Despite winning the award, she suffered from _______ and felt she didn\'t deserve it.'
        },
        {
          word: 'To Vent',
          definition: '(verb) To talk angrily or sadly just to let the stress out.',
          sampleSentence: 'I don\'t need you to fix the problem, I just need to vent for five minutes.',
          challengeSentence: 'Can I call you? I had a terrible day and I just need to _______.'
        },
        {
          word: 'Gaslighting',
          definition: '(verb) Manipulating someone to make them think they are crazy.',
          sampleSentence: 'He tried gaslighting me by saying he never promised to pay me back.',
          challengeSentence: 'He is _______ you by denying he said those hurtful things when we all heard him.'
        }
      ]
    },
    {
      lesson: 9,
      title: "LA Geography & Getting Around",
      words: [
        {
          word: 'The 405 / The 101',
          definition: '(noun) Major freeways. In LA, we always say "The" before the number.',
          sampleSentence: 'Don\'t take The 405 at 5 PM; it\'s a parking lot.',
          challengeSentence: 'Traffic is terrible on _______ right now, so we should take a different route.'
        },
        {
          word: 'Surface Streets',
          definition: '(noun) Regular city streets (not the freeway).',
          sampleSentence: 'Traffic is bad, let\'s take surface streets.',
          challengeSentence: 'The freeway is blocked due to an accident, so we will have to take the _______.'
        },
        {
          word: 'The Industry',
          definition: '(noun) The Entertainment Industry (Hollywood, Movies, TV).',
          sampleSentence: 'Almost everyone at this party works in The Industry.',
          challengeSentence: 'He moved to LA to be an actor, but breaking into _______ is very difficult.'
        },
        {
          word: 'Valet',
          definition: '(noun) Someone who parks your car for you at a restaurant.',
          sampleSentence: 'This restaurant is valet only, so bring cash for a tip.',
          challengeSentence: 'There is no street parking, so we will have to use the _______ service.'
        },
        {
          word: 'Rideshare',
          definition: '(noun) Uber or Lyft.',
          sampleSentence: 'I\'m going to take a rideshare so I can drink tonight.',
          challengeSentence: 'It\'s cheaper to take a _______ to the airport than to pay for long-term parking.'
        },
        {
          word: 'Erewhon',
          definition: '(noun) A very expensive, trendy grocery store in LA. Famous for smoothies.',
          sampleSentence: 'We saw Hailey Bieber at Erewhon getting a smoothie.',
          challengeSentence: 'I can\'t afford to do my full grocery shop at _______, but I love their prepared foods.'
        },
        {
          word: 'The Westside',
          definition: '(noun) The beach cities (Santa Monica, Venice).',
          sampleSentence: 'I rarely go to The Westside because it takes an hour to drive there.',
          challengeSentence: 'He lives in Santa Monica, so he is definitely a _______ guy.'
        }
      ]
    },
    {
      lesson: 10,
      title: "American Social Etiquette",
      words: [
        {
          word: 'Small Talk',
          definition: '(noun) Polite, light conversation with strangers (weather, weekend plans).',
          sampleSentence: 'Americans love small talk; the cashier asked me about my day.',
          challengeSentence: 'I hate making _______ about the weather in the elevator.'
        },
        {
          word: 'To Tip / Gratuity',
          definition: '(verb/noun) Extra money for service (waiters, drivers). Standard is 20%.',
          sampleSentence: 'Did you include the tip in the payment?',
          challengeSentence: 'The service was excellent, so we left a 25% _______.'
        },
        {
          word: 'Rain Check',
          definition: '(noun) Canceling plans now but promising to do them later.',
          sampleSentence: 'I\'m so tired tonight. Can I take a rain check?',
          challengeSentence: 'I can\'t make it to dinner tonight; can I take a _______ and go next week instead?'
        },
        {
          word: 'To go Dutch / Split the bill',
          definition: '(verb) Everyone pays for their own food.',
          sampleSentence: 'Let\'s just split the bill down the middle.',
          challengeSentence: 'On the first date, he offered to pay, but I preferred to _______.'
        },
        {
          word: 'RSVP',
          definition: '(verb) To answer an invitation (Yes or No).',
          sampleSentence: 'Please RSVP to the launch party by Friday.',
          challengeSentence: 'We need to know how many people are coming, so please _______ by tomorrow.'
        },
        {
          word: 'Potluck',
          definition: '(noun) A party where every guest brings one dish of food.',
          sampleSentence: 'It\'s a potluck, so I am bringing a salad.',
          challengeSentence: 'For the office holiday party, we are having a _______ so everyone should cook something.'
        },
        {
          word: 'Jaywalking',
          definition: '(noun) Walking across the street illegally (not at the corner).',
          sampleSentence: 'Be careful jaywalking in Downtown LA; you can get a ticket.',
          challengeSentence: 'The police officer gave him a ticket for _______ because he didn\'t use the crosswalk.'
        }
      ]
    },
    {
      lesson: 11,
      title: "Advanced Beauty Industry Words",
      words: [
        {
          word: 'Clean Beauty',
          definition: '(noun) Products made without toxic ingredients.',
          sampleSentence: 'My brand is focused on clean beauty standards.',
          challengeSentence: 'Consumers are demanding _______ products that are free from parabens and sulfates.'
        },
        {
          word: 'Cruelty-Free',
          definition: '(adjective) Not tested on animals.',
          sampleSentence: 'Being cruelty-free is very important to my customers.',
          challengeSentence: 'We only buy _______ makeup because we love animals.'
        },
        {
          word: 'Dupe',
          definition: '(noun) A cheaper product that is just as good as an expensive one.',
          sampleSentence: 'This lipstick is a perfect dupe for the Charlotte Tilbury one.',
          challengeSentence: 'I can\'t afford the designer perfume, but I found a great _______ at the drugstore.'
        },
        {
          word: 'Holy Grail',
          definition: '(noun) Your absolute favorite product that you cannot live without.',
          sampleSentence: 'This setting spray is my holy grail.',
          challengeSentence: 'I have tried many moisturizers, but this one is my _______.'
        },
        {
          word: 'Flashback',
          definition: '(noun) When face powder looks white in a flash photo.',
          sampleSentence: 'I need a powder that doesn\'t cause flashback for red carpet photos.',
          challengeSentence: 'She looked great in person, but in the photos, she had terrible _______ from her setting powder.'
        },
        {
          word: 'Undertone',
          definition: '(noun) The color under the skin (Warm, Cool, Neutral).',
          sampleSentence: 'This foundation looks too yellow because I have a cool undertone.',
          challengeSentence: 'It\'s hard to match foundation if you don\'t know if your skin has a pink or yellow _______.'
        },
        {
          word: 'Patch Test',
          definition: '(verb) Testing a product on a small part of your skin to check for allergies.',
          sampleSentence: 'Always patch test new skincare before using it on your face.',
          challengeSentence: 'Before using the dye on your whole head, you should _______ it behind your ear.'
        }
      ]
    },
    {
      lesson: 12,
      title: "The LA Entrepreneur Mindset",
      words: [
        {
          word: 'Hustle',
          definition: '(noun/verb) Working very hard to succeed.',
          sampleSentence: 'Running a brand and being an influencer is a huge hustle.',
          challengeSentence: 'He has a side _______ selling vintage clothes on weekends.'
        },
        {
          word: 'Networking',
          definition: '(verb) Meeting people to help your business.',
          sampleSentence: 'I\'m going to a networking event in West Hollywood tonight.',
          challengeSentence: 'Success in Hollywood is all about _______ and who you know.'
        },
        {
          word: 'Pitch Deck',
          definition: '(noun) A slide presentation used to show investors your business plan.',
          sampleSentence: 'I need to finish my pitch deck before the meeting.',
          challengeSentence: 'We spent all night perfecting the slides for our _______ to show the investors.'
        },
        {
          word: 'Angel Investor',
          definition: '(noun) A rich person who gives money to a new company to help it start.',
          sampleSentence: 'I\'m looking for an angel investor who loves beauty.',
          challengeSentence: 'The bank wouldn\'t give us a loan, so we are looking for an _______ to fund our startup.'
        },
        {
          word: 'Pop-Up Shop',
          definition: '(noun) A temporary store open for a short time.',
          sampleSentence: 'We are hosting a pop-up shop on Melrose Avenue this weekend.',
          challengeSentence: 'The online brand is opening a _______ for one week so customers can try the clothes.'
        },
        {
          word: 'Scalability',
          definition: '(noun) The ability of a business to grow big without breaking.',
          sampleSentence: 'We need scalability in our shipping process in case we go viral.',
          challengeSentence: 'Making everything by hand limits the _______ of the business; we need a factory.'
        },
        {
          word: 'Pop Off',
          definition: '(verb - slang) To go viral or become very successful/popular suddenly.',
          sampleSentence: 'This video is going to pop off on TikTok.',
          challengeSentence: 'After a celebrity wore her dress, her brand started to _______.'
        }
      ]
    }
  ]
};

