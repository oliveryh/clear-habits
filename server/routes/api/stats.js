var mongoose = require('mongoose')
var router = require('express').Router()
var User = mongoose.model('User')
var Task = mongoose.model('Task')
var auth = require('../auth')
var _ = require('lodash')

function dateSpread(startDate) {
  return Array.from(Array(7).keys()).map((num) =>
    new Date(new Date(startDate).getTime() + num * 86400000)
      .toISOString()
      .substring(0, 10),
  )
}

function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  // Return array of year and week number
  var year = d.getUTCFullYear().toString().substr(-2)
  return [year, weekNo]
}

// list of all stats
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
      var period = req.query.period
      if (period == 'daily') {
        var startDate = req.query.startDate
        var weekSpread = dateSpread(startDate)
        Task.find({ author: req.payload.id })
          .populate({
            path: 'project',
            populate: {
              path: 'category',
            },
          })
          .exec((err, tasks) => {
            function generateBar(input) {
              var returnObject = {}

              Object.keys(input).map(function (key, index) {
                returnObject[key] = _(input[key])
                  .groupBy('date')
                  .mapValues((item) => {
                    return _.sumBy(item, 'timerTrackedTime') / 3600
                  })
                  .value()
              })

              returnObject = _(returnObject)
                .map((value, prop) => {
                  return {
                    name: prop,
                    data: weekSpread.map((date) => {
                      return value[date] || 0
                    }),
                  }
                })
                .value()
                .sort((a, b) => a['name'].localeCompare(b['name']))

              return returnObject
            }

            function generatePie(input) {
              var returnObject = {
                labels: [],
                series: [],
              }
              Object.keys(input)
                .sort()
                .map(function (key, index) {
                  returnObject['labels'].push(key)
                  returnObject['series'].push(
                    _.sumBy(input[key], 'timerTrackedTime') / 3600,
                  )
                })
              return returnObject
            }

            var weekTasks = tasks.filter((task) =>
              weekSpread.includes(task.date),
            )

            var categoryTasks = _(weekTasks)
              .groupBy('project.category.description')
              .value()

            statsBarCategory = generateBar(categoryTasks)
            statsPieCategory = generatePie(categoryTasks)

            var statsBarProject = {}
            var statsPieProject = {}

            Object.keys(categoryTasks).map(function (key, index) {
              projectTasks = _.groupBy(
                categoryTasks[key],
                'project.description',
              )

              statsBarProject[key] = generateBar(projectTasks)
              statsPieProject[key] = generatePie(projectTasks)
            })

            res.json({
              statsBarCategory,
              statsPieCategory,
              statsBarProject,
              statsPieProject,
            })
          })
      }
      if (period == 'weekly') {
        var startDate = req.query.startDate

        Task.find({ author: req.payload.id })
          .populate({
            path: 'project',
            populate: {
              path: 'category',
            },
          })
          .lean()
          .exec((err, tasks) => {
            function generateBar(input) {
              var returnObject = {}

              Object.keys(input).map(function (key, index) {
                returnObject[key] = _(input[key])
                  .groupBy('week')
                  .mapValues((item) => {
                    return _.sumBy(item, 'timerTrackedTime') / 3600
                  })
                  .value()
              })

              function weekSpread(startDate) {
                if (startDate != null) {
                  var weekFull = getWeekNumber(new Date(startDate))
                  var year = weekFull[0]
                  var weekNum = weekFull[1]
                  var weekStart = Math.max(0, weekNum - 7)
                  return [...Array(8).keys()]
                    .map((i) => i + weekStart)
                    .map((j) => `${year}W${j}`)
                } else {
                  return []
                }
              }

              returnObject = _(returnObject)
                .map((value, prop) => {
                  return {
                    name: prop,
                    data: weekSpread(startDate).map((date) => {
                      return value[date] || 0
                    }),
                  }
                })
                .value()
                .sort((a, b) => a['name'].localeCompare(b['name']))

              return returnObject
            }

            function generatePie(input) {
              var returnObject = {
                labels: [],
                series: [],
              }
              Object.keys(input)
                .sort()
                .map(function (key, index) {
                  returnObject['labels'].push(key)
                  returnObject['series'].push(
                    _.sumBy(input[key], 'timerTrackedTime') / 3600,
                  )
                })
              return returnObject
            }

            var weekTasks = tasks

            weekTasks.forEach((task) => {
              var weekFull = getWeekNumber(new Date(task['date']))
              var year = weekFull[0]
              var weekNum = weekFull[1]
              task['week'] = `${year}W${weekNum}`
            })

            console.log(weekTasks)

            var categoryTasks = _(weekTasks)
              .groupBy('project.category.description')
              .value()

            statsBarCategory = generateBar(categoryTasks)
            statsPieCategory = generatePie(categoryTasks)

            var statsBarProject = {}
            var statsPieProject = {}

            Object.keys(categoryTasks).map(function (key, index) {
              projectTasks = _.groupBy(
                categoryTasks[key],
                'project.description',
              )

              statsBarProject[key] = generateBar(projectTasks)
              statsPieProject[key] = generatePie(projectTasks)
            })

            res.json({
              statsBarCategory,
              statsPieCategory,
              statsBarProject,
              statsPieProject,
            })
          })
      }
    })
    .catch(next)
})

module.exports = router
