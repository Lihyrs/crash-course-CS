module.exports = {
  root: true,
  env: {
      node: true,
      browser: true,
      es6: true
  },
  extends: [
      'airbnb',
  ],
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'linebreak-style': [0, 'error', 'windows'],
      indent: ['error', 4],
      'no-plusplus': 0,
      'prefer-const': 0,
      'no-continue': 0,
      'prefer-destructuring': 0,
      'no-underscore-dangle': 0,
      'no-restricted-syntax': 0,
      'new-cap': 0,
  },
  parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion:6,
      ecmaFeatures:{
          experimentalObjectRestSpread: true
      }
  },
  plugins: [
      'eslint-plugin-import',
  ],
};
