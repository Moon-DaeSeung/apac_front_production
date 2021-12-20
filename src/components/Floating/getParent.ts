export function getAbsoluteParent (element: HTMLElement) {
  const regex = /(relative)/

  for (
    let parent: HTMLElement | null = element;
    (parent = parent.parentElement);
  ) {
    const { position } = getComputedStyle(parent)
    if (regex.test(position)) {
      return parent
    }
  }

  return document.documentElement
}
