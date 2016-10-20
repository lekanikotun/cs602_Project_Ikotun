'use strict';

const User = require('../models/user-model').User;
const userSchema = require('../models/user-model').userSchema;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var addUser = function(user, next) {    
    console.log("I am here", user);
    bcrypt.hash(user.password, 10, function(err, hash) {

        if (err) {
            return next(err);
        }
        user.password = hash;
        var newUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email.toLowerCase(),
            password: user.password
        });
        newUser.save(function(err) {
            if (err) {
                return next(err);
            }
            next(null);
        });
    });
};

/*
    return new Promise(function(resolve, reject) {

        findUser(user.email).then(function(user) {
            if (user) {
                reject('That email is already in use.');
            }
        }).then(() => {

            bcrypt.hash(user.password, 10, function (err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            }).then(hash => {
                user.password = hash;

                var newUser = new User({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    email: user.email.toLowerCase(),
                    password: user.password
                });

                return newUser.save().then(function (data) {
                    console.log("Successfully added user", data);
                    return JSON.stringify(data);
                }).catch(err => {
                    console.log("Not able to add user", err);
                });
            });
        });
    });
};*/

var _findUser = function(email, next) {
    User.findOne({email: email.toLowerCase()}, function(err, user) {
        next(err, user);
    });
};

var findUser = function(email) {
    userSchema.path('email').validate(function(email, next) {
        _findUser(email, function(err, user) {
            if (err) {
                console.log(err);
                return next(false);
            }
            next(!user);
        });
    }, 'That email is already in use.');
};

module.exports = {
    addUser: addUser,
    findUser: findUser
};