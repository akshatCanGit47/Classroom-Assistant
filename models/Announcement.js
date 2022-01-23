const mongoose = require('mongoose');
const Comments = require('./Comments');

const announcementSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String
    },
    userType: {
        required: true,
        type: String
    },
    announcementType: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
},
{
    timestamps: true
});

//Convert your schema to model
const Announcement = mongoose.model('Announcement',announcementSchema);

//export your model
module.exports = Announcement;