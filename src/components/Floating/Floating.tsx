import { css, SerializedStyles } from '@emotion/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getAbsoluteParent } from './getParent'

type Position = {
  bottom: string
  right: string
}

export type FloatingProps = {
  offset?: Position
  children: React.ReactNode
  customCss?: SerializedStyles
}

const Floating = ({ children, offset = { bottom: '0px', right: '0px' }, customCss }: FloatingProps) => {
  const node = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState<Position | null>(null)
  const handlePosition = useCallback((nodeEl: HTMLElement | null) => {
    return () => {
      if (!nodeEl) return
      const parent = getAbsoluteParent(nodeEl)
      const { bottom, right } = parent.getBoundingClientRect()
      const view = document.documentElement
      setPosition({
        bottom: `${bottom - view.clientHeight}px`,
        right: `${view.clientWidth - right}px`
      })
    }
  }, [node.current])

  useEffect(() => {
    const nodeEl = node.current
    handlePosition(nodeEl)()
    window.addEventListener('scroll', handlePosition(nodeEl))
    return () => window.removeEventListener('scroll', handlePosition(nodeEl))
  }, [node.current])

  return (
    <div ref={node}
    css={[container, customCss, position ? fixed(position, offset) : none, transition]}>
      {children}
    </div>
  )
}

export default Floating

const container = css`
  background-color: white;
  padding: 10px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-radius: 20px;
  border: solid 1px #d8d8d8;
  box-shadow: 3px 3px 10px 7px rgb(0 0 0 / 10%);
  z-index: 100;
`
const none = css`
  display: none;
`
const fixed = ({ bottom, right }: Position, { bottom: bottomOffset, right: rightOffset } : Position) => css`
  position: absolute;
  bottom: calc(${bottom} + ${bottomOffset});
  right: calc(${right} + ${rightOffset});
`
const transition = css`
  transition: right 0.4s, bottom 0.4s ease-out;
`
