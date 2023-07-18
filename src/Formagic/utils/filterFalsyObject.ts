function filterFalsyObject(obj: Record<string, any>) {
  const result: Record<string, any> = {}

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const filteredObj = filterFalsyObject(obj[key])
      if (Object.keys(filteredObj).length > 0) {
        result[key] = filteredObj
      }
    } else if (obj[key]) {
      result[key] = obj[key]
    }
  }

  return result
}

export default filterFalsyObject
