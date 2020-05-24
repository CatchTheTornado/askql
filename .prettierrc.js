module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.ask',
      parser: './dist/parser.prettier.js',
      options: {
        semi: true,
      },
    },
  ],
};
