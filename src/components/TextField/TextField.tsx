import React, { useState } from 'react'
import { css, SerializedStyles } from '@emotion/react'

export type TextFieldProps = {
  customCss?: SerializedStyles
  value: string
  label: string
  errorMessage?: string
  isError?: boolean
  onChange: (value: string) => void
}

const TextField = ({ label, value, onChange, customCss, isError, errorMessage = '오류가 발생했습니다' }: TextFieldProps) => {
  const [focused, setFocused] = useState(false)
  return (
     <div css={[container, customCss, ignore]}>
      <div css={[fieldset, customCss, isError && css`border: red;`]}>
        <div css={[layout]}>
          <label css={[labelText, (value || focused) && moved]}>
            {label}
          </label>
          <input css={[input]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
      <footer css={[error]}>{isError && errorMessage}</footer>
    </div>
  )
}

export default TextField

const error = css`
 font-size: 0.7em;
 color: red;
 padding-left: 8px;
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
`
const fieldset = css`
 padding: 8px 12px;
 height: 50px;
 border-radius: 8px;
 border: solid black 1px;
 color: white;
 background-color: #386d9e;
 :focus-within {
   outline: solid blue 2px;
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
  font-size: 1.2em;
`
const moved = css`
  transform: translateY(-50%) scale(0.6);
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
