export default {
  rootDir: '../',
  transform: {},
  testEnvironment: 'node',
  verbose: true,

  testPathIgnorePatterns: ['__tests__/e2e/'],
  coveragePathIgnorePatterns: ['__tests__/e2e/', 'source/frontend'],

  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
};
