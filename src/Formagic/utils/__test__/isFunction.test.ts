import { test, expect } from 'vitest'

import isFunction from '../isFunction'

// 测试传入函数的情况
test('isFunction should return true for function input', () => {
  expect(isFunction(() => {})).toBe(true)
})

// 测试传入非函数的情况
test('isFunction should return false for non-function input', () => {
  expect(isFunction('Hello World')).toBe(false)
  expect(isFunction(123)).toBe(false)
  expect(isFunction({})).toBe(false)
  expect(isFunction([])).toBe(false)
  expect(isFunction(undefined)).toBe(false)
  expect(isFunction(null)).toBe(false)
})

// 测试传入 undefined 或 null 的情况
test('isFunction should return false for undefined or null input', () => {
  expect(isFunction(undefined)).toBe(false)
  expect(isFunction(null)).toBe(false)
})
