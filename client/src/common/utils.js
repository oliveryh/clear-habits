var dayjs = require('dayjs')
var isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
dayjs.extend(isoWeeksInYear)
var isLeapYear = require('dayjs/plugin/isLeapYear')
dayjs.extend(isLeapYear)

const weekSpreadSequential = (startYearWeek, endYearWeek) => {
  const startYear = Number(startYearWeek.slice(0, 4))
  const startWeek = Number(startYearWeek.slice(5, 7))
  const endYear = Number(endYearWeek.slice(0, 4))
  const endWeek = Number(endYearWeek.slice(5, 7))
  const years = [...Array(endYear - startYear + 1).keys()].map(
    i => endYear + i - 1,
  )
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

module.exports = { weekSpreadSequential }
