import { css } from '@emotion/react'
import React, { useState } from 'react'
import Select from '../../../components/Select'
import Popper from '../../../components/Popper'
import { border, text } from '../color'
import { ErrorPattern, Phoneme } from '../../../lib/api/types'
import Button from '../../../components/Button'

export type PhonemesProps = {
  phonemes: Phoneme[]
}

const Phonemes = ({ phonemes }: PhonemesProps) => {
  const filtering = ({ 목표음소, 반응음소 }: Phoneme, key: number) => {
    const isBlank = 목표음소 === '-' && 반응음소 === '-'
    const isSpace = 목표음소 === ' ' && 반응음소 === ' ' && key % 3 !== 1
    return !isBlank && !isSpace
  }
  return (
    <div css={container}>
      {phonemes.filter(filtering).map((value, key) => {
        return <PhonemeBox key={key} isHidden={value.목표음소 === ' '} phoneme={value} />
      })}
    </div>
  )
}

type PhonemeBoxProps = {
  isHidden: boolean
  phoneme: Phoneme
}

const PhonemeBox = ({ isHidden = false, phoneme }: PhonemeBoxProps) => {
  const { 목표음소, 반응음소 } = phoneme
  const [isSelected, setIsSelected] = useState(false)
  const options: ErrorPattern[] = [
    { id: 1, name: '연구개음' },
    { id: 2, name: '전형어중' },
    { id: 3, name: '음절반복' },
    { id: 4, name: '도치' },
    { id: 5, name: '기타' }
  ]
  return (
    <>
      <Popper
        offset={[0, 10]}
        hasArrow={true}
        renderPopNode={(closeEvent) => (
          <div css={[errorpattern]}>
            <Select
              getOptionLabel={({ name }) => name}
              options={options}
              value={null}
            />
            <div css={computed}>
              <div>
                <span>분석한 오류패턴</span>
                <div>연구개전방(1회), 전형어중(2회), 도치(1회)</div>
              </div>
              <Button customCss={button}
                onClick={closeEvent}
              >
                확인
              </Button>
            </div>
          </div>
        )}
        onChange={(isOpen) => setIsSelected(isOpen)}
      >
        <div css={[phonemeBox, isSelected && selected, isHidden && hidden]}>
          <div css={item}>{목표음소}</div>
          <div css={[item, red, 목표음소 === 반응음소 && white]}>
            {반응음소}
          </div>
          <input css={[item, distortion]} onClick={(e: any) => e.stopPropagation()}/>
        </div>
      </Popper>
    </>
  )
}

export default Phonemes

const container = css`
  display: flex;
`
const item = css`
  border: 1px solid ${border.base};
  border-radius: 4px;
  width: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  margin: 2px;
`
const distortion = css`
  text-align: center;
  background-color: #d8ecf3;
  z-index: 5000;
`
const red = css`
  color: red;
`
const white = css`
  color: white;
`
const hover = css`
  margin-top: -2px;
  border: 2px solid ${border.base};
  border-radius: 4px;
`
const phonemeBox = css`
  cursor: pointer;
  &:hover {
    ${hover}
  }
`
const selected = css`
  ${hover}
  background-color: lightblue;
`
const errorpattern = css`
  background-color: whitesmoke;
  padding: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const computed = css`
 margin-top: 10px;
 display: flex;
 font-size: 10px;
 color: ${text.base};
`
const button = css`
  padding: 4px;
  margin-top: auto;
  margin-left: auto;
  font-size: 12px;
`
const hidden = css`
  visibility: hidden;
`
