/**
 * ESL Lessons Hub - Pattern Enforcement Utilities
 *
 * Utility functions to help enforce styling patterns and catch violations
 * of the established design system rules.
 */

// =============================================================================
// PATTERN VIOLATION DETECTORS
// =============================================================================

/**
 * Detects hardcoded color values in sx objects or style props
 * @param {object} componentCode - Component code to analyze
 * @returns {Array} Array of violation objects
 */
export const detectHardcodedColors = (componentCode) => {
  const violations = [];
  const codeString = JSON.stringify(componentCode);

  // Hardcoded hex colors
  const hexColorRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g;
  const hexMatches = codeString.match(hexColorRegex);
  if (hexMatches) {
    violations.push({
      type: 'hardcoded_hex_color',
      message: 'Hardcoded hex color values detected',
      values: hexMatches,
      suggestion: 'Use theme color references like "primary.main" instead',
    });
  }

  // Hardcoded rgb/rgba values
  const rgbColorRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g;
  const rgbMatches = codeString.match(rgbColorRegex);
  if (rgbMatches) {
    violations.push({
      type: 'hardcoded_rgb_color',
      message: 'Hardcoded RGB/RGBA color values detected',
      values: rgbMatches,
      suggestion: 'Use theme color references like "primary.main" instead',
    });
  }

  return violations;
};

/**
 * Detects usage of color/style props instead of sx
 * @param {object} componentCode - Component code to analyze
 * @returns {Array} Array of violation objects
 */
export const detectColorProps = (componentCode) => {
  const violations = [];
  const codeString = JSON.stringify(componentCode);

  // Color prop usage
  const colorPropRegex = /color\s*=\s*"[^"]*"/g;
  const colorMatches = codeString.match(colorPropRegex);
  if (colorMatches) {
    violations.push({
      type: 'color_prop_usage',
      message: 'Color props detected instead of sx usage',
      values: colorMatches,
      suggestion: 'Use sx={{ color: "theme.color" }} instead of color="theme"',
    });
  }

  // Style prop usage
  const stylePropRegex = /style\s*=\s*{[^}]*}/g;
  const styleMatches = codeString.match(stylePropRegex);
  if (styleMatches) {
    violations.push({
      type: 'style_prop_usage',
      message: 'Inline style props detected',
      values: styleMatches,
      suggestion: 'Use sx prop instead of style prop',
    });
  }

  return violations;
};

/**
 * Detects missing GlassButtonWrapper usage for interactive elements
 * @param {object} componentCode - Component code to analyze
 * @returns {Array} Array of violation objects
 */
export const detectMissingGlassButtonWrapper = (componentCode) => {
  const violations = [];
  const codeString = JSON.stringify(componentCode);

  // Button components that aren't wrapped
  const buttonRegex = /<Button[^>]*>(?!.*GlassButtonWrapper)/g;
  const buttonMatches = codeString.match(buttonRegex);
  if (buttonMatches) {
    violations.push({
      type: 'missing_glass_button_wrapper',
      message: 'Button components detected without GlassButtonWrapper',
      values: buttonMatches,
      suggestion: 'Wrap Button components with GlassButtonWrapper',
    });
  }

  return violations;
};

/**
 * Detects non-responsive styling patterns
 * @param {object} componentCode - Component code to analyze
 * @returns {Array} Array of violation objects
 */
export const detectNonResponsivePatterns = (componentCode) => {
  const violations = [];
  const codeString = JSON.stringify(componentCode);

  // Fixed font sizes without responsive breakpoints
  const fixedFontSizeRegex = /fontSize\s*:\s*['"][^'"]*['"]/g;
  const fontSizeMatches = codeString.match(fixedFontSizeRegex);
  if (fontSizeMatches) {
    violations.push({
      type: 'non_responsive_font_size',
      message: 'Fixed font sizes detected without responsive breakpoints',
      values: fontSizeMatches,
      suggestion: 'Use responsive syntax: fontSize: { xs: "0.875rem", sm: "1rem" }',
    });
  }

  return violations;
};

// =============================================================================
// COMPREHENSIVE PATTERN ANALYSIS
// =============================================================================

/**
 * Performs comprehensive pattern analysis on component code
 * @param {object} componentCode - Component code to analyze
 * @returns {object} Analysis results with violations and suggestions
 */
export const analyzeComponentPatterns = (componentCode) => {
  const allViolations = [
    ...detectHardcodedColors(componentCode),
    ...detectColorProps(componentCode),
    ...detectMissingGlassButtonWrapper(componentCode),
    ...detectNonResponsivePatterns(componentCode),
  ];

  return {
    totalViolations: allViolations.length,
    violations: allViolations,
    complianceScore: Math.max(0, 100 - (allViolations.length * 10)),
    isCompliant: allViolations.length === 0,
    summary: allViolations.length === 0
      ? 'Component follows all established patterns ✅'
      : `${allViolations.length} pattern violation${allViolations.length > 1 ? 's' : ''} detected ⚠️`,
  };
};

/**
 * Validates a component against all established patterns
 * @param {string} componentName - Name of the component being validated
 * @param {object} componentCode - Component code object
 * @returns {object} Validation results
 */
export const validateComponent = (componentName, componentCode) => {
  const analysis = analyzeComponentPatterns(componentCode);

  return {
    component: componentName,
    timestamp: new Date().toISOString(),
    ...analysis,
  };
};

// =============================================================================
// DEVELOPMENT HELPERS
// =============================================================================

/**
 * Logs pattern violations to console for development debugging
 * @param {string} componentName - Name of the component
 * @param {object} violations - Array of violation objects
 */
export const logPatternViolations = (componentName, violations) => {
  if (violations.length === 0) {
    console.log(`✅ ${componentName}: No pattern violations detected`);
    return;
  }

  console.warn(`⚠️ ${componentName}: ${violations.length} pattern violation${violations.length > 1 ? 's' : ''} detected:`);

  violations.forEach((violation, index) => {
    console.warn(`  ${index + 1}. ${violation.type}: ${violation.message}`);
    console.warn(`     Values: ${violation.values.join(', ')}`);
    console.warn(`     Suggestion: ${violation.suggestion}`);
  });
};

/**
 * Checks if a component uses the new styling utilities
 * @param {object} componentCode - Component code to analyze
 * @returns {boolean} True if component uses styling utilities
 */
export const usesStylingUtilities = (componentCode) => {
  const codeString = JSON.stringify(componentCode);
  const utilityImports = [
    'createLessonCard',
    'createLessonTitle',
    'createInteractiveButton',
    'createResponsiveSpacing',
    'stylingUtils',
  ];

  return utilityImports.some(utility => codeString.includes(utility));
};

export default {
  // Violation detectors
  detectHardcodedColors,
  detectColorProps,
  detectMissingGlassButtonWrapper,
  detectNonResponsivePatterns,

  // Analysis functions
  analyzeComponentPatterns,
  validateComponent,

  // Development helpers
  logPatternViolations,
  usesStylingUtilities,
};
