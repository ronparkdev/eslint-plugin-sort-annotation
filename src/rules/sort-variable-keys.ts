import { AST_TOKEN_TYPES } from '@typescript-eslint/types'
import { Range } from '@typescript-eslint/types/dist/generated/ast-spec'

import { ArrayUtils } from '../utils/array'
import { ComparerUtils } from '../utils/comparer'
import { createRule } from '../utils/createRule'

type Options = []

type MessageIds = 'hasUnsortedKeys'

export default createRule<Options, MessageIds>({
  name: 'sort-variable-keys',
  meta: {
    docs: {
      description: 'Sort keys in object or array',
      recommended: 'error',
      suggestion: true,
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
    messages: {
      hasUnsortedKeys: `has unsorted keys`,
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode()

    const getConfig = (commentEndLine: number) => {
      const matchedComment = sourceCode
        .getAllComments()
        .filter((comment) => [AST_TOKEN_TYPES.Line, AST_TOKEN_TYPES.Block].includes(comment.type))
        .find((comment) => comment.loc.end.line === commentEndLine)

      if (!matchedComment) {
        return null
      }

      const matchedCommentLineString = matchedComment.value
        .split('\n')
        .map((lineString) => lineString.trim())
        .find((lineString) => lineString.startsWith('@sort-keys'))

      if (!matchedCommentLineString) {
        return null
      }

      const isReversed = matchedCommentLineString.includes(':reversed')

      return {
        isReversed,
      }
    }

    const getFixedText = (nodeRange: Range, diffRange: { from: Range; to: Range }[]) => {
      const START = 0
      const END = 1

      const allText = sourceCode.getText()

      const prefix = allText.slice(nodeRange[START], diffRange[0].from[START])
      const postfix = allText.slice(diffRange[diffRange.length - 1].from[END], nodeRange[END])

      return [
        prefix,
        ...diffRange.map(({ to: toRange }, offset) => {
          const text = allText.slice(toRange[START], toRange[END])
          if (offset === 0) {
            return text
          }

          const textPrefix = allText.slice(diffRange[offset - 1].from[END], diffRange[offset].from[START])
          return `${textPrefix}${text}`
        }),
        postfix,
      ].join('')
    }

    return {
      ObjectExpression(node): void {
        const commentExpectedEndLine = node.loc.start.line - 1

        const config = getConfig(commentExpectedEndLine)

        if (!config) {
          return
        }

        const { isReversed } = config

        const comparer = ComparerUtils.makeObjectComparer({ isReversed })

        const sortedProperties = [...node.properties].sort(comparer)

        const needSort = ArrayUtils.zip2(node.properties, sortedProperties).some(
          ([property, sortedProperty]) => property !== sortedProperty,
        )

        if (needSort) {
          const diffRanges = ArrayUtils.zip2(node.properties, sortedProperties).map(([from, to]) => ({
            from: from.range,
            to: to.range,
          }))

          const fixedText = getFixedText(node.range, diffRanges)

          context.report({
            node,
            messageId: 'hasUnsortedKeys',
            fix(fixer) {
              return fixer.replaceTextRange(node.range, fixedText)
            },
          })
        }
      },
      ArrayExpression(node): void {
        const commentExpectedEndLine = node.loc.start.line - 1

        const config = getConfig(commentExpectedEndLine)

        if (!config) {
          return
        }

        const { isReversed } = config

        const comparer = ComparerUtils.makeArrayComparer({ isReversed })

        const sortedElements = [...node.elements].sort(comparer)

        const needSort = ArrayUtils.zip2(node.elements, sortedElements).some(
          ([element, sortedElement]) => element !== sortedElement,
        )

        if (needSort) {
          const diffRanges = ArrayUtils.zip2(node.elements, sortedElements).map(([from, to]) => ({
            from: from.range,
            to: to.range,
          }))

          const fixedText = getFixedText(node.range, diffRanges)

          console.log(fixedText)

          context.report({
            node,
            messageId: 'hasUnsortedKeys',
            fix(fixer) {
              return fixer.replaceTextRange(node.range, fixedText)
            },
          })
        }
      },
    }
  },
})
