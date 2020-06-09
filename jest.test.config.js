module.exports = {
  displayName: 'test',
  moduleFileExtensions: ['ask', 'ts', 'tsx', 'pegjs', 'js'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/*.(ask|pegjs)',
  ],
  testPathIgnorePatterns: ['<rootDir>/drafts/', '.*\\.ask\\.formatted\\.ask', "<rootDir>/dist/"],
  testRunner: './dist/test.jest.testRunner',
  transform: {
    '^.+\\.(ask|pegjs|[jt]sx?)$': './dist/javascript.jest.transformer',
  },
  watchPathIgnorePatterns: ["<rootDir>/dist"]
};
