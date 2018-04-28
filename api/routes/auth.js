//  ./api/routes/auth.js
const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
require("../../passport-auth/passport");
// var  passport = require("passport");

/* POST login. */
router.post('/login', function (req, res, next) {

    // var user=req.body;
    var error=false;

    passport.authenticate('local', {session: false}, (err, user, info) => {

        // console.log(user);
        // console.log(err);
        //user=req.body;

        console.log(user);

        if (err || !user) {
            error=true;
            console.log(user);
            console.log(err);
            console.log('Something is not right');

            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                eroor=true;
                console.log('error');
                return res.send(err);
            }

            if(!error)
            {
                console.log('good!');
                console.log(user);
                // generate a signed son web token with the contents of user object and return it in the response
                const token = jwt.sign(user, 'your_jwt_secret');
                return res.json({user, token});
            }
        });
    })(req, res);
});

module.exports = router;