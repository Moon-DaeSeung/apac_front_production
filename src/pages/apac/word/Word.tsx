import { css } from '@emotion/react'
import React, { useState } from 'react'
import TextField from '../../../components/TextField'

const Word = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [reaction, setReaction] = useState('')
  return (
    <>
      <h2>단어 검사</h2>
      <div css={row}>
        <div css={[item]}>문항</div>
        <div css={[item]}>목표 단어</div>
        <div css={[item]}>아동 반응</div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>오류패턴</div>
      </div>
      {data.map(value => {
        return (
          <div key={value} css={row}>
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
        <button css={[button]}>저장</button>
        <button css={[button]}>오류패턴</button>
      </div>
    </>
  )
}

export default Word

const button = css`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: lightblue;
  font-size: 20px;
  border: 1px solid black;
`
const fixed = css`
  position: fixed;
  bottom: 20px;
  right: 20px;
  @media (min-width: 1280px) {
    right: calc((100% - 1280px - 300px) / 2);
  }
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const row = css`
 border: solid 1px black;
 :not(:first-of-type){
  border-top: none;
 }
 display: grid;
 grid-template-columns: minmax(60px, 1fr) minmax(100px, 2fr) minmax(120px, 3fr) minmax(300px, 7fr) minmax(200px, 3fr);
`
const item = css`
 border-right: solid black 1px;
 padding: 10px;
 display: flex;
 justify-content: center;
 align-items: center;
`
const textfield = css`
 width: auto;
 flex-grow: 1;
`
