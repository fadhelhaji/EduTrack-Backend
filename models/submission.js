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
    }
  ,

  grade:
    {
      type:Number,
      default:0,
    }
  ,
  assignment:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required:true
    }
  
}, { timestamps: true });

submissionSchema.index({ student: 1, assignment: 1 }, { unique: true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;