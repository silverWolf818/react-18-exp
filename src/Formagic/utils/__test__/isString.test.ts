import { describe, expect, it } from 'vitest'

import isString from '../isString'
describe('isString', () => {
  it('should return true when the input is a string', () => {
    expect(isString('')).toBe(true)
    expect(isString('foo')).toBe(true)
    expect(isString('123')).toBe(true)
  })

  it('should return false when the input is not a string', () => {
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(0)).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(() => {})).toBe(false)
  })

  it('should not modify the input value', () => {
    const input = 'foo'
    const output = isString(input)
    expect(input).toBe('foo')
    expect(output).toBe(true)
  })
})
