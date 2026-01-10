const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  githubUrl: {
    type: String,
    required: true,
  },
  notes: {
    type: String
  },
  student: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  assignment:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required:true
    },
  class:
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
  }, 
    grade: {
    type: Number, 
    default: null,
    min: 0,
    max: 100,
  },
  feedback: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Graded', 'Incomplete'],
    default: 'Pending'
  }
}, { timestamps: true });

submissionSchema.index({ student: 1, assignment: 1 }, { unique: true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;