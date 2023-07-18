import { describe, expect, it } from 'vitest'

import isPath from '../isPath'

describe('isKey', () => {
  it('should return true when it is not a deep key', () => {
    expect(isPath('test')).toBeTruthy()
    expect(isPath('fooBar')).toBeTruthy()
  })

  it('should return false when it is a deep key', () => {
    expect(isPath('test.foo')).toBeFalsy()
    expect(isPath('test.foo[0]')).toBeFalsy()
    expect(isPath('test[1]')).toBeFalsy()
    expect(isPath('test.foo[0].bar')).toBeFalsy()
  })
})
