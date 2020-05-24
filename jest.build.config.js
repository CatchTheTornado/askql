module.exports = {
  displayName: 'build',
  moduleFileExtensions: ['ask', 'pegjs', 'ts', 'tsx', 'js'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.([jt]s?(x)|ask|pegjs)',
    '<rootDir>/src/*.([jt]s?(x)|ask|pegjs)',
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
    '^.+\\.([jt]sx?|pegjs)$': './dist/javascript.jest.transformer',
    '^.+\\.(ask)$': './dist/askcode.jest.transformer',
  },
  // moduleNameMapper: {
  //   '^askvm(.*)': '<rootDir>/src/askvm$1',
  // },
};
