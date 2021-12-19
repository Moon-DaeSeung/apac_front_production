import { css } from '@emotion/react'
import React, { useState } from 'react'
import Button from '../../../components/Button'
import TextField from '../../../components/TextField'
import { headerCommon, rowCommon } from '../css'

const Word = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [reaction, setReaction] = useState('')
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
            <div css={[item]}>{value}</div>
            <div css={[item]}>{value}</div>
          </div>
        )
      })}
      <div css={[fixed]}>
        <Button customCss={button}>저장</Button>
        <Button customCss={button}>오류패턴</Button>
      </div>
    </>
  )
}

export default Word

const button = css`
  width: 80px;
  aspect-ratio: 1;
  padding: 0;
  border-radius: 100%;
  background: linear-gradient(180deg, #1C9AFF 0%, #007EFD 100%);
  font-size: 15px;
`
const fixed = css`
  position: fixed;
  bottom: 20px;
  right: 20px;
  @media (min-width: 1280px) {
    right: calc((100% - 1280px - 200px) / 2);
  }
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: bottom 0.4s;
`
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
 grid-template-columns: minmax(60px, 1fr) minmax(100px, 2fr) minmax(120px, 3fr) minmax(300px, 7fr) minmax(200px, 3fr);
`
const item = css`
 padding: 10px;
 display: flex;
 justify-content: center;
 align-items: center;
`
const textfield = css`
 width: auto;
 flex-grow: 1;
`
