module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'no-empty-pattern': 'off',
    'no-undef': 'off',
    'no-useless-catch': 'off',
    'no-useless-escape': 'off',
    'valid-typeof': 'off',
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
  },
};
