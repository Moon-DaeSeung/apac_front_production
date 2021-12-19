import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const getArray = (maxNumber: number, minNumber?: number) => {
  const start = minNumber ?? 0
  return Array.from({ length: maxNumber + 1 - start }, (_, i) => start + i)
}

export const useCalendar = (
  onSelected: Dispatch<SetStateAction<Date | null>>,
  currentDate: Date | null,
  minimumDate?: Date | null,
  maximumDate?: Date | null,
  onClickEvent?: any) => {
  /*
   * Date()와의 호환을 위해 month는 1 ~ 12 가 아니라 0 ~ 11 로 계산함.
   * totalDaysCount는 해당년월의 총 일수, ex) 2021년 06월은 30일
   * startDayOfWeek는 해당년월의 시작 요일. 0~6으로 결과. 0:일요일, ... 6:토요일
   */

  useEffect(() => {
    if (!currentDate) return

    onChange({
      year: currentDate.getFullYear(),
      month: currentDate?.getMonth()
    })
  }, [currentDate])

  const [values, onChange] = useState({
    year: currentDate?.getFullYear() || new Date().getFullYear(),
    month: currentDate?.getMonth() || new Date().getMonth()
  })
  const getTotalDaysCount = (year: number, month: number): number => new Date(year, month + 1, 0).getDate()
  const getStartDayOfWeek = (year: number, month: number): number => new Date(year, month, 1).getDay()
  const createDays = () => {
    const { year, month } = values
    const currentMonthTotalDaysCount = getTotalDaysCount(year, month)
    const previousMonthTotalDaysCount = getTotalDaysCount(year, month - 1)
    const startDayOfWeek = getStartDayOfWeek(year, month)
    const totalDaysCount = Math.ceil((currentMonthTotalDaysCount + startDayOfWeek) / 7) * 7
    return [...Array(totalDaysCount).keys()].map(
      (index) => {
        let date: Date
        let isCurrentMonth: boolean

        if (index < startDayOfWeek) {
          const day = index + 1 + previousMonthTotalDaysCount - startDayOfWeek
          date = new Date(year, month - 1, day)
          isCurrentMonth = false
        } else if (index < startDayOfWeek + currentMonthTotalDaysCount) {
          const day = index + 1 - startDayOfWeek
          date = new Date(year, month, day)
          isCurrentMonth = true
        } else {
          const day = index + 1 - (startDayOfWeek + currentMonthTotalDaysCount)
          date = new Date(year, month + 1, day)
          isCurrentMonth = false
        }

        if (minimumDate) {
          if (Number(date.setHours(0, 0, 0, 0)) < Number(minimumDate.setHours(0, 0, 0, 0))) {
            isCurrentMonth = false
          }
        }

        if (maximumDate) {
          if (Number(date.setHours(0, 0, 0, 0)) > Number(maximumDate.setHours(0, 0, 0, 0))) {
            isCurrentMonth = false
          }
        }

        return { date, isCurrentMonth }
      }
    )
  }

  const moveMonth = (amount: 1 | -1) => {
    const { year, month } = values
    const movedDate = new Date(year, month + amount)

    onChange({
      year: movedDate.getFullYear(),
      month: movedDate.getMonth()
    })
  }

  const handlePreviousMonthButton = () => {
    moveMonth(-1)
  }

  const handleNextMonthButton = () => {
    moveMonth(1)
  }

  const handleDateClick = (date: Date) => {
    onSelected(date)
    onClickEvent && onClickEvent()
  }

  const yearOptions = getArray(
    maximumDate ? maximumDate.getFullYear() : new Date().getFullYear(),
    minimumDate ? minimumDate.getFullYear() : new Date().getFullYear() - 100)
    .reverse()

  const monthOptions = getArray(11)

  return {
    handleDateClick,
    handlePreviousMonthButton,
    handleNextMonthButton,
    createDays,
    values,
    onChange,
    yearOptions,
    monthOptions
  }
}
