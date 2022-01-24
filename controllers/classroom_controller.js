const User = require('../models/User.js');
const path = require('path');
const Classroom = require('../models/Classroom');
const mongoose = require('mongoose');
const Announcement = require('../models/Announcement');
const Comments = require("../models/Comments"); 
const announcementMailer = require('../mailers/announcements_mailer');

module.exports.openClassroom = function(req,res){
    // console.log("classroom should be opening");
    //console.log(req.query.id);
    var id = mongoose.Types.ObjectId(req.query.id);
    console.log(id);
    Classroom.findOne({_id:id})
    .populate({
        path: 'announcements',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'comments',
            populate:{
                path: 'user'
            }
        }
    })
    .exec(function(err,classroom){
        return res.render('classroom',{
            title: 'classroom',
            classroom: classroom
        });
    });
}

module.exports.makeAnnouncement =  function(req,res){
    var id = mongoose.Types.ObjectId(req.body.classroom_id);
    Classroom.findById(id,function(err,classroom){
        if(err){ console.log("Error in finding classroom :"+ err);}
        if(classroom){
            // console.log(typeof classroom.teacher.toString());
            // console.log(typeof req.user._id)
            console.log("logged in user id:"+req.user._id);
            console.log("classroom's teacher user id:"+classroom.teacher)
            if(classroom.teacher == req.user.id){
                Announcement.create({
                    content: req.body.content,
                    userType: 'Teacher',
                    announcementType: 'Announcement',
                    user: req.user._id
                },function(err,announcement){
                    if(err){console.log("Erro in creating a annonucemnet:"+err); return}
                    classroom.announcements.unshift(announcement);
                    classroom.save();
                    res.redirect('back');
                }); 
                // classroom = Classroom.populate('announcements','students');
                announcementMailer.newAnnouncement(classroom)
            }
          
        }
    });
}


module.exports.deleteAnnouncement = function(req,res){
    var classroomId = mongoose.Types.ObjectId(req.query.classroom_id);
    var announcementId = mongoose.Types.ObjectId(req.query.announcement_id);
    Classroom.findById(classroomId,function(err,classroom){
        if(err){ console.log("Error in finding classroom"); return}
        //console.log(req.user.id+" "+classroom.teacher +(req.user.id==classroom.teacher));
        if(req.user.id == classroom.teacher){
            Announcement.findById(announcementId,function(err,announcement){
                if(err){ console.log("error in finding anouncement to delete"); return}
                announcement.remove();
            });
        return res.redirect('back');
        }
        console.log("User not authorized to delete the announcement");
        res.redirect('back');
        
    });
}

module.exports.makeComments = function(req,res){
    
   Classroom.findById(req.body.classroom_id)
   .populate({
    path: 'students'
    })
    .exec(function(err,classroom){
        if(err){
            console.log("Error in finding the classroom");
        }
        if(classroom){
        console.log(classroom.teacher.toString() === req.user.id );
        students = classroom.students;
        if(students.find((s) => s._id.toString() === req.user.id) || classroom.teacher.toString() === req.user.id){
            Announcement.findById(req.body.announcement_id,function(err,announcement){
                if(err){
                    console.log("Error in finding announcement");
                }
                if(announcement){
                    Comments.create({
                        content: req.body.comments,
                        user: mongoose.Types.ObjectId(req.user.id),
                        announcement: mongoose.Types.ObjectId(req.body.announcement_id)
                    },function(err,comment){
                        announcement.comments.unshift(comment);
                        console.log(comment);
                        announcement.save();
                    });
                }
            });

        }
    }
    
   res.redirect('back');
   });
}
