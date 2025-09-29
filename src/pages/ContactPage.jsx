import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import GlassButtonWrapper from '../components/GlassButtonWrapper';

// --- Contact Form Content (Remains the same) ---
const ContactFormContent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const FORM_ACTION_URL = "https://formspree.io/f/xgvnvzjz"; 

  const handleChange = (setter) => (e) => setter(e.target.value);
  
  // Styles for the inner button (text/icon is secondary.main / blue/cyan)
  const formInnerButtonStyle = {
    width: '100%',
    height: '100%',
    color: 'secondary.main', 
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: (theme) => theme.palette.action.hover,
        transform: 'scale(1.05)',
    },
  };
  
  // Styles for the wrapper/sizing of the button
  const formWrapperStyle = {
    minWidth: 200, 
    mt: 3,
    py: 1.5,
    borderRadius: '8px',
  };

  // Common TextField styles to keep labels yellow/green
  const commonTextFieldStyle = {
    '& .MuiInputLabel-root': {
        color: (theme) => theme.palette.text.primary,
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: (theme) => theme.palette.text.primary,
    }
  };


  return (
    <Box 
        component="form" 
        action={FORM_ACTION_URL} 
        method="POST"
        target="_blank" 
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h6" component="p" gutterBottom sx={{ textAlign: 'center', color: 'text.primary', mb: 3 }}>
        Use the form below to send a message directly to Ryan C.
      </Typography>
      
      <TextField
        label="Your Name"
        variant="outlined"
        required
        name="name" 
        value={name}
        onChange={handleChange(setName)}
        sx={commonTextFieldStyle}
      />
      <TextField
        label="Your Email"
        variant="outlined"
        type="email"
        required
        name="_replyto" 
        value={email}
        onChange={handleChange(setEmail)}
        sx={commonTextFieldStyle}
      />
      <TextField
        label="Your Message"
        variant="outlined"
        multiline
        rows={6}
        required
        name="message"
        value={message}
        onChange={handleChange(setMessage)}
        sx={commonTextFieldStyle}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {/* Submit Button - Color is secondary.main (Blue/Cyan) */}
          <GlassButtonWrapper sx={formWrapperStyle}>
              <Button
                type="submit"
                variant="text" 
                size="large"
                startIcon={<SendIcon />}
                sx={formInnerButtonStyle}
              >
                Send Message
              </Button>
          </GlassButtonWrapper>
      </Box>
      
      <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
        *Your message will be securely processed by Formspree and delivered to Ryan's email.
      </Typography>
    </Box>
  );
};


// --- Main Exported ContactPage Component ---
const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact | ESL Lessons Hub';
  }, []);

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', py: 4, px: { xs: 2, sm: 0 } }}>
      {/* Main Heading remains text.secondary (Orange) */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, color: 'text.secondary' }}>
        Contact Ryan C. Directly
      </Typography>

      {/* --- Floating Liquid Glass Pane for the Form --- */}
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, mb: 4, borderRadius: '12px' }}>
        <ContactFormContent />
      </Paper>
      
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        If you prefer, you can also connect via his 
        <Link 
            href="https://preply.com/en/tutor/5822457" 
            target="_blank" 
            rel="noopener noreferrer" 
            sx={{ 
                ml: 0.5, 
                textDecoration: 'none', 
                '&:hover': { textDecoration: 'underline' },
                // FIX: Explicitly set the link color to secondary.main (the blue/cyan)
                color: (theme) => theme.palette.secondary.main, 
            }}
        >
            Preply Profile
        </Link>.
      </Typography>
      {/* Footer component would appear below this Container/Box due to Layout.jsx */}
    </Box>
  );
};

export default ContactPage;