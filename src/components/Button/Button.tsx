import { css, keyframes, SerializedStyles } from '@emotion/react'
import React, { MouseEvent, useRef, useState } from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  customCss?: SerializedStyles
}

const Button = ({ children, onClick, customCss }: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [effectXY, setEffectXY] = useState<[number, number] | null>(null)
  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    if (!buttonRef.current) return
    const { x, y } = buttonRef.current.getBoundingClientRect()
    setEffectXY([clientX - x, clientY - y])
  }
  return (
    <button
      ref={buttonRef}
      css={[button, customCss]}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      {children}
      {effectXY && <Effect effectXY={effectXY} />}
    </button>
  )
}

const Effect = ({ effectXY }: {effectXY: [number, number]}) => {
  const Render = () => {
    return <span css={span(effectXY)}/>
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
  width: 150px;
  height: 50px;
  font-size: 1.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const ripple = keyframes`
 to {
   transform: scale(10);
   opacity: 0;
 }
`
const span = ([x, y]: [number, number]) => css`
  position: absolute;
  background-color: white;
  opacity: 0.5;
  width: 10%;
  aspect-ratio: 1;
  top: ${y}px;
  left: ${x}px;
  transform: scale(0);
  border-radius: 50%;
  animation: ${ripple} 600ms linear;
`
