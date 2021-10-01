const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.post('/Sign-up',usersController.signUp);
router.get('/home',usersController.usersHome);
router.post('/Create-Session',passport.authenticate(
    'local',
    {failureRedirect:'/home'},
), usersController.createSession);

module.exports = router;
