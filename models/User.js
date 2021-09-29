//Require mongoose
const mongoose = require('mongoose');


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
    }
});


//Conver your schema to model
const User = mongoose.model('User',userSchema);

//export your model
module.exports = User;
