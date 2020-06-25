module.exports = {
  displayName: 'test',
  moduleFileExtensions: ['ask', 'ts', 'tsx', 'pegjs', 'js'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/*.(ask|pegjs)',
  ],
  testPathIgnorePatterns: [
    '_environment.ts',
    '.*\\.ask\\.formatted\\.ask',
    '.*\\.test.args.ts',
    '.*\\.test.result.ts',
    '.*\\.ask.snapshot.tsx',
    '<rootDir>/dist/',
    '<rootDir>/drafts/',
    '<rootDir>/src/__tests__/lib.ts',
    '<rootDir>/src/askscript/__tests__/tools/run_ask_file.ts',
  ],
  testRunner: './dist/test.jest.testRunner',
  transform: {
    '^.+\\.(ask|pegjs|[jt]sx?)$': './dist/javascript.jest.transformer',
  },
  watchPathIgnorePatterns: ['<rootDir>/dist'],
};
