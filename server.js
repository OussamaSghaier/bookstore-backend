var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    book = require('./api/models/bookModel'), //created model loading here
    genre= require('./api/models/genreModel'),//created model loading here
    bodyParser = require('body-parser');

const env = require('env2')('config.env');


//connecting to mongoDB
mongoose.connect(process.env.DB_URI);
mongoose.connection.on('connected', function () {
    console.log('Mongoose Connection opened:\n' + process.env.DB_URI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose Connection error:\n' + err);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, accept, origin, authorization, x-csrftoken');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    // Pass to next layer of middleware
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});


/*--------------------Authentification------------------------------*/

app.set('superSecret', process.env.secret); // secret variable
require('./api/controllers/AuthentificationControllor')(app);

/*--------------------Authentification------------------------------*/


var routes = require('./api/routes'); //importing route
app.use("/api/",routes);





//AUTHENTIFICATION = passport
//**************************************
// require('./passport-auth/passport');
// const auth = require('./api/routes/auth');
// app.use('/auth', auth);

var User = require("./api/models/userModel");

var passport = require('passport');
app.use(passport.initialize());
var passport = require('passport');
var jwt = require('jsonwebtoken');
routes.post('/signin', function(req, res) {

    console.log('hheeeelloooo');
    console.log(req.body.username);

    User.findOne({
        'username': req.body.username
    }, function(err, user) {
        if (err) throw err;

        console.log('found : ', user);

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
                if (req.body.password == user.password && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), 'meansecure');
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
        }
    });
});





//***************************************








app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' resource not found'})
});

// Turn on that server!
app.listen(port, () => {
    console.log('App listening on port 3000');
});
