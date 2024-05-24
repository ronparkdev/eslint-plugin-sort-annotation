<h1>⚠️ Changed to eslint-plugin-annotation to add other features besides sorting! </h1>

* -> [eslint-plugin-annotation](https://github.com/ronparkdev/eslint-plugin-annotation)

# eslint-plugin-sort-annotation
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url]

An ESLint plugin for sorting interface properties, object keys and array values if code has annotation. Rules support *auto fix* and Typescript also.


| `sort-annotation/sort` | `sort-annotation/sort-keys` 
|---|---|
| ![sort](https://user-images.githubusercontent.com/47266692/228701112-0db47098-7eea-4ba9-953c-a38fb82f69d8.gif) | ![sort-keys](https://user-images.githubusercontent.com/47266692/228700878-75c1ee11-3e4d-4668-aa60-fcc65ea4d519.gif) |

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
