import { describe, expect, it } from 'vitest'

import toArray from '../toArray'

describe('toArray', () => {
  it('should return an empty array when given null or undefined', () => {
    expect(toArray(null)).toEqual([])
    expect(toArray(undefined)).toEqual([])
  })

  it('should return the same array if given an array', () => {
    const arr = [1, 2, 3]
    expect(toArray(arr)).toBe(arr)
  })

  it('should wrap non-array values in an array', () => {
    expect(toArray(1)).toEqual([1])
    expect(toArray('string')).toEqual(['string'])
    expect(toArray({ a: 1 })).toEqual([{ a: 1 }])
  })
})
