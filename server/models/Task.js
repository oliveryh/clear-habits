var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    description: { type: String, required: [true, "can't be blank"] },
    complete: { type: Boolean, default: false },
    timerActive: { type: Boolean, default: false },
    timerStartedAt: { type: mongoose.Schema.Types.Date },
    timerTrackedTime: { type: mongoose.Schema.Types.Number, default: 0 },
    date: {
      type: String,
      default: new Date().toISOString().substring(0, 10),
      required: [true, "can't be blank"],
    },
    order: { type: mongoose.Schema.Types.Number, default: 0 },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  },
  { timestamps: true },
)

mongoose.model('Task', TaskSchema)
