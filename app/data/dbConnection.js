'use strict';

var dbConnection = function() {

    var mongoose = require('mongoose');

    var getConnection = function() {
        var dbUrl = 'mongodb://127.0.0.1:2701/cs602Project';
        return mongoose.createConnection(dbUrl);
    };

    return {
        getConnection: getConnection
    }
};

module.exports = dbConnection;