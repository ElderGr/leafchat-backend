/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.(test|spec).ts'],
  setupFiles: ['<rootDir>/tests/setup-envs.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@prisma_config/(.*)': '<rootDir>/prisma/$1',
    '@test/(.*)': '<rootDir>/tests/$1',
  },
  coverageDirectory: 'coverage',
  restoreMocks: true,
};
