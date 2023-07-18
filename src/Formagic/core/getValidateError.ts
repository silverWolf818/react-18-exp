import { ValidateResult } from '../types/field.ts'
import isString from '../utils/isString.ts'

const getValidateError = (validateResult: ValidateResult, type = 'validate') => {
  if (isString(validateResult)) {
    return {
      type,
      message: validateResult,
    }
  }
}

export default getValidateError
