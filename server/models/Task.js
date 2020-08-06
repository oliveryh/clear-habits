var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    description: { type: String, required: [true, "can't be blank"] },
    complete: { type: Boolean, default: false },
    timerActive: { type: Boolean, default: false },
    timerStartedAt: { type: mongoose.Schema.Types.Date },
    timerTrackedTime: { type: mongoose.Schema.Types.Number, default: 0 },
  },
  { timestamps: true },
)

mongoose.model('Task', TaskSchema)
