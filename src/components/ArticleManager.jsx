// src/components/ArticleManager.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Alert,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import GlassButtonWrapper from './GlassButtonWrapper';
import SearchBar from './SearchBar';
import { searchUtils } from '../utils/searchUtils';
import { isDevelopment } from '../utils/devUtils.js';
import { getNewsList } from '../utils/dataAccess.js';
import { getAllTopics, getArticleTopic as getTopicForSlug } from '../data/articleTopics.js';
import { validateArticleData } from '../utils/fileWriter.js';
import { saveArticle, checkApiHealth } from '../services/api.js';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(getEmptyArticleData());
  const [saveStatus, setSaveStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [allTopics] = useState(getAllTopics());
  const [isApiConnected, setIsApiConnected] = useState(false);

  // Check API connectivity on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await checkApiHealth();
        setIsApiConnected(true);
        console.log('✅ API server connected');
      } catch (error) {
        console.warn('⚠️ API server not running:', error.message);
        setIsApiConnected(false);
      }
    };
    checkConnection();
  }, []);

  // Load articles on component mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articleList = await getNewsList();
        setArticles(articleList);
        setFilteredArticles(articleList); // Initialize filtered articles
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };
    loadArticles();
  }, []);

  // Filter and sort articles based on search query (advanced search algorithm)
  useEffect(() => {
    let filtered = articles;

    if (searchQuery.trim()) {
      // Transform articles to match search format expected by searchUtils
      const transformedArticles = articles.map(article => ({
        headline: article.fields.Headline || '',
        slug: article.fields.Slug || '',
        content: '', // Articles don't have content field in this context
        id: article.id
      }));

      const searchResults = searchUtils.searchArticles(searchQuery, transformedArticles, {
        fields: ['headline', 'slug'],
        minScore: 0.1
      });

      // Transform back to original format
      const resultIds = searchResults.map(article => article.id);
      filtered = articles.filter(article => resultIds.includes(article.id));
    }

    // Sort articles alphabetically by headline for dropdown display
    filtered.sort((a, b) => {
      const headlineA = (a.fields.Headline || '').toLowerCase();
      const headlineB = (b.fields.Headline || '').toLowerCase();
      return headlineA.localeCompare(headlineB);
    });

    setFilteredArticles(filtered);
  }, [articles, searchQuery]);

  // Initialize and sort filteredArticles when articles are loaded
  useEffect(() => {
    if (articles.length > 0) {
      // Sort articles alphabetically by headline for dropdown display
      const sortedArticles = [...articles].sort((a, b) => {
        const headlineA = (a.fields.Headline || '').toLowerCase();
        const headlineB = (b.fields.Headline || '').toLowerCase();
        return headlineA.localeCompare(headlineB);
      });
      setFilteredArticles(sortedArticles);
    }
  }, [articles]);

  // Load article data when selection changes
  useEffect(() => {
    if (selectedArticleId) {
      const article = articles.find(a => a.id === selectedArticleId);
      if (article) {
        setFormData({
          id: article.id,
          headline: article.fields.Headline || '',
          slug: article.fields.Slug || '',
          imageUrl: article.fields['Image URL'] || '',
          topic: getArticleTopic(article.fields.Slug) || '',
          dateWritten: article.fields['Date Written'] || new Date().toISOString().split('T')[0],
          level1Text: article.fields['Level 1 Text'] || '',
          level1Questions: article.fields['Level 1 Questions'] || '',
          level3Text: article.fields['Level 3 Text'] || '',
          level3Questions: article.fields['Level 3 Questions'] || '',
          level6Text: article.fields['Level 6 Text'] || '',
          level6Questions: article.fields['Level 6 Questions'] || '',
          level6WritingPrompt: (article.fields['Level 6 Writing Prompt'] || '').replace(/^Free Writing[\s\n]*/, '').trim()
        });
      }
      } else {
        setFormData(getEmptyArticleData());
        setSaveStatus('');
      }
  }, [selectedArticleId, articles]);

  const getArticleTopic = (slug) => {
    return getTopicForSlug(slug) || '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSave = async () => {
    try {
      setSaveStatus('Saving...');

      // Check API connectivity first
      if (!isApiConnected) {
        setSaveStatus('❌ Error: Backend API server is not running. Please start the server first.');
        // Clear API error after 5 seconds
        setTimeout(() => {
          setSaveStatus('');
        }, 5000);
        return;
      }

      // Validate the form data
      const validation = validateArticleData(formData);
      if (!validation.isValid) {
        setSaveStatus(`❌ Validation Error:\n${validation.errors.join('\n')}`);
        // Clear validation error after 5 seconds
        setTimeout(() => {
          setSaveStatus('');
        }, 5000);
        return;
      }

      // Determine if this is a new article or an update
      const isNew = !formData.id;
      const mode = isNew ? 'create' : 'update';

      // Save via API
      const result = await saveArticle(formData, mode);

      if (result.success) {
        // Update local state for immediate feedback
        if (isNew) {
          // For new articles, add to local state
          const newArticle = {
            id: result.id,
            fields: {
              "Headline": formData.headline,
              "Slug": formData.slug,
              "Image URL": formData.imageUrl || '',
              "Date Written": formData.dateWritten,
              "Level 0 Text": "",
              "Level 0 Questions": "",
              "Level 1 Text": formData.level1Text,
              "Level 1 Questions": formData.level1Questions,
              "Level 1 Instruction": formData.level1Text ? "Write a full-sentence answer for each question below." : "",
              "Level 2 Text": "",
              "Level 2 Questions": "",
              "Level 3 Text": formData.level3Text,
              "Level 3 Questions": formData.level3Questions,
              "Level 3 Instruction": formData.level3Text ? "Write a full-sentence answer for each question below." : "",
              "Level 4 Text": "",
              "Level 4 Questions": "",
              "Level 5 Text": "",
              "Level 5 Questions": "",
              "Level 6 Text": formData.level6Text,
              "Level 6 Questions": formData.level6Questions,
              "Level 6 Instruction": formData.level6Text ? "Write a full-sentence answer for each question below." : "",
              "Level 6 Writing Prompt": formData.level6WritingPrompt.replace(/^Free Writing[\s\n]*/, '').trim()
            }
          };

          setArticles(prev => [...prev, newArticle]);

          // Reset form for new article creation
          setFormData(getEmptyArticleData());
          setSelectedArticleId('');
        } else {
          // For existing articles, update the local state
          setArticles(prevArticles =>
            prevArticles.map(article =>
              article.id === formData.id
                ? {
                    ...article,
                    fields: {
                      // Preserve all existing fields and only update the ones that have new values
                      ...article.fields,
                      // Update basic fields only if they have meaningful values
                      "Headline": formData.headline && formData.headline.trim() ? formData.headline : article.fields.Headline,
                      "Slug": formData.slug && formData.slug.trim() ? formData.slug : article.fields.Slug,
                      "Image URL": formData.imageUrl !== undefined && formData.imageUrl.trim() ? formData.imageUrl : article.fields['Image URL'],
                      "Date Written": formData.dateWritten && formData.dateWritten.trim() ? formData.dateWritten : article.fields['Date Written'],
                      // Update level fields only if they have meaningful content (preserve existing data)
                      "Level 1 Text": formData.level1Text && formData.level1Text.trim() ? formData.level1Text : article.fields['Level 1 Text'],
                      "Level 1 Questions": formData.level1Questions && formData.level1Questions.trim() ? formData.level1Questions : article.fields['Level 1 Questions'],
                      "Level 1 Instruction": (formData.level1Text && formData.level1Text.trim() ? formData.level1Text : article.fields['Level 1 Text']) ? "Write a full-sentence answer for each question below." : "",
                      "Level 3 Text": formData.level3Text && formData.level3Text.trim() ? formData.level3Text : article.fields['Level 3 Text'],
                      "Level 3 Questions": formData.level3Questions && formData.level3Questions.trim() ? formData.level3Questions : article.fields['Level 3 Questions'],
                      "Level 3 Instruction": (formData.level3Text && formData.level3Text.trim() ? formData.level3Text : article.fields['Level 3 Text']) ? "Write a full-sentence answer for each question below." : "",
                      "Level 6 Text": formData.level6Text && formData.level6Text.trim() ? formData.level6Text : article.fields['Level 6 Text'],
                      "Level 6 Questions": formData.level6Questions && formData.level6Questions.trim() ? formData.level6Questions : article.fields['Level 6 Questions'],
                      "Level 6 Instruction": (formData.level6Text && formData.level6Text.trim() ? formData.level6Text : article.fields['Level 6 Text']) ? "Write a full-sentence answer for each question below." : "",
                      "Level 6 Writing Prompt": formData.level6WritingPrompt && formData.level6WritingPrompt.trim() ? formData.level6WritingPrompt.replace(/^Free Writing[\s\n]*/, '').trim() : article.fields['Level 6 Writing Prompt']
                    }
                  }
                : article
            )
          );
        }

        // Show success message and reload instruction
        setSaveStatus(`✅ Article ${isNew ? 'created' : 'updated'} successfully!\n\n📋 Changes saved to newsData.js\n🔄 ${result.requiresReload ? 'Please refresh the page to see changes in other components.' : ''}`);

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSaveStatus('');
        }, 3000);
      } else {
        setSaveStatus(`❌ Error: ${result.error || 'Failed to save article'}`);
        // Clear error message after 5 seconds
        setTimeout(() => {
          setSaveStatus('');
        }, 5000);
      }

    } catch (error) {
      setSaveStatus('❌ Error saving article: ' + error.message);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 5000);
    }
  };


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1) { // Edit tab
      setSelectedArticleId('');
      setFormData(getEmptyArticleData());
      setSearchQuery(''); // Clear search when switching to edit tab
    } else {
      setSearchQuery(''); // Clear search when switching away from edit tab
    }
    setSaveStatus('');
  };

  if (!isDevelopment()) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom color="warning.main">
        🔧 Article Manager (Development Only)
      </Typography>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="body2" component="div">
            <strong>Backend Required:</strong> Make sure the API server is running on localhost:3001 for this tool to work.
            {!isApiConnected && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                ⚠️ API server not detected. Please start the server with: <code>cd server && npm run dev</code>
              </Typography>
            )}
          </Typography>
        </Box>
      </Alert>


      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Create Article" />
        <Tab label="Edit Existing" />
      </Tabs>

      {activeTab === 0 && (
        <ArticleForm
          formData={formData}
          onInputChange={handleInputChange}
          onSave={handleSave}
          saveStatus={saveStatus}
          allTopics={allTopics}
          mode="create"
        />
      )}

      {activeTab === 1 && (
        <Box>
          {/* Search bar for edit mode */}
          <SearchBar
            placeholder="Search articles by title or slug..."
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={clearSearch}
            showResultsCount={true}
            resultsCount={filteredArticles.length}
            resultsLabel="articles"
            sx={{ mb: 2 }}
          />

          {/* Search results indicator and clickable results */}
          {searchQuery && (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found - click to select:
              </Typography>
              <Stack spacing={1} sx={{ mb: 2 }}>
                {filteredArticles.map(article => (
                  <Paper
                    key={article.id}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      border: selectedArticleId === article.id ? '2px solid' : '1px solid',
                      borderColor: selectedArticleId === article.id ? 'primary.main' : 'divider',
                    }}
                    onClick={() => {
                      setSelectedArticleId(article.id);
                      setSearchQuery(''); // Clear search when selecting
                    }}
                  >
                    <Typography variant="subtitle1">
                      {article.fields.Headline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.fields.Slug}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </>
          )}

          {/* Dropdown menu as alternative */}
          {!searchQuery && (
            <FormControl sx={{ minWidth: 200, mb: 2 }}>
              <Select
                value={selectedArticleId}
                onChange={(e) => {
                  setSelectedArticleId(e.target.value);
                  setSearchQuery(''); // Clear search when selecting from dropdown
                }}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select article to edit...</em>
                </MenuItem>
                {filteredArticles.map(article => (
                  <MenuItem key={article.id} value={article.id}>
                    {article.fields.Headline} ({article.fields.Slug})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {selectedArticleId && (
            <ArticleForm
              formData={formData}
              onInputChange={handleInputChange}
              onSave={handleSave}
              saveStatus={saveStatus}
              allTopics={allTopics}
              mode="edit"
            />
          )}
        </Box>
      )}
    </Paper>
  );
};

const ArticleForm = ({ formData, onInputChange, onSave, saveStatus, allTopics, mode }) => {
  return (
    <Box>
      <Stack spacing={3}>
        {/* Basic Information */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Basic Information</Typography>
          <Stack spacing={2}>
            <TextField
              label="Headline"
              value={formData.headline}
              onChange={(e) => onInputChange('headline', e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Slug (URL-friendly identifier)"
              value={formData.slug}
              onChange={(e) => onInputChange('slug', e.target.value)}
              fullWidth
              helperText="Lowercase, no spaces, use hyphens for spaces"
            />
            <TextField
              label="Image URL"
              value={formData.imageUrl}
              onChange={(e) => onInputChange('imageUrl', e.target.value)}
              fullWidth
            />
            <TextField
              label="Date Written"
              type="date"
              value={formData.dateWritten}
              onChange={(e) => onInputChange('dateWritten', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth>
              <Select
                value={formData.topic}
                onChange={(e) => onInputChange('topic', e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select Topic (Optional)</em>
                </MenuItem>
                {allTopics.map(topic => (
                  <MenuItem key={topic.key} value={topic.key}>
                    {topic.icon} {topic.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Level Content Sections */}
        {[1, 3, 6].map(level => (
          <Accordion key={level}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Level {level} Content</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  label={`Level ${level} Article Text`}
                  value={formData[`level${level}Text`]}
                  onChange={(e) => onInputChange(`level${level}Text`, e.target.value)}
                  fullWidth
                  multiline
                  rows={6}
                  helperText="The main article content for this level"
                />
                <TextField
                  label={`Level ${level} Comprehension Questions`}
                  value={formData[`level${level}Questions`]}
                  onChange={(e) => onInputChange(`level${level}Questions`, e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  helperText="One question per line"
                />

                {/* Display instruction for levels with content */}
                {formData[`level${level}Text`] && (
                  <Box sx={{ textAlign: 'center', my: 2 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                      Comprehension Questions:
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                      Write a full-sentence answer for each question below.
                    </Typography>
                  </Box>
                )}

                {level === 6 && (
                  <>
                    <Box sx={{ textAlign: 'center', my: 2 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        Free Writing
                      </Typography>
                    </Box>
                    <TextField
                      label="Level 6 Writing Prompt"
                      value={formData.level6WritingPrompt}
                      onChange={(e) => onInputChange('level6WritingPrompt', e.target.value)}
                      fullWidth
                      multiline
                      rows={3}
                      helperText="Academic writing prompt for level 6 (Free Writing will be added automatically)"
                    />
                  </>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Save Section */}
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <GlassButtonWrapper>
            <Button
              variant="contained"
              onClick={onSave}
              size="large"
            >
              {mode === 'create' ? 'Create Article' : 'Update Article'}
            </Button>
          </GlassButtonWrapper>

          {saveStatus && (
            <Alert severity={saveStatus.includes('Error') ? 'error' : 'success'} sx={{ mt: 2, whiteSpace: 'pre-line' }}>
              {saveStatus}
            </Alert>
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

const getEmptyArticleData = () => ({
  id: '',
  headline: '',
  slug: '',
  imageUrl: '',
  topic: '',
  dateWritten: new Date().toISOString().split('T')[0], // Default to today
  level1Text: '',
  level1Questions: '',
  level3Text: '',
  level3Questions: '',
  level6Text: '',
  level6Questions: '',
  level6WritingPrompt: ''
});

export default ArticleManager;
