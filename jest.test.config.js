module.exports = {
  testEnvironment: 'node',
  displayName: 'test',
  moduleFileExtensions: ['ask', 'ts', 'tsx', 'pegjs', 'js'],
  testMatch: [
    '<rootDir>/src/**/*.([jt]s?(x)|ask|pegjs)',
    '<rootDir>/src/*.([jt]s?(x)|ask|pegjs)',
  ],
  testRunner: './dist/test.jest.testRunner',
  transform: {
    '^.+\\.([jt]sx?|pegjs)$': './dist/javascript.jest.transformer',
    '^.+\\.(ask)$': './dist/askcode.jest.transformer',
  },
};
