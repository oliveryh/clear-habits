var mongoose = require('mongoose')
var router = require('express').Router()
var User = mongoose.model('User')
var Task = mongoose.model('Task')
var auth = require('../auth')

// preload task objects on routes with :task
router.param('task', function (req, res, next, id) {
  Task.findById(id)
    .populate('author')
    .then(function (task) {
      if (!task) {
        return res.sendStatus(404)
      }

      req.task = task

      return next()
    })
    .catch(next)
})

// list of all tasks
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .populate('tasks')
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
      Task.find({ author: req.payload.id }).exec((err, tasks) => {
        res.json(tasks)
      })
    })
    .catch(next)
})

// create a task
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
      var task = new Task(req.body)
      task.author = user
      return task.save().then(function () {
        return res.json(task)
      })
    })
    .catch(next)
})

// update a task
router.put('/:task', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }

      // authorized if user is author of task
      if (req.task.author._id.toString() === req.payload.id.toString()) {
        if (typeof req.body.complete !== 'undefined') {
          req.task.complete = req.body.complete
        }

        if (typeof req.body.description !== 'undefined') {
          req.task.description = req.body.description
        }

        req.task
          .save()
          .then(function (task) {
            return res.json(task)
          })
          .catch(next)
      } else {
        return res.sendStatus(401)
      }
    })
    .catch(next)
})

router.put('/:task/start', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }

      // authorized if user is author of task
      if (req.task.author._id.toString() === req.payload.id.toString()) {
        if (!req.task.timerActive) {
          req.task.timerActive = true
          req.task.timerStartedAt = Date.now()
        }

        req.task
          .save()
          .then(function (task) {
            return res.json(task)
          })
          .catch(next)
      } else {
        return res.sendStatus(401)
      }
    })
    .catch(next)
})

router.put('/:task/stop', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }

      // authorized if user is author of task
      if (req.task.author._id.toString() === req.payload.id.toString()) {
        if (req.task.timerActive) {
          numSeconds = parseInt((Date.now() - req.task.timerStartedAt) / 1000)

          console.log(numSeconds)

          req.task.timerActive = false
          req.task.timerTrackedTime += numSeconds
          req.task.timerStartedAt = null
        }

        req.task
          .save()
          .then(function (task) {
            return res.json(task)
          })
          .catch(next)
      } else {
        return res.sendStatus(401)
      }
    })
    .catch(next)
})

// delete a task
router.delete('/:task', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401)
    }

    // authorized if user is author of task
    if (req.task.author._id.toString() === req.payload.id.toString()) {
      return req.task.remove().then(function () {
        return res.sendStatus(204)
      })
    } else {
      return res.sendStatus(401)
    }
  })
})

module.exports = router
