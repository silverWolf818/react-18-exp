import isNullOrUndefined from './isNullOrUndefined'

const isObjectType = (value: unknown) => typeof value === 'object'
const isObject = <T extends Record<string, any>>(value: unknown): value is T =>
  !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value)
export default isObject
