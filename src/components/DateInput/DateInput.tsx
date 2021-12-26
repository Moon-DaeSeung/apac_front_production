import { css, keyframes, SerializedStyles } from '@emotion/react'
import React from 'react'
import Calendar from '../../components/Calendar'
import Popper from '../Popper'
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
        <Popper
          placement='bottom'
          offset={[0, 10]}
          customCss={calendar}
          renderPopNode={
            (handleClose) =>
            <div css={animation}>
              <Calendar currentDate={calendarDate} onSelected={setCalendarDate} onClickEvent={handleClose} />
            </div>}
        />
      }
    </div>
  )
}

const pop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const animation = css`
  animation: ${pop} .2s ease-in-out;
`

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
  width: auto;
  aspect-ratio: 1;
  height: 50%;
  cursor: pointer;
  background: url(${CalendarIcon}) no-repeat;
  background-size: cover;
  background-position: center;
`

export default DateInput
