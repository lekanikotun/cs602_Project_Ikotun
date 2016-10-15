'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name: String,
    title: String,
    message: String,
    created: {type: Date, default: Date.now }
});

const Feedback = mongoose.model("feedbackModel", feedbackSchema);

module.exports = {
    Feedback: Feedback
};