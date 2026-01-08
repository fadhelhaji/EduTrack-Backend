const mongoose = require('mongoose')
const {model, Schema} = mongoose 

const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    totalGrade: {
        type: Number,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    submission: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission',
            unique: true
        }
    ,
    class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
    }
    

}, 
{timestamps: true}
);

const Assignment = model('Assignment', assignmentSchema)


module.exports = Assignment


