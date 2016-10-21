'use strict';

const User = require('../models/user-model').User;
const userSchema = require('../models/user-model').userSchema;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var addUser = function(user, next) {
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
            password: hash
        });
        newUser.save(function(err) {
            if (err) {
                return next(err);
            }
            next(null);
        });
    });
};


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