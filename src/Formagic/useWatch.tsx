import useFormContext from './useFormContext.tsx'
import { useRef, useSyncExternalStore } from 'react'
import get from './utils/get.ts'
import useSubscribe from './hooks/useSubscribe.ts'
import isSubscribeByName from './core/isSubscribeByName.ts'
import isObject from './utils/isObject.ts'
import clone from './utils/clone.ts'

const useWatch = ({ name }: { name: string }) => {
  const { control } = useFormContext()
  const { subscribe, setWatchName, _formValues, _subject } = control
  const isChange = useRef(false)
  setWatchName(name)
  const getFieldValue = () => {
    const value = get(_formValues, name)
    if (isChange.current && isObject(value)) {
      isChange.current = false
      return clone(value)
    } else {
      return value
    }
  }

  useSubscribe({
    subject: _subject.values,
    next: (formState: { name?: string }) => {
      if (name !== formState.name && isSubscribeByName(name, formState.name || '')) {
        isChange.current = true
      }
    },
  })

  return useSyncExternalStore(subscribe, getFieldValue)
}

export default useWatch
