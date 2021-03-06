const express = require('express');
const passport = require('passport');
const { route } = require('.');
const router = express.Router();
const upload = require('../config/multer');
const usersController = require('../controllers/users_controller');

router.post('/Sign-up',usersController.signUp);
router.get('/home',usersController.usersHome);
router.post('/Create-Session',passport.authenticate(
    'local',
    {failureRedirect:'/home'},
), usersController.createSession);

router.get('/home',passport.checkAuthentication,usersController.usersHome);

router.get('/Sign-out', usersController.destroySession);

router.get('/create-classroom',passport.checkAuthentication,usersController.createClassroom);

router.post('/new-classroom',passport.checkAuthentication,usersController.newClassroom);

router.post('/join-classroom',passport.checkAuthentication,usersController.joinClassroom);
router.post('/change-avatar',upload.single('avatar'),usersController.changeAvatar);

router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/remove-avatar',usersController.removeAvatar);

// roruter.get('/changePassword',usersController.changePassword);
// router.get('/change-name-email',usersController.changeNameEmail);

router.use('/classroom',require('./classroom.js'));
module.exports = router;
