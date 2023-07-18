import { describe, expect, it } from 'vitest'

import compact from '../compact'
describe('compact', () => {
  it('should return an empty array when the input is not an array', () => {
    // @ts-ignore
    expect(compact(null)).toEqual([])
    // @ts-ignore
    expect(compact(undefined)).toEqual([])
    // @ts-ignore
    expect(compact('')).toEqual([])
    // @ts-ignore
    expect(compact(0)).toEqual([])
    // @ts-ignore
    expect(compact({})).toEqual([])
  })

  it('should return an empty array when the input array contains only falsy values', () => {
    expect(compact([false, null, 0, '', undefined, NaN])).toEqual([])
  })

  it('should return a new array with falsy values removed', () => {
    expect(compact([1, 2, 3, false, 4, null, 5, '', 6, undefined, 7, NaN])).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(compact(['foo', null, 'bar', '', undefined, 'baz'])).toEqual(['foo', 'bar', 'baz'])
  })

  it('should not modify the original array', () => {
    const input = [1, 2, 3, false, 4, null, 5, '', 6, undefined, 7, NaN]
    const output = compact(input)
    expect(input).toEqual([1, 2, 3, false, 4, null, 5, '', 6, undefined, 7, NaN])
    expect(output).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})
