import { ArrayUtils } from '../utils/array'
import { ComparerUtils } from '../utils/comparer'
import { ConfigUtils } from '../utils/config'
import { createRule } from '../utils/createRule'
import { FixUtils } from '../utils/fix'

type Options = []

type MessageIds = 'hasUnsortedKeys'

export default createRule<Options, MessageIds>({
  name: 'sort-annotation',
  meta: {
    docs: {
      description: 'Sort array if annotated as @sort',
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

    return {
      ArrayExpression(node): void {
        const commentExpectedEndLine = node.loc.start.line - 1

        const config = ConfigUtils.getConfig(sourceCode, '@sort', commentExpectedEndLine)

        if (!config) {
          return
        }

        const { isReversed } = config

        const comparer = ComparerUtils.makeArrayComparer({ isReversed, sourceCode })

        const sortedElements = [...node.elements].sort(comparer)

        const needSort = ArrayUtils.zip2(node.elements, sortedElements).some(
          ([element, sortedElement]) => element !== sortedElement,
        )

        if (needSort) {
          const diffRanges = ArrayUtils.zip2(node.elements, sortedElements).map(([from, to]) => ({
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
    }
  },
})
