const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const userController = require('../app/controller/user');

router.get('/', userController.verify, userController.index);

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/user/login',
	failureFlash: true
}), userController.login);

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/user/signup',
	failureFlash: true 
}), userController.signup);

module.exports = router;