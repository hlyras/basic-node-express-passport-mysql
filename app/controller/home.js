const homeController = {
	index: (req, res) => {
		if(req.user){
			return res.render('home', { user: req.user });
		};
		res.render('index');
	},
	login: (req, res) => {
		res.render('user/login', { message: req.flash('loginMessage') });
	},
	signup: (req, res) => {
		res.render('user/signup', { message: req.flash('signupMessage') });
	},
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
}

module.exports = homeController;