const isEmptyObject = <T extends object = any>(object: T) => Object.keys(object).length === 0

export default isEmptyObject
