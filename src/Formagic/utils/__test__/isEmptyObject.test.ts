import { describe, expect, it } from 'vitest'

import isEmptyObject from '../isEmptyObject'

describe('isEmptyObject', () => {
  it('should return true when the input is an empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })

  it('should return false when the input object contains properties', () => {
    expect(isEmptyObject({ foo: 'bar' })).toBe(false)
    expect(isEmptyObject({ a: 1, b: 2, c: 3 })).toBe(false)
  })

  it('should not modify the input object', () => {
    const input = { foo: 'bar' }
    const output = isEmptyObject(input)
    expect(input).toEqual({ foo: 'bar' })
    expect(output).toBe(false)
  })
})
