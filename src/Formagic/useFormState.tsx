import useFormContext from './useFormContext.tsx'
import { useSyncExternalStore } from 'react'
import get from './utils/get.ts'

const useFormState = () => {
  const { control, formState } = useFormContext()
  const { subscribe } = control

  const isDirty = useSyncExternalStore(subscribe, () => get(formState, 'isDirty'))
  const dirtyFields = useSyncExternalStore(subscribe, () => get(formState, 'dirtyFields'))
  const errors = useSyncExternalStore(subscribe, () => get(formState, 'errors'))

  return {
    isDirty,
    dirtyFields,
    errors,
  }
}

export default useFormState
