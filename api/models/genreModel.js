var mongoose = require('mongoose');


// Genre Schema

const genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Genre', genreSchema);