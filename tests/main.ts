function noNeedModifyCases() {
  const A = 'A'
  const B = 'B'
  const C = 'C'

  // @sorted-keys
  const array = [1, 2, 3, 11, 12, 13, '1', '11', '2', '22', '3', '33', 'a', 'b', 'c', A, B, C]

  // @sorted-keys:reversed
  const reversedArray = [C, B, A, 'c', 'b', 'a', '33', '3', '22', '2', '11', '1', 13, 12, 11, 3, 2, 1]

  // @sorted-keys
  const object = {
    '1': '1',
    '11': '11',
    '2': '2',
    '22': '22',
    '3': '3',
    '33': '33',
    a: 'a',
    b: 'b',
    c: 'c',
    [A]: 'A',
    [B]: 'B',
    [C]: 'C',
  }

  // @sorted-keys:reversed
  const reversedObject = {
    [C]: 'C',
    [B]: 'B',
    [A]: 'A',
    c: 'c',
    b: 'b',
    a: 'a',
    '33': '33',
    '3': '3',
    '22': '22',
    '2': '2',
    '11': '11',
    '1': '1',
  }

  /*
    @sorted-keys
  */
  const simpleArray = [1, 2]

  /*
    @sorted-keys:reversed
  */
  const reversedSimpleArray = [2, 1]
}

function needLintCases() {
  const A = 'A'
  const B = 'B'
  const C = 'C'

  // @sorted-keys
  const array = [C, B, A, 'c', 'b', 'a', '33', '3', '22', '2', '11', '1', 13, 12, 11, 3, 2, 1]

  // @sorted-keys:reversed
  const reversedArray = [1, 2, 3, 11, 12, 13, '1', '11', '2', '22', '3', '33', 'a', 'b', 'c', A, B, C]

  // @sorted-keys
  const object = {
    [C]: 'C',
    [B]: 'B',
    [A]: 'A',
    c: 'c',
    b: 'b',
    a: 'a',
    '33': '33',
    '3': '3',
    '22': '22',
    '2': '2',
    '11': '11',
    '1': '1',
  }

  // @sorted-keys:reversed
  const reversedObject = {
    '1': '1',
    '11': '11',
    '2': '2',
    '22': '22',
    '3': '3',
    '33': '33',
    a: 'a',
    b: 'b',
    c: 'c',
    [A]: 'A',
    [B]: 'B',
    [C]: 'C',
  }

  /*
    @sorted-keys
  */
  const simpleArray = [2, 1]

  /*
    @sorted-keys:reversed
  */
  const reversedSimpleArray = [1, 2]
}
