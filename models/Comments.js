const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    announcement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement"
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
