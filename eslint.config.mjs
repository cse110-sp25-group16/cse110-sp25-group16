import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    // Base config for all JS files
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores: [
      'testcode.js',
      'docs/**',
      'node_modules/**',
      'sum.test.js',
      'sum.js',
    ],
  },
  {
    // Frontend/browser code
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Backend and test code: Node + Jest
    files: ['source/backend/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]);
