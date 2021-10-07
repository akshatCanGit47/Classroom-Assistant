const User = require('../models/User.js');
const path = require('path');
module.exports.checkAuth = function(req,res){
    
    //Todo later
}

module.exports.signIn = function(req,res){
    
    //To do later
}

module.exports.signUp = function(req, res){
    console.log(req.body);

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
                User.create({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email
                    //avatar: User.avatarPath +'/' + req.file.filename
                }, function(err, user){
                    if(err){console.log('error in creating user while signing up'); return}

                    return res.redirect('/home');
                })
            

        }
        else {
            console.log("Cannot sign in: user already present");
            res.redirect('back');
        }

    });
}


module.exports.usersHome = function(req,res){
    if(req.isAuthenticated())
    return res.render('users_home');
    else
    return res.redirect('/home'); 
}

module.exports.createSession = function(req,res){
   return res.redirect('/users/home');
}

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/home');
}