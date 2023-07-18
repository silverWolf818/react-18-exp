import { useEffect } from 'react'
import { Subject } from '../utils/createSuject.ts'

type SubscribeProps<T> = {
  subject: Subject<T>
  next: (value: T) => void
}

const useSubscribe = <T>(props: SubscribeProps<T>) => {
  const { subject, next } = props

  useEffect(() => {
    const subscription = subject.subscribe({
      next,
    })

    return () => {
      subscription && subscription.unsubscribe()
    }
  }, [])
}

export default useSubscribe
