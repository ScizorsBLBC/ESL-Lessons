import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Paper, Button, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LessonHeader from '../../components/LessonHeader';
import Footer from '../../components/Footer';

// --- Data & Content ---

const lessonData = {
  title: "Strategic Communication for Mobile Engineers",
  level: "C1 (Advanced)",
  student: "Yusuke K.",
  modules: [
    {
      id: 'assessment',
      title: '1. Strategic Assessment',
      icon: '⚖️',
      topic: 'Weighing Trade-Offs',
      goal: 'Learn to articulate technical risks and propose compromises using the "Trade-Off" and "Conditional Risk" frames.',
      vocabulary: [
        { word: 'Mitigate risk', def: 'To take specific steps to reduce the likelihood or impact of a problem.', example: 'We added extra unit tests to mitigate the risk of regression.' },
        { word: 'Incur technical debt', def: 'To choose an easy solution now that will require rework later.', example: 'If we hard-code this, we incur technical debt.' },
        { word: 'Jeopardize stability', def: 'To put the reliability of the system in danger.', example: 'This patch might jeopardize the stability of the payment gateway.' },
        { word: 'Strike a balance', def: 'To find a compromise between two opposing needs.', example: 'We need to strike a balance between speed and quality.' },
        { word: 'Refactor', def: 'To restructure existing computer code without changing its external behavior.', example: 'It wouldn\'t hurt to refactor the login module.' },
      ],
      patterns: [
        { name: 'The Trade-Off Frame', structure: 'We need to strike a balance between [Benefit] and [Cost].' },
        { name: 'The Conditional Risk', structure: 'Unless we [Mitigation], we run the risk of [Consequence].' },
        { name: 'The Recommendation Frame', structure: 'From an engineering standpoint, it makes more sense to [Action].' },
      ],
      rolePlay: {
        title: 'The "Christmas Feature" Debate',
        steps: [
          { role: 'PM (Teacher)', text: "Yusuke, design sent this 'Snowfall' video background. It looks amazing for Christmas. I want to ship it next week.", hint: "Use the 'Trade-Off Frame' (Strike a balance).", target: "It looks great, but we need to strike a balance between visual appeal and app performance." },
          { role: 'PM (Teacher)', text: "Performance? It's just a 10-second video. Modern phones can handle that easily.", hint: "Use the 'Conditional Risk Frame' (Unless we...). Mention older Androids.", target: "True for iPhone 15, but unless we optimize for older Androids, we run the risk of high uninstall rates." },
          { role: 'PM (Teacher)', text: "Okay, we can't lose users. What do you propose?", hint: "Use the 'Recommendation Frame' (Engineering standpoint / Makes sense to...).", target: "From an engineering standpoint, it makes more sense to use a static image for older devices." }
        ]
      },
      drill: {
        type: 'sentence',
        title: 'Pattern Builder: Conditional Risk',
        target: ["Unless we", "refactor the code", "we run the risk of", "creating bugs"],
        options: [
          ["If we don't", "Unless we", "Because we"],
          ["fix the code", "refactor the code", "delete the code"],
          ["we might", "we run the risk of", "it is dangerous"],
          ["making bad things", "creating bugs", "losing money"]
        ]
      },
      homework: {
        title: "The Trade-Off Analysis",
        task: "Write a formal Slack message to a Product Manager explaining why a specific feature (of your choice) needs to be delayed or modified. You must use the 'Trade-Off Frame' to acknowledge value and the 'Conditional Risk Frame' to explain the danger.",
        constraint: "Must use the phrase: 'Proceeding with [X] is viable, provided that we [Y].' Length: 50-75 words."
      }
    },
    {
      id: 'negotiation',
      title: '2. The "Soft No"',
      icon: '🛡️',
      topic: 'Strategic Negotiation',
      goal: 'Master the "Yes, But, So" framework to push back on unreasonable requests without being negative.',
      vocabulary: [
        { word: 'Viable alternative', def: 'A different option that can work successfully.', example: 'Since the video background is too heavy, a Lottie animation is a viable alternative.' },
        { word: 'Strategic alignment', def: 'Ensuring a task matches the company\'s big goals.', example: 'This custom animation lacks strategic alignment with our Q4 goal of improving app speed.' },
        { word: 'Resource allocation', def: 'Assigning people or time to a task.', example: 'We need to discuss resource allocation; my team is fully booked on the payment integration.' },
      ],
      patterns: [
        { name: 'The Pivot', structure: 'I see your point regarding [X], however [Y]...' },
        { name: 'The Condition', structure: 'Proceeding with [Plan] is viable, provided that we [Condition].' }
      ],
      rolePlay: {
        title: 'Defending Against Scope Creep',
        steps: [
          { role: 'CEO (Teacher)', text: "Yusuke, I want to add a 'Chat with Support' button to the home screen. Can we squeeze that into this sprint?", hint: "Validate the idea, but pivot to the timeline constraint.", target: "I see the strategic value in adding support chat, however, our current sprint is fully committed to the login refactor." },
          { role: 'CEO (Teacher)', text: "But it's just a button. How hard can it be?", hint: "Use 'Resource Allocation' to explain the hidden cost.", target: "The UI is simple, but the backend integration requires significant resource allocation that we haven't planned for." },
          { role: 'CEO (Teacher)', text: "I really need this live by Friday.", hint: "Offer a 'Viable Alternative' or a Condition.", target: "Proceeding by Friday is viable, provided that we pause the login refactor to free up two engineers." }
        ]
      },
      drill: {
        type: 'tone_builder',
        title: 'Advanced Tone Shift',
        scenario: "The CEO asks: 'Can we squeeze the new Analytics Dashboard into this sprint?' (You are fully booked).",
        framework: "The Condition",
        blunt: "No, we are too busy to do that.",
        // The target components the user must assemble
        target: ["proceeding with the dashboard", "is viable,", "provided that we", "pause the payment integration."],
        // Distractors mixed in to confuse the user
        distractors: ["but", "It's impossible", "unless", "I think", "we can't"]
      },
      homework: {
        title: "The Strategic Pushback",
        task: "Draft three versions of an email declining a request to attend a last-minute meeting. Version 1: Too blunt (Rude). Version 2: Too polite (Weak). Version 3: Strategic (Firm but professional).",
        constraint: "For Version 3, you must use the phrase 'Resource Allocation' or 'Strategic Alignment' to justify your absence."
      }
    },
    {
      id: 'clarity',
      title: '3. Layman\'s Terms',
      icon: '💡',
      topic: 'Explaining Complexity',
      goal: 'Translate complex iOS/Kotlin concepts into simple visual analogies for non-technical stakeholders (C-Suite).',
      vocabulary: [
        { word: 'Bottleneck', def: 'A point of congestion that slows down a process.', example: 'The image processing server has become a bottleneck, causing the entire signup flow to timeout.' },
        { word: 'Bandwidth', def: 'The capacity to handle data or tasks.', example: 'The QA team simply doesn\'t have the bandwidth to test this manually before launch.' },
        { word: 'Latency', def: 'The delay before a transfer of data begins.', example: 'High latency in the API is frustrating users; they tap the button and nothing happens for 2 seconds.' },
        { word: 'Scalability', def: 'The ability to handle growth.', example: 'The current database lacks scalability; if we double our user base, it will crash.' },
      ],
      patterns: [
        { name: 'The Executive Analogy', structure: 'Think of [Technical Term] like [Business Concept]...' },
        { name: 'The Bottom Line', structure: 'Essentially, this investment allows us to [Business Value].' }
      ],
      rolePlay: {
        title: 'The Boardroom Pitch: Why Refactor?',
        steps: [
          { role: 'CFO (Teacher)', text: "Yusuke, you want to spend 2 months 'refactoring'? Why should we pay you to rewrite code that already works?", hint: "Use the 'Technical Debt vs. Financial Debt' analogy.", target: "Think of the current code like a high-interest credit card. If we don't pay down the principal (refactor) now, the interest (bugs) will slow us down forever." },
          { role: 'CFO (Teacher)', text: "But will the user see any difference?", hint: "Focus on 'Scalability' and future speed.", target: "Visually, no. But this increases our scalability. It ensures that when we launch the TV campaign, the app won't crash under the load." },
          { role: 'CFO (Teacher)', text: "Okay, so it's an insurance policy?", hint: "Confirm and pivot to 'Velocity'.", target: "Exactly. It also removes the bottleneck in development, meaning we can ship features 2x faster next quarter." }
        ]
      },
      drill: {
        type: 'analogy',
        title: 'Executive Analogy Builder',
        concept: "Technical Debt",
        chunks: ["Think of technical debt", "like a mortgage.", "The longer we wait to fix it,", "the more interest we pay", "in the form of slower updates."]
      },
      homework: {
        title: "The Analogy Library",
        task: "Select three technical terms from your recent work (e.g., API, Latency, Cache). Create one 'Executive Analogy' for each that explains the concept using everyday business terms (like office logistics, traffic, or shipping).",
        constraint: "Each analogy must start with 'Think of [Term] like...' and end with 'Essentially, this means...'"
      }
    },
    {
      id: 'interview',
      title: '4. The Narrative',
      icon: '🎤',
      topic: 'Reframing the Sabbatical',
      goal: 'Present your career break as a period of active growth ("Upskilling") rather than passivity.',
      vocabulary: [
        { word: 'Upskill', def: 'To learn new skills.', example: 'I utilized my time off to upskill in SwiftUI and declarative UI patterns.' },
        { word: 'Gain perspective', def: 'To see things from a new angle.', example: 'Stepping back allowed me to gain perspective on how mobile architecture is evolving globally.' },
        { word: 'Recharge', def: 'To regain energy.', example: 'After 5 years of intense sprint cycles, I needed to recharge to return with renewed focus.' },
        { word: 'Pivot', def: 'To change direction strategically.', example: 'I am looking to pivot from pure individual contribution into a technical leadership role.' },
      ],
      patterns: [
        { name: 'The Active Frame', structure: 'I took the opportunity to [Active Verb]...' },
        { name: 'The Bridge', structure: '...which has prepared me to [Future Value]...' }
      ],
      rolePlay: {
        title: 'The Behavioral Interview',
        steps: [
          { role: 'Interviewer', text: "I see a gap in your resume since last year. What have you been doing?", hint: "Use 'Upskill' and 'Active Frame'. Avoid saying 'Just relaxing'.", target: "I took a planned sabbatical to upskill in modern Android architecture and travel." },
          { role: 'Interviewer', text: "Oh, nice. But are you ready to jump back into a high-pressure environment?", hint: "Use 'Recharge' and 'Renewed Focus'.", target: "Absolutely. The break allowed me to recharge. I'm actually eager to apply the new perspectives I gained to a team environment." },
          { role: 'Interviewer', text: "Why our company specifically?", hint: "Connect your new skills to their needs.", target: "I saw you are migrating to Kotlin Multiplatform. That aligns perfectly with the research I conducted during my break." }
        ]
      },
      drill: {
        type: 'star',
        title: 'STAR Method Builder',
        context: "Tell me about a time you handled a crisis.",
        // Removed explicit prefixes S/T/A/R to challenge the student
        chunks: [
          "Our app crashed on Black Friday due to high traffic.", 
          "I had to identify the root cause immediately.", 
          "I led a war room and rolled back the deployment within 15 minutes.", 
          "We restored service fully and saved Q4 revenue targets."
        ]
      },
      homework: {
        title: "The STAR Storyboard",
        task: "Prepare one STAR story (Situation, Task, Action, Result) for the interview question: 'Tell me about a time you had to manage a difficult stakeholder.'",
        constraint: "Record yourself speaking the answer. It must be under 2 minutes. Ensure the 'Action' section is the longest part of your answer."
      }
    }
  ]
};

