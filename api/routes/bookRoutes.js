'use strict';


const routes = require('express').Router();
var bookManager = require('../controllers/bookController');


routes
    .get('/books', function (req, res) {
        bookManager.getBooks(function (err, books) {
            if (err)
            {
                res.status(500).json({
                    error: err
                });
            }
            else res.status(200).json(books);
        });
    })
    .post('/books', function (req, res) {
        let book = req.body;
        bookManager.addBook(book).then(result => {
            bookManager.getBooks(function (err, books) {
                if (err)
                {
                    res.status(500).json({
                        error: err
                    });
                }
                else res.status(201).json({
                    message: 'Created book successfully',
                    data:books
                })
            });
    }).catch(err => {
            console.log(err);
        res.status(500).json({
            error: err
        });
    });
    })
    .get('/books/:_id', function (req, res) {
        bookManager.getBookById(req.params._id, function (err, book) {
            if (err)
            {
                res.status(500).json({
                    error: err
                });
            }
            else res.json(book);
        });
    })
    .put('/books/:_id', function (req, res) {
        const id = req.params._id;
        const book = req.body;
        bookManager.updateBook(id, book).then(result => {
            bookManager.getBooks(function (err, books) {
                if (err)
                {
                    res.status(500).json({
                        error: err
                    });
                }
                else res.status(200).json({
                    message: 'book updated successfully',
                    data:books
                })
            });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    })
    .delete('/books/:_id', function (req, res) {
        let id = req.params._id;
        bookManager.deleteBook(id, function (err, result) {
            if (err)
            {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            }
            else {
                bookManager.getBooks(function (err, books) {
                    if (err)
                    {
                        res.status(500).json({
                            error: err
                        });
                    }
                    else res.status(200).json({
                        message: 'Book deleted',
                        data:books
                    })
                });

            }
        });
    });

module.exports = routes;
