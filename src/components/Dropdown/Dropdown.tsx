import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import { css, SerializedStyles } from '@emotion/react'
import Portal from '../Portal'

export type DropdownProps = {
  children?: ReactNode;
  popperNode: ReactNode;
  placement?: Placement;
  popperCSS?: SerializedStyles;
  childCSS?: SerializedStyles;
  select?: boolean;
  onClickEvent?: (event: any) => void;
  isVisible?:boolean;
  setIsVisible?:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Dropdown ({
  children, popperNode, placement = 'bottom', popperCSS, childCSS, select = false, isVisible, setIsVisible, onClickEvent
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const childReference = useRef<any>(null)
  const popperReference = useRef<any>(null)
  const [childElement, setChildElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  useEffect(
    () => {
      const listener = (event: any) => {
        if (popperReference.current && childReference.current) {
          if (!(popperReference.current.contains(event.target) || childReference.current.contains(event.target))) {
            onClickEvent && onClickEvent(event)
            isVisible && setIsVisible ? setIsVisible(false) : setIsOpen(false)
          }
        }
      }
      document.addEventListener('mousedown', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
      }
    }, [childReference, popperReference, isVisible]
  )
  const { styles, attributes } = usePopper(childElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      },
      {
        name: 'computeStyles',
        options: {
          adaptive: false
        }
      }
    ]
  })

  return (
    <>
      <div ref={childReference} css={[fitSize, childCSS]}>
        <div ref={setChildElement} onClick={() => {
          if (isVisible !== undefined && setIsVisible !== undefined) {
            setIsVisible(!isVisible)
          } else {
            setIsOpen(!isOpen)
          }
        }}>
          {children}
        </div>
      </div>
      <Portal>
        {
          (isOpen || isVisible) &&
          <div ref={popperReference} css={[fitSize, popperCSS]} onClick={() => {
            if (select) {
              if (isVisible !== undefined && setIsVisible !== undefined) {
                setIsVisible(false)
              } else {
                setIsOpen(false)
              }
            }
          }}>
            <div ref={setPopperElement} style={styles.popper} {...attributes.popper} >
              {popperNode}
            </div>
          </div>
        }
      </Portal>
    </>
  )
}

const fitSize = css`
  width: fit-content !important;
  height: fit-content;
`
