/* eslint-disable react/display-name */
import React, { useContext, useMemo } from 'react'
import TextField from '../../../../components/TextField'
import { Phonemes, Note, FloatingButtons } from '../../components'
import { errorpattern, header, item, phonemestart, row, textfield } from '../../css'
import { css } from '@emotion/react'
import { QuestionAnswer } from '../../types'
import { ApacContext } from '../../Apac'
import { Answer, Phoneme } from 'src/libs/api/apac/types'

const Word = () => {
  const { value: { wordTest: { questionAnswers } }, setValue } = useContext(ApacContext)
  const handleChange = useMemo(() => questionAnswers.map((_, index) => (questionAnswer: QuestionAnswer) => {
    setValue(prev => {
      const copied = [...prev.wordTest.questionAnswers]
      copied[index] = questionAnswer
      return { ...prev, wordTest: { ...prev.wordTest, questionAnswers: copied } }
    })
  }), [setValue, questionAnswers.length])

  return (
    <>
      <h2>단어 검사</h2>
      <div css={[row, header, grid]}>
        <div css={[item]}>문항</div>
        <div css={[item]}>목표 단어</div>
        <div css={[item]}>아동 반응</div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>오류패턴</div>
        <div css={[item]}>특이사항</div>
      </div>
      {questionAnswers.map((value, index) => {
        return (
          <Row key={value.question.number} value={value} onChange={handleChange[index]} />
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
        <div css={[item]}>{question.number}</div>
        <div css={[item]}>{question.name}</div>
        <div css={[item]}>
          <TextField
            customCss={textfield}
            label={question.target}
            value={answer.reaction}
            onChange={handleChange('reaction')}
          />
        </div>
        <div css={[item, phonemestart]}>
          <Phonemes value={answer.phonemes} onChange={handleChange('phonemes')} />
        </div>
        <div css={[item]}>
        <div css={[errorpattern]}>
          {answer.totalErrorPatterns.map(({ total, errorPattern: { name } }) => {
            return `${name}(${total}회)`
          }).join(', ')}
        </div>
        </div>
        <div css={[item]}>
          <Note value={answer.note} onChange={handleChange('note')}/>
        </div>
      </div>
  )
})

export default Word

const grid = css`
display: grid;
grid-template-columns: minmax(60px, 1fr) minmax(100px, 1fr) minmax(120px, 3fr) minmax(200px, 4fr) minmax(200px, 4fr) minmax(100px, 2fr);
`
