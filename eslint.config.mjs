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
      'dist/**',
    ],
  },
  {
    // Frontend/browser code including all DOM-using scripts
    files: [
      'source/frontend/**/*.js',
      'source/CardComponent.js',
      'source/backend/**/dictionaryparser.js',
      'source/backend/**/horoscope.js',
      'src/jsdoc-test.js',
      'codacy-check.js',
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Backend and test code: Node + Jest + Puppeteer
    files: ['source/backend/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        page: 'readonly', // Puppeteer global
      },
    },
  },
  {
    // Node.js config files using CommonJS
    files: ['jest.config.js', 'jest-puppeteer.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
