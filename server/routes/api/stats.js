var mongoose = require('mongoose')
var router = require('express').Router()
var User = mongoose.model('User')
var Task = mongoose.model('Task')
var auth = require('../auth')
var _ = require('lodash')

// list of all stats
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .populate('tasks')
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
      Task.find({ author: req.payload.id }).exec((err, tasks) => {
        var tasksCompleted = tasks.filter((task) => task.complete)
        var aggSumTracked = _(tasks)
          .groupBy('date')
          .mapValues((item) => {
            return _.sumBy(item, 'timerTrackedTime') / 3600
          })
          .value()
        var aggCountComplete = _.countBy(tasksCompleted, 'date')
        res.json({ aggCountComplete, aggSumTracked })
      })
    })
    .catch(next)
})

module.exports = router
