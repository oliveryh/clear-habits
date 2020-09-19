var mongoose = require('mongoose')
var router = require('express').Router()
var User = mongoose.model('User')
var Category = mongoose.model('Category')
var auth = require('../auth')

// preload category objects on routes with :category
router.param('category', function (req, res, next, id) {
  Category.findById(id)
    .then(function (category) {
      if (!category) {
        return res.sendStatus(404)
      }
      req.category = category

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
      Category.find({ author: req.payload.id }).exec((err, categories) => {
        res.json(categories)
      })
    })
    .catch(next)
})

// create a category
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }
      var category = new Category(req.body)
      category.author = user
      return category.save().then(function () {
        return res.json(category)
      })
    })
    .catch(next)
})

// update a category
router.put('/:category', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }

      // authorized if user is author of category
      if (req.category.author._id.toString() === req.payload.id.toString()) {
        if (typeof req.body.description !== 'undefined') {
          req.category.description = req.body.description
        }

        if (typeof req.body.color !== 'undefined') {
          req.category.color = req.body.color
        }

        req.category
          .save()
          .then(function (category) {
            return res.json(category)
          })
          .catch(next)
      } else {
        return res.sendStatus(401)
      }
    })
    .catch(next)
})

// delete a category
router.delete('/:category', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401)
    }

    // authorized if user is author of category
    if (req.category.author._id.toString() === req.payload.id.toString()) {
      return req.category.remove().then(function () {
        return res.sendStatus(204)
      })
    } else {
      return res.sendStatus(401)
    }
  })
})

module.exports = router
