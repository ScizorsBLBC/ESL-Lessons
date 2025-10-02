/**
 * ESL Lessons Hub - Styling Utilities
 *
 * Reusable styling functions and utilities for consistent component styling.
 * All functions return sx-compatible objects that follow the style guide patterns.
 */

// Helper function for hex to rgba conversion
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// =============================================================================
// CENTRALIZED SHADOW SYSTEM - Apple's Liquid Glass Aesthetic
// =============================================================================

/**
 * Creates the refined liquid glass shadow system used throughout the application
 * This single source of truth ensures consistent, elegant shadows across all components
 * @param {object} theme - MUI theme object
 * @returns {object} Object containing all shadow variants
 */
export const createLiquidGlassShadows = (theme) => {
  return {
    // Base shadow - elegant, dark tone, minimal glow like a floating glass pane
    base: `0px 2px 6px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
           0px 3px 12px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
           0px 1px 18px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Hover shadow - enhanced depth for interactions
    hover: `0px 3px 8px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
            0px 5px 16px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
            0px 1px 24px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Active shadow - maximum depth for pressed states
    active: `0px 4px 10px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
             0px 7px 20px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
             0px 1px 32px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Visualization container - slightly more pronounced for data displays
    visualization: `0px 3px 10px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
                    0px 6px 18px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
                    0px 1px 28px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Button specific - optimized for interactive elements
    button: `0px 2px 6px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
             0px 3px 12px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
             0px 1px 18px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Button hover - enhanced for button interactions
    buttonHover: `0px 3px 8px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
                  0px 5px 16px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
                  0px 1px 24px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Button active - pressed state for buttons
    buttonActive: `0px 4px 10px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
                   0px 7px 20px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
                   0px 1px 32px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Card shadows - for lesson cards and content containers
    card: `0px 2px 6px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
           0px 3px 12px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
           0px 1px 18px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Modal/Dialog shadows - for overlays and popups
    modal: `0px 5px 12px -2px ${hexToRgba(theme.palette.text.primary, 0.08)},
            0px 8px 22px -1px ${hexToRgba(theme.palette.text.primary, 0.06)},
            0px 1px 36px 0px ${hexToRgba(theme.palette.text.primary, 0.04)}`,

    // Tooltip shadows - very subtle for information overlays
    tooltip: `0px 2px 6px -2px ${hexToRgba(theme.palette.text.primary, 0.06)},
              0px 3px 12px -1px ${hexToRgba(theme.palette.text.primary, 0.04)}`,
  };
};

/**
 * Gets the appropriate shadow for a component type
 * @param {string} type - The type of shadow needed ('base', 'hover', 'active', 'card', 'modal', etc.)
 * @param {object} theme - MUI theme object
 * @returns {string} CSS box-shadow value
 */
export const getLiquidGlassShadow = (type = 'base', theme) => {
  const shadows = createLiquidGlassShadows(theme);
  return shadows[type] || shadows.base;
};

// =============================================================================
// CENTRALIZED BORDER SYSTEM - Liquid Glass Edges
// =============================================================================

/**
 * Creates the refined liquid glass border system used throughout the application
 * This single source of truth ensures consistent, elegant borders across all components
 * @param {object} theme - MUI theme object
 * @returns {object} Object containing all border variants
 */
