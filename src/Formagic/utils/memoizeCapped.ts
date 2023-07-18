import memoize from './memoize'

const MAX_MEMOIZE_SIZE = 500

function memoizeCapped(func: any) {
  const result = memoize(func, (key: any) => {
    const { cache } = result
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear()
    }
    return key
  })

  return result
}

export default memoizeCapped
