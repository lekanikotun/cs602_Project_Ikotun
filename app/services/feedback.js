'use strict';

var Feedback = require('../models/feedback').Feedback;
var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

var addFeedback = function(feedback) {

    console.log("adding the following user to db", feedback);

    var newFeedback = new Feedback({
        name: feedback.name,
        title: feedback.title,
        message: feedback.message
    });

    return newFeedback.save().then(function(data) {
        console.log("Successfully added user", data);
        return JSON.stringify(data);
    }).catch(err => {
        console.log("Not able to add user", err)
    });
};

var getFeedback = function() {

    return Feedback.find({}).exec().then(data => {
        console.log("Found data", data);
        return data;
    }).catch(err => {
        console.log("Not able to add user", err)
    });

}

module.exports = {
    addFeedback: addFeedback,
    getFeedback: getFeedback
}

