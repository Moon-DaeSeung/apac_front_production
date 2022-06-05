import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import Select from '../../../components/Select'
import Popper from '../../../components/Popper'
import { border, text } from '../color'
import Button from '../../../components/Button'
import { AnswerState, ErrorPattern, Phoneme } from '../../../libs/api/apac/types'
import useErrorPatternOptions from '../../../hooks/useErrorPatternOptions'
import crossIcon from '../../../images/cross.svg'

export type PhonemesProps = {
  value: Phoneme[]
  onChange: (value: Phoneme[]) => void
  state: AnswerState
}

const Phonemes = ({ value, onChange, state }: PhonemesProps) => {
  const transform = (phoneme: Phoneme) => {
    const { react } = phoneme
    return { ...phoneme, react: react === '-' ? '∅' : react }
  }
  const secondLineStart = value.findIndex(({ target }) => target === '\n')
  const row = (key: number) => key > secondLineStart ? 2 : 1
  const handleChange = (index: number) => (item: Phoneme) => {
    const copied = [...value]
    copied[index] = item
    onChange(copied)
  }

  return (
    <div css={[container, state !== 'COMPLETE' && disabled, state === 'NO_RESPONSE' && noResponse]}>
      {value.map((item, key) => {
        const {target, react } = item
        const isBlank = target === '-' && (react === '-' || react === '')
        const isSpace = target === ' '
        const isSpaceOnConsonant = isSpace && key % 3 !== 1
        const isLineBreak = target === '\n'
        const isBreak = react === '.' && key % 3 !== 1
        const isHidden = isBlank || isSpaceOnConsonant || isLineBreak || isBreak
        return (
          <div key={key} css={ [isHidden ? css`display: none;` : css`grid-row: ${row(key)};`, isSpace && css`visibility: hidden;`]}>
            <PhonemeBox
              key={key}
              value={transform(item)}
              onChange={handleChange(key)}
            />
          </div>
        )
      })}
    </div>
  )
}

type PhonemeBoxProps = {
  value: Phoneme
  onChange: (value: Phoneme) => void
}

const PhonemeBox = ({ value, onChange }: PhonemeBoxProps) => {
  const { target, react, confirmedErrorPatterns, computedErrorPatterns } = value
  const [isOpen, setIsOpen] = useState(false)
  const [selectEl, setSelectEl] = useState<HTMLInputElement | null>(null)
  const handleChange = (key: keyof Phoneme) => (item: string | ErrorPattern[]) => {
    onChange({ ...value, [key]: item })
  }
  const { errorPatternOptions } = useErrorPatternOptions()
  const isDifferent = (option: ErrorPattern) => {
    return computedErrorPatterns.findIndex(({ id }) => option.id === id) === -1
  }
  const hasDifferent = confirmedErrorPatterns.reduce((acc, errorPattern) => acc || isDifferent(errorPattern), false)

  useEffect(() => {
    if (!isOpen || !selectEl) return
    selectEl.focus({ preventScroll: true })
  }, [isOpen])

  return (
    <>
      <Popper
        offset={[0, 10]}
        hasArrow={true}
        renderPopNode={
          (closeEvent: () => void) =>
            <div css={[errorpattern]}>
              <Select
                getOptionLabel={({ name }) => name}
                options={errorPatternOptions}
                value={confirmedErrorPatterns}
                ref={setSelectEl}
                onChange={handleChange('confirmedErrorPatterns')}
                multiple
                autocomplete
                renderMultiItemNode={({
                  option,
                  deleteEvent
                }: {
                  option: ErrorPattern;
                  deleteEvent: (e: any) => void;
                }) => {
                  return (
                    <div css={[multiItem, isDifferent(option) && css`background-color: #FF8C00;`]} key={option.id}>
                      <span css={itemName}>{option.name}</span>
                      <div css={[icon]}>
                        <div>
                        <img
                          src={crossIcon}
                          css={[deleteItem]}
                          onMouseDown={deleteEvent}
                        />
                        </div>
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
        }
        onChange={(isOpen) => setIsOpen(isOpen)}
      >
        <div css={[phonemeBox, react.length === 2 && css`width: 40px;`, isOpen && selected, hasDifferent && different]}>
          <div css={item}>{target}</div>
          <div css={[item, red, (target === react) && white]}>{react}</div>
          <input
            css={[item, distortion]}
            value={value.distortion}
            onChange={(e) => handleChange('distortion')(e.target.value)}
            onClick={(e) => { e.stopPropagation() }}
          />
        </div>
      </Popper>
    </>
  )
}

export default Phonemes

const container = css`
  display: grid;
  justify-content: start;
  flex-grow: 1;
  padding: 2px 0px 2px 2px;
`
const disabled = css`
  pointer-events: none;
`
const noResponse = css`
  background-color: rgba(220,220,220,.2);
  border-radius: 5px;
`
const item = css`
  border: 1px solid ${border.base};
  border-radius: 4px;
  width: 100%;
  height: 25px;
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
`
const different = css`
  background-color: lightblue;
`
const phonemeBox = css`
  padding: 2px;
  width: 27px;
  gap: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    ${hover}
  }
`
const selected = css`
  ${hover}
  background-color: #F0FFFF;
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
