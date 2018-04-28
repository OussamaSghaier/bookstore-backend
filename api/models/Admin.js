var mongoose = require('mongoose');


const AdminSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true,
    },
    password: String,
});


module.exports =  mongoose.model('Admin',AdminSchema);