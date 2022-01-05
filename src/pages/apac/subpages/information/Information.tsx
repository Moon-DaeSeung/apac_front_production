import { css } from '@emotion/react'
import React from 'react'
import TextField from '../../../../components/TextField'
import Button from '../../../../components/Button'
import DateInput from '../../../../components/DateInput'
import { InformationProps } from '../../types'
import { useOutletContext } from 'react-router-dom'
import { changeDateForm } from '../../../../../../websol-front/src/utils/DateUtils'
import { ApacContextProps } from '../../Apac'

const Information = () => {
  const { value: { information }, setValue, handleSave } = useOutletContext<ApacContextProps>()
  const handleChange = (key: keyof InformationProps) => (value: string | null) => {
    setValue((prev) => {
      return { ...prev, information: { ...prev.information, [key]: value } }
    })
  }

  const resolve = (key: keyof InformationProps) => {
    return {
      value: information[key] || '',
      onChange: handleChange(key)
    }
  }

  return (
    <>
      <h2>검사 정보</h2>
      <div css={[form]}>
        <div css={[row]}>
          <label css={[item]}>이름</label>
          <div css={[item]}>
            <TextField customCss={input} {...resolve('testeeName')}/>
          </div>
        </div>
        <div css={[row]}>
          <label css={[item]}>성별</label>
          <div css={[item]}>
            <TextField customCss={input} {...resolve('testeeGender')} />
          </div>
        </div>
        <div css={[row]}>
          <label css={[item]}>나이</label>
          <div css={[item]}>
            <TextField customCss={input} {...resolve('testeeAge')} />
          </div>
        </div>
        <div css={[row]}>
          <label css={[item]}>특이사항</label>
          <div css={[item]}>
            <TextField customCss={input} {...resolve('testeeNote')} />
          </div>
        </div>
        <div css={[row]}>
          <label css={[item]}>검사일자</label>
          <div css={[item]}>
            <DateInput customCss={input} {...resolve('testedDate')} initial={changeDateForm(new Date())}/>
          </div>
        </div>
        <Button customCss={button} onClick={() => handleSave('information')}>저장</Button>
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
