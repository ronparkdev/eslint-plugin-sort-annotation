import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { TSESTree } from '@typescript-eslint/utils'

import { ArrayUtils } from '../utils/array'
import { ComparerUtils } from '../utils/comparer'
import { ConfigUtils } from '../utils/config'
import { createRule } from '../utils/createRule'
import { FixUtils } from '../utils/fix'

type Options = []

export const HAS_UNSORTED_KEYS_MESSAGE_ID = 'hasUnsortedKeys'

type MessageIds = typeof HAS_UNSORTED_KEYS_MESSAGE_ID

export default createRule<Options, MessageIds>({
  name: 'sort-keys-annotation',
  meta: {
    docs: {
      description: 'Sort keys in object if annotated as @sort-keys',
      recommended: 'error',
      suggestion: true,
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
    messages: {
      [HAS_UNSORTED_KEYS_MESSAGE_ID]: `has unsorted keys`,
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode()

    const findParentReclusive = (
      node: TSESTree.Node,
      parentTypes: AST_NODE_TYPES[],
      deepCountingTypes: AST_NODE_TYPES[],
    ) => {
      let currentNode: TSESTree.Node = node
      let deepLevel = 1
      while ((currentNode = currentNode.parent) !== null) {
        if (deepCountingTypes.includes(currentNode.type)) {
          deepLevel += 1
        }
        if (parentTypes.includes(currentNode.type)) {
          return { node: currentNode, deepLevel }
        }
      }
      return null
    }

    return {
      ObjectExpression(node): void {
        const result = findParentReclusive(
          node,
          [AST_NODE_TYPES.VariableDeclaration, AST_NODE_TYPES.TSTypeAliasDeclaration],
          [AST_NODE_TYPES.ObjectExpression],
        )
        if (!result) {
          return
        }
        const { node: parentNode, deepLevel: currentDeepLevel } = result

        const commentExpectedEndLine = parentNode.loc.start.line - 1
        const config = ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine)
        if (!config) {
          return
        }

        const { isReversed, deepLevel } = config
        if (deepLevel < currentDeepLevel) {
          return
        }

        const comparer = ComparerUtils.makeObjectPropertyComparer({ isReversed })

        const properties = node.properties
        const sortedProperties = [...properties].sort(comparer)

        const needSort = ArrayUtils.zip2(properties, sortedProperties).some(
          ([property, sortedProperty]) => property !== sortedProperty,
        )

        if (needSort) {
          const diffRanges = ArrayUtils.zip2(node.properties, sortedProperties).map(([from, to]) => ({
            from: from.range,
            to: to.range,
          }))

          const fixedText = FixUtils.getFixedText(sourceCode, node.range, diffRanges)

          context.report({
            node,
            messageId: HAS_UNSORTED_KEYS_MESSAGE_ID,
            fix(fixer) {
              return fixer.replaceTextRange(node.range, fixedText)
            },
          })
        }
      },
      TSInterfaceBody(node): void {
        const result = findParentReclusive(
          node,
          [AST_NODE_TYPES.TSInterfaceDeclaration],
          [AST_NODE_TYPES.TSInterfaceBody],
        )
        if (!result) {
          return
        }
        const { node: parentNode, deepLevel: currentDeepLevel } = result

        const commentExpectedEndLine = parentNode.loc.start.line - 1
        const config = ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine)
        if (!config) {
          return
        }

        const { isReversed, deepLevel } = config
        if (deepLevel < currentDeepLevel) {
          return
        }

        const comparer = ComparerUtils.makeInterfacePropertyComparer({ isReversed })

        const properties = node.body
        const sortedProperties = [...properties].sort(comparer)

        const needSort = ArrayUtils.zip2(properties, sortedProperties).some(
          ([property, sortedProperty]) => property !== sortedProperty,
        )

        if (needSort) {
          const diffRanges = ArrayUtils.zip2(properties, sortedProperties).map(([from, to]) => ({
            from: from.range,
            to: to.range,
          }))

          const fixedText = FixUtils.getFixedText(sourceCode, node.range, diffRanges)

          context.report({
            node,
            messageId: 'hasUnsortedKeys',
            fix(fixer) {
              return fixer.replaceTextRange(node.range, fixedText)
            },
          })
        }
      },
      TSTypeLiteral(node): void {
        const result = findParentReclusive(
          node,
          [AST_NODE_TYPES.TSInterfaceDeclaration, AST_NODE_TYPES.TSTypeAliasDeclaration],
          [AST_NODE_TYPES.TSInterfaceBody, AST_NODE_TYPES.TSTypeLiteral],
        )
        if (!result) {
          return
        }
        const { node: parentNode, deepLevel: currentDeepLevel } = result

        const commentExpectedEndLine = parentNode.loc.start.line - 1
        const config = ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine)
        if (!config) {
          return
        }

        const { isReversed, deepLevel } = config
        if (deepLevel < currentDeepLevel) {
          return
        }

        const comparer = ComparerUtils.makeInterfacePropertyComparer({ isReversed })

        const properties = node.members
        const sortedProperties = [...properties].sort(comparer)

        const needSort = ArrayUtils.zip2(properties, sortedProperties).some(
          ([property, sortedProperty]) => property !== sortedProperty,
        )

        if (needSort) {
          const diffRanges = ArrayUtils.zip2(properties, sortedProperties).map(([from, to]) => ({
            from: from.range,
            to: to.range,
          }))

          const fixedText = FixUtils.getFixedText(sourceCode, node.range, diffRanges)

          context.report({
            node,
            messageId: HAS_UNSORTED_KEYS_MESSAGE_ID,
            fix(fixer) {
              return fixer.replaceTextRange(node.range, fixedText)
            },
          })
        }
      },
      TSEnumDeclaration(node): void {
        // Determine the line before the enum declaration to find potential configuration comments
        const commentExpectedEndLine = node.loc.start.line - 1

        // Extract the sorting configuration from the comments
        const config = ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine)
        if (!config) {
          return // No configuration found, skip sorting
        }

        const { isReversed } = config

        // Assuming a similar comparer can be used or create a specific one for enums
        const comparer = ComparerUtils.makeEnumMemberComparer({ isReversed })

        // Collect all enum members
        const members = node.members
        const sortedMembers = [...members].sort(comparer)

        // Determine if there is a need to sort
        const needSort = ArrayUtils.zip2(members, sortedMembers).some(
          ([member, sortedMember]) => member !== sortedMember,
        )

        if (needSort) {
          const diffRanges = ArrayUtils.zip2(members, sortedMembers).map(([from, to]) => ({
            from: from.range,
            to: to.range,
          }))

          const fixedText = FixUtils.getFixedText(sourceCode, node.range, diffRanges)

          // Report the issue and provide a fix
          context.report({
            node,
            messageId: HAS_UNSORTED_KEYS_MESSAGE_ID,
            fix(fixer) {
              return fixer.replaceTextRange(node.range, fixedText)
            },
          })
        }
      },
    }
  },
})
