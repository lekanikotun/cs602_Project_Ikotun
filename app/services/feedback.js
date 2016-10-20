'use strict';

var Feedback = require('../models/feedback').Feedback;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var addFeedback = function(feedback) {

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

    return Feedback.find().sort( { created: -1 } ).then(data => {
        return data;
    }).catch(err => {
        console.log("Not able to find comments", err)
    });

}

var deleteFeedback = function(id) {

    return Feedback.remove({_id: id }).then(data => {
        console.log("successfully delelted record", data);
    }).catch(err => {
        console.log("Not able to find comments", err)
    });
};

module.exports = {
    addFeedback: addFeedback,
    getFeedback: getFeedback,
    deleteFeedback: deleteFeedback
};