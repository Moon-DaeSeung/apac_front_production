/* eslint-disable react/display-name */
import { css } from '@emotion/react'
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Button from '../../../../components/Button'
import TextField from '../../../../components/TextField'
import { ApacContextProps } from '../../Apac'
import { FloatingButtons, Phonemes, Note } from '../../components'
import { allCheck, errorpattern, header, item, row, textfield } from '../../css'
import useSubTestRow, { SubTestRowProps } from '../../hooks/useSubTestRow'

const NormalSentence = () => {
  const {
    value: { normalSentenceTest: { subTestRows: questionAnswers, questionInformationId } },
    handleSave,
    handleNormalSentenceTestChange: handleChange,
    handleAllAnswerCheck
  } = useOutletContext<ApacContextProps>()
  return (
    <>
      <h2>문장검사 일반형</h2>
      <div css={[row, header, grid]}>
        <div css={[item]}>문항</div>
        <div css={[item, css`gap: 5px;`]}>
          <span>목표 단어, </span>
          <span>아동반응</span>
          <Button customCss={allCheck} onClick={handleAllAnswerCheck('normalSentenceTest')}>+</Button>
          <span>,</span>
          <span>오류패턴</span>
        </div>
        <div css={[item]}>음소 반응</div>
        <div css={[item]}>특이사항</div>
      </div>
      {questionAnswers.map((value, key) => {
        return (
          <Row questionId={questionInformationId} key={key} value={value} onChange={handleChange[key]} />
        )
      })}
      <FloatingButtons onSave={() => handleSave('normalSentenceTest')}/>
    </>
  )
}

const Row = React.memo(({ value, onChange, questionId }: SubTestRowProps) => {
  if (!onChange) return <></>
  const { question, answer, isTyping } = value
  const { handleChange } = useSubTestRow({ value, onChange, questionId })
  return (
        <div key={question.number} css={[row, grid]}>
          <div css={[item, css`grid-row: 1/3; grid-column: 1;`]}>
            {question.number}
          </div>
          <div css={[item]}>
            <div
              css={css`flex-grow: 1;`}>
              <div css={grid2}>
                <label css={label}>목표문장</label>
                <div
                  css={css`
                    padding: 10px;
                  `}
                >
                  {question.number}
                </div>
              </div>
              <div css={grid2}>
                <label css={label}>문장반응</label>
                <TextField
                  customCss={[textfield, css`height: 60px;`]}
                  label={question.target}
                  value={answer.reaction}
                  onChange={handleChange('reaction')}
                  isPending={isTyping}
                  isError={answer.state === 'ERROR'}
                />
              </div>
              <div css={[grid2, css`margin-top: 10px;`]}>
                <label css={label}>오류패턴</label>
                <div css={[errorpattern]}>
                  {answer.totalErrorPatterns.map(({ total, errorPattern: { name } }) => {
                    return `${name}(${total}회)`
                  }).join(', ')}
                </div>
              </div>
            </div>
          </div>
          <div css={[item, phonemestart]}>
            <Phonemes value={answer.phonemes} onChange={handleChange('phonemes')} />
          </div>
          <div css={[item]}>
            <Note value={answer.note} onChange={handleChange('note')}/>
          </div>
        </div>
  )
})

export default NormalSentence

const grid = css`
 display: grid;
 grid-template-columns: minmax(70px, 1fr) minmax(400px, 450px) 600px 100px
`
const grid2 = css`
  display: grid;
  grid-template-columns: 100px auto;
  flex-grow: 1;
`
const label = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const phonemestart = css`
  justify-content: start;
  padding-left: 10px;
`
