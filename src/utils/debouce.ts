export default function debounce<T extends (...args: any[]) => void> (callback: T, delay = 300) {
  let timeoutId: number | null = null
  function debounced (...args: any[]) {
    if (timeoutId == null) {
      timeoutId = setTimeout(() => { callback(args) }, 0)
    }
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => { callback(args); timeoutId = null }, delay)
  }

  return debounced as T
}
