import { css } from '@emotion/react'
import React, { useRef } from 'react'
import Popper from '../../../components/Popper'

type NoteProps = {
  value: string
  onChange: (value: string) => void
}
const Note = ({ value, onChange }: NoteProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  return (
    <div css={[container, value && written]}>
      <Popper
        hasArrow
        placement='bottom-end'
        offset={[0, 10]}
        onChange={(isOpen) => isOpen && textareaRef.current?.focus() }
        renderPopNode={() => (
          <div css={popnode}>
            <textarea
              ref={textareaRef}
              css={textarea}
              value={value}
              onChange={(e) => onChange(e.target.value)}/>
          </div>
        )}
      >
        <i className="far fa-sticky-note"></i>
      </Popper>
    </div>
  )
}

export default Note

const container = css`
  font-size: 25px;
  cursor: pointer;
  :hover {
    color: grey;
  }
`
const popnode = css`
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 5px;
`
const textarea = css`
  min-width: 300px;
  min-height: 100px;
  padding: 5px;
  border-radius: 5px;
`
const written = css`
  color: lightblue;
  :hover {
    color: blue;
  }
`
