const express = require('express');
const passport = require('passport');
const { route } = require('.');
const router = express.Router();

const classroomController = require('../controllers/classroom_controller');

router.get('/',passport.checkAuthentication,classroomController.openClassroom);
router.post('/make-announcement',classroomController.makeAnnouncement);

module.exports = router;
