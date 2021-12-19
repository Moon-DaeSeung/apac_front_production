import { css, keyframes, SerializedStyles } from '@emotion/react'
import React, { MouseEvent, useRef, useState } from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  customCss?: SerializedStyles
}

type SpanAttribute = {
  radius: number,
  x: number,
  y: number
}

const Button = ({ children, onClick, customCss }: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [spanAttribute, setSpanAttribute] = useState<SpanAttribute | null>(null)
  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    if (!buttonRef.current) return
    const { x, y, width, height } = buttonRef.current.getBoundingClientRect()
    const radius = Math.max(width, height) / 4
    setSpanAttribute({ x: clientX - x, y: clientY - y, radius })
  }
  return (
    <button
      ref={buttonRef}
      css={[button, customCss]}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      {children}
      {spanAttribute && <Effect props={spanAttribute} />}
    </button>
  )
}

const Effect = ({ props }: {props: SpanAttribute}) => {
  const Render = () => {
    return <span css={span(props)}/>
  }
  return <Render/>
}

export default Button

const button = css`
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: #1560c0;
  outline: 0;
  border: 0;
  border-radius: 0.25rem;
  padding: 10px 30px;
  font-size: 1.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  cursor: pointer;
`
const ripple = keyframes`
 to {
   transform: scale(10);
   opacity: 0;
 }
`
const span = ({ radius, x, y }: SpanAttribute) => css`
  position: absolute;
  background-color: white;
  opacity: 0.5;
  aspect-ratio: 1;
  width: ${radius}px;
  height: ${radius}px;
  top: ${y}px;
  left: ${x}px;
  transform: scale(0);
  border-radius: 50%;
  animation: ${ripple} 600ms linear;
`
