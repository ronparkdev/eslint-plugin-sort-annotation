function noNeedModifyCases() {
  const A = 'A'
  const B = 'B'
  enum Type {
    A = 'A',
    B = 'B',
  }

  // @sort
  const array = [1, 2, 11, 12, 1n, 2n, 11n, 12n, '1', '11', '2', '22', 'a', 'b', A, B, Type.A, Type.B]

  // @sort:reversed
  const reversedArray = [Type.B, Type.A, B, A, 'b', 'a', '22', '2', '11', '1', 12n, 11n, 2n, 1n, 12, 11, 2, 1]

  // @sort-keys
  const object = {
    '1': '1',
    '11': '11',
    '2': '2',
    '22': '22',
    a: 'a',
    b: 'b',
    [A]: 'A',
    [B]: 'B',
  }

  // @sort-keys:reversed
  const reversedObject = {
    [B]: 'B',
    [A]: 'A',
    b: 'b',
    a: 'a',
    '22': '22',
    '2': '2',
    '11': '11',
    '1': '1',
  }

  /*
    @sort
  */
  const simpleArray = [1, 2]

  /*
    @sort:reversed
  */
  const reversedSimpleArray = [2, 1]

  // @sort-keys
  interface MockInterface {
    '1': string
    '11': string
    '2': string
    '22': string
    a: string
    b: string
    [A]: string
    [B]: string
  }

  // @sort-keys:reversed
  interface ReversedMockInterface {
    [B]: string
    [A]: string
    b: string
    a: string
    '22': string
    '2': string
    '11': string
    '1': string
  }
}

function needLintCases() {
  const A = 'A'
  const B = 'B'
  enum Type {
    A = 'A',
    B = 'B',
  }

  // @sort
  const array = [Type.B, Type.A, B, A, 'b', 'a', '22', '2', '11', '1', 12n, 11n, 2n, 1n, 12, 11, 2, 1]

  // @sort:reversed
  const reversedArray = [1, 2, 11, 12, 1n, 2n, 11n, 12n, '1', '11', '2', '22', 'a', 'b', A, B, Type.A, Type.B]

  // @sort-keys
  const object = {
    [B]: 'B',
    [A]: 'A',
    b: 'b',
    a: 'a',
    '22': '22',
    '2': '2',
    '11': '11',
    '1': '1',
  }

  // @sort-keys:reversed
  const reversedObject = {
    '1': '1',
    '11': '11',
    '2': '2',
    '22': '22',
    a: 'a',
    b: 'b',
    [A]: 'A',
    [B]: 'B',
  }

  /*
    @sort
  */
  const simpleArray = [2, 1]

  /*
    @sort:reversed
  */
  const reversedSimpleArray = [1, 2]

  // @sort-keys
  interface MockInterface {
    [B]: string
    [A]: string
    b: string
    a: string
    '22': string
    '2': string
    '11': string
    '1': string
  }

  // @sort-keys:reversed
  interface ReversedMockInterface {
    '1': string
    '11': string
    '2': string
    '22': string
    a: string
    b: string
    [A]: string
    [B]: string
  }
}
