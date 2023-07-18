import { useContext } from 'react'
import { FormContext } from './component/FormProvider.tsx'
import { FieldValues, UseFormReturn } from './types/form.ts'

const useFormContext = <TFieldValues extends FieldValues>() => useContext(FormContext) as UseFormReturn<TFieldValues>

export default useFormContext
