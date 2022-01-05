import { css } from '@emotion/react'
import React from 'react'
import Button from '../../../components/Button'
import Floating from '../../../components/Floating'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

type FloatingButtonsProps = {
  onSave: () => void
  onAnalyze?: () => void
}

const FloatingButtons = ({ onSave }: FloatingButtonsProps) => {
  const matches = useMediaQuery('(min-width: 1280px)')
  return (
      <Floating offset={{
        bottom: '20px',
        right: matches ? '(100% - 1280px) / 2 - 110px' : '20px'
      }}>
        <Button customCss={button}>
          <i className="fas fa-robot" />
          <br/>
          <span css={caption}>오류패턴</span>
          </Button>
        <Button customCss={button} onClick={onSave}>
          <i className="far fa-save" />
          <br/>
          <span css={caption}>저장</span>
        </Button>
      </Floating>
  )
}

export default FloatingButtons

const button = css`
  width: 70px;
  aspect-ratio: 1;
  padding: 0;
  border-radius: 20px;
  font-size: 35px;
`
const caption = css`
  font-size: 13px;
`
