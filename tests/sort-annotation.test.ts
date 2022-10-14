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
      // @sort
      const array = [false, true, 1, 2, 11, 12, 1n, 2n, 11n, 12n]
      `,
      filename: getFilename('main.ts'),
    },
  ],
  invalid: [
    {{
      code: `
      // @sort
      const array = [12n, 11n, 2n, 1n, 12, 11, 2, 1, true, false]
      `,
      errors: [
        {
          messageId: 'hasUnsortedKeys',
          type: AST_NODE_TYPES.ArrayExpression,
        },
      ],
      output: `
      // @sort
      const array = [false, true, 1, 2, 11, 12, 1n, 2n, 11n, 12n]
      `,
      filename: getFilename('main.ts'),
    },
  ],
})
