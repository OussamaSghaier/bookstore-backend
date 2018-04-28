'use strict';


const routes = require('express').Router();
var userManager = require('../controllers/userController');


routes
    .get('/users', function (req, res) {
        userManager.getUsers(function (err, users) {
            if (err)
            {
                res.status(500).json({
                    error: err
                });
            }
            else res.status(200).json(users);
        });
    })
    .post('/users', function (req, res) {
        let user = req.body;
        userManager.addUser(user).then(result => {
            userManager.getUsers(function (err, users) {
                if (err)
                {
                    res.status(500).json({
                        error: err
                    });
                }
                else res.status(201).json({
                    message: 'Created user successfully',
                    data:users
                })
            });
    }).catch(err => {
            console.log(err);
        res.status(500).json({
            error: err
        });
    });
    })
    .get('/users/:_id', function (req, res) {
        userManager.getUserById(req.params._id, function (err, user) {
            if (err)
            {
                res.status(500).json({
                    error: err
                });
            }
            else res.json(user);
        });
    })
    .put('/users/:_id', function (req, res) {
        const id = req.params._id;
        const user = req.body;
        userManager.updateUser(id, user).then(result => {
            userManager.getUsers(function (err, users) {
                if (err)
                {
                    res.status(500).json({
                        error: err
                    });
                }
                else res.status(200).json({
                    message: 'user updated successfully',
                    data:users
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
    .delete('/users/:_id', function (req, res) {
        let id = req.params._id;
        userManager.deleteUser(id, function (err, result) {
            if (err)
            {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            }
            else {
                userManager.getUsers(function (err, users) {
                    if (err)
                    {
                        res.status(500).json({
                            error: err
                        });
                    }
                    else res.status(200).json({
                        message: 'User deleted',
                        data:users
                    })
                });

            }
        });
    });

module.exports = routes;
