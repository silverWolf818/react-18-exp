import { describe, expect, it } from 'vitest'

import diffObject from '../diffObject'
describe('diffObject', () => {
  it('should return an empty result for identical objects', () => {
    const obj1 = {
      name: 'Alice',
      age: 30,
    }

    const obj2 = {
      name: 'Alice',
      age: 30,
    }

    const expectedResult: any = {}

    expect(diffObject(obj1, obj2)).toEqual(expectedResult)
  })

  it('should return the correct diffObject result for simple objects', () => {
    const obj1 = {
      name: 'Alice',
      age: 30,
    }

    const obj2 = {
      name: 'Bob',
      age: 30,
    }

    const expectedResult = {
      name: { value1: 'Alice', value2: 'Bob' },
    }

    expect(diffObject(obj1, obj2)).toEqual(expectedResult)
  })

  it('should return the correct diffObject result for nested objects', () => {
    const obj1 = {
      name: 'Alice',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001',
      },
    }

    const obj2 = {
      name: 'Alice',
      age: 25,
      address: {
        city: 'San Francisco',
        zip: '10001',
      },
    }

    const expectedResult = {
      age: { value1: 30, value2: 25 },
      'address.city': { value1: 'New York', value2: 'San Francisco' },
    }

    expect(diffObject(obj1, obj2)).toEqual(expectedResult)
  })

  it('should return the correct diffObject result for objects with arrays', () => {
    const obj1 = {
      name: 'Alice',
      age: 30,
      favoriteColors: ['red', 'green'],
    }

    const obj2 = {
      name: 'Alice',
      age: 30,
      favoriteColors: ['red', 'blue'],
    }

    const expectedResult = {
      'favoriteColors[1]': { value1: 'green', value2: 'blue' },
    }

    expect(diffObject(obj1, obj2)).toEqual(expectedResult)
  })
})
