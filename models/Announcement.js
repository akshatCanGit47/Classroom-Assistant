const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String
    },
    userType: {
        required: true,
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
});

//Convert your schema to model
const Announcement = mongoose.model('Announcement',announcementSchema);

//export your model
module.exports = Announcement;