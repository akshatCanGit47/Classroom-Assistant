//steps to create a route
//require express
const express = require('express');

//call router
const router = express.Router();

//require controller
const homeController = require('../controllers/home_controller');

//call the respective function
router.get('/',homeController.home);
router.post('Sign-up',homeController.signUp);
