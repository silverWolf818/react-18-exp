import { useSyncExternalStore } from 'react'
import { FieldError, FieldProps, UseFieldReturn } from './types/field.ts'
import useFormContext from './useFormContext.tsx'
import get from './utils/get.ts'
import isObject from './utils/isObject.ts'
import isEqual from './utils/isEqual.ts'
import isFunction from './utils/isFunction.ts'
import { getChangeValue } from './core/getChangeValue.ts'
import { VALIDATION_MODE } from './constants.ts'
import { FieldValues } from './types/form.ts'
import getValidateError from './core/getValidateError.ts'
import isEmptyObject from './utils/isEmptyObject.ts'

const useField = <TFieldValues extends FieldValues = FieldValues>(props: FieldProps<TFieldValues>): UseFieldReturn => {
  const { formState, control, setValue, setError } = useFormContext()
  const { subscribe, _names, _formValues, _props } = control
  const { name, validate } = props
  _names.mounted.add(name)
  const onChange = async (eventOrValue: any) => {
    const value = getChangeValue(eventOrValue)
    if (isObject(value)) {
      const oldValue = get(_formValues, name)
      const noChange = isEqual(value, oldValue)
      if (noChange) {
        return
      }
    }
    if (_props.mode === VALIDATION_MODE.onChange) {
      const error = await validateField(value)
      setError(name, error)
    }
    setValue(name, value, { shouldDirty: true })
  }
  const onBlur = () => {}

  const hasValidator = (field: FieldProps<TFieldValues>) =>
    field.required || field.min || field.max || field.maxLength || field.minLength || field.pattern || field.validate

  const validateField = async (value: any) => {
    if (hasValidator(props)) {
      if (validate) {
        if (isFunction(validate)) {
          const validateResult = await validate(value, _formValues)
          const fieldError = getValidateError(validateResult)
          if (fieldError) {
            return fieldError
          }
        } else if (isObject(validate)) {
          let fieldError = {} as FieldError
          for (const key in validate) {
            if (!isEmptyObject(fieldError)) break
            const validateResult = await validate[key](value, _formValues)
            const validateError = getValidateError(validateResult, key)
            if (validateError) {
              fieldError = validateError
            }
          }
          if (!isEmptyObject(fieldError)) return fieldError
        }
      }
    }
    return {}
  }
  const getFieldValue = () => {
    return get(_formValues, name)
  }

  const value = useSyncExternalStore(subscribe, getFieldValue)

  return {
    name,
    value,
    onChange,
    onBlur,
    error: get(formState.errors, name),
  }
}
export default useField