// --- Interactive Components ---

const VocabularyCard = ({ word, def, example, analogy }) => (
    <Paper 
      elevation={1}
      sx={{ 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          boxShadow: 4
        },
        transition: 'box-shadow 0.3s'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
        {word}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
        {def}
      </Typography>
      {analogy && (
        <Box 
          sx={{ 
            bgcolor: 'background.default', 
            p: 2, 
            borderRadius: 1, 
            mb: 2,
            border: '1px solid',
            borderColor: 'secondary.main',
            borderLeft: '4px solid',
            borderLeftColor: 'secondary.main'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'semibold', color: 'text.primary', mb: 0.5 }}>
            💡 Analogy:
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {analogy}
          </Typography>
        </Box>
      )}
      <Box 
        sx={{ 
          bgcolor: 'background.default', 
          p: 2, 
          borderRadius: 1,
          borderLeft: '4px solid',
          borderColor: 'primary.main'
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          "{example}"
        </Typography>
    </Box>
  </Paper>
);

const DrillSection = ({ title, children }) => (
  <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
        <Typography>⚡</Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        {title}
      </Typography>
    </Box>
    {children}
  </Paper>
);

const WarmUpDrill = () => {
  const [revealed, setRevealed] = useState({});

  const items = [
    { problem: "The code is messy.", action: "refactor it" },
    { problem: "We aren't sure if users want this.", action: "run A/B testing" },
    { problem: "The deadline is too tight.", action: "ask for an extension" },
    { problem: "The new library looks complicated.", action: "try it / build a prototype" }
  ];

  return (
    <Paper 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper', 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'primary.main',
        mb: 3
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
        🔥 Warm-Up: "It wouldn't hurt to..."
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Respond to the problem using the pattern: <strong>"It wouldn't hurt to [Action]."</strong>
      </Typography>
      
      <Stack spacing={1.5}>
        {items.map((item, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 1
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary', mb: { xs: 1, sm: 0 } }}>
              ❌ {item.problem}
            </Typography>
            <Button
              onClick={() => setRevealed({...revealed, [i]: !revealed[i]})}
              variant="outlined"
              size="small"
              color="primary"
              sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
            >
              {revealed[i] ? `✅ "It wouldn't hurt to ${item.action}."` : "Reveal Answer"}
            </Button>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

const SequenceBuilder = ({ title, chunks }) => {
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState("");

  // Shuffle on mount and when chunks change
  useEffect(() => {
    setAvailable([...chunks].sort(() => Math.random() - 0.5));
    setSelected([]);
    setFeedback("");
  }, [chunks]);

  const handleAdd = (chunk) => {
    const newSelected = [...selected, chunk];
    setSelected(newSelected);
    setAvailable(available.filter(c => c !== chunk));

    // Check correctness (simple strict order check against original chunks)
    const index = newSelected.length - 1;
    if (chunk !== chunks[index]) {
      setFeedback("⚠️ Hmmm, that piece doesn't fit the logical flow here. Reset to try again.");
    } else if (newSelected.length === chunks.length) {
      setFeedback("🎉 Excellent! That is a structured, executive-level response.");
    } else {
      setFeedback("");
    }
  };

  const reset = () => {
    setAvailable([...chunks].sort(() => Math.random() - 0.5));
    setSelected([]);
    setFeedback("");
  };

  return (
    <Paper 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper', 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        mb: 3
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
        🧩 {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Click the chunks in the correct order to build the response.
      </Typography>
      
      {/* Drop Zone */}
      <Box 
        sx={{ 
          minHeight: '60px',
          p: 2,
          bgcolor: 'background.default',
          borderRadius: 1,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          mb: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {selected.map((s, i) => (
          <Chip 
            key={i}
            label={s}
            color="primary"
            sx={{ 
              fontWeight: 'medium',
              border: '1px solid',
              borderColor: 'primary.main'
            }}
          />
        ))}
        {selected.length === 0 && (
          <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
            Select chunks below...
          </Typography>
        )}
      </Box>

      {/* Feedback */}
      {feedback && (
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            fontWeight: 'bold',
            color: feedback.includes('Excellent') ? 'success.main' : 'warning.main'
          }}
        >
          {feedback}
        </Typography>
      )}

      {/* Pool */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {available.map((chunk, i) => (
          <Button
            key={i}
            onClick={() => handleAdd(chunk)}
            variant="outlined"
            disabled={feedback.includes('⚠️')}
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'background.default'
              },
              '&:disabled': {
                opacity: 0.5
              }
            }}
          >
            {chunk}
          </Button>
        ))}
      </Stack>

      {selected.length > 0 && (
        <Button 
          onClick={reset} 
          size="small"
          sx={{ 
            mt: 2,
            color: 'text.secondary',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              color: 'primary.main'
            }
          }}
        >
          Reset Drill
        </Button>
      )}
    </Paper>
  );
};

const SentenceBuilder = ({ title, target, options }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Shuffle function to randomize array order
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle options for current step whenever step or shuffleKey changes
  const shuffledOptions = useMemo(() => {
    if (currentStep < options.length && options[currentStep]) {
      return shuffleArray(options[currentStep]);
    }
    return [];
  }, [currentStep, shuffleKey, options]);

  // Guard clause if no target or options
  if (!target || !options) return null;

  const handleSelect = (option) => {
    if (option === target[currentStep]) {
      if (currentStep < target.length - 1) {
        setCurrentStep(currentStep + 1);
        setFeedback("Correct! Next chunk...");
        // Generate new shuffle for next step
        setShuffleKey(prev => prev + 1);
      } else {
        setFeedback("🎉 Perfect Sequence!");
        setCurrentStep(target.length); // Done
      }
    } else {
      setFeedback("Try again. Think about the logical flow.");
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setFeedback(null);
    setShuffleKey(prev => prev + 1); // Reshuffle on reset
  };

  return (
    <Paper 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper', 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'primary.main',
        my: 3
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
        🧩 {title}
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1, 
          mb: 3,
          minHeight: '50px',
          alignItems: 'center',
          p: 2,
          bgcolor: 'background.default',
          borderRadius: 1,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {target.slice(0, currentStep).map((chunk, i) => (
          <Chip 
            key={i}
            label={chunk}
            color="primary"
            sx={{ 
              fontWeight: 'medium'
            }}
          />
        ))}
        {currentStep < target.length && (
          <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
            ...waiting for input...
          </Typography>
        )}
      </Box>
      
      {currentStep < target.length ? (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {shuffledOptions.map((opt, i) => (
            <Button 
              key={i}
              onClick={() => handleSelect(opt)}
              variant="outlined"
              color="primary"
            >
              {opt}
            </Button>
          ))}
        </Stack>
      ) : (
        <Button 
          onClick={reset} 
          variant="contained"
          color="primary"
        >
          Reset Drill
        </Button>
      )}
      {feedback && (
        <Typography variant="body2" sx={{ mt: 2, color: 'text.primary', fontWeight: 'medium' }}>
          {feedback}
        </Typography>
      )}
    </Paper>
  );
};

const TonePolisher = ({ scenario, options }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  const reset = () => {
    setSelected(null);
  };

  return (
    <Paper 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper', 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1,
        mb: 3
      }}
    >
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box 
          sx={{ 
            p: 1, 
            bgcolor: 'success.light', 
            color: 'success.main',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography>🎨</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Tone Polisher
        </Typography>
      </Box>
      
      {/* Scenario Box */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'background.default',
          p: 2,
          borderRadius: 1,
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          mb: 3
        }}
      >
        <Typography 
          variant="overline" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'text.secondary', 
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            display: 'block',
            mb: 0.5
          }}
        >
          Scenario
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary', fontSize: '1.125rem' }}>
          {scenario}
        </Typography>
      </Paper>
      
      {/* Options */}
      <Stack spacing={1.5}>
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isHigh = opt.score === 'high';
          
          // Determine styles based on state
          let borderColor = 'divider';
          let bgColor = 'background.paper';
          let ringColor = 'transparent';
          
          if (selected !== null) {
            if (isSelected) {
              borderColor = isHigh ? 'success.main' : 'error.main';
              bgColor = isHigh ? 'success.light' : 'error.light';
              ringColor = isHigh ? 'success.main' : 'error.main';
            } else if (isHigh && selected !== null) {
              // Show correct answer if wrong one was picked
              borderColor = 'success.main';
              bgColor = 'success.light';
            }
          }

          return (
            <Button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              fullWidth
              variant="outlined"
              sx={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                p: 2,
                borderRadius: 2,
                borderWidth: '2px',
                borderColor: borderColor,
                bgcolor: bgColor,
                position: 'relative',
                boxShadow: ringColor !== 'transparent' ? `0 0 0 1px ${ringColor}` : 'none',
                '&:hover': {
                  borderColor: selected === null ? 'primary.main' : borderColor,
                  bgcolor: selected === null ? 'background.default' : bgColor
                },
                '&:disabled': {
                  borderColor: borderColor,
                  bgcolor: bgColor,
                  opacity: 1
                }
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, width: '100%', alignItems: 'flex-start' }}>
                {/* Radio Button Circle */}
                <Box
                  sx={{
                    mt: 0.5,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: isSelected 
                      ? (isHigh ? 'success.main' : 'error.main')
                      : 'divider',
                    bgcolor: isSelected 
                      ? (isHigh ? 'success.main' : 'error.main')
                      : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  {isSelected && (isHigh ? '✓' : '✕')}
                </Box>
                
                {/* Option Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: isSelected ? 'semibold' : 'medium',
                      color: 'text.primary',
                      fontSize: '1.125rem'
                    }}
                  >
                    {opt.text}
                  </Typography>
                  
                  {isSelected && (
                    <Box
                      sx={{
                        mt: 1.5,
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: isHigh ? 'success.light' : 'error.light',
                        color: isHigh ? 'success.dark' : 'error.dark',
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      {isHigh ? '✨ ' : '💡 '}{opt.feedback}
                    </Box>
                  )}
                </Box>
              </Box>
            </Button>
          );
        })}
      </Stack>

      {/* Reset Button */}
      {selected !== null && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            onClick={reset}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'transparent'
              },
              fontSize: '0.875rem',
              fontWeight: 'medium',
              textTransform: 'none'
            }}
            startIcon={<Typography>↺</Typography>}
          >
            Try Again
          </Button>
        </Box>
      )}
    </Paper>
  );
};

const ToneShiftBuilder = ({ scenario, framework, blunt, target, distractors }) => {
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('building'); // building, error, success

  // Initialize pool on mount
  useEffect(() => {
    const allChunks = [...target, ...distractors];
    // Simple shuffle
    setAvailable(allChunks.sort(() => Math.random() - 0.5));
    setSelected([]);
    setStatus('building');
  }, [scenario, target, distractors]); // Reset if scenario changes

  const handleAdd = (chunk) => {
    const newSelected = [...selected, chunk];
    setSelected(newSelected);
    setAvailable(available.filter(c => c !== chunk));
    
    // Real-time validation
    const currentIndex = newSelected.length - 1;
    if (chunk !== target[currentIndex]) {
      setStatus('error');
    } else {
      if (newSelected.length === target.length) {
        setStatus('success');
      } else {
        setStatus('building');
      }
    }
  };

  const handleReset = () => {
    const allChunks = [...target, ...distractors];
    setAvailable(allChunks.sort(() => Math.random() - 0.5));
    setSelected([]);
    setStatus('building');
  };

  return (
    <Paper 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper', 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1,
        mb: 3
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box 
          sx={{ 
            p: 1, 
            bgcolor: 'secondary.light', 
            color: 'secondary.main',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography>🧠</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Advanced Tone Shift
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
            Deconstruct the thought & reconstruct the strategy.
          </Typography>
        </Box>
      </Box>

      {/* Challenge Box */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: 'background.default',
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography 
              variant="overline" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'text.secondary', 
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                display: 'block',
                mb: 0.5
              }}
            >
              Scenario
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium', lineHeight: 1.7 }}>
              {scenario}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: 'background.default',
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography 
              variant="overline" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'text.secondary', 
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                display: 'block',
                mb: 0.5
              }}
            >
              Target Strategy
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'secondary.main'
                }}
              />
              <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                {framework}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Transformation Zone */}
      <Stack spacing={2}>
        {/* Blunt Input (Locked) */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              bgcolor: 'error.main',
              borderRadius: '4px 0 0 4px'
            }}
          />
          <Paper
            elevation={0}
            sx={{
              bgcolor: 'background.default',
              p: 2,
              pl: 3,
              borderRadius: '0 4px 4px 0',
              border: '1px solid',
              borderColor: 'error.main',
              borderLeft: 'none'
            }}
          >
            <Typography 
              variant="overline" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'error.main', 
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                display: 'block',
                mb: 0.5
              }}
            >
              Internal Monologue (Too Blunt)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
              "{blunt}"
            </Typography>
          </Paper>
          {/* Arrow */}
          <Box
            sx={{
              position: 'absolute',
              left: 2,
              bottom: -16,
              zIndex: 10,
              color: 'text.disabled',
              fontSize: '1.5rem'
            }}
          >
            ↓
          </Box>
        </Box>

        {/* Polished Output (Drop Zone) */}
        <Paper
          elevation={0}
          sx={{
            minHeight: '80px',
            borderRadius: 2,
            border: '2px dashed',
            borderColor: status === 'error' 
              ? 'error.main' 
              : status === 'success' 
                ? 'success.main' 
                : 'primary.main',
            bgcolor: status === 'error' 
              ? 'background.default' 
              : status === 'success' 
                ? 'background.default' 
                : 'background.default',
            p: 2,
            position: 'relative',
            transition: 'all 0.3s'
          }}
        >
          <Typography 
            variant="overline" 
            sx={{ 
              fontWeight: 'bold', 
              color: status === 'error' 
                ? 'error.main' 
                : status === 'success' 
                  ? 'success.main' 
                  : 'primary.main',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              display: 'block',
              mb: 1
            }}
          >
            Reconstructed Message
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selected.map((chunk, i) => (
              <Chip
                key={i}
                label={chunk}
                sx={{
                  fontWeight: 'medium',
                  boxShadow: 1,
                  border: '1px solid',
                  borderColor: status === 'error' && i === selected.length - 1
                    ? 'error.main'
                    : 'divider',
                  bgcolor: status === 'error' && i === selected.length - 1
                    ? 'error.light'
                    : 'background.paper',
                  color: status === 'error' && i === selected.length - 1
                    ? 'error.dark'
                    : 'text.primary'
                }}
              />
            ))}
            {selected.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.875rem' }}>
                Select fragments below to build the sentence...
              </Typography>
            )}
          </Box>

          {/* Status Message */}
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            {status === 'error' && <Typography sx={{ color: 'error.main', fontSize: '1.5rem' }}>⚠️</Typography>}
            {status === 'success' && <Typography sx={{ color: 'success.main', fontSize: '1.5rem' }}>✅</Typography>}
          </Box>
        </Paper>
      </Stack>

      {/* Interaction Area */}
      <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        {status === 'error' ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'medium', mb: 2 }}>
              That structure is structurally or strategically weak. Try again.
            </Typography>
            <Button 
              onClick={handleReset} 
              variant="outlined"
              sx={{
                bgcolor: 'background.default',
                color: 'text.secondary',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'background.paper',
                  borderColor: 'text.secondary'
                }
              }}
            >
              ↺ Reset Construction
            </Button>
          </Box>
        ) : status === 'success' ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold', mb: 2 }}>
              ✨ Perfect Execution! You balanced firmness with professionalism.
            </Typography>
            <Button 
              onClick={handleReset}
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
                textTransform: 'none',
                textDecoration: 'underline',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                  bgcolor: 'transparent'
                }
              }}
            >
              Practice Again
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {available.map((chunk, i) => (
              <Button
                key={i}
                onClick={() => handleAdd(chunk)}
                variant="outlined"
                sx={{
                  bgcolor: 'background.paper',
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    boxShadow: 2,
                    bgcolor: 'background.default'
                  },
                  transition: 'all 0.2s',
                  '&:active': {
                    transform: 'scale(0.95)'
                  }
                }}
              >
                {chunk}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

const RolePlayScenario = ({ data }) => {
  const [step, setStep] = useState(0);
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  
  // Reset accordion when step changes
  useEffect(() => {
    setAccordionExpanded(false);
  }, [step]);
  
  // Guard clause if no role play data
  if (!data) return null;

  const script = data.steps;
  const currentLine = script[step];

  return (
    <Paper 
      elevation={4}
      sx={{ 
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main} 0%, ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[800]} 100%)`,
        p: 4, 
        borderRadius: 2,
        color: 'white',
        my: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
          🎭 Role-Play: {data.title}
        </Typography>
        <Chip 
          label={`Step ${step + 1}/${script.length}`}
          size="small"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 'normal',
            fontSize: '0.75rem'
          }}
        />
      </Box>
      
      <Stack spacing={3}>
        {/* PM/Boss Message */}
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            p: 2,
            borderRadius: 1,
            borderLeft: '4px solid',
            borderColor: 'secondary.main',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 'bold', display: 'block', mb: 1, fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            {currentLine.role}
          </Typography>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {currentLine.text}
          </Typography>
        </Paper>

        {/* User Task */}
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            p: 2,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'primary.main'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
            🎯 Your Goal:
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
            {currentLine.hint}
          </Typography>
          
          <Accordion 
            expanded={accordionExpanded}
            onChange={(event, isExpanded) => setAccordionExpanded(isExpanded)}
            sx={{ bgcolor: 'rgba(76, 175, 80, 0.2)', border: '1px solid', borderColor: 'success.main' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'success.main' }} />}>
              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'semibold' }}>
                👀 Reveal Target Response
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  bgcolor: 'rgba(76, 175, 80, 0.3)',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'success.main'
                }}
              >
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'medium' }}>
                  "{currentLine.target}"
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, borderTop: '1px solid', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          {step < script.length - 1 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              variant="contained"
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
            >
              Next Interaction →
            </Button>
          ) : (
            <Button 
              onClick={() => setStep(0)}
              variant="outlined"
              sx={{ 
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              ↺ Reset Scenario
            </Button>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

// --- Main Page Component ---

const YusukeStrategicCommunication = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  const currentModule = lessonData.modules.find(m => m.id === activeTab);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 'xl', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: 6 }}>
        <LessonHeader 
          title={lessonData.title}
          subtitle={`${lessonData.level} - Tailored for ${lessonData.student} - Focus on Strategic Collocations & Patterns.`}
        />

        {/* Custom Tab Navigation */}
        <Box 
          sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: 1, 
            pb: 2, 
            mb: 4,
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&::-webkit-scrollbar': {
              height: '8px'
            }
          }}
        >
          {lessonData.modules.map((mod) => (
            <Button
              key={mod.id}
              onClick={() => setActiveTab(mod.id)}
              variant={activeTab === mod.id ? 'contained' : 'outlined'}
              startIcon={<Typography>{mod.icon}</Typography>}
              sx={{
                whiteSpace: 'nowrap',
                borderRadius: '999px',
                px: 3,
                py: 1.5,
                fontWeight: 'medium',
                ...(activeTab === mod.id && {
                  boxShadow: 2
                })
              }}
            >
              {mod.title}
            </Button>
          ))}
        </Box>

        {/* Content Area */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4 }}>
          
          {/* Main Lesson Content (Left 2/3) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            
            {/* Intro Section */}
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                {currentModule.title}: {currentModule.topic}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
                {currentModule.goal}
              </Typography>
              
              <Box 
                sx={{ 
                  bgcolor: 'background.default', 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2, display: 'block' }}>
                  Key Sentence Patterns
                </Typography>
                <Stack spacing={2}>
                  {currentModule.patterns.map((pat, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Chip 
                        label="PATTERN" 
                        size="small"
                        color="primary"
                        sx={{ 
                          fontWeight: 'bold',
                          mt: 0.5
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'semibold', color: 'text.primary', mb: 0.5 }}>
                          {pat.name}
                        </Typography>
                        <Paper 
                          component="code"
                          elevation={0}
                          sx={{ 
                            bgcolor: 'background.paper',
                            color: 'primary.main',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            display: 'block',
                            mt: 0.5,
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            border: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          {pat.structure}
                        </Paper>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* STAR Method Explanation for Interview Module */}
              {activeTab === 'interview' && (
                <Box 
                  sx={{ 
                    bgcolor: 'background.default', 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    mt: 3
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    ⭐ The STAR Method
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    Use this framework to structure every behavioral interview answer.
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2
                    }}
                  >
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                        S - Situation
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        Set the scene and give the necessary details of your example.
                      </Typography>
                    </Paper>
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                        T - Task
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        Describe what your responsibility was in that situation.
                      </Typography>
                    </Paper>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 1, 
                        border: '2px solid', 
                        borderColor: 'primary.main',
                        boxShadow: 3
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                        A - Action (Key!)
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        Explain exactly what steps you took to address it.
                      </Typography>
                    </Paper>
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                        R - Result
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        Share what outcomes your actions achieved.
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Interactive Drills Section */}
            <DrillSection title="Interactive Practice">
              {activeTab === 'assessment' && <WarmUpDrill />}

              {/* Conditional Rendering of Drill Types */}
              {currentModule.drill && currentModule.drill.type === 'sentence' && (
                <SentenceBuilder 
                  title={currentModule.drill.title}
                  target={currentModule.drill.target}
                  options={currentModule.drill.options}
                />
              )}

              {currentModule.drill && currentModule.drill.type === 'tone_builder' && (
                <ToneShiftBuilder 
                  scenario={currentModule.drill.scenario}
                  framework={currentModule.drill.framework}
                  blunt={currentModule.drill.blunt}
                  target={currentModule.drill.target}
                  distractors={currentModule.drill.distractors}
                />
              )}

              {currentModule.drill && (currentModule.drill.type === 'analogy' || currentModule.drill.type === 'star') && (
                <SequenceBuilder
                  title={currentModule.drill.title}
                  chunks={currentModule.drill.chunks}
                />
              )}

              {/* Dynamic Role Play */}
              {currentModule.rolePlay && (
                <RolePlayScenario data={currentModule.rolePlay} />
              )}
            </DrillSection>

          </Box>

          {/* Vocabulary Sidebar (Right 1/3) */}
          <Box>
            <Box sx={{ position: 'sticky', top: 16 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  Target Vocabulary
                </Typography>
                <Chip 
                  label={`${currentModule.vocabulary.length} Words`}
                  size="small"
                  color="primary"
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              
              <Stack spacing={2}>
                {currentModule.vocabulary.map((item, i) => (
                  <VocabularyCard key={i} {...item} />
                ))}
              </Stack>

              {/* Homework Box */}
              {currentModule.homework && (
                <Paper 
                  elevation={3}
                  sx={{ 
                    bgcolor: 'background.paper', 
                    p: 3, 
                    borderRadius: 2,
                    mt: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 4
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography>📝</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                      {currentModule.homework.title}
                    </Typography>
                  </Box>
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Box>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: 'text.secondary', 
                          fontSize: '0.7rem',
                          letterSpacing: '0.1em',
                          display: 'block',
                          mb: 0.5
                        }}
                      >
                        The Task
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {currentModule.homework.task}
                      </Typography>
                    </Box>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        bgcolor: 'background.default', 
                        p: 2, 
                        borderRadius: 1, 
                        border: '1px solid',
                        borderColor: 'primary.main'
                      }}
                    >
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: 'primary.main', 
                          fontSize: '0.7rem',
                          letterSpacing: '0.1em',
                          display: 'block',
                          mb: 0.5
                        }}
                      >
                        Constraint
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'medium' }}>
                        {currentModule.homework.constraint}
                      </Typography>
                    </Paper>
                  </Stack>
                  <Button 
                    fullWidth 
                    variant="contained"
                    color="primary"
                    sx={{ 
                      py: 1.5,
                      fontWeight: 'bold',
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 4
                      }
                    }}
                  >
                    Submit via Email →
                  </Button>
                </Paper>
              )}
            </Box>
          </Box>

        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default YusukeStrategicCommunication;

