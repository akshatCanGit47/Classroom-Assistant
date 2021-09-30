const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.post('/Sign-up',usersController.signUp);
router.get('/Sign-in',usersController.signIn);
router.get('/home',usersController.usersHome);

module.exports = router;
