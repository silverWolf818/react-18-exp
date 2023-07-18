import { describe, expect, it } from 'vitest'

import getTag from '../getTag'

describe('getTag', () => {
  it('should return [object Object] for an empty object', () => {
    expect(getTag({})).toBe('[object Object]')
  })

  it('should return [object Array] for an empty array', () => {
    expect(getTag([])).toBe('[object Array]')
  })

  it('should return [object Null] for null', () => {
    expect(getTag(null)).toBe('[object Null]')
  })

  it('should return [object Undefined] for undefined', () => {
    expect(getTag(undefined)).toBe('[object Undefined]')
  })

  it('should return [object String] for a string', () => {
    expect(getTag('hello')).toBe('[object String]')
  })

  it('should return [object Number] for a number', () => {
    expect(getTag(123)).toBe('[object Number]')
  })

  it('should return [object Boolean] for a boolean', () => {
    expect(getTag(true)).toBe('[object Boolean]')
  })

  it('should return [object Date] for a date object', () => {
    expect(getTag(new Date())).toBe('[object Date]')
  })

  it('should return [object RegExp] for a regular expression object', () => {
    expect(getTag(/hello/)).toBe('[object RegExp]')
  })

  it('should return [object Function] for a function object', () => {
    expect(getTag(function () {})).toBe('[object Function]')
  })

  it('should return [object Error] for an error object', () => {
    expect(getTag(new Error('oops'))).toBe('[object Error]')
  })

  it('should return [object Map] for a map object', () => {
    expect(getTag(new Map())).toBe('[object Map]')
  })

  it('should return [object Set] for a set object', () => {
    expect(getTag(new Set())).toBe('[object Set]')
  })
})
