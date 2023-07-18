import { Subject } from '../utils/createSuject.ts'
import { EventType } from './events.ts'
import { Callback } from './utils.ts'

export type CriteriaMode = 'firstError' | 'all'

export type FieldValues = Record<string, any>

export type ValidationMode = {
  onBlur: 'onBlur'
  onChange: 'onChange'
  onSubmit: 'onSubmit'
  onTouched: 'onTouched'
  all: 'all'
}

export type Mode = keyof ValidationMode

export type FormProps<TFieldValues extends FieldValues = FieldValues> = Partial<{
  mode: Mode
  reValidateMode: Exclude<Mode, 'onTouched' | 'all'>
  values: TFieldValues
  defaultValues: TFieldValues
  criteriaMode: CriteriaMode
}>

export type FormState<TFieldValues extends FieldValues> = {
  isDirty: boolean
  isSubmitted: boolean
  isValidating: boolean
  isValid: boolean
  dirtyFields: Partial<Readonly<TFieldValues>>
  touchedFields: Partial<Readonly<TFieldValues>>
  errors: Record<string, any>
}

export type UseFormReturn<TFieldValues extends FieldValues = FieldValues> = {
  formState: FormState<TFieldValues>
  setValue: (name: string, value: any, options?: SetValueOptions) => void
  getValue: (name: string) => void
  setError: (name: string, error: any) => void
  control: Control<TFieldValues>
}

export type Names = {
  mounted: Set<string>
  unMount: Set<string>
  watch: Set<string>
}

export type Control<TFieldValues extends FieldValues = FieldValues> = {
  subscribe: (callback: Callback) => () => boolean
  emitChange: () => void
  setWatchName: (name: string) => void
  _props: FormProps<TFieldValues>
  _fields: Record<string, any>
  _formValues: FieldValues
  _defaultValues: FieldValues
  _names: Names
  _subject: SubjectProps
}

export type SubjectProps = {
  values: Subject<{
    name?: string
    type?: EventType
    value?: any
  }>
  state: Subject<{
    name?: string
    value?: any
  }>
}

export type SetValueOptions = Partial<{
  shouldValidate: boolean
  shouldDirty: boolean
  shouldTouch: boolean
}>
