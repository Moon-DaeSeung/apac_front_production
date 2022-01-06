/* eslint-disable node/no-callback-literal */
export default function debounce<T extends (...args: any[]) => void> (callback: T, delay = 300) {
  let timeoutId: any
  function debounced (...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), delay)
  }
  return debounced as T
}
