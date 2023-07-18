import { describe, expect, it } from 'vitest'

import isSymbol from '../isSymbol'

describe('isSymbol', () => {
  it('should return true for symbol', () => {
    const symbol = Symbol()
    expect(isSymbol(symbol)).toBe(true)
  })

  it('should return false for non-symbol value', () => {
    expect(isSymbol(1)).toBe(false)
    expect(isSymbol('hello')).toBe(false)
    expect(isSymbol(true)).toBe(false)
    expect(isSymbol(undefined)).toBe(false)
    expect(isSymbol(null)).toBe(false)
    expect(isSymbol({})).toBe(false)
    expect(isSymbol([])).toBe(false)
  })
})
