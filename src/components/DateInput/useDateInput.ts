import { useEffect, useState } from 'react'
import { changeDateForm, checkValidDate } from '../../libs/utils/DateUtils'

export const useDateInput = (value: string, onChange: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [calendarDate, setCalendarDate] = useState<Date | null>(null)
  const controller = (input: string) => {
    if (/\D-$/.test(input)) { input = input.substr(0, input.length - 3) }

    const values = input.split('-').map(function (value) {
      return value.replace(/\D/g, '')
    })
    if (values[1]) values[1] = transform(values[1], 12, false)
    if (values[2]) values[2] = transform(values[2], 31, true)
    const output = values.map(function (value, index) {
      return (value.length === 4 && index < 1) || (value.length === 2 && index < 2 && index >= 1) ? value + ' - ' : value
    })
    return output.join('').substr(0, 14)
  }

  const transform = (value: string, max: number, isDay: boolean) => {
    if (isDay && value.charAt(0) === '0' && value.length === 3) { value = value.substr(1, 2) }
    if (value.charAt(0) !== '0' || value === '00') {
      let num = parseInt(value)
      if (isNaN(num) || num <= 0 || num > max) num = 1
      value = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString()
    };
    return value
  }

  const [date, setDate] = useState<string>(controller(value || ''))

  useEffect(() => {
    calendarDate && onChange(changeDateForm(calendarDate))
  }, [calendarDate])

  useEffect(() => {
    checkValidDate(value) && setCalendarDate(new Date(value))
  }, [value])

  useEffect(() => {
    setDate(controller(value || ''))
  }, [value])

  useEffect(() => {
    const copy = date
    onChange(copy.replace(/ /g, ''))
  }, [date])

  const dateChange = (input:string) => {
    setDate(controller(input))
  }

  return {
    date,
    dateChange,
    controller,
    isOpen,
    setIsOpen,
    calendarDate,
    setCalendarDate
  }
}
