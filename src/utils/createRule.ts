import { ESLintUtils } from '@typescript-eslint/utils'

// eslint-disable-next-line new-cap
export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/ronpark-dev/eslint-plugin-sorted-keys/tree/main/documents/${name}.md`,
)
