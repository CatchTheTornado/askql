module.exports = {
  testEnvironment: 'node',
  displayName: 'test',
  moduleFileExtensions: ['ask', 'ts', 'pegjs', 'js'],
  testMatch: ['<rootDir>/src/askscript/__tests__/**/*.ask'],
  // testRunner: './dist/testNew.jest.testRunner',
  testRunner: './dist/test.jest.testRunner',
  transform: {
    '^.+\\.[jt]sx?$': './dist/js.jest.transformer',
    '^.+\\.pegjs$': './dist/js.jest.transformer',
    '^.+\\.ask$': './dist/jest.ask.transformer',
  },
};
