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
  ...
}
  
export default createRule<Options, MessageIds>({
  ...
  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      ArrayExpression(node): void {
        ...
        
        if (needSort) {
          ...
          
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
