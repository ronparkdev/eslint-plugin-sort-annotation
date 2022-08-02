# sort-annotation
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url]

The rule autofix that not sorted object's key or array 

## Sort Object's keys with `sort-annotation/sort-keys` rule

### Before apply annotation
```javascript
const nameToAgeMap = {
  Liam: 36,
  Noah: 21,
  Jackson: 15,
  Aiden: 62,
  Elijah: 17,
  Grayson: 27,
  Lucas: 43,
  Oliver: 52,
}
```

### After apply annotation (Autofix by lint)
```javascript
// @sort-keys
const nameToAgeMap = {
  Aiden: 62,
  Elijah: 17,
  Grayson: 27,
  Jackson: 15,
  Liam: 36,
  Lucas: 43,
  Noah: 21,
  Oliver: 52,
}
```

## Sort Array values with `sort-annotation/sort` rule

### Before apply annotation
```javascript
const pies = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9]
```

### After apply annotation (Autofix by lint)
```javascript
// @sort
const pies = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 8, 9, 9]
```

## Configuration Guide
You need setup .eslintrc.js or .eslintrc.json in your project
```js
module.exports = {
  plugins: ['sort-annotation'], // Add 'sort-annotation' plugin to plugins
  rules: {
    'sort-annotation/sort-keys': 'error',
    'sort-annotation/sort': 'error',
  }
}
```

[npm-image]: http://img.shields.io/npm/v/eslint-plugin-sort-annotation.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-sort-annotation

[build-image]: http://img.shields.io/github/workflow/status/ronpark-dev/eslint-plugin-sort-annotation/Build%20and%20unit%20test.svg
[build-url]: https://github.com/ronpark-dev/eslint-plugin-sort-annotation/actions/workflows/ci.yml
