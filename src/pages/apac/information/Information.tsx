import { css } from '@emotion/react'
import React from 'react'
import TextField from '../../../components/TextField'
import Button from '../../../components/Button'

const Information = () => {
  return (
    <>
      <h2>검사 정보</h2>
      <div css={[form]}>
        <div css={[row]}>
          <label css={[item]}>이름</label>
          <div css={[item]}>
            <TextField customCss={input} />
          </div>
        </div>
        <div css={[row]}>
          <label css={[item]}>성별</label>
          <div css={[item]}>
            <TextField customCss={input} />
          </div>
        </div>
        <div css={[row]}>
          <label css={[item]}>나이</label>
          <div css={[item]}>
            <TextField customCss={input} />
          </div>
        </div>
        <div css={[row]}>
          <label css={[item]}>검사일자</label>
          <div css={[item]}>
            <TextField customCss={input} />
          </div>
        </div>
        <Button customCss={button}>등록</Button>
      </div>
    </>
  )
}

export default Information

const button = css`
  padding: 10px 30px;
  margin: 20px;
  margin-left: auto;
`
const row = css`
  display: grid;
  grid-template-columns: minmax(120px, 1fr) 7fr;
  padding: 20px 0px;
  :not(:last-child) {
    border-bottom: black solid 1px;
  }
`
const item = css`
  display: flex;
  align-items: center;
  padding: 30px 20px;
  :not(:last-child) {
    border-right: black solid 1px;
  }
`
const input = css`
  padding: 10px;
`
const form = css`
 border: 1px solid black;
 padding: 80px 15%;
 margin-top: 50px;
 display: flex;
 flex-direction: column;
`
