export const changeDateForm = (date: Date | null) => {
  if (date) {
    const year = date.getFullYear()
    const month = ('0' + (1 + date.getMonth())).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

    return year + '-' + month + '-' + day
  } else {
    return 'YYYY-MM-DD'
  }
}

export const checkValidDate = (value: string) => {
  let result = true
  try {
    const date = value.split('-')
    const y = parseInt(date[0], 10)
    const m = parseInt(date[1], 10)
    const d = parseInt(date[2], 10)

    const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/
    result = dateRegex.test(d + '-' + m + '-' + y)
  } catch (err) {
    result = false
  }
  return result
}

export const getRealAge = (birth?: Date, specificDate?: Date) => {
  if (birth === undefined) { return { age: 0, month: 0 } }
  const birthday = birth
  const birthYear = birthday.getFullYear()
  const specificDay = specificDate === undefined ? new Date() : specificDate
  const specificYear = specificDay.getFullYear()
  const months = 12 * (specificYear - birthYear) + specificDay.getMonth() - birthday.getMonth() + (birth.getDate() > specificDay.getDate() ? -1 : 0)
  const age = Number((months / 12).toString().slice(0, 2))
  const month = months % 12
  return { age, month }
}
