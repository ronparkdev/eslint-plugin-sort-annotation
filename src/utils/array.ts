const zip2 = <T1, T2>(array1: T1[], array2: T2[]): (readonly [T1, T2])[] => {
  if (array1.length !== array2.length) {
    throw new Error('No matched array length')
  }

  return array1.map((item1, offset) => {
    const item2 = array2[offset]

    return [item1, item2] as const
  })
}

export const ArrayUtils = {
  zip2,
}
