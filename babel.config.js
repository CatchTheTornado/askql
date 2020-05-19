module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { pragma: 'askjsx.createElement' }],
  ],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.ask'],
      },
    ],
  ],
};
