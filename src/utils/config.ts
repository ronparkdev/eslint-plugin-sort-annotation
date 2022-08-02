import { AST_TOKEN_TYPES } from '@typescript-eslint/utils'
import { SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'

const getConfig = (sourceCode: SourceCode, annotationName: string, commentEndLine: number) => {
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
    .find((lineString) => lineString.split(' ').includes(annotationName))

  if (!matchedCommentLineString) {
    return null
  }

  const isReversed = matchedCommentLineString.includes(':reversed')

  return {
    isReversed,
  }
}

export const ConfigUtils = {
  getConfig,
}
