import { css, SerializedStyles } from '@emotion/react'
import React from 'react'
import Calendar from '../../components/Calendar'
import Dropdown from '../../components/Dropdown'
import CalendarIcon from '../../images/calendar.svg'
import TextField from '../TextField'
import { useDateInput } from './useDateInput'

type DateInputProps = {
  value: string
  onChange?: any
  readOnly?: boolean
  customCss?: SerializedStyles,
}

function DateInput ({ value, onChange = () => null, readOnly = false, customCss }: DateInputProps) {
  const {
    date,
    dateChange,
    isOpen,
    setIsOpen,
    calendarDate,
    setCalendarDate
  } = useDateInput(value, onChange)

  return (
    <div css={[container, customCss, ignore]}>
      <TextField
        customCss={[customCss, textFieldIgnore]}
        value={date}
        onChange={dateChange}
      />
      {
        !readOnly &&
        <div css={calendar} onClick={() => setIsOpen(true)}>
          <Dropdown
            isVisible={isOpen}
            setIsVisible={setIsOpen}
            popperNode={(() => <Calendar currentDate={calendarDate} onSelected={setCalendarDate} onClickEvent={() => setIsOpen(false)} />)()}
            placement='bottom'/>
        </div>
      }
    </div>
  )
}

const container = css`
  position: relative;
  width: 200px;
  min-width: fit-content;
`
const ignore = css`
 padding: 0;
 border: none;
 outline: none;
 height: auto;
`
const textFieldIgnore = css`
  margin: 0px;
  width: auto;
`
const calendar = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 25%;
  right: 5%;
  aspect-ratio: 1;
  height: 50%;
  cursor: pointer;
  background: url(${CalendarIcon}) no-repeat;
  background-size: cover;
  background-position: center;
`

export default DateInput
