/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1'
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/'
  ],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    'src/lib/**/*.{js,jsx}',
    '!src/app/**',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/*.test.{js,jsx}',
    '!**/__tests__/**'
  ],
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 1,
      functions: 1,
      lines: 1
    }
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ]
};

module.exports = config; 