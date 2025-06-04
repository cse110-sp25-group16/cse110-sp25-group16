const path = require('path');

module.exports = {
  preset: 'jest-puppeteer',
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'jest-environment-puppeteer',
  testMatch: ['<rootDir>/__e2e__/**/*.test.js'],
  testTimeout: 30000,
};
