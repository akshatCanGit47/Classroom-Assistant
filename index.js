const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

//setting up the view engine. We will be using ejs
app.set('view engine','ejs');
//joining the views folder and indexjs using pathjoin
app.set('views',path.join(__dirname,'views'));

//now we will use a middleware to parse the form data into request.body's data
app.use(express.urlencoded());

app.listen(port,function(err){
    if(err) { 
        console.log("error in running the server",err);
    }
    else {
        console.log("My server is running Dhoom machale");
    }
});