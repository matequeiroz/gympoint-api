module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'comma-dangle': 'off',
    'nonblock-statement-body-position': 'off',
  },
};
