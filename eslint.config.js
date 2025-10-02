const js = require('@eslint/js')
const globals = require('globals')
const reactHooks = require('eslint-plugin-react-hooks')
const reactRefresh = require('eslint-plugin-react-refresh')

module.exports = [
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        exports: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^(theme|voices|progress|secondaryColor|sounds|index)$' }],

      // ESL Lessons Hub - Basic Pattern Enforcement
      // Prevent common styling anti-patterns
      'no-restricted-syntax': ['warn', {
        selector: 'JSXAttribute[name.name="color"]:not([value.value=/^sx|theme/])',
        message: 'Avoid color props. Use sx={{ color: "theme.color" }} instead.'
      }],

      // Enforce consistent styling patterns
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]
