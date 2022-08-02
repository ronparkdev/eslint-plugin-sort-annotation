import path from 'path'

import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils'

const { RuleTester } = ESLintUtils

import rule from '../src/rules/sort-annotation'

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
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort
      const array = [1, 2, 3, 11, 12, 13, '1', '11', '2', '22', '3', '33', 'a', 'b', 'c', A, B, C]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort:reversed
      const reversedArray = [C, B, A, 'c', 'b', 'a', '33', '3', '22', '2', '11', '1', 13, 12, 11, 3, 2, 1]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      /*
        @sort
      */
        const simpleArray = [1, 2]
      `,
      filename: getFilename('main.ts'),
    },
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
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort
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
      // @sort
      const array = [1, 2, 3, 11, 12, 13, '1', '11', '2', '22', '3', '33', 'a', 'b', 'c', A, B, C]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      const A = 'A'
      const B = 'B'
      const C = 'C'
      // @sort:reversed
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
      // @sort:reversed
      const reversedArray = [C, B, A, 'c', 'b', 'a', '33', '3', '22', '2', '11', '1', 13, 12, 11, 3, 2, 1]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      /*
        @sort
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
        @sort
      */
      const simpleArray = [1, 2]
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      /*
        @sort:reversed
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
        @sort:reversed
      */
      const reversedSimpleArray = [2, 1]
      `,
      filename: getFilename('main.ts'),
    },
  ],
})
