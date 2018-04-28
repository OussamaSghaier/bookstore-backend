var mongoose = require('mongoose');


// User Schema
var userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contactnumber: { type: Number, required: true },

});

module.exports = mongoose.model('User', userSchema);