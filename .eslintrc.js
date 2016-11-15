module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    'react',
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'react/react-in-jsx-scope': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'no-multi-spaces': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'spaced-comment': 0,
    'space-infix-ops': 0,
    'new-cap': 0,
    'key-spacing': 0,
    'no-return-assign': 0,
  }
}
