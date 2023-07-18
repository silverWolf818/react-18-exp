interface DiffResult {
  [path: string]: { value1: any; value2: any }
}
function isObject(item: any): boolean {
  return item !== null && typeof item === 'object'
}
function diffHelper(obj1: any, obj2: any, path: string, results: DiffResult): void {
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const maxLength = Math.max(obj1.length, obj2.length)
    for (let i = 0; i < maxLength; i++) {
      diffHelper(obj1[i], obj2[i], `${path}[${i}]`, results)
    }
  } else if (isObject(obj1) && isObject(obj2)) {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
    allKeys.forEach(key => {
      const newPath = path ? `${path}.${key}` : key
      diffHelper(obj1[key], obj2[key], newPath, results)
    })
  } else if (obj1 !== obj2) {
    results[path] = { value1: obj1, value2: obj2 }
  }
}
function diff(obj1: object, obj2: object): DiffResult {
  const diffResults: DiffResult = {}
  diffHelper(obj1, obj2, '', diffResults)
  return diffResults
}
export default diff
