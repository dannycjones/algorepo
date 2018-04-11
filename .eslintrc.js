module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: 'plugin:vue/essential',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'semi': ['warn', 'always']
  },
  globals: {},
  parserOptions: {
    parser: 'babel-eslint'
  }
}
