import { describe, expect, it } from 'vitest'

import filterEmptyObject from '../filterEmptyObject'
describe('filterEmptyObject', () => {
  it('should filter empty objects', () => {
    const object1 = { a: { b: { c: 1 } }, d: {} }
    const object2 = { a: { b: { c: {} } }, d: {} }
    const object3 = { a: { b: { c: { d: {} } } }, e: { f: null } }
    const object4 = { a: { b: { c: { d: {} } } }, e: { f: undefined } }
    const object5 = { a: { b: { c: { d: {} } } }, e: { f: [] } }
    const object6 = { a: { b: { c: { d: {} } } }, e: { f: {} }, g: null }
    const object7 = { a: { b: { c: { d: {} } } }, e: { f: {} }, g: undefined }
    const object8 = { a: { b: { c: { d: {} } } }, e: { f: {} }, g: [] }
    const object9 = { a: { b: { c: { d: {} } } }, e: { f: {} }, g: {} }

    expect(filterEmptyObject(object1)).toEqual({ a: { b: { c: 1 } } })
    expect(filterEmptyObject(object2)).toEqual({})
    expect(filterEmptyObject(object3)).toEqual({})
    expect(filterEmptyObject(object4)).toEqual({})
    expect(filterEmptyObject(object5)).toEqual({})
    expect(filterEmptyObject(object6)).toEqual({})
    expect(filterEmptyObject(object7)).toEqual({})
    expect(filterEmptyObject(object8)).toEqual({})
    expect(filterEmptyObject(object9)).toEqual({})
  })

  it('should return the same object if it does not contain empty objects', () => {
    const object = { a: { b: { c: 1 } }, d: { e: { f: 2 } } }
    expect(filterEmptyObject(object)).toEqual(object)
  })

  it('should return an empty object if the input is an empty object', () => {
    const object = {}
    expect(filterEmptyObject(object)).toEqual({})
  })
})
