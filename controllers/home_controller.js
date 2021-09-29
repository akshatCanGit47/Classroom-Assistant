module.exports.home = function(req,res){

    return res.render('home');
}

module.exports.signUp = function(req,res){
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },function(err,newUser){
        if(err){
            console.log("Error in creeating contact");
            return;
        }
        console.log("Contact\n",newUser);
        return res.render('user_home.ejs');
    });
});
