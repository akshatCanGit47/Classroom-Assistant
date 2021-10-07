//Require mongoose
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');


//Create a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // avatar: {
    //     type: String,
    //     required: false
    // },
    classrooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Classroom',
        }
    ]

},
    {
        timestamps: true
    }
);

// let storage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null,path.join(__dirname,'..',AVATAR_PATH))
//     },
//     filename: function(req,file,cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// //defining methods in schema
//  userSchema.statics.uploadedAvatar = multer({ storage: storage}).single('avatar');
//  userSchema.statics.avatarPath = AVATAR_PATH;

//Convert your schema to model
const User = mongoose.model('User',userSchema);

//export your model
module.exports = User;
