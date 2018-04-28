//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var User = require("../api/models/userModel");

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({'local.username':username, 'local.password':password})
            .then(user => {

                console.log(user);

                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch(err => cb(err));
    }
));

module.exports = User;