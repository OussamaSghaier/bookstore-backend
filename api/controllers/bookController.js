'use strict';


var mongoose = require('mongoose');
var Book = require("../models/bookModel");


// Get Books
module.exports.getBooks = function( callback, limit ){
    Book.find(callback).limit(limit);
};

//Get single book
module.exports.getBookById = function( _id, callback){
    Book.findById(_id, callback);
};


//Add book
module.exports.addBook = function( req, ){
    const book = new Book({
        title: req.title,
        genre: req.genre,
        description: req.description,
        author: req.author,
        price: req.price,
        image_url: req.image_url
    });

    return book.save();
};

//Update Book
module.exports.updateBook = function( id, book){
    var query = { _id: id};
    var update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url,
        buy_url: book.buy_url
    };
    return Book.findOneAndUpdate(query, update).exec();
};


//Delete book
module.exports.deleteBook = function( id, callback){
    var query = { _id: id};
    Book.remove(query, callback);
};