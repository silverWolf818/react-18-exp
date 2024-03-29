import castPath from './castPath'
import toKey from './toKey'

const baseGet = (object: Record<string, any>, path: string | string[]) => {
  path = castPath(path, object)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[toKey(path[index++])]
  }
  return index && index == length ? object : undefined
}

export default baseGet
