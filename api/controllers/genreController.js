'use strict';


var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');

// Get Genre
module.exports.getGenres = function( callback, limit ){
    Genre.find(callback).limit(limit);
};

//Add Genre
module.exports.addGenre = function( genre, callback){
    Genre.create(genre, callback);
};

//Update Genre
module.exports.updateGenre = function( id, genre, options, callback){
    var query = { _id: id};
    var update = {
        name: genre.name
    };
    Genre.findOneAndUpdate(query, update, options, callback);
};


// Delete Genre
module.exports.deleteGenre = function( id, callback){
    var query = { _id: id};
    Genre.remove(query, callback);
};

