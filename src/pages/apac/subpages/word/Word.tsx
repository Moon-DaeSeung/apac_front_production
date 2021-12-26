import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Phoneme } from '../../../../lib/api/types'
import TextField from '../../../../components/TextField'
import { border } from '../../color'
import { Phonemes } from '../../components'
import FloatingButtons from '../../components/FloatingButtons'
import { headerCommon, rowCommon } from '../../css'

const Word = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [reaction, setReaction] = useState('')
  const phonemes: Phoneme[] = [
    { 목표음소: 'ㄸ', 반응음소: 'ㅌ', 왜곡음소: '', 오류패턴List: [] },
    { 목표음소: 'ㅏ', 반응음소: 'ㅏ', 왜곡음소: '', 오류패턴List: [] },
    { 목표음소: 'ㄹ', 반응음소: '-', 왜곡음소: '', 오류패턴List: [] },
    { 목표음소: 'ㄱ', 반응음소: 'ㄱ', 왜곡음소: '', 오류패턴List: [] },
    { 목표음소: 'ㅣ', 반응음소: 'ㅣ', 왜곡음소: '', 오류패턴List: [] },
    { 목표음소: '-', 반응음소: '-', 왜곡음소: '', 오류패턴List: [] }
  ]

  return (
    <>
      <h2>단어 검사</h2>
      <div css={[row, headerCommon]}>
        <div css={[item]}>문항</div>
        <div css={[item]}>목표 단어</div>
        <div css={[item]}>아동 반응</div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>오류패턴</div>
      </div>
      {data.map(value => {
        return (
          <div key={value} css={[row, rowCommon]}>
            <div css={[item]}>{value}</div>
            <div css={[item]}>목표 단어</div>
            <div css={[item]}>
              <TextField
                customCss={textfield}
                label="목표음"
                value={reaction}
                onChange={setReaction}
              />
            </div>
            <div css={[item, start]}>
              <Phonemes phonemes={phonemes}/>
            </div>
            <div css={[item]}>
             <div css={errorpattern}>
               연구개 전방화(2회), 도치(1회), 음절반복(3회), 전형적 어중 단순화(1회)
               연구개 전방화(2회), 도치(1회),
             </div>
            </div>
          </div>
        )
      })}
      <FloatingButtons/>
    </>
  )
}

export default Word

const row = css`
border-style: solid;
border-width: 0;
border-bottom-width: 2px;
border-color: #EAEFF2;
 :first-of-type {
   border-width: 2px;
   border-radius: 10px;
 }
 display: grid;
 grid-template-columns: minmax(60px, 1fr) minmax(100px, 2fr) minmax(120px, 3fr) minmax(300px, 5fr) minmax(200px, 4fr);
`
const item = css`
 padding: 10px;
 display: flex;
 justify-content: center;
 align-items: center;
`
const start = css`
 justify-content: start;
 padding-left: 15%;
`
const textfield = css`
 width: auto;
 flex-grow: 1;
 border-color: ${border.base};
`
const errorpattern = css`
  flex-grow: 1;
  border: 1px solid ${border.base};
  border-radius: 4px;
  min-height: 70px;
  padding: 10px;
`
