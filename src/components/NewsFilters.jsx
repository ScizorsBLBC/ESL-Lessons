// src/components/NewsFilters.jsx
import React from 'react';
import {
  Paper,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Button,
  InputAdornment,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import GlassButtonWrapper from './GlassButtonWrapper';
import SearchBar from './SearchBar';
import { getAllTopics } from '../data/articleTopics.js';

const NewsFilters = ({
  selectedLevel,
  searchQuery,
  sortOrder,
  selectedTopic,
  onLevelChange,
  onSearchChange,
  onSortChange,
  onTopicChange,
  onClearFilters,
  organizedData,
  levelStats,
  searchResultsCount
}) => {
  const allTopics = getAllTopics();

  const hasActiveFilters = searchQuery || selectedLevel !== 0 || selectedTopic !== 'all' || sortOrder !== 'newest';

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <SearchBar
        placeholder="Search titles and content..."
        value={searchQuery}
        onChange={onSearchChange}
        onClear={() => onSearchChange('')}
        showResultsCount={true}
        resultsCount={searchResultsCount}
        resultsLabel="articles"
        sx={{ mb: 2 }}
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select
            value={selectedLevel}
            onChange={onLevelChange}
            displayEmpty
          >
            <MenuItem value={0}>
              Show All ({levelStats?.totalArticles || 0})
            </MenuItem>
            <MenuItem value={1}>Level 1 ({organizedData[1]?.articles.length || 0})</MenuItem>
            <MenuItem value={3}>Level 3 ({organizedData[3]?.articles.length || 0})</MenuItem>
            <MenuItem value={6}>Level 6 ({organizedData[6]?.articles.length || 0})</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortOrder}
            onChange={onSortChange}
            startAdornment={
              <InputAdornment position="start">
                <SortIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={selectedTopic}
            onChange={onTopicChange}
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="all">All Topics</MenuItem>
            {allTopics.map(topic => (
              <MenuItem key={topic.key} value={topic.key}>
                {topic.icon} {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {hasActiveFilters && (
          <GlassButtonWrapper>
            <Button onClick={onClearFilters} size="small">
              Reset
            </Button>
          </GlassButtonWrapper>
        )}
      </Stack>
    </Paper>
  );
};

export default NewsFilters;