export const createLiquidGlassBorders = (theme) => {
  const borderColor = hexToRgba(theme.palette.text.primary, 0.08); // Darker, more elegant

  return {
    // Main container borders - for cards, papers, dialogs
    container: {
      border: `1px solid ${borderColor}`,
      borderRadius: '16px', // Primary glass pane edges
    },

    // Secondary container borders - for smaller cards, sections
    secondary: {
      border: `1px solid ${borderColor}`,
      borderRadius: '12px', // Secondary glass edges
    },

    // Button borders - for interactive elements
    button: {
      border: `1px solid ${borderColor}`,
      borderRadius: '8px', // Interactive glass edges
    },

    // Accent borders - for special highlights, left borders, etc.
    accent: {
      border: `1px solid ${borderColor}`,
      borderRadius: '16px',
    },

    // Tooltip borders - very subtle for information overlays
    tooltip: {
      border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.06)}`,
      borderRadius: '6px',
    },

    // Table borders - for data tables and structured content
    table: {
      border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.06)}`,
      borderRadius: '8px',
    },

    // Input borders - for form elements
    input: {
      border: `1px solid ${hexToRgba(theme.palette.text.primary, 0.10)}`,
      borderRadius: '6px',
    },

    // Card accent borders - for left accent borders on lesson cards
    cardAccent: {
      borderLeft: `8px solid ${theme.palette.primary.main}`,
      borderRadius: '16px',
    },
  };
};

/**
 * Gets the appropriate border styling for a component type
 * @param {string} type - The type of border needed ('container', 'secondary', 'button', etc.)
 * @param {object} theme - MUI theme object
 * @returns {object} CSS border styling object
 */
export const getLiquidGlassBorder = (type = 'container', theme) => {
  const borders = createLiquidGlassBorders(theme);
  return borders[type] || borders.container;
};

/**
 * Creates a complete liquid glass container style with borders and shadows
 * @param {string} accentColor - Theme color for accent borders (e.g., 'primary.main')
 * @param {string} borderType - Type of border styling ('container', 'secondary', etc.)
 * @returns {function} Function that takes theme and returns styling object
 */
export const createLiquidGlassContainer = (accentColor = 'primary.main', borderType = 'container') => {
  return (theme) => ({
    ...getLiquidGlassBorder(borderType, theme),
    backgroundColor: hexToRgba(theme.palette.background.paper, 0.1),
    backdropFilter: 'blur(12px) saturate(180%)',
    boxShadow: getLiquidGlassShadow('base', theme),
    opacity: 0.95,
    ...(borderType === 'container' && accentColor && {
      borderLeft: `8px solid ${accentColor}`,
    }),
  });
};

// =============================================================================
// CARD & CONTAINER UTILITIES
// =============================================================================

/**
 * Creates a standardized lesson card style with proper glassmorphism theming
 * @param {string} accentColor - Theme color for left border accent (e.g., 'primary.main', 'secondary.main')
 * @returns {object} sx-compatible style object
 */
export const createLessonCard = (accentColor = 'primary.main') => {
  // Return a function that takes theme and returns the styling
  return (theme) => {
    // Use centralized liquid glass styling system
    const containerStyle = createLiquidGlassContainer(accentColor, 'container')(theme);

    return {
      ...containerStyle,
      p: { xs: 2, md: 4 },
      my: 4,
      // Use centralized liquid glass shadow system for elevation variants
      '&.MuiPaper-elevation1': {
        boxShadow: getLiquidGlassShadow('base', theme),
        '--Paper-shadow': getLiquidGlassShadow('base', theme),
      },
      '&.MuiPaper-elevation2': {
        boxShadow: getLiquidGlassShadow('hover', theme),
        '--Paper-shadow': getLiquidGlassShadow('hover', theme),
      },
      '&.MuiPaper-elevation3': {
        boxShadow: getLiquidGlassShadow('active', theme),
        '--Paper-shadow': getLiquidGlassShadow('active', theme),
      },
      '&.MuiPaper-elevation4': {
        boxShadow: getLiquidGlassShadow('modal', theme),
        '--Paper-shadow': getLiquidGlassShadow('modal', theme),
      },
      '&.MuiPaper-elevation6': {
        boxShadow: getLiquidGlassShadow('modal', theme),
        '--Paper-shadow': getLiquidGlassShadow('modal', theme),
      },
    };
  };
};

/**
 * Creates a visualization wrapper with consistent glassmorphism styling
 * @returns {function} Function that takes theme and returns styling object
 */
