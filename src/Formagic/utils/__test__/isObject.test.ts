import { describe, expect, it } from 'vitest'

import isObject from '../isObject'

describe('isObject', () => {
  it('should return false when the input is null or undefined', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })

  it('should return false when the input is not an object', () => {
    expect(isObject('')).toBe(false)
    expect(isObject(0)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject(() => {})).toBe(false)
  })

  it('should return true when the input is an object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ foo: 'bar' })).toBe(true)
    expect(isObject({ a: 1, b: 2, c: 3 })).toBe(true)
    expect(isObject(new Date())).toBe(true)
  })

  it('should return true when the input is a regular expression', () => {
    expect(isObject(/test/)).toBe(true)
  })

  it('should not modify the input value', () => {
    const input = { foo: 'bar' }
    const output = isObject(input)
    expect(input).toEqual({ foo: 'bar' })
    expect(output).toBe(true)
  })
})
