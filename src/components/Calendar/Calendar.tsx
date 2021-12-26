import { css } from '@emotion/react'
import React from 'react'
import leftArrowIcon from '../../images/left_arrow_small.svg'
import rightArrowIcon from '../../images/right_arrow_small.svg'
import Select from '../Select'
import { useCalendar } from './useCalendar'

export type CalendarProps = {
  currentDate: Date | null,
  minimumDate?: Date | null,
  maximumDate?: Date | null,
  onSelected: React.Dispatch<React.SetStateAction<Date | null>>,
  onClickEvent?: any
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const CALENDAR_YEAR = 'calendarYear'
const CALENDAR_MONTH = 'calendarMonth'

function Calendar ({
  currentDate,
  onSelected,
  minimumDate,
  maximumDate,
  onClickEvent
}: CalendarProps) {
  const {
    handlePreviousMonthButton,
    handleNextMonthButton,
    handleDateClick,
    createDays,
    values,
    onChange,
    yearOptions,
    monthOptions
  } = useCalendar(onSelected, currentDate, minimumDate, maximumDate, onClickEvent)

  return (
    <div css={container}>
      <div css={header}>
        <button
          css={monthButton(leftArrowIcon)}
          onClick={handlePreviousMonthButton} >
        </button>
        <div id={CALENDAR_YEAR}>
          <Select
            selectCss={select}
            constrollCss={select}
            onChange={(event) => onChange({ ...values, year: event ?? new Date().getFullYear() })}
            value={values.year}
            options={yearOptions}
            deleteEraser
          />
        </div>
        <div id={CALENDAR_MONTH}>
          <Select
            selectCss={select}
            constrollCss={select}
            onChange={(event) => onChange({ ...values, month: event ?? new Date().getMonth() })}
            value={values.month}
            options={monthOptions}
            getOptionLabel={(option) => (option + 1).toString()}
            deleteEraser />
        </div>
        <button
          css={monthButton(rightArrowIcon)}
          onClick={handleNextMonthButton} />
      </div>
      <div css={dayOfWeek}>
        {WEEKDAYS.map(day => (
          <div key={day}>
            <span css={dayText}>
              {day}
            </span>
          </div>
        ))}
      </div>
      <div css={perforation} />
      <div css={dateGrid}>
        {createDays().map(({ date, isCurrentMonth }, index) => {
          let isSelected = false
          if (currentDate) {
            isSelected = currentDate.getFullYear() === date.getFullYear() &&
              currentDate.getMonth() === date.getMonth() &&
              currentDate.getDate() === date.getDate()
          }
          return (
            <div
              key={index}
              css={[singleDate, isCurrentMonth ? (isSelected ? selectedDate : activeDate) : disabledDate]}
              onClick={() => isCurrentMonth ? handleDateClick(date) : null}
            >
              {date.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const select = css`
  width: 110px;
`

const header = css`
  margin-top: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`

const container = css`
  width: 371px;
  border-radius: 10px;
  box-shadow: 0 12px 32px 0 rgba(0, 0, 0, 0.15);
  border: solid 1px #f7f7f7;
  background-color: #ffffff;
`

const monthButton = (image: string) => css`
  width: 20px;
  height: 20px;
  background: url(${image}) no-repeat;
  border: none;
  cursor: pointer;
`

const activeDate = css`
  background-color: white; 
  color: #42515d;
  :hover { 
    color: white;
    cursor: pointer;
    background-color: #0082fe;
  }
`

const dayOfWeek = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 19px 40px;
  text-align: center;
`
const selectedDate = css`
background-color: #0082fe;
color: white;
`

const perforation = css`
  margin: 0 41px;
  border: solid 1px #eaeff2;
`

const dateGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 19px 40px 20px;
  justify-items: center;
  align-items: center;
`

const disabledDate = css`
  color: #acb1bf;
  cursor: default;
`
const singleDate = css`
  display: flex;
  width: 33px;
  height: 33px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
`
const dayText = css`
  font-size: 14px;
  font-weight: bold;
  color: #42515d;
`

export default Calendar
