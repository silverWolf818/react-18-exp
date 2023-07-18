import { describe, expect, it } from 'vitest'

import clone from '../clone'

describe('util clone test', () => {
  it('should clone object and not mutate the original object', () => {
    const data = {
      items: [],
      test: {
        date: new Date('2020-10-15'),
        test0: 12,
        test1: '12',
        test2: [1, 2, 3, 4],
        deep: {
          date: new Date('2020-10-15'),
          test0: 12,
          test1: '12',
          test2: [1, 2, 3, 4],
        },
      },
      test2: new Set([1, 2]),
      test1: new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ]),
    }

    const copy = clone(data)
    expect(clone(data)).toEqual(copy)

    // @ts-expect-error
    copy.test.what = '1243'
    copy.test.date = new Date('2020-10-16')
    // @ts-expect-error
    copy.items[0] = 2

    expect(data).toEqual({
      items: [],
      test: {
        date: new Date('2020-10-15'),
        test0: 12,
        test1: '12',
        test2: [1, 2, 3, 4],
        deep: {
          date: new Date('2020-10-15'),
          test0: 12,
          test1: '12',
          test2: [1, 2, 3, 4],
        },
      },
      test2: new Set([1, 2]),
      test1: new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ]),
    })

    // @ts-expect-error
    data.items = [1, 2, 3]

    expect(copy.items).toEqual([2])
  })

  it('should be return clone plain value when value is not object', () => {
    function testFunction() {}
    const data = {
      test: {
        testFunction,
        test: 'inner-string',
        deep: {
          testFunction,
          test: 'deep-string',
        },
      },
      testFunction,
      other: 'string',
    }
    const copy = clone(data)
    data.test.deep.test = 'changed-deep-string'
    expect(copy).toEqual({
      test: {
        test: 'inner-string',
        deep: {
          testFunction,
          test: 'deep-string',
        },
        testFunction,
      },
      testFunction,
      other: 'string',
    })
  })
})
