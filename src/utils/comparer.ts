import {
  Expression,
  SpreadElement,
  ObjectLiteralElement,
  TypeElement,
} from '@typescript-eslint/types/dist/generated/ast-spec'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'

type Element = Expression | SpreadElement
type LiteralType = string | number | bigint | boolean | RegExp

export const getAstNodeTypeOrder = (type: AST_NODE_TYPES) => {
  const order = [AST_NODE_TYPES.Literal, AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression].indexOf(type)
  const END_OF_ORDER = 2
  return order === -1 ? END_OF_ORDER : order
}

export const getLiteralTypeOrder = (
  type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function',
) => {
  const order = ['boolean', 'number', 'bigint', 'string'].indexOf(type)
  const END_OF_ORDER = 5
  return order === -1 ? END_OF_ORDER : order
}

const makeObjectPropertyComparer = ({ isReversed }: { isReversed: boolean }) => {
  const comparer = (l: ObjectLiteralElement, r: ObjectLiteralElement) => {
    if (l.type === AST_NODE_TYPES.Property && r.type === AST_NODE_TYPES.Property) {
      if (l.key.type === AST_NODE_TYPES.Literal && r.key.type === AST_NODE_TYPES.Literal) {
        // Both string should compare in dictionary order
        return l.key.value < r.key.value ? -1 : 1
      } else if (l.key.type === AST_NODE_TYPES.Identifier && r.key.type === AST_NODE_TYPES.Identifier) {
        // Computed key should place at right side (ex: { [KEY]: value })
        if (l.computed !== r.computed) {
          return l.computed ? 1 : -1
        }

        // Both string should compare in dictionary order
        return l.key.name < r.key.name ? -1 : 1
      } else {
        // Other types should sort as [AST_NODE_TYPES.Literal, AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression, others]
        return getAstNodeTypeOrder(l.key.type) - getAstNodeTypeOrder(r.key.type)
      }
    } else {
      // Do not judge of keys order if cannot compare
      return 0
    }
  }

  return isReversed ? (l: ObjectLiteralElement, r: ObjectLiteralElement) => -comparer(l, r) : comparer
}

const makeInterfacePropertyComparer = ({ isReversed }: { isReversed: boolean }) => {
  const comparer = (l: TypeElement, r: TypeElement) => {
    if (l.type === AST_NODE_TYPES.TSPropertySignature && r.type === AST_NODE_TYPES.TSPropertySignature) {
      if (l.key.type === AST_NODE_TYPES.Literal && r.key.type === AST_NODE_TYPES.Literal) {
        // Both string should compare in dictionary order
        return l.key.value < r.key.value ? -1 : 1
      } else if (l.key.type === AST_NODE_TYPES.Identifier && r.key.type === AST_NODE_TYPES.Identifier) {
        // Computed key should place at right side (ex: { [KEY]: value })
        if (l.computed !== r.computed) {
          return l.computed ? 1 : -1
        }

        // Both string should compare in dictionary order
        return l.key.name < r.key.name ? -1 : 1
      } else {
        // Other types should sort as [AST_NODE_TYPES.Literal, AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression, others]
        return getAstNodeTypeOrder(l.key.type) - getAstNodeTypeOrder(r.key.type)
      }
    } else {
      // Do not judge of keys order if cannot compare
      return 0
    }
  }

  return isReversed ? (l: TypeElement, r: TypeElement) => -comparer(l, r) : comparer
}

const compareLiterals = (l: LiteralType, r: LiteralType): number => {
  const a = typeof l
  if (typeof l !== typeof r) {
    // Decide the order according to the type
    const lOrder = getLiteralTypeOrder(typeof l)
    const rOrder = getLiteralTypeOrder(typeof r)
    return lOrder - rOrder
  } else if (typeof l === 'number' && typeof r === 'number') {
    // Both number should compare in numerical order
    return l - r
  } else if (typeof l === 'string' && typeof r === 'string') {
    // Both string should compare in alphabetical order
    return l === r ? 0 : l < r ? -1 : 1
  } else {
    // Do not compare RegExp type
    return 0
  }
}

const makeArrayValueComparer = ({ isReversed, sourceCode }: { isReversed: boolean; sourceCode: SourceCode }) => {
  const fullText = sourceCode.getText()

  const comparer = (l: Element, r: Element) => {
    if (l.type === AST_NODE_TYPES.Literal && r.type === AST_NODE_TYPES.Literal) {
      return compareLiterals(l.value, r.value)
    } else if (l.type === r.type) {
      // Identifier should compare name with dictionary order
      return fullText.slice(...l.range) < fullText.slice(...r.range) ? -1 : 1
    } else {
      // l.type !== r.type
      // Other types should sort as [AST_NODE_TYPES.Literal, AST_NODE_TYPES.Identifier, others]
      return getAstNodeTypeOrder(l.type) - getAstNodeTypeOrder(r.type)
    }
  }

  return isReversed ? (l: Element, r: Element) => -comparer(l, r) : comparer
}

export const ComparerUtils = {
  makeObjectPropertyComparer,
  makeInterfacePropertyComparer,
  makeArrayValueComparer,
}
