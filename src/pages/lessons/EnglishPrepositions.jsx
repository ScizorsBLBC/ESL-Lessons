import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Button
} from '@mui/material';
// FIX: Changed import path
import { prepositionData } from '../../data/prepositionData.js';
// FIX: Changed import paths for components
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';
import ContentBlockRenderer from '../../components/ContentBlockRenderer';
import DetailCard from '../../components/DetailCard';
import PracticeSuite from '../../components/PracticeSuite';
import Quiz from '../../components/Quiz';
import { generateQuiz } from '../../services/vocabularyService';

// --- Reusable Header Component ---
const Header = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      English Prepositions
    </Typography>
    <Typography variant="h6" sx={{ color: 'text.primary' }}>
      What are Prepositions?
    </Typography>
  </Box>
);

// A simple HTML detail renderer is sufficient as all formatting is in the data file.
const genericDetailRenderer = (item) => item.details;

// --- Main Lesson Content ---
const MainContent = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const handleTabChange = (event, newValue) => setActiveTab(newValue);
    const handleActivitySelect = (activity) => setSelectedActivity(activity);
    
    const sections = ["Introduction", "Place (Where?)", "Movement (Direction)", "Time (When?)", "Other Uses", "Practice"];

    // The ContentSelector is versatile and can be used for single items.
    const renderComparisonSection = (data) => (
        <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '1100px', flexGrow: 1, minHeight: 400 }}>
                <ContentSelector 
                    sectionData={[data]} // Pass the single item as an array
                    title={data.title}
                    description=""
                    detailRenderer={genericDetailRenderer}
                    preserveOrder
                />
            </Grid>
        </Grid>
    );
    

    return (
        <Box sx={{ width: '100%' }}>
            <LessonTabs
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                sections={sections}
            />

            {/* Tab 0: Introduction */}
            {activeTab === 0 && renderComparisonSection({ 
                name: "Introduction", 
                title: prepositionData.introduction.title, 
                details: `<p>${prepositionData.introduction.description}</p>` 
            })}

            {/* Tab 1: Place */}
            {activeTab === 1 && <ContentSelector 
                sectionData={prepositionData.place} 
                title="Common Prepositions of Place" 
                description="These prepositions tell us WHERE something or someone is. The subject is in a fixed location." 
                detailRenderer={genericDetailRenderer} 
            />}

            {/* Tab 2: Movement */}
            {activeTab === 2 && (
                <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ContentSelector 
                        sectionData={prepositionData.movement} 
                        title="Common Prepositions of Movement" 
                        description="These prepositions tell us about the DIRECTION or path of movement." 
                        detailRenderer={genericDetailRenderer} 
                    />
                    {/* Render the special comparison after the main movement content */}
                    {renderComparisonSection(prepositionData.comparison)}
                </Grid>
            )}

            {/* Tab 3: Time */}
            {activeTab === 3 && <ContentSelector 
                sectionData={prepositionData.time} 
                title="Common Prepositions of Time" 
                description="These prepositions tell us WHEN something happens." 
                detailRenderer={genericDetailRenderer} 
                preserveOrder // Preserve the IN, ON, AT order for clarity
            />}

            {/* Tab 4: Other Uses (WITH/FOR) */}
            {activeTab === 4 && <ContentSelector 
                sectionData={prepositionData.other} 
                title="Other Useful Prepositions" 
                description="Prepositions can also describe manner, instrument, purpose, and duration." 
                detailRenderer={genericDetailRenderer} 
            />}
            
            {/* Tab 5: Practice */}
            {activeTab === 5 && (
                 <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <Grid item xs={12} sx={{ width: '100%', maxWidth: '1100px', flexGrow: 1 }}>
                         <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                             Interactive Preposition Practice
                         </Typography>
                         <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
                             Choose an activity below to practice your preposition skills.
                         </Typography>

                         {/* Always show the buttons */}
                         <Box sx={{ mb: selectedActivity ? 4 : 0 }}>
                             <ContentSelector
                                 sectionData={[
                                     {
                                         topic: 'Place',
                                         title: 'Place Prepositions Quiz',
                                         details: '<p>Practice location prepositions like "in", "on", "at", "under", and "near".</p>'
                                     },
                                     {
                                         topic: 'Time',
                                         title: 'Time Prepositions Quiz',
                                         details: '<p>Practice time prepositions like "in", "on", and "at" for different time contexts.</p>'
                                     },
                                     {
                                         topic: 'Movement',
                                         title: 'Movement vs Location Quiz',
                                         details: '<p>Practice the difference between "to" (movement) and "at" (location).</p>'
                                     },
                                     {
                                         topic: 'Flashcards',
                                         title: 'Preposition Flashcards',
                                         details: '<p>Interactive flashcards to learn and practice all prepositions with examples. Flashcards only.</p>'
                                     },
                                     {
                                         topic: 'Complete Quiz',
                                         title: 'Complete Quiz',
                                         details: '<p>Comprehensive quiz covering all prepositions with auto-generated questions and smart distractors. Goes directly to the quiz.</p>'
                                     }
                                 ]}
                                 title=""
                                 description=""
                                 detailRenderer={(item) => item.details}
                                 preserveOrder
                                 hideDetailView={true}
                                 selectedItem={selectedActivity}
                                 onItemSelect={handleActivitySelect}
                             />
                         </Box>

                         {/* Show content when an activity is selected */}
                         {selectedActivity && (
                             <Box>
                                {/* Don't show titles above floating panes - keep button labels only */}

                                {selectedActivity.topic === 'Flashcards' ? (
                                     <PracticeSuite contentBlocks={prepositionData} showQuizTab={false} />
                                 ) : selectedActivity.topic === 'Complete Quiz' ? (
                                     (() => {
                                         const quizData = generateQuiz(prepositionData, "Complete Prepositions Quiz", 20);
                                         return quizData ? <Quiz quizData={quizData} /> : <Typography>No quiz available</Typography>;
                                     })()
                                 ) : (
                                     <ContentBlockRenderer
                                         contentBlocks={[
                                             prepositionData.quizContent.find(quiz => {
                                                 const topicMap = {
                                                     'Place': 'place',
                                                     'Time': 'time',
                                                     'Movement': 'movement'
                                                 };
                                                 return quiz.blockId === `prepositions-${topicMap[selectedActivity.topic]}-quiz`;
                                             })
                                         ].filter(Boolean)}
                                     />
                                 )}
                             </Box>
                         )}
                     </Grid>
                 </Grid>
            )}
        </Box>
    );
};

// --- Main Exported Component ---
export default function EnglishPrepositions() {
  useEffect(() => {
    document.title = 'English Prepositions | ESL Lessons';
  }, []);

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <Header />
      <MainContent />
    </Box>
  );
}