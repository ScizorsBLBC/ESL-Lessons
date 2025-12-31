// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Link, Select, MenuItem, TextField, Button, Stack } from '@mui/material';
import { vocabularyData } from '../data/vocabularyData.js';
import { idiomData } from '../data/idiomData.js';
import { entrepreneurVocabularyData } from '../data/bainurData.js';
import { getStudentNames, getLessonsByStudent } from '../data/studentLessonsData.js';
import { lessonRoutes } from '../LessonRoutes.jsx';
import LessonTabs from '../components/LessonTabs';
import GlassButtonWrapper from '../components/GlassButtonWrapper';
import OrganizedNewsDashboard from '../components/OrganizedNewsDashboard';
import ArticleManager from '../components/ArticleManager';
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
    const [activeTab, setActiveTab] = useState(0);
    const [selectedVocabLesson, setSelectedVocabLesson] = useState(1);
    const [selectedIdiomLesson, setSelectedIdiomLesson] = useState(1);
    const [selectedBainurLesson, setSelectedBainurLesson] = useState(1);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    const sections = ["Lesson Navigation", "Curated News", "Article Manager", "Vocabulary", "Idioms", "Bainur's Vocab", "Student Lessons"];


    // --- Event Handlers ---
    const handleTabChange = (event, newValue) => setActiveTab(newValue);
    const handleVocabSelectChange = (event) => setSelectedVocabLesson(event.target.value);
    const handleIdiomSelectChange = (event) => setSelectedIdiomLesson(event.target.value);
    const handleBainurSelectChange = (event) => setSelectedBainurLesson(event.target.value);
    const handleStudentSelectChange = (event) => {
        const student = event.target.value;
        setSelectedStudent(student);
        setSelectedLesson(''); // Reset lesson selection when student changes
    };
    const handleLessonSelectChange = (event) => setSelectedLesson(event.target.value);

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

    const createStudentLessonLink = (filename) => {
        const baseUrl = window.location.origin;
        return new URL(`/student-lessons/${filename}`, baseUrl).href;
    };

    const copyStudentLessonLink = () => {
        if (!selectedLesson) return;
        const lesson = getLessonsByStudent(selectedStudent).find(l => l.date === selectedLesson);
        if (!lesson) return;
        const link = createStudentLessonLink(lesson.filename);
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess('Link copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, (err) => {
            setCopySuccess('Failed to copy!');
            console.error('Could not copy text: ', err);
        });
    };
    

    // --- Render Logic ---
    return (
        <Box sx={{ maxWidth: '900px', mx: 'auto', py: 4, px: { xs: 2, sm: 0 } }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, color: 'text.secondary' }}>
                Teacher Dashboard
            </Typography>

            <LessonTabs activeTab={activeTab} handleTabChange={handleTabChange} sections={sections} />

            {activeTab === 0 && <LessonNavigation />}

            {activeTab === 1 && (
                <OrganizedNewsDashboard />
            )}

            {activeTab === 2 && (
                <ArticleManager />
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
                                <Button variant="text" onClick={() => copyToClipboard('vocabulary', selectedVocabLesson)} startIcon={<ContentCopyIcon />}>Copy</Button>
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
                                <Button variant="text" onClick={() => copyToClipboard('idioms', selectedIdiomLesson)} startIcon={<ContentCopyIcon />}>Copy</Button>
                            </GlassButtonWrapper>
                        </Box>
                        {copySuccess && <Typography color="secondary.main" sx={{ textAlign: 'center' }}>{copySuccess}</Typography>}
                    </Box>
                </Section>
            )}

            {activeTab === 5 && (
                <Section title="Bainur's Vocabulary Lesson Link Generator" instructions="Select a lesson to generate a direct shareable link for your student.">
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Select value={selectedBainurLesson} onChange={handleBainurSelectChange}>
                            {entrepreneurVocabularyData.lessons.map((lesson) => (
                                <MenuItem key={lesson.lesson} value={lesson.lesson}>
                                    Lesson {lesson.lesson}: {lesson.title}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField fullWidth readOnly value={createShareLink('bainur-vocabulary', selectedBainurLesson)} variant="outlined" size="small" />
                            <GlassButtonWrapper sx={{ py: 0.5, px: 1, borderRadius: '8px' }}>
                                <Button variant="text" onClick={() => copyToClipboard('bainur-vocabulary', selectedBainurLesson)} startIcon={<ContentCopyIcon />}>Copy</Button>
                            </GlassButtonWrapper>
                        </Box>
                        {copySuccess && <Typography color="secondary.main" sx={{ textAlign: 'center' }}>{copySuccess}</Typography>}
                    </Box>
                </Section>
            )}

            {activeTab === 6 && (
                <Section title="Student Lessons" instructions="Select a student and lesson date to access custom lesson files.">
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                        {/* Student Selector */}
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Select Student</Typography>
                            <Select 
                                value={selectedStudent} 
                                onChange={handleStudentSelectChange}
                                fullWidth
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    <em>Choose a student...</em>
                                </MenuItem>
                                {getStudentNames().map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        {/* Lesson Selector - Only show if student is selected */}
                        {selectedStudent && (
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>Select Lesson Date</Typography>
                                <Select 
                                    value={selectedLesson} 
                                    onChange={handleLessonSelectChange}
                                    fullWidth
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        <em>Choose a lesson...</em>
                                    </MenuItem>
                                    {getLessonsByStudent(selectedStudent).map((lesson) => (
                                        <MenuItem key={lesson.date} value={lesson.date}>
                                            {lesson.date} {lesson.title ? `- ${lesson.title}` : ''}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        )}

                        {/* Lesson Display and Actions */}
                        {selectedStudent && selectedLesson && (() => {
                            const lesson = getLessonsByStudent(selectedStudent).find(l => l.date === selectedLesson);
                            if (!lesson) return null;
                            const lessonUrl = createStudentLessonLink(lesson.filename);
                            
                            return (
                                <Box sx={{ mt: 2 }}>
                                    {lesson.description && (
                                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                                            {lesson.description}
                                        </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <TextField 
                                                fullWidth 
                                                readOnly 
                                                value={lessonUrl} 
                                                variant="outlined" 
                                                size="small" 
                                            />
                                            <GlassButtonWrapper sx={{ py: 0.5, px: 1, borderRadius: '8px' }}>
                                                <Button 
                                                    variant="text" 
                                                    onClick={copyStudentLessonLink} 
                                                    startIcon={<ContentCopyIcon />}
                                                >
                                                    Copy
                                                </Button>
                                            </GlassButtonWrapper>
                                            <GlassButtonWrapper sx={{ py: 0.5, px: 1, borderRadius: '8px' }}>
                                                <Button 
                                                    variant="text" 
                                                    href={lessonUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    startIcon={<OpenInNewIcon />}
                                                >
                                                    Open
                                                </Button>
                                            </GlassButtonWrapper>
                                        </Box>
                                        {copySuccess && (
                                            <Typography color="secondary.main" sx={{ textAlign: 'center' }}>
                                                {copySuccess}
                                            </Typography>
                                        )}
                                        {/* Lesson Preview in iframe */}
                                        <Box sx={{ mt: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                                            <iframe
                                                src={lessonUrl}
                                                title={lesson.title || `Lesson for ${selectedStudent}`}
                                                style={{
                                                    width: '100%',
                                                    height: '600px',
                                                    border: 'none'
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })()}

                        {/* Empty State */}
                        {!selectedStudent && (
                            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                Select a student to view their lessons
                            </Typography>
                        )}
                        {selectedStudent && !selectedLesson && (
                            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                Select a lesson date to view the lesson
                            </Typography>
                        )}
                    </Box>
                </Section>
            )}
        </Box>
    );
}