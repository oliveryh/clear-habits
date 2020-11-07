var mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      index: true,
    },
    description: { type: String, required: [true, "can't be blank"] },
  },
  { timestamps: true },
)

mongoose.model('Project', ProjectSchema)
