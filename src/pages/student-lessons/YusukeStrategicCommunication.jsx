import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, Button, Chip, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
        { name: 'The Soft Suggestion', structure: 'It wouldn\'t hurt to [Action].' },
      ]
    },
    {
      id: 'negotiation',
      title: '2. The "Soft No"',
      icon: '🛡️',
      topic: 'Strategic Negotiation',
      goal: 'Master the "Yes, But, So" framework to push back on unreasonable requests without being negative.',
      vocabulary: [
        { word: 'Viable alternative', def: 'A different option that can work successfully.', example: 'Since we can\'t use video, a GIF is a viable alternative.' },
        { word: 'Strategic alignment', def: 'Ensuring a task matches the company\'s big goals.', example: 'This feature lacks strategic alignment with our Q4 goals.' },
        { word: 'Resource allocation', def: 'Assigning people or time to a task.', example: 'We need to discuss resource allocation for the Android refactor.' },
      ],
      patterns: [
        { name: 'The Pivot', structure: 'I see your point regarding [X], however [Y]...' },
        { name: 'The Condition', structure: 'Proceeding with [Plan] is viable, provided that we [Condition].' }
      ]
    },
    {
      id: 'clarity',
      title: '3. Layman\'s Terms',
      icon: '💡',
      topic: 'Explaining Complexity',
      goal: 'Translate complex iOS/Kotlin concepts into simple visual analogies for non-technical stakeholders.',
      vocabulary: [
        { word: 'Bottleneck', def: 'A point of congestion that slows down a process.', analogy: 'Like a traffic jam where 4 lanes become 1.' },
        { word: 'Bandwidth', def: 'The capacity to handle data or tasks.', analogy: 'Like the width of a water pipe.' },
        { word: 'Latency', def: 'The delay before a transfer of data begins.', analogy: 'Like the time between pressing a pedal and the car moving.' },
        { word: 'Scalability', def: 'The ability to handle growth.', analogy: 'Like building a skyscraper instead of a house.' },
      ],
      patterns: [
        { name: 'The Simile', structure: 'Think of [Technical Term] like [Everyday Object]...' },
        { name: 'The Simplification', structure: 'Essentially, this allows the app to...' }
      ]
    },
    {
      id: 'interview',
      title: '4. The Narrative',
      icon: '🎤',
      topic: 'Reframing the Sabbatical',
      goal: 'Present your career break as a period of active growth ("Upskilling") rather than passivity.',
      vocabulary: [
        { word: 'Upskill', def: 'To learn new skills.', example: 'I used this time to upskill in SwiftUI.' },
        { word: 'Gain perspective', def: 'To see things from a new angle.', example: 'Traveling helped me gain perspective on global tech trends.' },
        { word: 'Recharge', def: 'To regain energy.', example: 'I needed to recharge after 5 years of sprint cycles.' },
        { word: 'Pivot', def: 'To change direction strategically.', example: 'I am looking to pivot into a more leadership-focused role.' },
      ],
      patterns: [
        { name: 'The Active Frame', structure: 'I took the opportunity to [Active Verb]...' },
        { name: 'The Bridge', structure: '...which has prepared me to [Future Value]...' }
      ]
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

const SentenceBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  
  const targetSentence = ["Unless we", "refactor the code", "we run the risk of", "creating bugs"];
  const baseOptions = [
    ["If we don't", "Unless we", "Because we"],
    ["fix the code", "refactor the code", "delete the code"],
    ["we might", "we run the risk of", "it is dangerous"],
    ["making bad things", "creating bugs", "losing money"]
  ];

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
    if (currentStep < baseOptions.length) {
      return shuffleArray(baseOptions[currentStep]);
    }
    return [];
  }, [currentStep, shuffleKey]);

  const handleSelect = (option) => {
    if (option === targetSentence[currentStep]) {
      if (currentStep < targetSentence.length - 1) {
        setCurrentStep(currentStep + 1);
        setFeedback("Correct! Next chunk...");
        // Generate new shuffle for next step
        setShuffleKey(prev => prev + 1);
      } else {
        setFeedback("🎉 Perfect! 'Unless we refactor the code, we run the risk of creating bugs.'");
        setCurrentStep(targetSentence.length); // Done
      }
    } else {
      setFeedback("Try again. Look for the most professional 'Strategic' phrase.");
    }
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
        🧩 Pattern Builder: Conditional Risk
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
        {targetSentence.slice(0, currentStep).map((chunk, i) => (
          <Chip 
            key={i}
            label={chunk}
            color="primary"
            sx={{ 
              fontWeight: 'medium'
            }}
          />
        ))}
        {currentStep < targetSentence.length && (
          <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
            ...waiting for input...
          </Typography>
        )}
      </Box>
      
      {currentStep < targetSentence.length ? (
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
          onClick={() => {
            setCurrentStep(0); 
            setFeedback(null);
            setShuffleKey(prev => prev + 1); // Reshuffle on reset
          }} 
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

const TonePolisher = () => {
  const [selected, setSelected] = useState(null);
  const scenario = "Marketing asks for a feature that will crash the app.";
  
  const options = [
    { text: "No, that's a bad idea. It will break everything.", score: 'low', feedback: "Too direct. This sounds defensive." },
    { text: "We can't do that because the code is messy.", score: 'low', feedback: "Too honest about internal problems. Sounds unprofessional." },
    { text: "That sounds viable, provided that we allocate time to optimize it first.", score: 'high', feedback: "✨ Perfect! You validated the idea ('viable') but set a firm condition ('provided that')." }
  ];

  return (
    <Paper 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper', 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'secondary.main',
        my: 3
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
        🎨 Tone Polisher
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Scenario: {scenario}
      </Typography>
      
      <Stack spacing={1.5}>
        {options.map((opt, i) => (
          <Button
            key={i}
            onClick={() => setSelected(i)}
            fullWidth
            variant="outlined"
            sx={{
              textAlign: 'left',
              justifyContent: 'flex-start',
              p: 2,
              borderRadius: 1,
              borderColor: selected === i 
                ? opt.score === 'high' ? 'secondary.main' : 'error.main'
                : 'divider',
              bgcolor: selected === i 
                ? opt.score === 'high' ? 'background.default' : 'background.default'
                : 'background.paper',
              '&:hover': {
                borderColor: selected === i 
                  ? opt.score === 'high' ? 'secondary.main' : 'error.main'
                  : 'secondary.main',
                bgcolor: 'background.default'
              },
              ...(selected === i && opt.score === 'high' && {
                boxShadow: 2,
                borderWidth: '2px'
              })
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                {opt.text}
              </Typography>
              {selected === i && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 1,
                    color: opt.score === 'high' ? 'secondary.main' : 'error.main',
                    fontWeight: opt.score === 'high' ? 'bold' : 'medium'
                  }}
                >
                  {opt.feedback}
                </Typography>
              )}
            </Box>
          </Button>
        ))}
      </Stack>
    </Paper>
  );
};

const RolePlayScenario = () => {
  const [step, setStep] = useState(0);
  
  const script = [
    {
      role: 'PM (Teacher)',
      text: "Yusuke, design sent this 'Snowfall' video background. It looks amazing for Christmas. I want to ship it next week.",
      hint: "Use the 'Trade-Off Frame' (Strike a balance).",
      target: "It looks great, but we need to strike a balance between visual appeal and app performance."
    },
    {
      role: 'PM (Teacher)',
      text: "Performance? It's just a 10-second video. Modern phones can handle that easily.",
      hint: "Use the 'Conditional Risk Frame' (Unless we...). Mention older Androids.",
      target: "True for iPhone 15, but unless we optimize for older Androids, we run the risk of high uninstall rates."
    },
    {
      role: 'PM (Teacher)',
      text: "Okay, we can't lose users. What do you propose?",
      hint: "Use the 'Recommendation Frame' (Engineering standpoint / Makes sense to...).",
      target: "From an engineering standpoint, it makes more sense to use a static image for older devices."
    }
  ];

  const currentLine = script[step];

  return (
    <Paper 
      elevation={4}
      sx={{ 
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.paper} 100%)`,
        p: 4, 
        borderRadius: 2,
        color: 'text.primary',
        my: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          🎭 Role-Play: The "Christmas Feature" Debate
        </Typography>
        <Chip 
          label={`Step ${step + 1}/${script.length}`}
          size="small"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 'normal'
          }}
        />
      </Box>
      
      <Stack spacing={3}>
        {/* PM Message */}
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
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 'bold', display: 'block', mb: 1 }}>
            {currentLine.role}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
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
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
            🎯 Your Goal:
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, color: 'text.secondary' }}>
            {currentLine.hint}
          </Typography>
          
          <Accordion sx={{ bgcolor: 'rgba(76, 175, 80, 0.2)', border: '1px solid', borderColor: 'success.main' }}>
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
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                  "{currentLine.target}"
                </Typography>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          {step < script.length - 1 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              variant="contained"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              Next Interaction →
            </Button>
          ) : (
            <Button 
              onClick={() => setStep(0)}
              variant="outlined"
              sx={{ 
                borderColor: 'divider',
                color: 'text.primary',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: 'primary.main',
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
            </Paper>

            {/* Interactive Drills Section */}
            {activeTab === 'assessment' && (
              <DrillSection title="Interactive Practice">
                <WarmUpDrill />
                <SentenceBuilder />
                <RolePlayScenario />
              </DrillSection>
            )}

            {activeTab === 'negotiation' && (
              <DrillSection title="Interactive Practice">
                <TonePolisher />
              </DrillSection>
            )}
            
            {activeTab === 'clarity' && (
              <DrillSection title="Interactive Practice">
                <Paper 
                  elevation={1}
                  sx={{ 
                    bgcolor: 'background.paper', 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'secondary.main'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                    🧠 Analogy Challenge
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Try to explain "Technical Debt" to a 5-year-old.
                  </Typography>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 1, bgcolor: 'background.default' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      "Imagine you don't clean your room today so you can play. Tomorrow, the mess is bigger. If you never clean it, eventually you can't even walk in your room."
                    </Typography>
                  </Paper>
                </Paper>
              </DrillSection>
            )}

            {activeTab === 'interview' && (
              <DrillSection title="Interactive Practice">
                <Paper 
                  elevation={1}
                  sx={{ 
                    bgcolor: 'background.paper', 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'primary.main'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                    🎤 The "Gap" Question
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 'medium' }}>
                    Q: "Why is there a gap in your resume?"
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                      Don't say: "I was just resting."
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      Say: "I took a sabbatical to recharge and upskill in modern mobile architecture."
                    </Typography>
                  </Stack>
                </Paper>
              </DrillSection>
            )}

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
              <Paper 
                elevation={3}
                sx={{ 
                  bgcolor: 'background.paper', 
                  p: 3, 
                  borderRadius: 2,
                  mt: 4,
                  border: '2px solid',
                  borderColor: 'primary.main'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                  📝 Homework Task
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  {activeTab === 'assessment' && 'Write a Slack message to a PM explaining why a feature needs to be delayed using the "Trade-Off" frame. Use the pattern: "Proceeding with [X] is viable, provided that we [Y]."'}
                  {activeTab === 'negotiation' && 'Write 3 versions of a "No" email: One rude, one polite, and one strategic.'}
                  {activeTab === 'clarity' && 'Pick 3 technical terms from your last project and write a "Layman Analogy" for each.'}
                  {activeTab === 'interview' && 'Record yourself answering: "Tell me about a time you had to manage a difficult stakeholder."'}
                </Typography>
                <Button 
                  fullWidth 
                  variant="contained"
                  color="primary"
                  sx={{ 
                    py: 1.5,
                    fontWeight: 'bold'
                  }}
                >
                  Submit via Email
                </Button>
              </Paper>
            </Box>
          </Box>

        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default YusukeStrategicCommunication;

