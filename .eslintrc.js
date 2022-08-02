module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'require-jsdoc': 'off',

    // import
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'unknown', ['parent', 'sibling', 'index']],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'no-unused-vars': 'off',
  },
  ignorePatterns: ['dist/**/*'],
}