export const createVisualizationWrapper = () => {
  return (theme) => ({
    ...getLiquidGlassBorder('secondary', theme),
    my: 4,
    p: { xs: 2, md: 4 },
    backgroundColor: hexToRgba(theme.palette.background.paper, 0.1),
    backdropFilter: 'blur(12px) saturate(180%)',
    opacity: 0.95, // Ensure proper transparency for glass effect
    // Use centralized liquid glass shadow system for visualizations
    boxShadow: getLiquidGlassShadow('visualization', theme),
  });
};

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
export const createLessonTitle = (color = 'primary.dark') => {
  return (theme) => ({
    fontWeight: 'bold',
    color,
    mb: 2,
  });
};

/**
 * Creates consistent section heading styling
 * @param {string} variant - Typography variant ('h4', 'h5', 'h6')
 * @param {string} color - Theme color for the heading
 * @returns {object} sx-compatible style object
 */
export const createSectionHeading = (variant = 'h5', color = 'text.primary') => {
  return (theme) => ({
    variant,
    component: variant,
    fontWeight: 'bold',
    color,
    gutterBottom: true,
  });
};

// =============================================================================
// INTERACTIVE ELEMENT UTILITIES
// =============================================================================

/**
 * Creates consistent button styling for interactive elements
 * @returns {object} sx-compatible style object
 */
export const createInteractiveButton = () => {
  return (theme) => ({
    textTransform: 'none',
    fontWeight: 500,
    minHeight: { xs: '44px', sm: '36px' }, // Accessibility: 44px touch target
  });
};

/**
 * Creates consistent icon button styling with glassmorphism effects
 * @param {string} color - Theme color for the icon
 * @returns {function} Function that takes theme and returns styling object
 */
export const createIconButton = (color = 'primary.main') => {
  return (theme) => ({
    color,
    minHeight: { xs: '44px', sm: '36px' }, // Accessibility: 44px touch target
    minWidth: { xs: '44px', sm: '36px' },
  });
};

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
export const createResponsiveContainer = (maxWidth = 'lg') => {
  const widthMap = {
    xs: '100%',
    sm: '600px',
    md: '800px',
    lg: '1100px',
    xl: '1200px'
  };

  return {
    maxWidth: { xs: '100%', sm: widthMap[maxWidth] || '1100px' },
    mx: 'auto',
    px: { xs: 2, sm: 3 },
  };
};

// =============================================================================
// ANIMATION & TRANSITION UTILITIES
// =============================================================================

/**
 * Creates smooth hover effects for interactive elements
 * @returns {object} sx-compatible style object
 */
export const createHoverEffect = () => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
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
export const createErrorState = () => {
  return (theme) => ({
    color: 'error.main',
    bgcolor: 'error.light',
    border: '1px solid',
    borderColor: 'error.main',
    borderRadius: 1,
    p: 2,
  });
};

/**
 * Creates success state styling with proper theme colors
 * @returns {object} sx-compatible style object
 */
export const createSuccessState = () => {
  return (theme) => ({
    color: 'success.main',
    bgcolor: 'success.light',
    border: '1px solid',
    borderColor: 'success.main',
    borderRadius: 1,
    p: 2,
  });
};

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
export const createQuizCard = () => {
  return (theme) => ({
    width: '100%',
    maxWidth: { xs: '100%', sm: 600, md: 800 },
    mx: 'auto',
    mb: 3,
  });
};

/**
 * Creates styling for form controls in exercises
 * @returns {object} sx-compatible style object
 */
export const createFormControl = () => {
  return (theme) => ({
    mb: 3,
    '& .MuiFormControlLabel-label': {
      fontSize: { xs: '0.9rem', sm: '1rem' },
      lineHeight: 1.4,
    },
  });
};

/**
 * Creates styling for exercise feedback (correct/incorrect)
 * @param {boolean} isCorrect - Whether the answer is correct
 * @returns {object} sx-compatible style object
 */
export const createFeedbackStyle = (isCorrect) => {
  return (theme) => ({
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
};

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
