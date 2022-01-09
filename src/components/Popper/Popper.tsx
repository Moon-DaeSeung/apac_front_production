import React, { ReactElement, useEffect, useState } from 'react'
import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import { css, SerializedStyles } from '@emotion/react'

export type PopperProps = {
  children?: React.ReactNode
  renderPopNode: (handleClose: (() => void)) => ReactElement;
  placement?: Placement
  offset?: [number, number]
  customCss?: SerializedStyles
  onChange?: (isOpen: boolean) => void
  hasArrow?: boolean
}

export default function Popper ({ hasArrow = false, onChange, renderPopNode, children, placement = 'bottom', offset = [0, 0], customCss }: PopperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [targetContainer, setTargetContainer] = useState<HTMLElement | null>(null)
  const [popperContainer, setPopperContainer] = useState<HTMLElement | null>(null)
  const [arrowContainer, setArrowContainer] = useState<HTMLElement | null>(null)
  const [popElement, setPopElement] = useState<HTMLDivElement | null>(null)
  const [popBackgroundColor, setPopBackgroundColor] = useState('')
  const popNode = React.cloneElement(renderPopNode(() => setIsOpen(false)), {
    ref: setPopElement
  })
  useEffect(() => { onChange && onChange(isOpen) }, [isOpen])
  useEffect(() => {
    if (!popElement) return
    const { backgroundColor } = window.getComputedStyle(popElement)
    setPopBackgroundColor(backgroundColor)
  }, [popElement])

  useEffect(
    () => {
      if (!targetContainer || !popperContainer) return
      const listener = (event: any) => {
        if (!(
          popperContainer.contains(event.target) ||
          targetContainer.contains(event.target)
        )) {
          setIsOpen(false)
        }
      }
      document.addEventListener('click', listener)
      document.addEventListener('focusin', listener)
      return () => {
        document.removeEventListener('click', listener)
        document.removeEventListener('focusin', listener)
      }
    }, [targetContainer, popperContainer]
  )

  const { styles, attributes } = usePopper(targetContainer, popperContainer, {
    placement,
    modifiers: [
      { name: 'offset', options: { offset } },
      { name: 'arrow', options: { element: arrowContainer } }
    ]
  })

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'Enter':
        setIsOpen(!isOpen)
        break
      case ' ':
        setIsOpen(!isOpen)
        event.preventDefault()
        break
    }
  }

  return (
    <>
      <div ref={setTargetContainer} css={[customCss]}
        onClick={() => setIsOpen(!isOpen) }
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
        {
          (isOpen) &&
          <div ref={setPopperContainer}
            style={styles.popper}
            {...attributes.popper}
          >
            {popNode}
            {hasArrow && <div ref={setArrowContainer} style={styles.arrow} css={arrowBox} >
              <div css={arrow(popBackgroundColor)} />
            </div>
            }
          </div>
        }
    </>
  )
}

const arrowBox = css`
  top: 0;
  z-index: -100;
`

const arrow = (backgroundColor: string) => css`
  z-index: -100;
  width: 10px;
  height: 10px;
  background-color: ${backgroundColor};
  transform: translateY(-5px) rotate(45deg);
`
