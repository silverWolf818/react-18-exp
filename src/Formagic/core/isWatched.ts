import { Names } from '../types/form.ts'
const isWatched = (name: string, _names: Names) =>
  _names.watch.has(name) ||
  [..._names.watch].some(watchName => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length)))
export default isWatched
