# eslint-plugin-sort-variable-keys

## sort-variable-keys
The rule autofix that not sorted object's key or array 

### Configuration Guide
You need setup .eslintrc.js or .eslintrc.json in your project
```js
module.exports = {
  parser: '@typescript-eslint/parser', // Should be use ts-eslint parser
  plugins: ['sort-variable-keys'], // Add 'sort-variable-keys' plugin to plugins
  parserOptions: {
    project: ['./tsconfig.json'], // Add your tsconfig path to parserOptions.project
  },
  rules: {
    'sort-variable-keys': 'error',
  }
}
```
