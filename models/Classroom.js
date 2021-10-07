const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: String,
        required: true
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

});

//Convert your schema to model
const Classroom = mongoose.model('Classroom',classSchema);

//export your model
module.exports = Classroom;
