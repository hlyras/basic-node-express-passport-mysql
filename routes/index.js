var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if(req.user){
		return res.render('home', { user: req.user });
	};
	res.render('index');
});

router.use('/user', require('./user'));

module.exports = router;