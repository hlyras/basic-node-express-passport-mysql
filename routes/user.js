var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	};
	res.redirect('/user/login');
};

router.get('/', isLoggedIn, function(req, res){
	res.render('user/profile', { user: req.user });
});

router.get('/login', function(req, res){
	res.render('user/login', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/user/login',
	failureFlash: true 
}),(req, res) => {
	if (!req.body.remember) {
		req.session.cookie.maxAge = 1000 * 60 * 5;
	} else {
		req.session.cookie.expires = false;
	};
	res.redirect('/');
});

router.get('/signup', function(req, res){
	res.render('user/signup', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/user/signup',
	failureFlash: true 
}),(req, res) => {
	req.session.cookie.maxAge = 1000 * 60 * 5;
	res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;