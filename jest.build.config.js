module.exports = {
  displayName: 'build',
  moduleFileExtensions: ['pegjs', 'ts', 'tsx', 'js'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.[jt]s?(x)', '<rootDir>/src/**/*.pegjs'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '.*/__tests__/.*',
  ],
  testRunner: './dist/build.jest.testRunner',
  transform: {
    '^.+\\.[jt]sx?$': './dist/js.jest.transformer',
    '^.+\\.pegjs$': './dist/js.jest.transformer',
    // '^.+\\.ask$': './dist/jest.ask.transformer',
  },
  // moduleNameMapper: {
  //   '^askvm(.*)': '<rootDir>/src/askvm$1',
  // },
};
