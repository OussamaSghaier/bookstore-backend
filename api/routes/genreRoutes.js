'use strict';

const routes = require('express').Router();
var genreManager = require('../controllers/genreController');


routes
    .get("/genres", function (req, res) {
        genreManager.getGenres(function (err, genres) {
            if (err) throw err;
            else res.json(genres);
        });
    })
    .post("/genres", function (req, res) {
        var genre = req.body;
        genreManager.addGenre(genre, function (err, genre) {
            if (err) throw err;
            else res.json(genre);
        });
    })
    .get("/genre/:_id", function (req, res) {
        genreManager.getGenres(function (err, genres) {
            if (err) throw err;
            else res.json(genres);
        });
    })
    .put("/genre/:_id", function (req, res) {
        var id = req.params._id;
        var genre = req.body;
        genreManager.updateGenre(id, genre, {}, function (err, genre) {
            if (err) throw err;
            else res.json(genre);
        });
    })
    .delete("/genre/:_id", function (req, res) {
        var id = req.params._id;
        genreManager.deleteGenre(id, function (err, genre) {
            if (err) throw err;
            else res.json(genre);
        });
    });

module.exports = routes;

