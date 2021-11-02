const User = require('../models/User.js');
const path = require('path');
const Classroom = require('../models/Classroom');
const mongoose = require('mongoose');
const { join } = require('path');
const fs = require('fs');
const upload = require('../config/multer.js');
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
                    avatar: "/images/profile.jpg",
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
    var profileLink = "/users/profile/?id="+ req.user.id;
    if(req.isAuthenticated()){
        User.findOne({_id:req.user._id})
        .populate({
            path: 'classrooms',
            populate: {
                path: 'teacher'
            }
        }).exec(function(err,user){
                return res.render('users_home',{
                    title: "Users Home",
                    users: user,
                    link: profileLink
                });
        });
        
    }
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

module.exports.createClassroom = function(req,res){
    res.render('create_classroom',{
        title:"Create clasroom"
    });
}

module.exports.newClassroom = function(req,res){
    // console.log(res.user);
    User.findById(req.user._id,function(err,user){
        if(user){
            Classroom.create({
                subject: req.body.subject,
                teacher: req.user._id,
                title: req.body.title,
                section: req.body.section,
                description: req.body.description,
                grade: req.body.grade

            },
            function(err, classroom){
                if(err){console.log('error in creating classroom'); return}
                
                user.classrooms.push(classroom);
                user.save();
                return res.redirect("/users/home");
            })
        }
    }); 
}

module.exports.joinClassroomDetails = function(req,res){
    res.render('join_classroom',
    {
        title: 'Join Classroom'
    });
}

module.exports.joinClassroom = function(req,res){
    Classroom.findById(req.body.classroom_id, function(err,classroom){
        if(err){console.log("Error in finding classroom from the form");}
        if(classroom){
            classroom.students.push(req.user._id);
            User.findById(req.user._id,function(err,user){
                if(err){ console.log("Error in finding user while joining classroom");}
                if(user){
                    user.classrooms.push(req.body.classroom_id);
                    user.save();
                }
            });
            classroom.save();
            res.redirect('/users/home');
        }
    });
}
module.exports.profile = function(req,res){
    var profileLink = "/users/profile/?id="+req.user.id;
    res.render('profile',{
        title: "profile",
        link: profileLink
    });
}

module.exports.changeAvatar = function(req,res){
    User.findById(req.user.id,function(err,user){
        if(err){console.log("Error in finding user in updating the avatar"); return}
        console.log(user.avatar+" "+path.join("uploads/users/avatars","/",req.file.filename));
        if(user.avatar == "/images/profile.jpg"){
            user.avatar = path.join("/uploads/users/avatars","/",req.file.filename);
            user.save();
            res.redirect('/users/profile');
        }
        else {
           fs.unlinkSync(path.join(__dirname,"..",user.avatar));
           user.avatar = path.join("/uploads/users/avatars","/",req.file.filename);
           user.save();
           res.redirect('/users/profile');
        }
    });
    
}

module.exports.removeAvatar = function(req,res){
    
}