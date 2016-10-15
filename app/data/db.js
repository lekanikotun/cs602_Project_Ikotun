'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function DBSchema() {

    const mongoose = require('mongoose');
    const dbUrl = 'mongodb://127.0.0.1:2701/cs602Project';
    const connection = mongoose.createConnection(dbUrl);

    var feedbackSchema = new Schema({
        name: String,
        title: String,
        message: String
    });

    function getModel() {
        return connection.model("feedbackModel", feedbackSchema);
    }

    return {
        getModel: getModel
    }

}


module.exports = DBSchema;