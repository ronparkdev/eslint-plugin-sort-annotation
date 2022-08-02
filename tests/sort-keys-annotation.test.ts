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

ruleTester.run('sort-keys-annotation', rule, {
  valid: [
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
  ],
  invalid: [
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
  ],
})
