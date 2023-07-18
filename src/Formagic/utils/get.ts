import baseGet from './baseGet'

const get = (object: any, path: string | string[], defaultValue?: any) => {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}

export default get
