/* eslint-disable react/display-name */
import { css } from '@emotion/react'
import React, { useContext, useMemo } from 'react'
import { Answer, Phoneme } from 'src/libs/api/apac/types'
import TextField from '../../../../components/TextField'
import { ApacContext } from '../../Apac'
import { FloatingButtons, Phonemes, Note } from '../../components'
import { errorpattern, header, item, phonemestart, row, textfield } from '../../css'
import { QuestionAnswer } from '../../types'

const SimpleSentence = () => {
  const { value: { simpleSentenceTest: { questionAnswers } }, setValue } = useContext(ApacContext)
  const handleChange = useMemo(() => questionAnswers.map((_, index) => (questionAnswer: QuestionAnswer) => {
    setValue(prev => {
      const copied = [...prev.simpleSentenceTest.questionAnswers]
      copied[index] = questionAnswer
      return { ...prev, simpleSentenceTest: { ...prev.normalSentenceTest, questionAnswers: copied } }
    })
  }), [setValue, questionAnswers.length])
  return (
    <>
      <h2>문장검사 간략형</h2>
      <div css={[row, header, grid]}>
        <div css={[item]}>문항</div>
        <div css={[item]}>목표 단어, 아동 반응, 오류패턴</div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>특이사항</div>
      </div>
      {questionAnswers.map((value, index) => {
        return (
          <Row key={index} value={value} onChange={handleChange[index]} />
        )
      })}
      <FloatingButtons/>
    </>
  )
}

export type RowProps = {
  value: QuestionAnswer
  onChange: (value: QuestionAnswer) => void
}

const Row = React.memo(({ value, onChange }: RowProps) => {
  const { question, answer } = value
  const handleChange = (key: keyof Answer) => (item: string | Phoneme[]) => {
    onChange({ ...value, answer: { ...value.answer, [key]: item } })
  }
  return (
      <div key={question.number} css={[row, grid]}>
        <div css={[item, css`grid-row: 1 / 3; grid-column: 1;`]}>{question.number}</div>
        <div css={[item]}>
          <div css={css`flex-grow: 1;`}>
            <div css={grid2}>
              <label css={label}>목표문장</label>
              <div css={css`padding: 10px;`}>{question.name}</div>
            </div>
            <div css={grid2}>
              <label css={label}>문장반응</label>
              <TextField
                customCss={textfield}
                label={question.target}
                value={answer.reaction}
                onChange={handleChange('reaction')}
              />
            </div>
          </div>
        </div>
        <div css={[item, css`grid-column: 2 / 4; grid-row: 2 / 3;`]}>
          <div css={[grid2]}>
            <label css={label}>오류패턴</label>
          <div css={[errorpattern]}>
            {answer.totalErrorPatterns.map(({ total, errorPattern: { name } }) => {
              return `${name}(${total}회)`
            }).join(', ')}
          </div>
          </div>
        </div>
        <div css={[item, phonemestart]}>
          <Phonemes value={answer.phonemes} onChange={handleChange('phonemes')} />
        </div>
        <div css={[item, css`grid-row: 1 / 3;`]}>
          <Note value={answer.note} onChange={handleChange('note')}/>
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
