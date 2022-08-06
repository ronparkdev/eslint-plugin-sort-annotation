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
const names = [
  'Liam',
  'Noah',
  'Jackson',
  'Aiden',
  'Elijah',
  'Grayson',
  'Lucas',
  'Oliver',
]
```

### After apply annotation (Autofix by lint)
```javascript
// @sort
const names = [
  'Aiden',
  'Elijah',
  'Grayson',
  'Jackson',
  'Liam',
  'Lucas',
  'Noah',
  'Oliver',
 ]
```

## Configuration Guide

### First

Add `eslint-plugin-sort-annotation` dependency

```
npm install -D eslint-plugin-sort-annotation
```
or
```
yarn add -D eslint-plugin-sort-annotation
```

### Second

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

### Finally

Add `// @sort` or `// @sort-keys` comment to just above your code

[npm-image]: http://img.shields.io/npm/v/eslint-plugin-sort-annotation.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-sort-annotation

[build-image]: http://img.shields.io/github/workflow/status/ronparkdev/eslint-plugin-sort-annotation/Build%20and%20unit%20test.svg
[build-url]: https://github.com/ronparkdev/eslint-plugin-sort-annotation/actions/workflows/ci.yml
