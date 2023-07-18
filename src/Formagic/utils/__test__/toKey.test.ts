import { describe, expect, it } from 'vitest'

import toKey from '../toKey'

describe('util isKey test', () => {
  it('toKey should convert values to string and handle edge cases correctly', () => {
    expect(toKey(123)).toBe('123')
    expect(toKey(null)).toBe('null')
    expect(toKey(undefined)).toBe('undefined')
    expect(toKey(NaN)).toBe('NaN')
    expect(toKey(Infinity)).toBe('Infinity')
    expect(toKey(-Infinity)).toBe('-Infinity')
    expect(toKey(0)).toBe('0')
    expect(toKey(-0)).toBe('-0')
  })
})
