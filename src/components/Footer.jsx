import React from 'react';
import { Typography, Link, Paper } from '@mui/material';

/**
 * Global application footer component.
 * Uses Paper to inherit the global Liquid Glass aesthetic.
 */
const Footer = () => {
    return (
        <Paper 
            component="footer" 
            elevation={1} 
            sx={{ 
                // POSITIONING & STRUCTURE: Constrains width and centers the component
                mt: 4, // Adds space above the footer to separate it from page content
                mb: 4, // Adds space below the footer to lift it from the bottom of the screen
                maxWidth: 'lg', // Constrains width to match main content container
                mx: 'auto', // Centers the Paper component horizontally
                borderRadius: '12px', // Makes it look like a floating card
                
                // PADDING FIX: Use generous, responsive padding on all sides 
                // to pull content away from the inner edges.
                p: { xs: 3, sm: 4 }, // Generous padding (e.g., 24px/32px)

                textAlign: 'center', 
                // The borderTop is styled to appear only at the top of the floating element
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    textAlign: 'center'
                }}
            >
                © {new Date().getFullYear()} ESL Lessons Hub |
                <Link href="/about" sx={{
                    ml: 1,
                    color: 'secondary.main',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                }}>About</Link>
                <Link href="/contact" sx={{
                    ml: 2,
                    color: 'secondary.main',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                }}>Contact</Link>
            </Typography>
        </Paper>
    );
};

export default Footer;