var dayjs = require('dayjs')
var isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
dayjs.extend(isoWeeksInYear)
var isLeapYear = require('dayjs/plugin/isLeapYear')
dayjs.extend(isLeapYear)

const getWeekNumber = d => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  var year = d.getUTCFullYear()
  return [year, weekNo]
}

const lastDayOfMonth = date => {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  console.log(year, month)
  return new Date(year, month + 1, 0, 23, 59, 59).toISOString().slice(0, 10)
}

const firstDayOfMonth = date => {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  return new Date(year, month, 1, 1, 1, 1).toISOString().slice(0, 10)
}

const monthRange = (date, numMonths) => {
  const endDateObj = new Date(date)
  const startDateObj = new Date(date)

  startDateObj.setMonth(startDateObj.getMonth() - (numMonths - 1))

  return {
    start: firstDayOfMonth(startDateObj),
    end: lastDayOfMonth(endDateObj),
  }
}

const monthSpreadSequential = (startYearMonth, endYearMonth) => {
  const startYear = Number(startYearMonth.slice(0, 4))
  const startMonth = Number(startYearMonth.slice(5, 7))
  const endYear = Number(endYearMonth.slice(0, 4))
  const endMonth = Number(endYearMonth.slice(5, 7))
  const years =
    startYear != endYear
      ? [...Array(endYear - startYear + 1).keys()].map(i => startYear + i)
      : [startYear]
  return years.reduce((monthList, year) => {
    const numMonthsInYear = 12
    let monthsInYear = Array.from({ length: numMonthsInYear }, (_, ac) => ac + 1)
    if (year == startYear) {
      monthsInYear = monthsInYear.filter(a => a >= startMonth)
    }
    if (year == endYear) {
      monthsInYear = monthsInYear.filter(a => a <= endMonth)
    }
    monthsInYear = monthsInYear.map(a => `${year}-${String(a).padStart(2, '0')}`)
    return [...monthList, ...monthsInYear]
  }, [])
}

const monthRangeSpread = (endDate, numMonths) => {
  const { start, end } = monthRange(endDate, numMonths)
  const startMonthString = start.slice(0, 7)
  const endMonthString = end.slice(0, 7)
  return monthSpreadSequential(startMonthString, endMonthString)
}

const monthName = date => {
  const month = new Date(date).getMonth()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return monthNames[month]
}

const hoursToReadable = hourDecimal => {
  var hours = parseInt(hourDecimal)
  var mins = parseInt((hourDecimal * 60) % 60)
  var retString = `${mins}m`
  if (hours) {
    retString = `${hours}h` + ' ' + retString
  }
  return retString
}

const getMonday = d => {
  d = new Date(d)
  const day = d.getDay()
  const diff = d.getDate() - day + (day == 0 ? -6 : 1) // adjust when day is sunday
  return new Date(d.setDate(diff))
}

const getSunday = d => {
  d = new Date(d)
  console.log(d)
  const day = d.getDay()
  const diff = d.getDate() - day + (day == 0 ? 0 : 7) // adjust when day is sunday
  return new Date(d.setDate(diff))
}

const weekRange = (date, numWeeks) => {
  const endDateObj = new Date(date)
  const startDateObj = new Date(date)

  startDateObj.setDate(endDateObj.getDate() - (numWeeks - 1) * 7)

  const sundayOnEndWeek = getSunday(endDateObj)
  const mondayOnStartWeek = getMonday(startDateObj)
  return {
    start: mondayOnStartWeek.toISOString().slice(0, 10),
    end: sundayOnEndWeek.toISOString().slice(0, 10),
  }
}

const weekSpreadSequential = (startYearWeek, endYearWeek) => {
  const startYear = Number(startYearWeek.slice(0, 4))
  const startWeek = Number(startYearWeek.slice(5, 7))
  const endYear = Number(endYearWeek.slice(0, 4))
  const endWeek = Number(endYearWeek.slice(5, 7))
  const years =
    startYear != endYear
      ? [...Array(endYear - startYear + 1).keys()].map(i => startYear + i)
      : [startYear]
  return years.reduce((weekList, year) => {
    const numWeeksInYear = dayjs(`${year}-01-01`).isoWeeksInYear()
    let weeksInYear = Array.from({ length: numWeeksInYear }, (_, ac) => ac + 1)
    if (year == startYear) {
      weeksInYear = weeksInYear.filter(a => a >= startWeek)
    }
    if (year == endYear) {
      weeksInYear = weeksInYear.filter(a => a <= endWeek)
    }
    weeksInYear = weeksInYear.map(a => `${year}-${String(a).padStart(2, '0')}`)
    return [...weekList, ...weeksInYear]
  }, [])
}

const weekRangeSpread = (date, numWeeks) => {
  const { start, end } = weekRange(date, numWeeks)
  const [startYear, startWeek] = getWeekNumber(new Date(start))
  const [endYear, endWeek] = getWeekNumber(new Date(end))
  const startYearWeek = `${startYear}-${String(startWeek).padStart(2, '0')}`
  const endYearWeek = `${endYear}-${String(endWeek).padStart(2, '0')}`
  return weekSpreadSequential(startYearWeek, endYearWeek)
}

const dayRange = (date, numDays) => {
  console.log(date, numDays)
  const endDateObj = new Date(date)
  const startDateObj = new Date(date)

  startDateObj.setDate(endDateObj.getDate() - (numDays - 1))

  return {
    start: startDateObj.toISOString().slice(0, 10),
    end: endDateObj.toISOString().slice(0, 10),
  }
}

const dateSpread = (startDate, endDate) => {
  let startDateObj = new Date(startDate)
  let numDays = 7
  if (endDate) {
    let endDateObj = new Date(endDate)
    var timeDifference = endDateObj.getTime() - startDateObj.getTime()
    // To calculate the no. of days between two dates
    numDays = timeDifference / (1000 * 3600 * 24) + 1
  }
  return Array.from(Array(numDays).keys()).map(num =>
    new Date(startDateObj.getTime() + num * 86400000)
      .toISOString()
      .substring(0, 10),
  )
}


const secondsToTimestamp = (val, { zeroPad = false, includeSeconds = false } = {}) => {

  const _zeroPad = (value, num) => {
    num = typeof num !== 'undefined' ? num : 2
    return value.toString().padStart(num, '0')
  }

  var tt = val
  var hours = zeroPad
    ? _zeroPad(parseInt(tt / 3600))
    : parseInt(tt / 3600)
  var minutes = _zeroPad(parseInt((tt % 3600) / 60))
  if (includeSeconds) {
    var seconds = _zeroPad(parseInt(tt % 60))
    return `${hours}:${minutes}:${seconds}`
  } else {
    return `${hours}:${minutes}`
  }
}

const shortYearName = (val) => {
  let date = new Date(val)
  const day = date.toLocaleString('default', { day: '2-digit' })
  const month = date.toLocaleString('default', { month: 'short' })
  return day + '-' + month
}

module.exports = {
  dateSpread,
  dayRange,
  getSunday,
  hoursToReadable,
  monthName,
  monthRange,
  monthRangeSpread,
  monthSpreadSequential,
  secondsToTimestamp,
  shortYearName,
  weekRange,
  weekRangeSpread,
  weekSpreadSequential,
}
