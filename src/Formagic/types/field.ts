import { FieldValues } from './form.ts'

export type Message = string

export type ValidateResult = Message | boolean | undefined

export type FieldError =
  | {
      type: string
      message?: Message
    }
  | Record<string, any>

export type Validate<FieldValue, FormValues> = (
  value: FieldValue,
  formValues: FormValues
) => ValidateResult | Promise<ValidateResult>

export type FieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: string
  value?: TFieldValues
  defaultValue?: any
  rules?: any
  required?: boolean
  min?: number
  max?: number
  maxLength?: number
  minLength?: number
  pattern?: any
  hidden?: boolean
  visible?: boolean
  disabled?: boolean
  readOnly?: boolean
  validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>> | undefined
}

export type UseFieldReturn = {
  name: string
  value: any
  onChange: (e: any) => void
  onBlur: () => void
  error: any
}
