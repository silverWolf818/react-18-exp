import isNil from '../utils/isNil.ts'

export const isInputEvent = (event: any, stopPropagation = true) => {
  if (event?.target) {
    if (typeof event.target === 'object' && ('value' in event.target || 'checked' in event.target)) return true
    if (stopPropagation) event.stopPropagation?.()
  }
  return false
}
export const getInputEventValue = (event: any) => {
  if (event?.target) {
    if (!isNil(event.target.value)) return event.target.value
    if (!isNil(event.target.checked)) return event.target.checked
    return
  }
  return event
}
export const getChangeValue = (eventOrValue: any) => {
  if (eventOrValue?.target && isInputEvent(eventOrValue)) return getInputEventValue(eventOrValue)
  return eventOrValue
}
