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
  var year = d.getUTCFullYear().toString()
  return [year, weekNo]
}

const weekSpread = (endDate, numWeeks) => {
  if (endDate != null) {
    const endDateObj = new Date(endDate)
    var startDateObj = new Date(endDate)
    startDateObj.setDate(endDateObj.getDate() - numWeeks * 7)
    const endWeek = getWeekNumber(endDateObj)
    const startWeek = getWeekNumber(startDateObj)
    const endWeekString = `${endWeek[0]}-${String(endWeek[1]).padStart(2, '0')}`
    const startWeekString = `${startWeek[0]}-${String(startWeek[1]).padStart(2, '0')}`

    return weekSpreadSequential(startWeekString, endWeekString)
  } else {
    return []
  }
}

const weekSpreadSequential = (startYearWeek, endYearWeek) => {
  const startYear = Number(startYearWeek.slice(0, 4))
  const startWeek = Number(startYearWeek.slice(5, 7))
  const endYear = Number(endYearWeek.slice(0, 4))
  const endWeek = Number(endYearWeek.slice(5, 7))
  const years =
    startYear != endYear
      ? [...Array(endYear - startYear + 1).keys()].map(i => endYear + i - 1)
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

module.exports = { weekSpread, weekSpreadSequential }
