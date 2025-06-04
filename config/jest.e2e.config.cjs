const path = require('path');

module.exports = {
  preset: 'jest-puppeteer',
  testEnvironment: 'jest-environment-puppeteer',
  testMatch: [path.join(__dirname, '..', '__e2e__', '**', '*.test.js')],
  testTimeout: 30000
};
