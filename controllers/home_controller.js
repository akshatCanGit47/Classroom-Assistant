const User = require('../models/User.js');


module.exports.home = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    return res.render('home',{ layout: false });
}


