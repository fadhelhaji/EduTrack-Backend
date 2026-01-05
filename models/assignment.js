const mongoose = require('mongoose')
const {model, Schema} = mongoose //?

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
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Classes',
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId, // this line is basiclly when a user is created it has his own id from the data base so it needs it to connect data as join in SQL
        ref: 'User',
        required: true,
    },
    

}, 
{timestamps: true}
);

const Assignment = model('Assignment', assignmentSchema)


module.exports = Assignment

