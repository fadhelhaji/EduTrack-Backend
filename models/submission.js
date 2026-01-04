const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
  labName: {
    type: String,
    required: true,
  },

  githubUrl: {
    type: String,
    required: true,
  },

  deadline: {
    type: Date,
    default: Date.now,
  },

  grade: {
    type: String,
  },

  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  ],
});


const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;