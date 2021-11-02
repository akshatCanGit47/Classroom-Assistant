//Require mongoose
const mongoose = require('mongoose');
const Classroom = require('./Classroom');


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
    avatar: {
        type: String
    },
    classrooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Classroom'
        }
    ]

},
    {
        timestamps: true
    }
);



//defining methods in schema
//  uuserSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
//  userSchema.statics.avatarPath = AVATAR_PATH;
 

//Convert your schema to model
const User = mongoose.model('User',userSchema);

//export your model
module.exports = User;
