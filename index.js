const express = require('express');

const path = require('path');
const port = 8000;

const app = express();
const cookieParser = require('cookie-parser');
const db = require("./config/mongoose.js");
const User = require('./models/User.js');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo');

//now we will use a middleware to parse the form data into request.body's data
app.use(express.urlencoded({ extended: true }));

//using a cookie parser
app.use(cookieParser());

//middleware to use static files.
app.use(express.static('assets'));
//make the upload paths available
app.use('/uploads',express.static(__dirname + '/uploads'));


//setting up the view engine. We will be using ejs
app.set('view engine','ejs');
//joining the views folder and indexjs using pathjoin
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name: 'Classroom-Assistant',
    // Deployment se pehle change krdo onida
    secret: 'Akshatkumar',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:"mongodb://localhost/[yourDbName]",
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use routes
app.use('/',require('./routes'));


//Telling the express to listen requests on port and a callback error function.
app.listen(port,function(err){
    if(err) { 
        console.log("error in running the server",err);
    }
    else {
        console.log("My server is running Dhoom machale");
    }
});