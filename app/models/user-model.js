'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: 'Please enter your first name.'},
    lastName: {type: String, required: 'Please enter your last name.'},
    role: {type: String, required: 'Please enter your role'},
    email: {type: String, required: 'Please enter your email.'},
    password: {type: String, required: 'Please enter your password.'},
    created: { type: Date, default: Date.now }
});


var User = mongoose.model('User', userSchema);

module.exports = {
    User: User,
    userSchema: userSchema
};