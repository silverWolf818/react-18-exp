const isPlainObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export default isPlainObject
