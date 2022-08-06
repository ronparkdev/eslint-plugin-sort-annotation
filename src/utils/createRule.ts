import { ESLintUtils } from '@typescript-eslint/utils'

// eslint-disable-next-line new-cap
export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/ronparkdev/eslint-plugin-sort-annotation/tree/main/documents/${name}.md`,
)
