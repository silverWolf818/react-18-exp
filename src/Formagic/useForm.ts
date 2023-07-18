import { useRef } from 'react'
import { FormProps } from './types/form.ts'
import createForm from './core/createForm.ts'

const useForm = <TFieldValues extends Record<string, any>>(props: FormProps<TFieldValues> = {}) => {
  const _formStateRef = useRef<any>(null)

  if (!_formStateRef.current) {
    _formStateRef.current = {
      ...createForm(props),
    }
  }

  return _formStateRef.current
}

export default useForm