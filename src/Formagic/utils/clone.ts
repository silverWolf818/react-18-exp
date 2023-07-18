import isObject from './isObject'
import isPlainObject from './isPlainObject'
function clone<T>(object: T): T {
  let copy: any
  const isArray = Array.isArray(object)

  if (object instanceof Date) {
    copy = new Date(object)
  } else if (object instanceof Set) {
    copy = new Set(object)
  }  else if (isArray || isObject(object)) {
    copy = isArray ? [] : {}
    if (!Array.isArray(object) && !isPlainObject(object)) {
      copy = object
    } else {
      for (const key in object) {
        if (Object.hasOwn(object, key)) {
          copy[key] = clone((object as Record<string, any>)[key])
        }
      }
    }
  } else {
    return object
  }
  return copy
}
export default clone
