import { FieldValues, FormProps, Names, SetValueOptions, SubjectProps, UseFormReturn } from '../types/form.ts'
import clone from '../utils/clone.ts'
import isObject from '../utils/isObject.ts'
import get from '../utils/get.ts'
import set from '../utils/set.ts'
import createSubject from '../utils/createSuject.ts'
import { VALIDATION_MODE } from '../constants.ts'
import { Callback } from '../types/utils.ts'
import isWatched from './isWatched.ts'
import isEqual from '../utils/isEqual.ts'
import filterFalsyObject from '../utils/filterFalsyObject.ts'
import isEmptyObject from '../utils/isEmptyObject.ts'

const defaultProps = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true,
} as const

const createForm = <TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues> = {}
): UseFormReturn<TFieldValues> => {
  const _props = {
    ...defaultProps,
    ...props,
  }
  const _defaultValues =
    isObject(_props.defaultValues) || isObject(_props.values) ? clone(_props.defaultValues || _props.values) || {} : {}

  const _formValues = clone(_defaultValues)

  const _fields = {}

  const _names: Names = {
    mounted: new Set(),
    unMount: new Set(),
    watch: new Set(),
  }

  const _subject: SubjectProps = {
    values: createSubject(),
    state: createSubject(),
  }

  const formState = {
    isDirty: false,
    isSubmitted: false,
    isValidating: false,
    isValid: false,
    dirtyFields: {},
    touchedFields: {},
    errors: {},
  }

  const subscribers = new Set<Callback>()

  const subscribe = (callback: Callback) => {
    subscribers.add(callback)
    return () => subscribers.delete(callback)
  }
  const emitChange = () => {
    subscribers.forEach(callback => callback())
  }
  const setValue = (name: string, value: any, options?: SetValueOptions) => {
    set(_formValues, name, value)
    const watched = isWatched(name, _names)
    if (watched) {
      _subject.values.next({
        name,
      })
    }
    if (options?.shouldDirty) {
      const defaultValue = get(_defaultValues, name)
      const oldDirtyFields = clone(formState.dirtyFields)
      const newDirtyFields = formState.dirtyFields
      if (!isEqual(defaultValue, value)) {
        set(newDirtyFields, name, true)
      } else {
        set(newDirtyFields, name, false)
      }
      if (!isEqual(oldDirtyFields, newDirtyFields)) {
        formState.dirtyFields = filterFalsyObject(newDirtyFields)
        formState.isDirty = !isEmptyObject(formState.dirtyFields)
      }
    }
    emitChange()
  }
  const getValue = (name: string) => {
    return get(_formValues, name)
  }

  const setError = (name: string, error: any) => {
    set(formState.errors, name, error)
  }

  const setWatchName = (name: string) => {
    _names.watch.add(name)
  }

  return {
    formState,
    setValue,
    getValue,
    setError,
    control: {
      subscribe,
      emitChange,
      setWatchName,
      _props,
      _fields,
      _formValues,
      _defaultValues,
      _names,
      _subject,
    },
  }
}
export default createForm
