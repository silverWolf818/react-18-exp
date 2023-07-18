import { describe, expect, it } from 'vitest'

import isKey from '../isKey'

describe('util isKey test', () => {
  const object = { a: [{ b: { c: 3 } }] }
  it('should be return false when value is arr', () => {
    expect(isKey(['a', 'b', 'c'], object)).toEqual(false)
  })
  it('should be return true when value is number, boolean, null, symbol', () => {
    expect(isKey(0, object)).toEqual(true)
    expect(isKey(false, object)).toEqual(true)
    expect(isKey(null, object)).toEqual(true)
    expect(isKey(Symbol('a'), object)).toEqual(true)
  })
})
