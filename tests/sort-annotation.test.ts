import path from 'path'

import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils'

const { RuleTester } = ESLintUtils

import rule, { HAS_UNSORTED_KEYS_MESSAGE_ID } from '../src/rules/sort-annotation'

const getFilename = (filePath: string): string => path.resolve('./tests', filePath)

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2015,
    project: getFilename('tsconfig.json'),
    sourceType: 'module',
  },
})

ruleTester.run('sort-annotation', rule, {
  valid: [
    // Check alignment between different types
    {
      code: `
      const A = 'A'
      enum Type { A = 'A' }
      // @sort
      const array = [false, 0, 0n, 'a', A, Type.A]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between booleans
    {
      code: `
      // @sort
      const array = [false, true]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between numbers
    {
      code: `
      // @sort
      const array = [1, 2, 11, 12, 1n, 2n, 11n, 12n]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between strings
    {
      code: `
      // @sort
      const array = ['1', '11', '2', '22', 'a', 'b']
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between variables
    {
      code: `
      var A, B
      // @sort
      const array = [A, B]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between enums
    {
      code: `
      enum Type { A = 'A', B = 'B' }
      // @sort
      const array = [Type.A, Type.B]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between different types with `reversed` tag
    {
      code: `
      const A = 'A'
      enum Type { A = 'A' }
      // @sort:reversed
      const array = [Type.A, A, 'a', 0n, 0, false]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between booleans with `reversed` tag
    {
      code: `
      // @sort:reversed
      const array = [true, false]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between numbers with `reversed` tag
    {
      code: `
      // @sort:reversed
      const array = [12n, 11n, 2n, 1n, 12, 11, 2, 1]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between strings with `reversed` tag
    {
      code: `
      // @sort:reversed
      const array = ['b', 'a', '22', '2', '11', '1']
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between variables with `reversed` tag
    {
      code: `
      var A, B
      // @sort:reversed
      const array = [B, A]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between enums
    {
      code: `
      enum Type { A = 'A', B = 'B' }
      // @sort:reversed
      const array = [Type.B, Type.A]
      `,
      filename: getFilename('main.ts'),
    },
    // Check multi-line comment
    {
      code: `
      /*
        @sort
      */
        const simpleArray = [1, 2]
      `,
      filename: getFilename('main.ts'),
    },
    // Check multi-line comment with `reversed` tag
    {
      code: `
      /*
        @sort:reversed
      */
        const reversedSimpleArray = [2, 1]
      `,
      filename: getFilename('main.ts'),
    },
  ],
  invalid: [
    // Check alignment between different types
    {
      code: `
      const A = 'A'
      enum Type { A = 'A' }
      // @sort
      const array = [Type.A, 'a', 0n, 0, false, A]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      const A = 'A'
      enum Type { A = 'A' }
      // @sort
      const array = [false, 0, 0n, 'a', A, Type.A]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between booleans
    {
      code: `
      // @sort
      const array = [true, false]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      // @sort
      const array = [false, true]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between numbers
    {
      code: `
      // @sort
      const array = [12n, 11n, 2n, 1n, 12, 11, 2, 1]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      // @sort
      const array = [1, 2, 11, 12, 1n, 2n, 11n, 12n]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between strings
    {
      code: `
      // @sort
      const array = ['b', 'a', '22', '2', '11', '1']
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      // @sort
      const array = ['1', '11', '2', '22', 'a', 'b']
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between variables
    {
      code: `
      var A, B
      // @sort
      const array = [B, A]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      var A, B
      // @sort
      const array = [A, B]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between enums
    {
      code: `
      enum Type { A = 'A', B = 'B' }
      // @sort
      const array = [Type.B, Type.A]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      enum Type { A = 'A', B = 'B' }
      // @sort
      const array = [Type.A, Type.B]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between different types with `reversed` tag
    {
      code: `
      const A = 'A'
      enum Type { A = 'A' }
      // @sort:reversed
      const array = [false, 0, 0n, 'a', A, Type.A]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      const A = 'A'
      enum Type { A = 'A' }
      // @sort:reversed
      const array = [Type.A, A, 'a', 0n, 0, false]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between booleans with `reversed` tag
    {
      code: `
      // @sort:reversed
      const array = [false, true]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      // @sort:reversed
      const array = [true, false]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between numbers with `reversed` tag
    {
      code: `
      // @sort:reversed
      const array = [1, 2, 11, 12, 1n, 2n, 11n, 12n]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      // @sort:reversed
      const array = [12n, 11n, 2n, 1n, 12, 11, 2, 1]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between strings with `reversed` tag
    {
      code: `
      // @sort:reversed
      const array = ['1', '11', '2', '22', 'a', 'b']
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      // @sort:reversed
      const array = ['b', 'a', '22', '2', '11', '1']
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between variables with `reversed` tag
    {
      code: `
      var A, B
      // @sort:reversed
      const array = [A, B]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      var A, B
      // @sort:reversed
      const array = [B, A]
      `,
      filename: getFilename('main.ts'),
    },
    // Check alignment between enums with `reversed` tag
    {
      code: `
      enum Type { A = 'A', B = 'B' }
      // @sort:reversed
      const array = [Type.A, Type.B]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      enum Type { A = 'A', B = 'B' }
      // @sort:reversed
      const array = [Type.B, Type.A]
      `,
      filename: getFilename('main.ts'),
    },
    // Check multi-line comment
    {
      code: `
      /*
        @sort:reversed
      */
      const simpleArray = [1, 2]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      /*
        @sort:reversed
      */
      const simpleArray = [2, 1]
      `,
      filename: getFilename('main.ts'),
    },
    // Check multi-line comment with `reversed` tag
    {
      code: `
      /*
        @sort
      */
      const reversedSimpleArray = [2, 1]
      `,
      errors: [{ messageId: HAS_UNSORTED_KEYS_MESSAGE_ID, type: AST_NODE_TYPES.ArrayExpression }],
      output: `
      /*
        @sort
      */
      const reversedSimpleArray = [1, 2]
      `,
      filename: getFilename('main.ts'),
    },
  ],
})
