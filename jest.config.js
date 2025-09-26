const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/src/$1',

    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',

    // Mock @emotion packages to avoid theme issues in tests
    '@emotion/styled': '<rootDir>/__mocks__/@emotion/styled.js',
    '@emotion/react': '<rootDir>/__mocks__/@emotion/react.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // This only affects tests, not the build process
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
      },
    },
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@faker-js/faker)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  collectCoverageFrom: [
    'src/app/**/*.{js,jsx,ts,tsx}',
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/lib/**/*.{js,jsx,ts,tsx}',
    'src/utils/**/*.{js,jsx,ts,tsx}',
    'src/services/**/*.{js,jsx,ts,tsx}',
    'src/context/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!src/app/**/layout.tsx',
    '!src/app/**/loading.tsx',
    '!src/app/**/error.tsx',
    '!src/app/**/not-found.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 15,
      functions: 18,
      lines: 14,
      statements: 14,
    },
    './src/services/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/lib/performance/': {
      branches: 80,
      functions: 80,
      lines: 85,
      statements: 85,
    },
  },
  coverageReporters: ['text', 'text-summary', 'html', 'lcov', 'json'],
  testMatch: [
    '**/__tests__/**/*.(test|spec).[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)