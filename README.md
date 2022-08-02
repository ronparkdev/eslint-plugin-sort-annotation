# eslint-plugin-sort-keys-annotation
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url]

## sort-keys-annotation
The rule autofix that not sorted object's key or array 

### Configuration Guide
You need setup .eslintrc.js or .eslintrc.json in your project
```js
module.exports = {
  parser: '@typescript-eslint/parser', // Should be use ts-eslint parser
  plugins: ['sort-keys-annotation'], // Add 'sort-keys-annotation' plugin to plugins
  parserOptions: {
    project: ['./tsconfig.json'], // Add your tsconfig path to parserOptions.project
  },
  rules: {
    'sort-keys-annotation/sort-keys-annotation': 'error',
  }
}
```

[npm-image]: http://img.shields.io/npm/v/eslint-plugin-sort-keys-annotation.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-sort-keys-annotation

[build-image]: http://img.shields.io/github/workflow/status/ronpark-dev/eslint-plugin-sort-keys-annotation/Build%20and%20unit%20test.svg
[build-url]: https://github.com/ronpark-dev/eslint-plugin-sort-keys-annotation/actions/workflows/ci.yml
