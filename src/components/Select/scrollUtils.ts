export function getScrollParent (element: HTMLElement) {
  const style = getComputedStyle(element)
  const overflowRx = /(auto|scroll)/

  if (style.position === 'fixed') return document.documentElement

  for (
    let parent: HTMLElement | null = element;
    (parent = parent.parentElement);
  ) {
    const { overflowX, overflowY, overflow } = getComputedStyle(parent)
    if (overflowRx.test(overflow + overflowY + overflowX)) {
      return parent
    }
  }

  return document.documentElement
}

export function scrollResolver (el: HTMLElement) {
  const isDocumentElement = validateDocumentElement(el)
  const scrollTop = isDocumentElement ? window.pageYOffset : el.scrollTop
  const viewHeight = isDocumentElement ? window.innerHeight : el.clientHeight
  const scrollRectTop = isDocumentElement ? 0 : el.getBoundingClientRect().top
  const { scrollHeight } = el

  function scrollTo (top: number) {
    isDocumentElement ? window.scrollTo(0, top) : (el.scrollTop = top)
  }
  return { scrollTop, viewHeight, scrollHeight, scrollTo, scrollRectTop }
}

export function invokeScroll ({
  scrollElement,
  move,
  isAnimated = false
}: {
  scrollElement: HTMLElement,
  move: number
  isAnimated?: boolean
}) {
  const { scrollTop: start, scrollTo } = scrollResolver(scrollElement)
  if (isAnimated) {
    animatedScrollTo({ scrollTo, start, move })
  } else {
    scrollTo(start + move)
  }
}

function validateDocumentElement (
  el: HTMLElement | typeof window
) {
  return [document.documentElement, document.body, window].indexOf(el) > -1
}

function resolveMove (currentTime: number, distance: number, duration: number): number {
  return distance * ((currentTime = currentTime / duration - 1) * currentTime * currentTime + 1)
}

function animatedScrollTo (
  { scrollTo, start, move } :{
  scrollTo: (scrollTop: number) => void
  start: number
  move: number}
) {
  const increment = 10
  let currentTime = 0
  const duration = 200

  function animateScroll () {
    currentTime += increment
    const resolvedMove = resolveMove(currentTime, move, duration)
    scrollTo(start + resolvedMove)
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll)
    }
  }

  animateScroll()
}
