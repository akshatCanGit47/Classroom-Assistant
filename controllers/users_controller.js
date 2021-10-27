const User = require('../models/User.js');
const path = require('path');
const Classroom = require('../models/Classroom');
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
                    users: user
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

// module.exports.joinClassroomDetails = function(req,res){
//     res.render('join_classroom',
//     {
//         layout: false ,
//         title: 'Join Classroom'
//     });
// }

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