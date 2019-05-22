const userController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	verify: (req, res, next) => {
		if (req.isAuthenticated()){ return next() };
		res.redirect('/user/login');
	},
	login: (req, res) => {
		req.session.cookie.maxAge = 1000 * 60 * 5;
		res.redirect('/');
	},
	signup: (req, res) => {
		req.session.cookie.maxAge = 1000 * 60 * 5;
		res.redirect('/');
	}
};

module.exports = userController;