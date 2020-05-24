module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': './dist/jest.ts.transformer',
    '^.+\\.ask$': './dist/jest.ask.transformer',
  },
  testRunner: './dist/jest-test-runner',
  testMatch: [
    '<rootDir>/src/askscript/__tests__/**/*.ask',
    // '**/__tests__/**/*.[jt]s?(x)',
    // '**/?(*.)+(spec|test).[jt]s?(x)',
    // '**/__tests__/**/*.ask',
    // '**/*.ask',
    // '**/*.[jt]s?(x)',
  ],
  moduleFileExtensions: ['ask', 'js', 'ts', 'tsx'],
  testEnvironment: 'node',
  // testPathIgnorePatterns: [
  //   '<rootDir>/node_modules',
  //   '<rootDir>/dist',
  //   // '__tests__/lib',
  //   // 'src/askscript/__tests__/.*/_environment.ts', // these are definitions of environments
  //   // 'src/askscript/__tests__/.*/.*.out.tsx', // these are sample output files
  //   // 'src/askscript/__tests__/.*/.*.result.tsx', // these hold expected result from running .ask files
  //   // 'src/askscript/__tests__/tools/*', // there are test-related tools
  // ],
  // moduleNameMapper: {
  //   '^askvm(.*)': '<rootDir>/src/askvm$1',
  // },
};
