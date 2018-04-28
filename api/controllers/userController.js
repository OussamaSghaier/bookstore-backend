'use strict';


var mongoose = require('mongoose');
var User = require("../../passport-auth/passport");



// Get Users
module.exports.getUsers = function(callback, limit ){
    User.find(callback).limit(limit);
};

//Get single User
module.exports.getUserById = function( _id, callback){
    User.findById(_id, callback);
};


//Add User
module.exports.addUser = function( req, ){
    const user = new User({

        firstname: req.firstname,
        lastname: req.lastname,
        username: req.username,
        email: req.email,
        password: req.password,
        contactnumber: req.contactnumber
    });

    return user.save();
};

//Update User
module.exports.updateUser = function( id, User){
    var query = { _id: id};
    var update = {
        firstname: User.firstname,
        lastname: User.lastname,
        username: User.username,
        email: User.email,
        password: User.password,
        contactnumber: User.contactnumber
    };
    return User.findOneAndUpdate(query, update).exec();
};


//Delete User
module.exports.deleteUser = function( id, callback){
    var query = { _id: id};
    User.remove(query, callback);
};


// modue.exports.User = User;