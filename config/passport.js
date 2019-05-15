var passport = require('passport');
var dbconfig = require('./database');
var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM users WHERE id = '"+id+"';", function(err, rows){
        done(err, rows[0]);
    });
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        connection.query("SELECT * FROM users WHERE username = '"+username+"'", function(err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'This user has already been taken.'));
            } else {
                var newUserMysql = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                };

                var insertQuery = "INSERT INTO users ( username, password ) values ('"+newUserMysql.username+"', '"+newUserMysql.password+"')";

                connection.query(insertQuery ,function(err, rows) {
                    newUserMysql.id = rows.insertId;

                    return done(null, newUserMysql);
                });
            }
        });
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        connection.query("SELECT * FROM users WHERE username = '"+username+"'", function(err, rows){
            if (err){return done(err)};

            if (!rows.length){return done(null, false, req.flash('loginMessage', 'user not found.'))};

            if (!bcrypt.compareSync(password, rows[0].password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            };

            return done(null, rows[0]);
        });
    })
);

module.exports = passport;