const User = require('../models/User.js');
const path = require('path');
const Classroom = require('../models/Classroom');
const mongoose = require('mongoose');
const Announcement = require('../models/Announcement');

module.exports.openClassroom = function(req,res){
    console.log("classroom should be opening");
    console.log(req.query.id);
    var id = mongoose.Types.ObjectId(req.query.id);
    console.log(id);
    Classroom.findById(id,function(err,classroom){
        if(err){return console.log("Error in finding classroom");}
        if(classroom){
            console.log("classoom found");
            //console.log(classroom._id);
           return res.render("classroom",{
               classroom: classroom,
               title: 'classroom'
           });
        }
    });
}

module.exports.makeAnnouncement = function(req,res){
    var id = mongoose.Types.ObjectId(req.body.classroom_id);
    Classroom.findById(id,function(err,classroom){
        if(err){ console.log("Error in finding classroom :"+ err);}
        if(classroom){
            // console.log(typeof classroom.teacher.toString());
            // console.log(typeof req.user._id)
            console.log("logged in user id:"+req.user._id);
            console.log("classroom's teacher user id:"+classroom.teacher)
            if(classroom.teacher.toString() === req.user._id.toString()){
                Announcement.create({
                    content: req.body.content,
                    userType: 'Teacher',
                    announcementType: 'Announcement',
                    user: req.user._id
                },function(err,announcement){
                    if(err){console.log("Erro in creating a annonucemnet:"+err); return}
                    classroom.announcements.push(announcement);
                    classroom.save();
                    res.redirect('back');
                });
            }
            else{
                Announcement.create({
                    content: req.body.content,
                    userType: 'Student',
                    announcementType: 'class comment',
                    user: req.user._id
                },function(err,announcement){
                    if(err){console.log("Erro in creating a annonucemnet:"+err); return}
                    classroom.announcements.push(announcement);
                    classroom.save()
                    res.redirect('back');
                });
            }
        }
    });
}