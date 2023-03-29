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
      // @sort-keys:deep:reversed
      const object = {
        B: string,
        A: { b: string, a: string, },
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep(1):reversed
      const object = {
        B: string,
        A: { a: string, b: string, },
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep(2):reversed
      const object = {
        B: string,
        A: { b: string, a: string, },
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep:reversed
      interface DeepMockInterface {
        B: string
        A: { b: string, a: string, }
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep(1):reversed
      interface DeepMockInterface {
        B: string
        A: { a: string, b: string, }
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep(2):reversed
      interface DeepMockInterface {
        B: string
        A: { b: string, a: string, }
      }
      `,
      filename: getFilename('main.ts'),
    },
  ],
  invalid: [
    {
      code: `
      // @sort-keys:deep:reversed
      interface DeepMockInterface {
        A: string
        B: string
      }
      `,
      errors: [{ messageId: 'hasUnsortedKeys', type: AST_NODE_TYPES.TSInterfaceBody }],
      output: `
      // @sort-keys:deep:reversed
      interface DeepMockInterface {
        B: string
        A: string
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep:reversed
      interface DeepMockInterface {
        A: { a: string, b: string, }
      }
      `,
      errors: [{ messageId: 'hasUnsortedKeys', type: AST_NODE_TYPES.TSTypeLiteral }],
      output: `
      // @sort-keys:deep:reversed
      interface DeepMockInterface {
        A: { b: string, a: string, }
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep(2):reversed
      interface DeepMockInterface {
        A: { a: string, b: string, }
      }
      `,
      errors: [{ messageId: 'hasUnsortedKeys', type: AST_NODE_TYPES.TSTypeLiteral }],
      output: `
      // @sort-keys:deep(2):reversed
      interface DeepMockInterface {
        A: { b: string, a: string, }
      }
      `,
      filename: getFilename('main.ts'),
    },
    {
      code: `
      // @sort-keys:deep:reversed
      interface DeepMockInterface {
        A1: {
          A2: {
            A3: {
              A4: {
                A5: {
                  a: string,
                  b: string,
                }
              }
            }
          }
        }
      }
      `,
      errors: [{ messageId: 'hasUnsortedKeys', type: AST_NODE_TYPES.TSTypeLiteral }],
      output: `
      // @sort-keys:deep:reversed
      interface DeepMockInterface {
        A1: {
          A2: {
            A3: {
              A4: {
                A5: {
                  b: string,
                  a: string,
                }
              }
            }
          }
        }
      }
      `,
      filename: getFilename('main.ts'),
    },
  ],
})
