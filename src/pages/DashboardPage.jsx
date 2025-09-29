// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Link, List, ListItem, ListItemText, Select, MenuItem, TextField, Button, ListItemIcon, Stack } from '@mui/material';
import { fetchNewsFeed, getNewsList } from '../services/api.js'; // UPDATED IMPORT
import { vocabularyData } from '../data/vocabularyData.js';
import { idiomData } from '../data/idiomData.js';
import { lessonRoutes } from '../LessonRoutes.jsx';
import LessonTabs from '../components/LessonTabs';
import GlassButtonWrapper from '../components/GlassButtonWrapper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


// --- Helper Functions ---
const createShareLink = (type, slug, level = null) => {
    const baseUrl = window.location.origin;
    let path = `/${type}/${slug}`;
    if (level !== null) {
        path += `/${level}`;
    }
    return new URL(path, baseUrl).href;
};

// --- Reusable Components ---
const Section = ({ title, children, instructions }) => (
    <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 4, borderRadius: '12px' }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary.main">
            {title}
        </Typography>
        {instructions && <Typography variant="body2" sx={{mb: 2}}>{instructions}</Typography>}
        {children}
    </Paper>
);

// --- Lesson Navigation Component ---
const LessonNavigation = () => {
    const innerButtonStyle = {
        width: '100%',
        color: 'text.primary',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        '&:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
        },
    };

    return (
        <Section title="Lesson Navigation" instructions="Direct links to all static lesson pages. Use the other tabs to generate links for dynamic content.">
            <Stack spacing={2} sx={{ mt: 2 }}>
                {lessonRoutes.map((lesson) => (
                    <GlassButtonWrapper key={lesson.path}>
                        <Button
                            component={Link}
                            href={lesson.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="text"
                            size="large"
                            startIcon={<NavigateNextIcon color="secondary" />}
                            sx={innerButtonStyle}
                        >
                            {lesson.name}
                        </Button>
                    </GlassButtonWrapper>
                ))}
            </Stack>
        </Section>
    );
};


