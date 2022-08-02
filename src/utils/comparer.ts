import {
  Expression,
  SpreadElement,
  ObjectLiteralElement,
  TypeElement,
  PropertyComputedName,
  PropertyNonComputedName,
  TSPropertySignatureComputedName,
  TSPropertySignatureNonComputedName,
} from '@typescript-eslint/types/dist/generated/ast-spec'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'

type Element = Expression | SpreadElement
type LiteralType = string | number | bigint | boolean | RegExp

const AST_NODE_TYPE_ORDERS = [AST_NODE_TYPES.Literal, AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression]
const LITERAL_TYPE_ORDERS = ['boolean', 'number', 'bigint', 'string']

export const getAstNodeTypeOrder = (type: AST_NODE_TYPES) =>
  AST_NODE_TYPE_ORDERS.includes(type) ? AST_NODE_TYPE_ORDERS.indexOf(type) : AST_NODE_TYPE_ORDERS.length

export const getLiteralTypeOrder = (
  type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function',
) => (LITERAL_TYPE_ORDERS.includes(type) ? LITERAL_TYPE_ORDERS.indexOf(type) : LITERAL_TYPE_ORDERS.length)

const compareProperty = <
  T extends
    | PropertyComputedName
    | PropertyNonComputedName
    | TSPropertySignatureComputedName
    | TSPropertySignatureNonComputedName,
>(
  l: T,
  r: T,
) => {
  if (l.key.type === AST_NODE_TYPES.Literal && r.key.type === AST_NODE_TYPES.Literal) {
    const lKey = l.key.value
    const rKey = r.key.value
    // Both string should compare in alphabetical order
    return lKey === rKey ? 0 : lKey < rKey ? -1 : 1
  } else if (l.key.type === AST_NODE_TYPES.Identifier && r.key.type === AST_NODE_TYPES.Identifier) {
    // Computed key should place at right side (ex: { [KEY]: value })
    if (l.computed !== r.computed) {
      return l.computed ? 1 : -1
    }

    const lKey = l.key.name
    const rKey = r.key.name
    // Both string should compare in alphabetical order
    return lKey === rKey ? 0 : lKey < rKey ? -1 : 1
  } else {
    // Other types should sort as [AST_NODE_TYPES.Literal, AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression, others]
    const lOrder = getAstNodeTypeOrder(l.key.type)
    const rOrder = getAstNodeTypeOrder(r.key.type)
    return lOrder - rOrder
  }
}

const makeObjectPropertyComparer = ({ isReversed }: { isReversed: boolean }) => {
  const comparer = (l: ObjectLiteralElement, r: ObjectLiteralElement) => {
    if (l.type === AST_NODE_TYPES.Property && r.type === AST_NODE_TYPES.Property) {
      return compareProperty(l, r)
    }

    // Do not judge of keys order if not property
    return 0
  }

  return isReversed ? (l: ObjectLiteralElement, r: ObjectLiteralElement) => -comparer(l, r) : comparer
}

const makeInterfacePropertyComparer = ({ isReversed }: { isReversed: boolean }) => {
  const comparer = (l: TypeElement, r: TypeElement) => {
    if (l.type === AST_NODE_TYPES.TSPropertySignature && r.type === AST_NODE_TYPES.TSPropertySignature) {
      return compareProperty(l, r)
    }

    // Do not judge of keys order if not property
    return 0
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
  } else if (typeof l === 'boolean' && typeof r === 'boolean') {
    // False should be on the left
    return l === r ? 0 : r ? -1 : 1
  } else if (typeof l === 'number' && typeof r === 'number') {
    // Both number should compare in numerical order
    return l - r
  } else if (typeof l === 'bigint' && typeof r === 'bigint') {
    // Both bigint should compare in numerical order
    return l === r ? 0 : l < r ? -1 : 1
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
      const lText = fullText.slice(...l.range)
      const rText = fullText.slice(...r.range)
      return lText === rText ? 0 : lText < rText ? -1 : 1
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
