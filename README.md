# eslint-plugin-sort-annotation
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url]

An ESLint plugin for sorting interface properties, object keys and array values if code has annotation. Rules support *auto fix* and Typescript also.


| `sort-annotation/sort` | `sort-annotation/sort-keys` 
|---|---|
| ![1664532891](https://user-images.githubusercontent.com/47266692/193248649-75b881b7-3d15-407a-9bf2-7cca8a562532.gif) | ![1664532549](https://user-images.githubusercontent.com/47266692/193247765-b6398fa5-a6f3-4d7a-932b-ed635125bbee.gif) |




# Installation
You’ll first need to install ESLint:
```
npm i eslint --save-dev
```

Next, install `eslint-plugin-sort-annotation`:
```
npm i eslint-plugin-sort-annotation --save-dev
```

# Usage
Here’s a suggested ESLint configuration that:
```javascript
{
  "parserOptions": { ... }, // Nothing changed
  "plugins": [..., "sort-annotation"], // Add 'sort-annotation' next to old plugins
  "rules": {
    ...
    // Add below rules next to old rules 
    'sort-annotation/sort-keys': 'error',
    'sort-annotation/sort': 'error',
  }
}
```

# Supported Rules
* [`sort-keys`](https://github.com/ronparkdev/eslint-plugin-sort-annotation/blob/master/documents/sort-keys.md) : Sort interface properties or object keys if has `@sort-keys` annotation

* [`sort`](https://github.com/ronparkdev/eslint-plugin-sort-annotation/blob/master/documents/sort.md) : Sort array values if has `@sort` annotation

# License
BSD License


[npm-image]: http://img.shields.io/npm/v/eslint-plugin-sort-annotation.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-sort-annotation

[build-image]: http://img.shields.io/github/workflow/status/ronparkdev/eslint-plugin-sort-annotation/Build%20and%20unit%20test.svg
[build-url]: https://github.com/ronparkdev/eslint-plugin-sort-annotation/actions/workflows/ci.yml
