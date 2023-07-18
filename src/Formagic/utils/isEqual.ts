import isObject from './isObject.ts'
import isNullOrUndefined from './isNullOrUndefined.ts'

const isEqual = (object1: any, object2: any) => {
  if (isNullOrUndefined(object1) || isNullOrUndefined(object2)) {
    return object1 === object2
  }

  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]

    if (!keys2.includes(key)) {
      return false
    }

    if (key !== 'ref') {
      const val2 = object2[key]

      if (
        (isObject(val1) && isObject(val2)) || (Array.isArray(val1) && Array.isArray(val2))
          ? !isEqual(val1, val2)
          : val1 !== val2
      ) {
        return false
      }
    }
  }

  return true
}

export default isEqual
