module.exports = {
  displayName: 'build',
  moduleFileExtensions: ['ask', 'pegjs', 'ts', 'tsx', 'js'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/*.(ask|pegjs)',
  ],
  testPathIgnorePatterns: [
    '.*\\.d.ts',
    '.*/__tests__/.*',
    '<rootDir>/dist',
    '<rootDir>/drafts',
    '<rootDir>/node_modules',
  ],
  testRunner: './dist/build.jest.testRunner',
  transform: {
    '^.+\\.ask$': './dist/javascript.jest.transformer',
  },
  // moduleNameMapper: {
  //   '^askvm(.*)': '<rootDir>/src/askvm$1',
  // },
};
