module.exports = {
  displayName: 'test',
  moduleFileExtensions: ['ask', 'ts', 'tsx', 'pegjs', 'js'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.(ask|pegjs|[jt]s?(x))',
    '<rootDir>/src/*.(ask|pegjs|[jt]s?(x))',
  ],
  testRunner: './dist/test.jest.testRunner',
  transform: {
    '^.+\\.(ask|pegjs|[jt]sx?)$': './dist/javascript.jest.transformer',
  },
};
