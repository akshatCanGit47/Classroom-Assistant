const mongoose = require('mongoose');

//connect to the base
mongoose.connect("mongodb://localhost/[yourDbName]");


//acquire the connection (to check if its successful)
const db = mongoose.connection;


//error checking
db.on('error',console.error.bind(console,'error connecting to db'));


//if database up and running then console out the message
db.once('open',function(){
    console.log('successfully connected to the database');
});

module.exports = db;