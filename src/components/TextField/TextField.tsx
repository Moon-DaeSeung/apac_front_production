import React, { useImperativeHandle, useRef, useState } from 'react'
import { css, keyframes } from '@emotion/react'

export type TextFieldProps = {
  customCss?: any
  value?: string | number
  onChange?: (value: string) => void
  label?: string
  errorMessage?: string
  isError?: boolean
  isPending?: boolean
  password?: boolean
  type?: 'number' | 'email' | 'password' | 'text'
}

const TextField = (
  {
    label,
    value: controlledValue,
    onChange: controlledSetValue,
    customCss,
    isError = false,
    type,
    isPending = false,
    errorMessage = '오류가 발생했습니다'
  }: TextFieldProps, ref?: any) => {
  const [focused, setFocused] = useState(false)
  const [uncontrolledValue, setUncotrolledValue] = useState('')
  const value = controlledValue || uncontrolledValue
  const onChange = controlledSetValue || setUncotrolledValue
  const inputRef = useRef<HTMLInputElement | null>(null)
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current && inputRef.current.focus()
    },
    value: inputRef.current && inputRef.current.value
  }))
  return (
     <div css={[container, customCss, ignore]} onMouseDown={(e) => { e.preventDefault(); inputRef.current?.focus() }}>
      <div css={[fieldset, customCss, isError && css`border-color: red;`, isPending && pending]}>
        <div css={[layout]}>
          <label css={[labelText, (!!value || focused) && moved]}>
            {label}
          </label>
          <input type={type} ref={inputRef} css={[input, label || css`height: 100%;`]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={value}
            onMouseDown={(e) => { e.stopPropagation() }}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
      <footer css={[isError ? error : css`display: none;`]}>{errorMessage }</footer>
    </div>
  )
}

export default React.forwardRef(TextField)

const error = css`
 font-size: 0.7em;
 color: red;
 padding-left: 8px;
 margin-top: 3px;
 ::before {
   content: '*';
 }
`
const ignore = css`
 background-color: inherit;
 border: none;
 padding: 0;
 height: auto;
 outline: none;
`
const container = css`
 width: 200px;
 font-size: 1rem;
 cursor: text;
`
const focus = css`
  outline: solid #0003ee 1px;
  border-color: #0003ee;
`
const fieldset = css`
 padding: 6px 12px;
 box-sizing: border-box;
 height: 54px;
 border-radius: 4px;
 border: solid #d1c6c6 1px;
 color: white;
 background-color: transparent;
 :focus-within {
   ${focus}
 }
`
const layout = css`
 position: relative;
 height: 100%;
 display: flex;
 align-items: center;
 font-size: 1em;
`
const labelText = css`
  transition: transform 0.3s;
  transform-origin: left bottom;
  position: absolute;
  pointer-events: none;
  line-height: 1;
  color: #dee2e6;
  font-size: 1.1em;
  white-space: pre;
`
const moved = css`
  transform: translateY(-50%) scale(0.75);
`
const input = css`
  padding: 0;
  border: none;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  font-size: 1em;
 :focus {
   outline: none;
 }
 background-color: inherit;
`

const bright = keyframes`
  50% {
    border-color: rgba(0,0,0,0);
  }
`
const pending = css`
  position: relative;
  ${focus}
  animation: ${bright} 2s ease infinite;
`
