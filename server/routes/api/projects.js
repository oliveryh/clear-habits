var mongoose = require('mongoose')
var router = require('express').Router()
var User = mongoose.model('User')
var Project = mongoose.model('Project')
var auth = require('../auth')

// preload project objects on routes with :project
router.param('project', function (req, res, next, id) {
  Project.findById(id)
    .then(function (project) {
      if (!project) {
        return res.sendStatus(404)
      }
      req.project = project

      return next()
    })
    .catch(next)
})

// list of all categories
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
      Project.find({ author: req.payload.id })
        .populate('category')
        .exec((err, categories) => {
          res.json(categories)
        })
    })
    .catch(next)
})

// create a project
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
      var project = new Project(req.body)
      project.author = user
      return project
        .save()
        .then((t) => t.populate('category').execPopulate())
        .then(function () {
          return res.json(project)
        })
    })
    .catch(next)
})

// update a project
router.put('/:project', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }

      // authorized if user is author of project
      if (req.project.author._id.toString() === req.payload.id.toString()) {
        Object.assign(req.project, req.body)

        req.project
          .save()
          .then((t) => t.populate('category').execPopulate())
          .then(function (project) {
            return res.json(project)
          })
          .catch(next)
      } else {
        return res.sendStatus(401)
      }
    })
    .catch(next)
})

// delete a project
router.delete('/:project', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401)
    }

    // authorized if user is author of project
    if (req.project.author._id.toString() === req.payload.id.toString()) {
      return req.project.remove().then(function () {
        return res.sendStatus(204)
      })
    } else {
      return res.sendStatus(401)
    }
  })
})

module.exports = router
