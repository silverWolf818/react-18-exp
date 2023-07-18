import { describe, expect, it } from 'vitest'

import memoize from '../memoize'
describe('memoize', () => {
  it('should throw a TypeError if the first argument is not a function', () => {
    // @ts-ignore
    expect(() => memoize('')).toThrow(TypeError)
    // @ts-ignore
    expect(() => memoize(123)).toThrow(TypeError)
    // @ts-ignore
    expect(() => memoize({})).toThrow(TypeError)
    // @ts-ignore
    expect(() => memoize([])).toThrow(TypeError)
  })

  it('should throw a TypeError if the second argument is provided and is not a function', () => {
    expect(() => memoize(() => {}, '')).toThrow(TypeError)
    expect(() => memoize(() => {}, 123)).toThrow(TypeError)
    expect(() => memoize(() => {}, {})).toThrow(TypeError)
    expect(() => memoize(() => {}, [])).toThrow(TypeError)
  })

  it('should return a function that returns the same result as the original function', () => {
    const add = (a: number, b: number) => a + b
    // @ts-ignore
    const memoizedAdd = memoize(add)
    expect(memoizedAdd(1, 2)).toBe(3)
    expect(memoizedAdd(2, 3)).toBe(5)
    expect(memoizedAdd(1, 2)).toBe(3)
  })

  it('should use the resolver function to generate cache keys if provided', () => {
    const add = (a: number, b: number) => a + b
    const memoizedAdd = memoize(add, (...args: number[]) => args.join('-'))
    expect(memoizedAdd(1, 2)).toBe(3)
    expect(memoizedAdd(2, 3)).toBe(5)
    expect(memoizedAdd(1, 2)).toBe(3)
    expect(memoizedAdd(2, 1)).toBe(3)
  })

  it('should not cache results if the cache is cleared', () => {
    const add = (a: number, b: number) => a + b
    // @ts-ignore
    const memoizedAdd = memoize(add)
    expect(memoizedAdd(1, 2)).toBe(3)
    memoizedAdd.cache.clear()
    expect(memoizedAdd(1, 2)).toBe(3)
  })

  it('should have a cache property that is an instance of Map', () => {
    const add = (a: number, b: number) => a + b
    // @ts-ignore
    const memoizedAdd = memoize(add)
    expect(memoizedAdd.cache).toBeInstanceOf(Map)
  })

  it('should cache results for future calls', () => {
    const add = (a: number, b: number) => a + b
    // @ts-ignore
    const memoizedAdd = memoize(add)
    expect(memoizedAdd(1, 2)).toBe(3)
    expect(memoizedAdd.cache.get(1)).toBe(3)
    expect(memoizedAdd(2, 3)).toBe(5)
    expect(memoizedAdd.cache.get(2)).toBe(5)
    expect(memoizedAdd(1, 2)).toBe(3)
    expect(memoizedAdd.cache.get(1)).toBe(3)
  })
})
