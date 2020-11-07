var mongoose = require('mongoose')

function colorValidator(v) {
  if (v.indexOf('#') == 0) {
    if (v.length == 7) {
      // #f0f0f0
      return true
    } else if (v.length == 4) {
      // #fff
      return true
    }
  }
  return false
}

var CategorySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    description: { type: String, required: [true, "can't be blank"] },
    color: { type: String, validate: [colorValidator, 'not a valid color'] },
  },
  { timestamps: true },
)

mongoose.model('Category', CategorySchema)
