import { css } from '@emotion/react'
import { border, text } from './color'

export const header = css`
  font-weight: bold;
  color: ${text.header};
  background-color: #f5f9fb;
`
export const row = css`
  min-width: 900px;
  color: ${text.base};
  border-style: solid;
  border-width: 0;
  border-bottom-width: 2px;
  border-color: ${border.base};
  :first-of-type {
    border-width: 2px;
    border-radius: 10px;
  }
`
export const item = css`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const textfield = css`
  width: auto;
  flex-grow: 1;
  border-color: ${border.base};
`
export const errorpattern = css`
  border-radius: 4px;
  padding: 10px;
  background-color: #eaeff2;
  min-height: 20px;
  flex-grow: 1;
`
