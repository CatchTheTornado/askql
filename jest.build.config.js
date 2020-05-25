module.exports = {
  displayName: 'build',
  moduleFileExtensions: ['ask', 'pegjs', 'ts', 'tsx', 'js'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.(ask|pegjs|[jt]s?(x))',
    '<rootDir>/src/*.(ask|pegjs|[jt]s?(x))',
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
    '^.+\\.(ask|pegjs|[jt]sx?)$': './dist/javascript.jest.transformer',
  },
  // moduleNameMapper: {
  //   '^askvm(.*)': '<rootDir>/src/askvm$1',
  // },
};
