module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    complexity: ['error', { max: 8 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'max-depth': ['error', 4],
    'no-nested-ternary': 'error',
    'no-magic-numbers': [
      'warn',
      { detectObjects: false, enforceConst: true, ignore: [1], ignoreArrayIndexes: true }
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 2,
        maxEOF: 1
      }
    ]
  }
};
