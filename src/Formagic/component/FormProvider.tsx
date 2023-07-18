import { createContext } from 'react'
import { FieldValues, UseFormReturn } from '../types/form.ts'

export const FormContext = createContext<UseFormReturn | null>(null)
const FormProvider = <TFieldValues extends FieldValues>(props: {
  value: UseFormReturn<TFieldValues>
  children: React.ReactNode
}) => {
  const { children, value } = props
  return <FormContext.Provider value={value as UseFormReturn}>{children}</FormContext.Provider>
}

export default FormProvider
