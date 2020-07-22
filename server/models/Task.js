var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    description: { type: String, required: [true, "can't be blank"] },
    complete: { type: Boolean, default: false },
  },
  { timestamps: true },
)

mongoose.model('Task', TaskSchema)
