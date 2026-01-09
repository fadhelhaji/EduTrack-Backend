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
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submission: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission',
            unique: true,
            partialFilterExpression: { submission: { $ne: null } }
        }
    ,
    class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class', //ref was wrong
    }
    

}, 
{timestamps: true}
);

const Assignment = model('Assignment', assignmentSchema)


module.exports = Assignment


