const mongoose = require('mongoose');
const Assignment = require('./assignment');

const submissionSchema = mongoose.Schema({
  githubUrl: {
    type: String,
    required: true,
  },

  notes: {
    type: String
  },

  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  ],

  Grade:[
    {
      type:Number,
      required:true
    }
  ],
  assignment:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required:true
    }
  ]
});


const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;