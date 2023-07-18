import { describe, expect, it, vi } from 'vitest'

import memoizeCapped from '../memoizeCapped'

describe('memoizeCapped', () => {
  it('should return the result of the original function', () => {
    const add = vi.fn((a, b) => a + b)
    const memoizedAdd = memoizeCapped(add)

    expect(memoizedAdd(2, 3)).toBe(5)
    expect(memoizedAdd(4, 6)).toBe(10)
    expect(add).toHaveBeenCalledTimes(2)
  })

  it('should return the cached result for the same arguments', () => {
    const add = vi.fn((a, b) => a + b)
    const memoizedAdd = memoizeCapped(add)

    expect(memoizedAdd(2, 3)).toBe(5)
    expect(memoizedAdd(2, 3)).toBe(5)
    expect(add).toHaveBeenCalledTimes(1)
  })

  it('should clear the cache when it reaches the maximum size', () => {
    const add = vi.fn((a, b) => a + b)
    const memoizedAdd = memoizeCapped(add)

    // Call memoizedAdd 500 times
    for (let i = 0; i < 500; i++) {
      memoizedAdd(i, i + 1)
    }

    expect(add).toHaveBeenCalledTimes(500)
    expect(memoizedAdd.cache.size).toBe(500)

    // Call memoizedAdd again with the same arguments
    memoizedAdd(1, 2)

    expect(add).toHaveBeenCalledTimes(501)
    expect(memoizedAdd.cache.size).toBe(1)
  })
})
