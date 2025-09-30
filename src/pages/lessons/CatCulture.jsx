import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@mui/material';
// FIX: Changed to import the renamed .js file
import { catCultureData } from '../../data/catCultureData.js';
import ContentSelector from '../../components/ContentSelector';
import LessonTabs from '../../components/LessonTabs';
import ChartSection from '../../components/ChartSection';

// --- Helper Components (Header, CustomTable) ---
const Header = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
      The Feline Economy: Culture and Commerce
    </Typography>
    <Typography variant="h6" sx={{ color: 'text.primary' }}>
      Advanced English: Analyzing the cultural and commercial impact of the domestic cat.
    </Typography>
  </Box>
);

const CustomTable = ({ tableData }) => (
    <Paper sx={{overflow: 'hidden'}}>
    <TableContainer>
        <Box sx={{ p: 2, textAlign: 'center' }}>
             <Typography variant="h5" component="h3" color="text.secondary">{tableData.title}</Typography>
        </Box>
        <Table stickyHeader aria-label={tableData.title}>
            <TableHead><TableRow>{tableData.headers.map(h => <TableCell key={h}><strong>{h}</strong></TableCell>)}</TableRow></TableHead>
            <TableBody>
                {tableData.rows.map((row, i) => <TableRow key={i}>{row.map((cell, j) => <TableCell key={j} dangerouslySetInnerHTML={{ __html: cell }} />)}</TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
    </Paper>
);


// --- Main Lesson Content ---
const MainContent = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event, newValue) => setActiveTab(newValue);
    const sections = ["Cultural Archetypes", "Feline Terminology", "Key Vocabulary", "Strategy Brief (Homework)"];

    const genericDetailRenderer = (item) => item.details;

    const vocabularyDetailRenderer = (item) => `
        <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">Vocabulary for ${item.topic}</h3>
        <ul style="list-style-position: inside; padding-left: 0; margin: 0; display: grid; gap: 1em;">
            ${item.terms.map(t => `<li><strong>${t.term}:</strong><p style="margin: 0.25em 0 0 0;">${t.definition}</p></li>`).join('')}
        </ul>
    `;

    const homeworkDetailRenderer = (item) => `
        <h3 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em;">${item.title} (Topic: ${item.topic})</h3>
        <div>${item.details}</div>
    `;

    return (
        <Box sx={{ width: '100%' }}>
            <LessonTabs
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                sections={sections}
            />
            
            {activeTab === 0 && <ContentSelector 
                sectionData={catCultureData.archetypes} 
                title="Cultural Archetype Analysis" 
                description="Analyze the cat's symbolism from ancient deity to modern internet celebrity." 
                detailRenderer={genericDetailRenderer} 
                preserveOrder 
            />}

            {activeTab === 1 && <ContentSelector 
                sectionData={catCultureData.terminology} 
                title="Feline Terminology: Color, Pattern, and Trait" 
                description="Specialized terminology for describing cat aesthetics and their link to commercial value." 
                detailRenderer={genericDetailRenderer} 
            />}
            
            {activeTab === 2 && <ContentSelector 
                sectionData={catCultureData.vocabulary} 
                title="The Language of the Feline Economy" 
                description="Review specialized terms and concepts for discussing the cat's role in the global economy." 
                detailRenderer={vocabularyDetailRenderer} 
            />}
            
            {activeTab === 3 && <ContentSelector 
                sectionData={catCultureData.homework} 
                title="The Feline Strategy Brief: Policy Advocacy" 
                description="Apply persuasive language and specialized vocabulary to defend a cat-related policy." 
                detailRenderer={homeworkDetailRenderer} 
                preserveOrder 
            />}
        </Box>
    );
};

// --- Main Exported Component ---
export default function CatCulture() {
  useEffect(() => {
    document.title = 'Neko Chan | ESL Lessons';
  }, []);

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <Header />
      <MainContent />
    </Box>
  );
}