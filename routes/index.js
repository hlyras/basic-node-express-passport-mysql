var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res) {
	if(req.user){
		return res.render('home', { user: req.user });
	};
	res.render('index');
});

router.use('/user', require('./user'));

router.get('/login', function(req, res){
	res.render('login', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', { 
  	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true })
);

router.get('/signup', function(req, res){
	res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', { 
  	successRedirect: '/',
	failureRedirect: '/signup',
	failureFlash: true })
);

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;