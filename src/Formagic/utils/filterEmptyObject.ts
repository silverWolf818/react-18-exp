type AnyObject = Record<string, any>
const filterEmptyObject = (obj: AnyObject): AnyObject => {
  return Object.entries(obj).reduce((acc: AnyObject, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const filteredValue = filterEmptyObject(value)
      if (Object.keys(filteredValue).length > 0) {
        acc[key] = filteredValue
      }
    } else if (value !== undefined && value !== null) {
      acc[key] = value
    }
    return acc
  }, {})
}

export default filterEmptyObject
