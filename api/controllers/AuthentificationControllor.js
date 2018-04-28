const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Admin = require ('../models/Admin');


module.exports=function(app)
{
    app.post("/admin/login",function(req,res) {

        var query = {login: req.body.email};
        Admin.findOne(query, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(403).json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password !== req.body.pwd) {
                    res.status(403).json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    let token = jwt.sign(user.toJSON(), app.get('superSecret'), {
                        expiresIn: 60*60*24 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                    });
                }

            }

        });

    });

    // route middleware to verify a token
    app.use(function(req, res, next) {



        if(req.method==="GET")
        {
            next();
            return;
        }
        if(req.method ==="POST")
        {
            if (req.originalUrl==='/api/users' || req.originalUrl==='/api/signin')
            {
                next();
                return;
            }
        }


        if(req.method=="POST")
        {
            if(req.originalUrl=="/Prestataires")
            {
                next();
                return;
            }
            if(req.originalUrl=="/Demandeurs")
            {
                next();
                return;
            }
        }

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['authorization'];
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

};