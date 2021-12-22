import React, { ReactElement, useEffect, useState } from 'react'
import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import Portal from '../Portal'
import { css, SerializedStyles } from '@emotion/react'

export type PopperProps = {
  children: (handleClose: (() => void)) => ReactElement;
  placement?: Placement
  offset?: [number, number]
  customCss?: SerializedStyles
}

export default function Popper ({ children, placement = 'bottom', offset = [0, 0], customCss }: PopperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [targetContainer, setTargetContainer] = useState<HTMLElement | null>(null)
  const [popperContainer, setPopperContainer] = useState<HTMLElement | null>(null)

  useEffect(
    () => {
      if (!targetContainer || !popperContainer) return
      const listener = (event: any) => {
        if (!(popperContainer.contains(event.target) || targetContainer.contains(event.target))) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
      }
    }, [targetContainer, popperContainer]
  )

  const { styles, attributes } = usePopper(targetContainer, popperContainer, {
    placement,
    modifiers: [{ name: 'offset', options: { offset } }]
  })

  return (
    <>
      <div ref={setTargetContainer} css={[defaultCss, customCss]} onClick={() => { setIsOpen(!isOpen) }} />
      <Portal>
        {
          (isOpen) &&
          <div ref={setPopperContainer}
            style={styles.popper}
            {...attributes.popper}
          >
            {children(() => setIsOpen(false))}
          </div>
        }
      </Portal>
    </>
  )
}

const defaultCss = css`
  width: 50px;
  height: 50px;
  background-color: lightblue;
`
