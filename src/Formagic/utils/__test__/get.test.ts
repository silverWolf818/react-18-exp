import { describe, expect, it } from 'vitest'

import get from '../get'

describe('util get test', () => {
  const object = {
    a: {
      b: {
        c: 3,
        d: 'hello',
      },
    },
    e: [1, 2, 3],
  }

  it('should return the value of a property when given a valid path', () => {
    expect(get(object, 'a.b.c')).toBe(3)
  })

  it('should return undefined in case of an invalid nested path', () => {
    expect(get(object, 'a.b.e')).toBeUndefined()
  })

  it('should return the default value in case of an invalid nested path', () => {
    const defaultValue = 'default'
    expect(get(object, 'a.b.e', defaultValue)).toBe(defaultValue)
  })

  it('should return the value at the index when given an index path for an array', () => {
    expect(get(object, 'e[0]')).toBe(1)
  })

  it('should return undefined in case of an invalid index path for an array', () => {
    expect(get(object, 'e[10]')).toBeUndefined()
  })

  it('should return the default value in case of an invalid index path for an array', () => {
    const defaultValue = 'default'
    expect(get(object, 'e[10]', defaultValue)).toBe(defaultValue)
  })

  it('should return undefined in case of undefined object', () => {
    expect(get(undefined, 'a')).toBeUndefined()
  })

  it('should set a.b.c value to default value', () => {
    expect(get({ a: [{ b: { c: 3 } }] }, 'a.b.c', 'default')).toEqual('default')
  })
})
