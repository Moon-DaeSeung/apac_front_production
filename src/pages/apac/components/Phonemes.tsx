import { css } from '@emotion/react'
import React, { useState } from 'react'
import Select from '../../../components/Select'
import Popper from '../../../components/Popper'
import { border, text } from '../color'
import Button from '../../../components/Button'
import { ErrorPattern, Phoneme } from '../../../libs/api/apac/types'
import useErrorPatternOptions from '../../../hooks/useErrorPatternOptions'
import crossIcon from '../../../images/cross.svg'

export type PhonemesProps = {
  value: Phoneme[]
  onChange: (value: Phoneme[]) => void
}

const Phonemes = ({ value, onChange }: PhonemesProps) => {
  const filtering = ({ target, react }: Phoneme, key: number) => {
    const isBlank = target === '-' && react === '-'
    const isSpace = target === ' ' && react === ' ' && key % 3 !== 1
    const isLineBreak = target === '\n' && react === '\n' && key % 3 !== 1
    return !isBlank && !isSpace && !isLineBreak
  }
  const filtered = value.filter(filtering)
  const secondLineStart = filtered.findIndex(({ target }) => target === '\n')
  const row = (key: number) => key > secondLineStart ? 2 : 1
  const handleChange = (index: number) => (item: Phoneme) => {
    const copied = [...value]
    copied[index] = item
    onChange(copied)
  }

  return (
    <div css={container}>
      {filtered.map((value, key) => {
        return (
          <div key={key} css={css`grid-row: ${row(key)};`}>
            <PhonemeBox
              key={key}
              isHidden={value.target === ' ' || value.target === '\n'}
              value={value}
              onChange={handleChange(key)}
            />
          </div>
        )
      })}
    </div>
  )
}

type PhonemeBoxProps = {
  isHidden: boolean
  value: Phoneme
  onChange: (value: Phoneme) => void
}

const PhonemeBox = ({ isHidden = false, value, onChange }: PhonemeBoxProps) => {
  const { target, react, confirmedErrorPatterns, computedErrorPatterns } = value
  const [isSelected, setIsSelected] = useState(false)
  const handleChange = (key: keyof Phoneme) => (item: string | ErrorPattern[]) => {
    onChange({ ...value, [key]: item })
  }
  const { errorPatternOptions } = useErrorPatternOptions()
  const isDifferent = (option: ErrorPattern) => {
    return computedErrorPatterns.findIndex(({ id }) => option.id === id) === -1
  }
  return (
    <>
      <Popper
        offset={[0, 10]}
        hasArrow={true}
        renderPopNode={(closeEvent) => (
          <div css={[errorpattern]}>
            <Select
              getOptionLabel={({ name }) => name}
              options={errorPatternOptions}
              value={confirmedErrorPatterns}
              onChange={handleChange('confirmedErrorPatterns')}
              multiple
              autocomplete
              renderMultiItemNode={({
                option,
                deleteEvent
              }: {
                option: ErrorPattern;
                deleteEvent: () => void;
              }) => {
                return (
                  <div css={[multiItem, isDifferent(option) && css`background-color: #FF8C00;`]} key={option.id}>
                    <span css={itemName}>{option.name}</span>
                    <div css={[icon]}>
                      <img
                        src={crossIcon}
                        css={[deleteItem]}
                        onClick={deleteEvent}
                      />
                    </div>
                  </div>
                )
              }}
            />
            <div css={computed}>
              <div>
                <span>*프로그램이 제시한 오류패턴</span>
                <div>
                  {computedErrorPatterns.map(({ name }) => name).join(', ')}
                </div>
              </div>
              <Button customCss={button} onClick={closeEvent}>
                확인
              </Button>
            </div>
          </div>
        )}
        onChange={(isOpen) => setIsSelected(isOpen)}
      >
        <div css={[phonemeBox, isSelected && selected, isHidden && hidden]}>
          <div css={item}>{target}</div>
          <div css={[item, red, target === react && white]}>{react}</div>
          <input
            css={[item, distortion]}
            onClick={(e: any) => {
              e.stopPropagation()
              handleChange('distortion')(e.target.value)
            }}
          />
        </div>
      </Popper>
    </>
  )
}

export default Phonemes

const container = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, 29px); 
`
const item = css`
  border: 1px solid ${border.base};
  border-radius: 4px;
  width: 24px;
  aspect-ratio: 1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`
const distortion = css`
  text-align: center;
  background-color: #d8ecf3;
`
const red = css`
  color: red;
`
const white = css`
  color: white;
`
const hover = css`
  margin-top: -2px;
  outline: 2px solid ${border.base};
  border-radius: 4px;
`
const phonemeBox = css`
  padding: 3px;
  gap: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const multiItem = css`
  display: flex;
  padding: 2px 5px;
  place-items: center;
  margin: 5px 0 0 5px;
  background-color: #EBEBEB;
  border-radius: 25px;
  font-size: 0.7em;
`
const itemName = css`
  flex-grow: 1;
  padding: 0px 12px;
  text-align: center;
`
const deleteItem = css`
  box-sizing: border-box;
  padding: 0px;
  width: 13px;
  height: 13px;
  cursor: pointer;
  border-radius: 50px;
  background-color: white;
  :hover {
    background-color: whitesmoke;
  }
`
const icon = css`
  display: flex;
  place-items: center;
`
