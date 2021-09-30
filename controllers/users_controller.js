const User = require('../models/User.js');

module.exports.checkAuth = function(req,res){
    
    //Todo later
}

module.exports.signIn = function(req,res){
    
    //To do later
}

module.exports.signUp = function(req,res){

    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return}

    //     if (!user){
            User.create({
                name:req.body.name,
                email: req.body.email,
                password: req.body.password
            }, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/home');
            });
}


module.exports.usersHome = function(req,res){
   return res.render('users_home');
}