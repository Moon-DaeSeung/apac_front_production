/* eslint-disable node/no-callback-literal */
import { useState } from 'react'

export default function useDebounce<T extends (...args: any[]) => void> (callback: T, delay = 300) {
  const [timeoutId, setTimeoutId] = useState<any>()
  function debounced (...args: any[]) {
    clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => callback(...args), delay))
  }
  return debounced as T
}
