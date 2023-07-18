import { describe, expect, it } from 'vitest'

import castPath from '../castPath'

describe('castPath', () => {
  it('should return an array of path segments if given a string', () => {
    // @ts-ignore
    expect(castPath('a.b.c')).toEqual(['a', 'b', 'c'])
    // @ts-ignore
    expect(castPath('a[0].b.c')).toEqual(['a', '0', 'b', 'c'])
    // @ts-ignore
    expect(castPath('[0][1][2]')).toEqual(['0', '1', '2'])
    // @ts-ignore
    expect(castPath('.a.b.')).toEqual(['', 'a', 'b', ''])
  })

  it('should return the value if given an array', () => {
    // @ts-ignore
    expect(castPath(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
    // @ts-ignore
    expect(castPath(['a', 0, 'b', 'c'])).toEqual(['a', 0, 'b', 'c'])
    // @ts-ignore
    expect(castPath([0, 1, 2])).toEqual([0, 1, 2])
    // @ts-ignore
    expect(castPath(['', 'a', 'b', ''])).toEqual(['', 'a', 'b', ''])
  })

  it('should return an array containing the key if it exists in the object', () => {
    const obj = { a: { b: { c: 123 } } }
    expect(castPath('a.b.c', obj)).toEqual(['a', 'b', 'c'])
    expect(castPath('a.b', obj)).toEqual(['a', 'b'])
    expect(castPath('a', obj)).toEqual(['a'])
  })

  it('should return an array of path segments if the key does not exist in the object', () => {
    const obj = { a: { b: { c: 123 } } }
    expect(castPath('x.y.z', obj)).toEqual(['x', 'y', 'z'])
    expect(castPath('foo.bar.baz', obj)).toEqual(['foo', 'bar', 'baz'])
  })
})
