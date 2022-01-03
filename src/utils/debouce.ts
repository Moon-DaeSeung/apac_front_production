export default function debounce<T extends (...args: any[]) => void> (callback: T, delay = 300) {
  let timeoutId: number
  function debounced (...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => { callback(args) }, delay)
  }
  return debounced as T
}
