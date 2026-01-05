const mongoose = require('mongoose')
const {model, Schema} = mongoose

const assignmentSchema = new Schema({
    labName: {
        type: String
    },

    deadline: {
        type: Date
    },
    grade: {
        type: Number
    },
    
    instructor: {
        type: mongoose.Schema.Types.ObjectId, // this line is basiclly when a user is created it has his own id from the data base so it needs it to connect data as join in SQL
        ref: 'User',
    },
    

})

const Assignment = model('Assignment', assignmentSchema)


module.exports = Assignment