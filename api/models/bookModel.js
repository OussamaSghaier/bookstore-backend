var mongoose = require('mongoose');


// Book Schema
const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    description: {type: String},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    image_url: {type: String},
    create_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Book', bookSchema);