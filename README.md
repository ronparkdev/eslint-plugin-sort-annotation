# eslint-plugin-sort-variable-keys
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url]

## sort-variable-keys
The rule autofix that not sorted object's key or array 

### Configuration Guide
You need setup .eslintrc.js or .eslintrc.json in your project
```js
module.exports = {
  plugins: ['sort-variable-keys'], // Add 'sort-variable-keys' plugin to plugins
  rules: {
    'sort-variable-keys/sort-variable-keys': 'error',
  }
}
```

[npm-image]: http://img.shields.io/npm/v/eslint-plugin-sort-variable-keys.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-sort-variable-keys

[build-image]: http://img.shields.io/github/workflow/status/ronpark-dev/eslint-plugin-sort-variable-keys/Build%20and%20unit%20test.svg
[build-url]: https://github.com/ronpark-dev/eslint-plugin-sort-variable-keys/actions/workflows/ci.yml
