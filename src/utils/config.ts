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
    .find((lineString) => lineString.split(' ').find((str) => str.startsWith(annotationName)))

  if (!matchedCommentLineString) {
    return null
  }

  const options = matchedCommentLineString.split(':')

  const isReversed = options.includes('reversed')
  const deepLevel = (() => {
    const matchedExecResult = options
      .map((option) => /deep(\((\d+)\))?/.exec(option))
      .find((execResult) => !!execResult)

    if (!matchedExecResult) {
      return 1 // deep option is not matched
    }

    const level = parseInt(matchedExecResult[2], 10)

    if (isNaN(level)) {
      return Number.MAX_SAFE_INTEGER // infinity deep sorting
    }

    return level
  })()

  return {
    isReversed,
    deepLevel,
  }
}

export const ConfigUtils = {
  getConfig,
}
