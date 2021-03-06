//require the passport
const passport = require('passport');

//require the local strategy
const LocalStrategy = require('passport-local').Strategy;

//require the schema's model
const User = require('../models/User');

//authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email,password,done){
        //find a user establish the identity
        User.findOne({email: email},function(err,user){
            if(err){
                console.log('Error in finding user -->Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        
        return done(null, user);
    });
});


//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/home');
}

//now we will set the authenticated user's details in locals to be used in views
passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}
 
module.exports = passport;