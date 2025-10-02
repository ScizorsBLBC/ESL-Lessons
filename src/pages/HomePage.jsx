import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Button, TextField } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SendIcon from '@mui/icons-material/Send';
import LanguageIcon from '@mui/icons-material/Language';
import GlassButtonWrapper from '../components/GlassButtonWrapper'; // IMPORT a reusable component
import { getLiquidGlassShadow } from '../utils/stylingUtils';

// --- Contact Form Component (Serverless Submission Ready & Styled) ---
const ContactForm = ({ onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const FORM_ACTION_URL = "https://formspree.io/f/xgvnvzjz"; 

  const handleChange = (setter) => (e) => setter(e.target.value);
  
  
  // Styles for the wrapper/sizing of buttons within the form
  const formWrapperStyle = {
    minWidth: 150, 
    mt: 2,
    mx: 1,
    py: 1.5,
    borderRadius: '8px',
  };


  return (
    <Box 
        component="form" 
        action={FORM_ACTION_URL} 
        method="POST"
        target="_blank" 
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h5" component="h2" gutterBottom textAlign="center">
        Send a Message to Ryan C.
      </Typography>
      
      <TextField
        label="Your Name"
        variant="outlined"
        required
        name="name" 
        value={name}
        onChange={handleChange(setName)}
      />
      <TextField
        label="Your Email"
        variant="outlined"
        type="email"
        required
        name="_replyto" 
        value={email}
        onChange={handleChange(setEmail)}
      />
      <TextField
        label="Your Message"
        variant="outlined"
        multiline
        rows={4}
        required
        name="message"
        value={message}
        onChange={handleChange(setMessage)}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {/* Submit Button - Now using GlassButtonWrapper and text variant */}
          <GlassButtonWrapper sx={formWrapperStyle}>
              <Button
                type="submit"
                variant="text"
                size="large"
                startIcon={<SendIcon />}
                sx={{
                  width: '100%',
                  height: '100%',
                  color: 'secondary.main',
                  backgroundColor: 'transparent',
                }}
              >
                Send Message
              </Button>
          </GlassButtonWrapper>

          {/* Cancel Button */}
          <GlassButtonWrapper sx={formWrapperStyle}>
              <Button
                onClick={onCancel}
                variant="text"
                size="large"
                sx={{
                    width: '100%',
                    height: '100%',
                    color: 'text.secondary',
                    backgroundColor: 'transparent',
                }}
              >
                Cancel
              </Button>
          </GlassButtonWrapper>
      </Box>
      
      <Typography variant="caption" color="text.secondary" textAlign="center">
        Your message will be securely sent to Ryan's email address.
      </Typography>
    </Box>
  );
};


// --- Main HomePage Component ---
const HomePage = () => {
  const preplyLink = "https://preply.com/en/tutor/5822457";

  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    document.title = 'Ryan C. | ESL Lessons Hub';
  }, []);

  const sharedButtonStyle = {
    minWidth: 220, 
    borderRadius: '8px', 
    mt: 1, 
    px: 4, 
    py: 1.5, 
  };
  

  // Content to show when the form is NOT open
  const WelcomeContent = (
    <>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 56,
            height: 56,
          }}
        >
          <ContactMailIcon fontSize="large" />
        </Avatar>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ color: 'text.secondary', fontWeight: 'bold' }}
        >
          Welcome!
        </Typography>
        <Typography 
          variant="h6" 
          component="p"
          sx={{ color: 'text.primary', mb: 2 }} 
        >
          To access your learning materials, please reach out to Ryan C. using one of the contact options below for a direct link to the lesson you are looking for.
        </Typography>
        
        {/* Email Button - Opens the on-site contact form */}
        <GlassButtonWrapper sx={sharedButtonStyle}>
            <Button
                onClick={() => setShowContactForm(true)} // Toggle form view
                variant="text"
                size="large"
                startIcon={<SendIcon />}
                sx={{
                  width: '100%',
                  height: '100%',
                  color: 'secondary.main',
                  backgroundColor: 'transparent',
                }}
            >
                Send Ryan a Message
            </Button>
        </GlassButtonWrapper>

        {/* Preply Profile Button */}
        <GlassButtonWrapper sx={sharedButtonStyle}>
            <Button
                component="a"
                href={preplyLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                size="large"
                startIcon={<LanguageIcon />}
                sx={{
                  width: '100%',
                  height: '100%',
                  color: 'secondary.main',
                  backgroundColor: 'transparent',
                }}
            >
                Ryan's Preply Profile
            </Button>
        </GlassButtonWrapper>
    </>
  );


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh', 
        textAlign: 'center',
        px: 2, 
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: '12px',
          backgroundColor: (theme) => `${theme.palette.background.paper}1A`,
          backdropFilter: 'blur(12px) saturate(180%)',
          border: (theme) => `1px solid ${theme.palette.text.primary}1A`,
          boxShadow: (theme) => getLiquidGlassShadow('active', theme),
          maxWidth: '500px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2, 
        }}
      >
        {/* Conditional rendering of Welcome content or Contact Form */}
        {showContactForm ? (
            <ContactForm 
                onCancel={() => setShowContactForm(false)} 
            />
        ) : (
            WelcomeContent
        )}
      </Paper>
    </Box>
  );
};

export default HomePage;