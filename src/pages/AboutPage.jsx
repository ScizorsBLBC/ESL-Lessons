import React, { useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import TranslateIcon from '@mui/icons-material/Translate';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About | ESL Lessons Hub';
  }, []);

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', py: 4, px: { xs: 2, sm: 0 } }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: 4, 
            color: 'text.secondary' // FINAL FIX: Set H1 to text.secondary (Orange)
        }}
      >
        Meet Ryan C.
      </Typography>

      {/* --- Main Bio Section (Uses Paper for Liquid Glass Effect) --- */}
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
          American English Teacher | Patient & Personalized
        </Typography>
        
        <Typography variant="body1" paragraph>
          Hello! I'm Ryan, an American English teacher focused on providing <strong>high-value, results-oriented conversational English lessons</strong>. I welcome new students who are serious about achieving their language goals, specializing in helping intermediate speakers move beyond textbook English to speak with natural, effortless fluency.
        </Typography>

        <Typography variant="body1" paragraph>
          Lessons are specifically tailored for your goals and learning style, offering <strong>authentic pronunciation, vocabulary, idioms, and cultural nuances</strong> directly from a native American speaker.
        </Typography>
      </Paper>

      {/* --- Expertise & Experience Section --- */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h3" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
          Teaching Credentials & Expertise
        </Typography>
        
        <List sx={{ display: 'grid', gap: 2 }}>
            
            {/* Subject Expertise */}
            <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
                <ListItem>
                    <ListItemIcon sx={{ color: 'secondary.main' }}><WorkspacePremiumIcon /></ListItemIcon>
                    <ListItemText 
                        primary="Core Subject Expertise" 
                        secondary="Conversational Fluency & American Idioms/Slang, Business English (Customized using real-world materials), Beginner to Advanced English Basics." 
                    />
                </ListItem>
            </Paper>

            {/* Teaching Experience */}
            <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
                <ListItem>
                    <ListItemIcon sx={{ color: 'secondary.main' }}><SchoolIcon /></ListItemIcon>
                    <ListItemText 
                        primary="Experienced Teacher: YMCA English School of Japan" 
                        secondary="Teaching group ESL classes and private lessons for students aged 18 to 76, enhancing standard materials with custom lessons." 
                    />
                </ListItem>
            </Paper>

            {/* Spanish Support */}
            <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
                <ListItem>
                    <ListItemIcon sx={{ color: 'secondary.main' }}><TranslateIcon /></ListItemIcon>
                    <ListItemText 
                        primary="Conversational Spanish Speaker" 
                        secondary="Offering support to Spanish-speaking learners with 25+ years of experience speaking Spanish, including living in Mexico & Guatemala." 
                    />
                </ListItem>
            </Paper>

            {/* Achievment Focus */}
            <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
                <ListItem>
                    <ListItemIcon sx={{ color: 'secondary.main' }}><DirectionsRunIcon /></ListItemIcon>
                    <ListItemText 
                        primary="Results Focused" 
                        secondary="Helping you build confidence, improve American English pronunciation, and receive practical feedback you can use immediately." 
                    />
                </ListItem>
            </Paper>
        </List>
      </Box>
    </Box>
  );
};

export default AboutPage;