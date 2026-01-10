const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    enum: ['SEB', 'UI-UX', 'Java', 'DS', 'DA'],
    required: true,
  },
  schedule: {
    type: String,
    enum: ['Full-time', 'Part-time'],
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
});

const Class = mongoose.model('Class', classSchema);
 
module.exports = Class;