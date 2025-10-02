/**
 * ESL Lessons Hub - Style Guide & Design System
 *
 * This file establishes the canonical patterns for consistent styling across all components.
 * All components MUST follow these patterns to maintain design consistency and theme compliance.
 *
 * Last Updated: October 2025
 * Compliance: Mandatory for all components
 */

// =============================================================================
// 1. COLOR APPLICATION PATTERNS
// =============================================================================

/**
 * ✅ CORRECT: Always use sx prop with theme color references
 * @example sx={{ color: 'primary.main', bgcolor: 'background.paper' }}
 *
 * ❌ INCORRECT: Never use color props or hardcoded values
 * @example color="primary" // Wrong!
 * @example style={{ color: '#ff0000' }} // Wrong!
 * @example sx={{ color: '#ff0000' }} // Wrong!
 */

// =============================================================================
// 2. INTERACTIVE ELEMENT PATTERNS
// =============================================================================

/**
 * ✅ CORRECT: Always wrap interactive elements with GlassButtonWrapper
 * @example
 * <GlassButtonWrapper>
 *   <Button onClick={handleClick}>Click me</Button>
 * </GlassButtonWrapper>
 *
 * ✅ CORRECT: Icon-only buttons can use IconButton directly (for accessibility)
 * @example <IconButton color="primary" onClick={handleClick}><Icon /></IconButton>
 *
 * ❌ INCORRECT: Never use Button directly without GlassButtonWrapper
 * @example <Button onClick={handleClick}>Click me</Button> // Wrong!
 */

// =============================================================================
// 3. BACKGROUND & CONTAINER PATTERNS
// =============================================================================

/**
 * ✅ CORRECT: Use complete sx objects for all styling
 * @example sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
 *
 * ❌ INCORRECT: Never use individual border/color props
 * @example sx={{ borderLeft: '8px solid', borderColor: 'primary.main' }} // Wrong!
 */

// =============================================================================
// 4. RESPONSIVE DESIGN PATTERNS
// =============================================================================

/**
 * ✅ CORRECT: Always use responsive syntax for spacing and sizing
 * @example sx={{ p: { xs: 2, sm: 3, md: 4 }, fontSize: { xs: '0.875rem', sm: '1rem' } }}
 *
 * ✅ CORRECT: Use mobile-first approach with xs as base
 * @example sx={{ px: { xs: 2, sm: 4 } }} // 16px mobile, 32px desktop
 */

// =============================================================================
// 5. ACCESSIBILITY PATTERNS
// =============================================================================

/**
 * ✅ CORRECT: Ensure minimum 44px touch targets for mobile
 * @example sx={{ minHeight: { xs: '44px', sm: '36px' }, minWidth: 'auto' }}
 *
 * ✅ CORRECT: Use proper contrast ratios (handled by theme)
 * @example sx={{ color: 'text.primary', bgcolor: 'background.paper' }}
 */

// =============================================================================
// 6. COMMON STYLING PATTERNS
// =============================================================================

export const commonStyles = {
  // Card/Container patterns
  lessonCard: {
    borderRadius: 3,
    borderLeft: '8px solid',
    p: { xs: 2, md: 4 },
    my: 4,
  },

  // Typography patterns
  lessonTitle: {
    fontWeight: 'bold',
    mb: 2,
  },

  // Interactive patterns
  interactiveButton: {
    textTransform: 'none',
    fontWeight: 500,
  },

  // Layout patterns
  centeredContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },

  // Responsive spacing
  responsiveSpacing: {
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 1, sm: 2 },
  },
};

// =============================================================================
// 7. THEME COLOR REFERENCE GUIDE
// =============================================================================

/**
 * Color Usage Guide:
 *
 * PRIMARY COLORS (for main actions and highlights)
 * - 'primary.main' - Primary buttons, links, active states
 * - 'primary.light' - Secondary elements, borders
 * - 'primary.dark' - Headings, emphasis
 *
 * SECONDARY COLORS (for accents and alternatives)
 * - 'secondary.main' - Secondary buttons, accents
 * - 'secondary.light' - Backgrounds, subtle elements
 *
 * SEMANTIC COLORS (for meaning)
 * - 'success.main' - Success states, positive feedback
 * - 'error.main' - Errors, warnings, important notices
 * - 'warning.main' - Cautions, pending states
 * - 'info.main' - Information, neutral states
 *
 * TEXT COLORS (for typography)
 * - 'text.primary' - Main body text, high contrast
 * - 'text.secondary' - Secondary text, lower contrast
 *
 * BACKGROUND COLORS (for surfaces)
 * - 'background.paper' - Card backgrounds, elevated surfaces
 * - 'background.default' - Page background, base surface
 */

// =============================================================================
// 8. GLASSMORPHISM PATTERNS
// =============================================================================

/**
 * The GlassButtonWrapper component implements the liquid glass aesthetic.
 * All interactive elements should use this wrapper to maintain design consistency.
 *
 * Usage:
 * - Wrap all Button components with GlassButtonWrapper
 * - Use isActive prop for selected/active states
 * - Use color prop to set button color theme
 */

export default {
  version: '1.0.0',
  lastUpdated: '2025-10-02',
  compliance: 'mandatory',
  patterns: {
    colors: 'sx_prop_only',
    interactive: 'glass_button_wrapper',
    backgrounds: 'complete_sx_objects',
    responsive: 'mobile_first',
  },
};
