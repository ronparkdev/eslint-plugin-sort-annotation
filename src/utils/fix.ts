import { Range } from '@typescript-eslint/types/dist/generated/ast-spec'
import { SourceCode } from '@typescript-eslint/utils/dist/ts-eslint'

const getFixedText = (sourceCode: SourceCode, nodeRange: Range, diffRange: { from: Range; to: Range }[]) => {
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

export const FixUtils = {
  getFixedText,
}
