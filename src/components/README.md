# ESL Lessons Hub - Component Documentation

## Overview

This directory contains all reusable components for the ESL Lessons Hub application. All components follow strict architectural patterns defined in the [Style Guide](../utils/styleGuide.js) and use the [Styling Utilities](../utils/stylingUtils.js).

## Architecture Principles

### 1. Composition Over Creation (Principle 3)
- Use existing modular components before creating new ones
- `ContentBlockRenderer` and `ContentSelector` are the primary tools for displaying data-driven content
- Extract duplicated logic into reusable utilities

### 2. Styling Consistency
- **NEVER** use inline `style` attributes or hardcoded CSS values
- **ALWAYS** use MUI's `sx` prop for styling
- **ALWAYS** use theme color references (e.g., `'primary.main'`, `'text.secondary'`)
- **ALWAYS** wrap interactive elements with `GlassButtonWrapper`

### 3. Responsive Design
- **ALWAYS** use mobile-first responsive syntax
- **ALWAYS** ensure 44px minimum touch targets for accessibility

## Component Categories

### Core Renderers
- **`ContentBlockRenderer.jsx`** - Central dispatcher for all content blocks
- **`ContentSelector.jsx`** - Interactive content selection and display

### Interactive Components
- **`Quiz.jsx`** - Quiz functionality with multiple question types
- **`FillInTheBlanks.jsx`** - Fill-in-the-blank exercises
- **`Flashcard.jsx`** - Flashcard sets with flip functionality
- **`PracticeSuite.jsx`** - Collection of practice exercises

### Visualization Components
- **`ChartSection.jsx`** - Data visualization placeholder
- **`TimelineVisualization.jsx`** - Interactive timeline displays
- **`ConceptMapVisualization.jsx`** - Concept relationship mapping
- **`FlowchartVisualization.jsx`** - Process flow diagrams

### Layout Components
- **`Layout.jsx`** - Main application layout with theme switching
- **`LessonHeader.jsx`** - Consistent lesson title styling
- **`TwoPaneLayout.jsx`** - Side-by-side content layout
- **`GlassButtonWrapper.jsx`** - Interactive element styling wrapper

## Usage Patterns

### Basic Component Structure

```jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { createLessonCard, createLessonTitle } from '../utils/stylingUtils';
import GlassButtonWrapper from './GlassButtonWrapper';

/**
 * Component description
 * @param {object} props - Component props
 * @returns {JSX.Element}
 */
const ExampleComponent = ({ data }) => {
  return (
    <Paper elevation={4} sx={createLessonCard('primary.main')}>
      <Typography variant="h5" sx={createLessonTitle('primary.dark')}>
        {data.title}
      </Typography>

      <GlassButtonWrapper>
        <Button onClick={handleAction}>
          Interactive Button
        </Button>
      </GlassButtonWrapper>
    </Paper>
  );
};

export default ExampleComponent;
```

### Interactive Elements

```jsx
// ✅ CORRECT: Always wrap buttons with GlassButtonWrapper
<GlassButtonWrapper isActive={isSelected}>
  <Button onClick={handleClick}>
    Click me
  </Button>
</GlassButtonWrapper>

// ✅ CORRECT: Icon buttons for icon-only interactions
<IconButton onClick={handleIconClick} sx={createIconButton('primary.main')}>
  <Icon />
</IconButton>

// ❌ INCORRECT: Never use Button directly
<Button onClick={handleClick}>Click me</Button>
```

### Color Application

```jsx
// ✅ CORRECT: Always use sx prop with theme colors
sx={{
  color: 'primary.main',
  bgcolor: 'background.paper',
  borderColor: 'divider'
}}

// ✅ CORRECT: Use utility functions for common patterns
sx={{
  ...createLessonCard('secondary.main'),
  ...createHoverEffect(theme)
}}

// ❌ INCORRECT: Never use color props
color="primary.main"

// ❌ INCORRECT: Never use hardcoded colors
sx={{ color: '#ff0000' }}
```

### Responsive Design

```jsx
// ✅ CORRECT: Mobile-first responsive design
sx={{
  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
  p: { xs: 2, sm: 3, md: 4 },
  minHeight: { xs: '44px', sm: '36px' } // 44px touch target
}}

// ✅ CORRECT: Use responsive container utilities
sx={{
  ...createResponsiveContainer('lg'),
  ...createResponsiveSpacing({ xs: 2, sm: 3, md: 4 })
}}
```

## Styling Utilities

### Card & Container Utilities
```jsx
import { createLessonCard, createVisualizationWrapper } from '../utils/stylingUtils';

// Standard lesson card
<Paper sx={createLessonCard('primary.main')}>
  <Typography variant="h5">Lesson Title</Typography>
</Paper>

// Visualization wrapper
<Box sx={createVisualizationWrapper(theme)}>
  <ChartComponent data={chartData} />
</Box>
```

### Typography Utilities
```jsx
import { createLessonTitle, createSectionHeading } from '../utils/stylingUtils';

// Consistent lesson titles
<Typography variant="h4" sx={createLessonTitle('primary.dark')}>
  Main Lesson Title
</Typography>

// Section headings
<Typography sx={createSectionHeading('h5', 'secondary.main')}>
  Section Title
</Typography>
```

### Interactive Utilities
```jsx
import { createInteractiveButton, createIconButton } from '../utils/stylingUtils';

// Button styling
<Button sx={createInteractiveButton()}>
  Submit Answer
</Button>

// Icon button styling
<IconButton sx={createIconButton('primary.main')}>
  <EditIcon />
</IconButton>
```

## Theme Integration

All components use the MUI theme system for consistent colors and typography:

```jsx
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      color: 'text.primary',
      bgcolor: 'background.paper',
      borderColor: theme.palette.divider,
    }}>
      Content with proper theming
    </Box>
  );
};
```

## Accessibility

- **Touch Targets**: Minimum 44px for mobile accessibility
- **Color Contrast**: Use theme colors that meet WCAG guidelines
- **Semantic HTML**: Use proper heading hierarchy and ARIA labels
- **Screen Readers**: Ensure content is readable by assistive technologies

## Performance

- Use `React.memo` for expensive components
- Implement `useMemo` for complex calculations
- Keep components focused on single responsibilities
- Extract reusable logic into custom hooks

## Testing

All components should be tested for:
- Proper rendering with different data structures
- Responsive behavior across breakpoints
- Interactive functionality
- Accessibility compliance
- Theme compatibility

## Migration Guide

When updating existing components to follow new patterns:

1. Replace all `color="theme"` props with `sx={{ color: 'theme.main' }}`
2. Wrap all `Button` components with `GlassButtonWrapper`
3. Replace hardcoded colors with theme references
4. Use styling utilities for common patterns
5. Ensure responsive design patterns are applied
6. Update component documentation

## Compliance Checklist

Before submitting a component:

- [ ] Uses `sx` prop for all styling (no `style` or `color` props)
- [ ] Uses `GlassButtonWrapper` for all interactive buttons
- [ ] Uses theme color references (no hardcoded colors)
- [ ] Implements responsive design patterns
- [ ] Meets 44px minimum touch target requirements
- [ ] Includes proper JSDoc documentation
- [ ] Follows component naming conventions
- [ ] Uses styling utilities where applicable

## Support

For questions about component patterns or styling:
1. Check the [Style Guide](../utils/styleGuide.js)
2. Review the [Styling Utilities](../utils/stylingUtils.js)
3. Consult existing component examples
4. Ask the development team for clarification

---

*Last Updated: October 2025*
