/* eslint-disable react/display-name */
import { css } from '@emotion/react'
import React, { useState } from 'react'
import TextField from '../../../../components/TextField'
import { FloatingButtons, Phonemes, Note } from '../../components'
import { errorpattern, header, item, phonemestart, row, textfield } from '../../css'
import { phonemes } from './temp'

const SimpleSentence = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <>
      <h2>문장검사 간략형</h2>
      <div css={[row, header, grid]}>
        <div css={[item]}>문항</div>
        <div css={[item]}>목표 단어, 아동 반응, 오류패턴</div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>특이사항</div>
      </div>
      {data.map(value => {
        return (
          <Row key={value} value={value} />
        )
      })}
      <FloatingButtons/>
    </>
  )
}

export type RowProps = {
  value: number
}

const Row = React.memo(({ value }: RowProps) => {
  const [reaction, setReaction] = useState('')
  return (
      <div key={value} css={[row, grid]}>
        <div css={[item, css`grid-row: 1 / 3; grid-column: 1;`]}>{value}</div>
        <div css={[item]}>
          <div css={css`flex-grow: 1;`}>
            <div css={grid2}>
              <label css={label}>목표문장</label>
              <div css={css`padding: 10px;`}>보리밥을 먹어봐요</div>
            </div>
            <div css={grid2}>
              <label css={label}>문장반응</label>
              <TextField
                customCss={textfield}
                label="보리바블 비벼봐/바요"
                value={reaction}
                onChange={setReaction}
              />
            </div>
          </div>
        </div>
        <div css={[item, css`grid-column: 2 / 4; grid-row: 2 / 3;`]}>
          <div css={[grid2]}>
            <label css={label}>오류패턴</label>
            <div css={[errorpattern]}>
              연구개 전방화(2회), 도치(1회), 음절반복(3회), 전형적 어중, 단순화(1회) 연구개 전방화(2회), 도치(1회),
            </div>
          </div>
        </div>
        <div css={[item, phonemestart]}>
          <Phonemes phonemes={phonemes} />
        </div>
        <div css={[item, css`grid-row: 1 / 3;`]}>
          <Note/>
        </div>
      </div>
  )
})

export default SimpleSentence

const grid = css`
  display: grid;
  grid-template-columns: minmax(70px, 1fr) minmax(250px, 7fr) 9fr minmax(100px, 2fr);
`
const grid2 = css`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 100px auto;
`
const label = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
