import { css } from '@emotion/react'
import React, { useState } from 'react'
import Popper from '../../../components/Popper'

const Note = () => {
  const [value, setValue] = useState('')
  return (
    <div css={[container, value && written]}>
      <Popper
        hasArrow
        placement='bottom-end'
        offset={[0, 10]}
        renderPopNode={() => (
          <div css={popnode}>
            <textarea
              css={textarea}
              value={value}
              onChange={(e) => setValue(e.target.value)}/>
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
`

const popnode = css`
  padding: 10px;
  background-color: whitesmoke;
`
const textarea = css`
  min-width: 500px;
  min-height: 200px;
  padding: 5px;
`
const written = css`
  color: blue;
`
