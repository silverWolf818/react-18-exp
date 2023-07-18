import isObject from '../../isObject'
import isPlainObject from '../../isPlainObject'

function clone2<T>(object: T): T {
  const isArray = Array.isArray(object)

  if (typeof object !== 'object' || object === null) {
    return object
  }

  const copy: any = isArray ? [] : {}
  const stack: Array<[T, any]> = [[object, copy]]

  while (stack.length) {
    const [source, target] = stack.pop()!

    if (source instanceof Date) {
      Object.assign(target, new Date(source))
    } else if (source instanceof Set) {
      Object.assign(target, new Set(source))
    } else if (Array.isArray(source) || isObject(source)) {
      if (!Array.isArray(source) && !isPlainObject(source)) {
        Object.assign(target, source)
      } else {
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            const value = (source as any)[key]
            if (typeof value !== 'object' || value === null) {
              ;(target as any)[key] = value
            } else {
              const valueCopy = Array.isArray(value) ? [] : {}
              ;(target as any)[key] = valueCopy
              stack.push([value, valueCopy])
            }
          }
        }
      }
    }
  }

  return copy
}

export default clone2
