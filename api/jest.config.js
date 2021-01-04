module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  setupFiles: ['dotenv/config'],
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  coverageReporters: ['text'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/modules/**',
    'src/modules/**/controllers/**/*.ts',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!src/index.ts',
    '!dist',
  ],
}
