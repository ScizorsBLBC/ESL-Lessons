/**
 * ESL Lessons Hub - Styling Utilities
 *
 * Reusable styling functions and utilities for consistent component styling.
 * All functions return sx-compatible objects that follow the style guide patterns.
 */

// =============================================================================
// CARD & CONTAINER UTILITIES
// =============================================================================

/**
 * Creates a standardized lesson card style with proper theming
 * @param {string} accentColor - Theme color for left border accent (e.g., 'primary.main', 'secondary.main')
 * @returns {object} sx-compatible style object
 */
export const createLessonCard = (accentColor = 'primary.main') => ({
  borderRadius: 3,
  borderLeft: '8px solid',
  borderColor: accentColor,
  p: { xs: 2, md: 4 },
  my: 4,
});

/**
 * Creates a visualization wrapper with consistent styling
 * @param {object} theme - MUI theme object
 * @returns {object} sx-compatible style object
 */
export const createVisualizationWrapper = (theme) => ({
  my: 4,
  p: { xs: 2, md: 4 },
  borderRadius: 4,
  boxShadow: 6,
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'primary.light',
});

/**
 * Creates an accessibility data table with consistent styling
 * @returns {object} sx-compatible style object for table container
 */
export const createAccessibilityTable = () => ({
  width: '100%',
  borderCollapse: 'collapse',
  mt: 2,
  '& thead': {
    borderBottom: '2px solid',
    borderColor: 'divider',
  },
  '& tbody tr:nth-of-type(even)': {
    bgcolor: 'action.hover',
  },
  '& th, & td': {
    p: 1,
    borderTop: '1px solid',
    borderColor: 'divider',
  },
});

// =============================================================================
// TYPOGRAPHY UTILITIES
// =============================================================================

/**
 * Creates consistent lesson title styling
 * @param {string} color - Theme color for the title
 * @returns {object} sx-compatible style object
 */
export const createLessonTitle = (color = 'primary.dark') => ({
  fontWeight: 'bold',
  color,
  mb: 2,
});

/**
 * Creates consistent section heading styling
 * @param {string} variant - Typography variant ('h4', 'h5', 'h6')
 * @param {string} color - Theme color for the heading
 * @returns {object} sx-compatible style object
 */
export const createSectionHeading = (variant = 'h5', color = 'text.primary') => ({
  variant,
  component: variant,
  fontWeight: 'bold',
  color,
  gutterBottom: true,
});

// =============================================================================
// INTERACTIVE ELEMENT UTILITIES
// =============================================================================

/**
 * Creates consistent button styling for interactive elements
 * @returns {object} sx-compatible style object
 */
export const createInteractiveButton = () => ({
  textTransform: 'none',
  fontWeight: 500,
  minHeight: { xs: '44px', sm: '36px' }, // Accessibility: 44px touch target
});

/**
 * Creates consistent icon button styling
 * @param {string} color - Theme color for the icon
 * @returns {object} sx-compatible style object
 */
export const createIconButton = (color = 'primary.main') => ({
  color,
  minHeight: { xs: '44px', sm: '36px' }, // Accessibility: 44px touch target
  minWidth: { xs: '44px', sm: '36px' },
});

// =============================================================================
// RESPONSIVE UTILITIES
// =============================================================================

/**
 * Creates responsive spacing utilities
 * @param {object} spacing - Object with xs, sm, md values
 * @returns {object} sx-compatible style object
 */
export const createResponsiveSpacing = (spacing = { xs: 2, sm: 3, md: 4 }) => ({
  px: spacing,
  py: { xs: spacing.xs * 0.5, sm: spacing.sm * 0.5 },
});

/**
 * Creates responsive font size utilities
 * @param {object} sizes - Object with xs, sm, md font sizes
 * @returns {object} sx-compatible style object
 */
export const createResponsiveFontSize = (sizes = { xs: '0.875rem', sm: '1rem', md: '1.125rem' }) => ({
  fontSize: sizes,
});

/**
 * Creates responsive container max-width utilities
 * @param {string} maxWidth - Max width value ('xs', 'sm', 'md', 'lg', 'xl')
 * @returns {object} sx-compatible style object
 */
export const createResponsiveContainer = (maxWidth = 'lg') => ({
  maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: '1100px' },
  mx: 'auto',
  px: { xs: 2, sm: 3 },
});

// =============================================================================
// ANIMATION & TRANSITION UTILITIES
// =============================================================================

