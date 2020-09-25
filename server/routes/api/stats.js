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

// list of all stats
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
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

          var weekTasks = tasks.filter((task) => weekSpread.includes(task.date))

          var categoryTasks = _(weekTasks)
            .groupBy('project.category.description')
            .value()

          statsBarCategory = generateBar(categoryTasks)
          statsPieCategory = generatePie(categoryTasks)

          var statsBarProject = {}
          var statsPieProject = {}

          Object.keys(categoryTasks).map(function (key, index) {
            projectTasks = _.groupBy(categoryTasks[key], 'project.description')

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
    })
    .catch(next)
})

module.exports = router
