import path from 'path'

import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils'

const { RuleTester } = ESLintUtils

import rule from '../src/rules/sort-keys-annotation'

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

ruleTester.run('sort-keys', rule, {
  valid: [
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys
      const array = [1, 2, 3, 11, 12, 13, '1', '11', '2', '22', '3', '33', 'a', 'b', 'c', A, B, C]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys:reversed
      const reversedArray = [C, B, A, 'c', 'b', 'a', '33', '3', '22', '2', '11', '1', 13, 12, 11, 3, 2, 1]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys
      const object = {
        '1': '1',
        '11': '11',
        '2': '2',
        '22': '22',
        '3': '3',
        '33': '33',
        a: 'a',
        b: 'b',
        c: 'c',
        [A]: 'A',
        [B]: 'B',
        [C]: 'C',
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys:reversed
      const reversedObject = {
        [C]: 'C',
        [B]: 'B',
        [A]: 'A',
        c: 'c',
        b: 'b',
        a: 'a',
        '33': '33',
        '3': '3',
        '22': '22',
        '2': '2',
        '11': '11',
        '1': '1',
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      /*
        @sort-keys
      */
        const simpleArray = [1, 2]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      /*
        @sort-keys:reversed
      */
        const reversedSimpleArray = [2, 1]
      `,
      filename: getFilename('main.ts'),
    },
  ],
  invalid: [
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys
      const array = [C, B, A, 'c', 'b', 'a', '33', '3', '22', '2', '11', '1', 13, 12, 11, 3, 2, 1]
      `,
      errors: [
        {
          messageId: 'hasUnsortedKeys',
          type: AST_NODE_TYPES.ArrayExpression,
        },
      ],
      output: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys
      const array = [1, 2, 3, 11, 12, 13, '1', '11', '2', '22', '3', '33', 'a', 'b', 'c', A, B, C]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys:reversed
      const reversedArray = [1, 2, 3, 11, 12, 13, '1', '11', '2', '22', '3', '33', 'a', 'b', 'c', A, B, C]
      `,
      errors: [
        {
          messageId: 'hasUnsortedKeys',
          type: AST_NODE_TYPES.ArrayExpression,
        },
      ],
      output: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys:reversed
      const reversedArray = [C, B, A, 'c', 'b', 'a', '33', '3', '22', '2', '11', '1', 13, 12, 11, 3, 2, 1]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys
      const object = {
        [C]: 'C',
        [B]: 'B',
        [A]: 'A',
        c: 'c',
        b: 'b',
        a: 'a',
        '33': '33',
        '3': '3',
        '22': '22',
        '2': '2',
        '11': '11',
        '1': '1',
      }
      `,
      errors: [
        {
          messageId: 'hasUnsortedKeys',
          type: AST_NODE_TYPES.ObjectExpression,
        },
      ],
      output: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys
      const object = {
        '1': '1',
        '11': '11',
        '2': '2',
        '22': '22',
        '3': '3',
        '33': '33',
        a: 'a',
        b: 'b',
        c: 'c',
        [A]: 'A',
        [B]: 'B',
        [C]: 'C',
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys:reversed
      const reversedObject = {
        '1': '1',
        '11': '11',
        '2': '2',
        '22': '22',
        '3': '3',
        '33': '33',
        a: 'a',
        b: 'b',
        c: 'c',
        [A]: 'A',
        [B]: 'B',
        [C]: 'C',
      }
      `,
      errors: [
        {
          messageId: 'hasUnsortedKeys',
          type: AST_NODE_TYPES.ObjectExpression,
        },
      ],
      output: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort-keys:reversed
      const reversedObject = {
        [C]: 'C',
        [B]: 'B',
        [A]: 'A',
        c: 'c',
        b: 'b',
        a: 'a',
        '33': '33',
        '3': '3',
        '22': '22',
        '2': '2',
        '11': '11',
        '1': '1',
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      /*
        @sort-keys
      */
      const simpleArray = [2, 1]
      `,
      errors: [
        {
          messageId: 'hasUnsortedKeys',
          type: AST_NODE_TYPES.ArrayExpression,
        },
      ],
      output: `
      /*
        @sort-keys
      */
      const simpleArray = [1, 2]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      /*
        @sort-keys:reversed
      */
      const reversedSimpleArray = [1, 2]
      `,
      errors: [
        {
          messageId: 'hasUnsortedKeys',
          type: AST_NODE_TYPES.ArrayExpression,
        },
      ],
      output: `
      /*
        @sort-keys:reversed
      */
      const reversedSimpleArray = [2, 1]
      `,
      filename: getFilename('main.ts'),
    },
  ],
})
