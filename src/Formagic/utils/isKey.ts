import isSymbol from './isSymbol'

// eslint-disable-next-line no-lookahead-lookbehind-regexp/no-lookahead-lookbehind-regexp
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

function isKey(value: any, object?: Record<string, any>) {
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object))
}

export default isKey