// --- Main Page Component ---
export default function DashboardPage() {
    // --- State Management ---
    useEffect(() => {
        document.title = 'Dashboard | ESL Lessons Hub';
    }, []);
    const [rssFeed, setRssFeed] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedVocabLesson, setSelectedVocabLesson] = useState(1);
    const [selectedIdiomLesson, setSelectedIdiomLesson] = useState(1);
    const [copySuccess, setCopySuccess] = useState('');

    const sections = ["Lesson Navigation", "News Feed", "Curated News", "Vocabulary", "Idioms"];

    // --- Data Loading Effect ---
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [feed, newsList] = await Promise.all([
                    fetchNewsFeed(), getNewsList()
                ]);
                setRssFeed(feed);
                setNews(newsList);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // --- Event Handlers ---
    const handleTabChange = (event, newValue) => setActiveTab(newValue);
    const handleVocabSelectChange = (event) => setSelectedVocabLesson(event.target.value);
    const handleIdiomSelectChange = (event) => setSelectedIdiomLesson(event.target.value);

    const copyToClipboard = (type, id) => {
        const link = createShareLink(type, id);
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess('Link copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, (err) => {
            setCopySuccess('Failed to copy!');
            console.error('Could not copy text: ', err);
        });
    };
    
    // --- Shared Button Styles ---
    const smallButtonWrapperStyle = {
        py: 0.25,
        px: 0.5,
        borderRadius: '8px',
        flexShrink: 0,
    };
    const smallButtonInnerStyle = {
        color: 'secondary.main',
        backgroundColor: 'transparent',
        fontSize: '0.8rem',
        minWidth: 'auto',
        px: 1.5,
        '&:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
        },
    };

    // --- Render Logic ---
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ maxWidth: '900px', mx: 'auto', py: 4, px: { xs: 2, sm: 0 } }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, color: 'text.secondary' }}>
                Teacher Dashboard
            </Typography>

            <LessonTabs activeTab={activeTab} handleTabChange={handleTabChange} sections={sections} />

            {activeTab === 0 && <LessonNavigation />}

            {activeTab === 1 && (
                 <Section title="Latest from Breaking News English RSS" instructions='To add an article, open your Airtable "News" table...'>
                    <List dense>
                        {rssFeed.slice(0, 100).map((item, index) => (
                            <ListItem key={index} divider>
                                <ListItemText primary={item.title} sx={{ mr: 2 }}/>
                                <GlassButtonWrapper sx={smallButtonWrapperStyle}>
                                    <Button
                                        component={Link}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="text"
                                        startIcon={<OpenInNewIcon />}
                                        sx={smallButtonInnerStyle}
                                    >
                                        Read Site
                                    </Button>
                                </GlassButtonWrapper>
                            </ListItem>
                        ))}
                    </List>
                </Section>
            )}
            {activeTab === 2 && (
                <Section title="Your Curated News Articles">
                    <List>
                        {news.map(item => (
                            <ListItem key={item.id} sx={{flexDirection: 'column', alignItems: 'flex-start'}} divider>
                                <Typography variant="h6" component="h3">{item.fields.Headline}</Typography>
                                <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', gap: 1 }}>
                                    {[0, 1, 2, 3, 4, 5, 6].map(level => (
                                        item.fields[`Level ${level} Text`] && (
                                        <GlassButtonWrapper key={level} sx={smallButtonWrapperStyle}>
                                            <Button
                                                component={Link}
                                                href={createShareLink('news', item.fields.Slug, level)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="text"
                                                sx={smallButtonInnerStyle}
                                            >
                                                Level {level}
                                            </Button>
                                        </GlassButtonWrapper>
                                        )
                                    ))}
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </Section>
            )}
            
            {activeTab === 3 && (
                 <Section title="Vocabulary Lesson Link Generator" instructions="Select a lesson to generate a direct shareable link for your student.">
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Select value={selectedVocabLesson} onChange={handleVocabSelectChange}>
                            {vocabularyData.lessons.map((lesson) => (
                                <MenuItem key={lesson.lesson} value={lesson.lesson}>
                                    Lesson {lesson.lesson}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth readOnly value={createShareLink('vocabulary', selectedVocabLesson)} variant="outlined" size="small" />
                             <GlassButtonWrapper sx={{ py: 0.5, px: 1, borderRadius: '8px' }}>
                                <Button variant="text" onClick={() => copyToClipboard('vocabulary', selectedVocabLesson)} startIcon={<ContentCopyIcon />} sx={{ color: 'secondary.main', backgroundColor: 'transparent', '&:hover': { backgroundColor: (theme) => theme.palette.action.hover }}}>Copy</Button>
                            </GlassButtonWrapper>
                        </Box>
                        {copySuccess && <Typography color="secondary.main" sx={{ textAlign: 'center' }}>{copySuccess}</Typography>}
                    </Box>
                </Section>
            )}

            {activeTab === 4 && (
                <Section title="Idiom Lesson Link Generator" instructions="Select a lesson to generate a direct shareable link for your student.">
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Select value={selectedIdiomLesson} onChange={handleIdiomSelectChange}>
                            {idiomData.lessons.map((lesson) => (
                                <MenuItem key={lesson.lesson} value={lesson.lesson}>
                                    Lesson {lesson.lesson}: {lesson.idioms[0].idiom}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth readOnly value={createShareLink('idioms', selectedIdiomLesson)} variant="outlined" size="small" />
                            <GlassButtonWrapper sx={{ py: 0.5, px: 1, borderRadius: '8px' }}>
                                <Button variant="text" onClick={() => copyToClipboard('idioms', selectedIdiomLesson)} startIcon={<ContentCopyIcon />} sx={{ color: 'secondary.main', backgroundColor: 'transparent', '&:hover': { backgroundColor: (theme) => theme.palette.action.hover }}}>Copy</Button>
                            </GlassButtonWrapper>
                        </Box>
                        {copySuccess && <Typography color="secondary.main" sx={{ textAlign: 'center' }}>{copySuccess}</Typography>}
                    </Box>
                </Section>
            )}
        </Box>
    );
}