/**
 * Creates smooth hover effects for interactive elements
 * @param {object} theme - MUI theme object
 * @returns {object} sx-compatible style object
 */
export const createHoverEffect = (theme) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
});

/**
 * Creates fade-in animation for content
 * @returns {object} sx-compatible style object
 */
export const createFadeIn = () => ({
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
});

// =============================================================================
// THEME-AWARE COLOR UTILITIES
// =============================================================================

/**
 * Gets the correct theme color reference for semantic usage
 * @param {string} colorType - 'primary', 'secondary', 'success', 'error', 'warning', 'info'
 * @param {string} shade - 'main', 'light', 'dark'
 * @returns {string} Theme color reference
 */
export const getThemeColor = (colorType = 'primary', shade = 'main') => {
  return `${colorType}.${shade}`;
};

/**
 * Creates error state styling with proper theme colors
 * @returns {object} sx-compatible style object
 */
export const createErrorState = () => ({
  color: 'error.main',
  bgcolor: 'error.light',
  border: '1px solid',
  borderColor: 'error.main',
  borderRadius: 1,
  p: 2,
});

/**
 * Creates success state styling with proper theme colors
 * @returns {object} sx-compatible style object
 */
export const createSuccessState = () => ({
  color: 'success.main',
  bgcolor: 'success.light',
  border: '1px solid',
  borderColor: 'success.main',
  borderRadius: 1,
  p: 2,
});

// =============================================================================
// LAYOUT UTILITIES
// =============================================================================

/**
 * Creates a centered layout container
 * @param {object} options - Layout options
 * @returns {object} sx-compatible style object
 */
export const createCenteredLayout = (options = {}) => {
  const {
    maxWidth = 'lg',
    spacing = { xs: 2, sm: 3, md: 4 },
    textAlign = 'center',
  } = options;

  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign,
    maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: maxWidth === 'lg' ? '1100px' : '1200px' },
    mx: 'auto',
    px: spacing,
    py: { xs: spacing.xs * 0.5, sm: spacing.sm * 0.5 },
  };
};

/**
 * Creates a two-column responsive layout
 * @param {object} options - Layout options
 * @returns {object} sx-compatible style object
 */
export const createTwoColumnLayout = (options = {}) => {
  const {
    spacing = 3,
    breakpoint = 'md',
  } = options;

  return {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', [breakpoint]: '1fr 1fr' },
    gap: spacing,
    alignItems: 'start',
  };
};

// =============================================================================
// QUIZ & INTERACTIVE EXERCISE UTILITIES
// =============================================================================

/**
 * Creates styling for quiz question cards
 * @returns {object} sx-compatible style object
 */
export const createQuizCard = () => ({
  width: '100%',
  maxWidth: { xs: '100%', sm: 600, md: 800 },
  mx: 'auto',
  mb: 3,
});

/**
 * Creates styling for form controls in exercises
 * @returns {object} sx-compatible style object
 */
export const createFormControl = () => ({
  mb: 3,
  '& .MuiFormControlLabel-label': {
    fontSize: { xs: '0.9rem', sm: '1rem' },
    lineHeight: 1.4,
  },
});

/**
 * Creates styling for exercise feedback (correct/incorrect)
 * @param {boolean} isCorrect - Whether the answer is correct
 * @returns {object} sx-compatible style object
 */
export const createFeedbackStyle = (isCorrect) => ({
  mb: 3,
  bgcolor: isCorrect ? 'success.light' : 'error.light',
  color: isCorrect ? 'success.dark' : 'error.dark',
  border: '1px solid',
  borderColor: isCorrect ? 'success.main' : 'error.main',
  borderRadius: 1,
  p: 2,
  '& .MuiAlert-icon': {
    color: isCorrect ? 'success.main' : 'error.main',
  },
});

export default {
  // Main utilities
  createLessonCard,
  createVisualizationWrapper,
  createAccessibilityTable,

  // Typography utilities
  createLessonTitle,
  createSectionHeading,

  // Interactive utilities
  createInteractiveButton,
  createIconButton,

  // Responsive utilities
  createResponsiveSpacing,
  createResponsiveFontSize,
  createResponsiveContainer,

  // Animation utilities
  createHoverEffect,
  createFadeIn,

  // Color utilities
  getThemeColor,
  createErrorState,
  createSuccessState,

  // Layout utilities
  createCenteredLayout,
  createTwoColumnLayout,

  // Exercise utilities
  createQuizCard,
  createFormControl,
  createFeedbackStyle,
};
