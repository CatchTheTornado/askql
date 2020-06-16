module.exports = {
  overrides: [
    {
      files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
      options: {
        parser: 'typescript',
        singleQuote: true,
        endOfLine: 'lf',
      },
    },
    {
      // TODO ignore ceratin files that need to have arbitrary whitespace and tabs
      files: '*.ask',
      options: {
        parser: 'askscript',
        plugins: ['./dist/prettier-plugin-askscript'],
      },
    },
  ],
};
