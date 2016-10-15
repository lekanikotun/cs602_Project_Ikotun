var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var feedbackData = require('../data/feedback.json');
var feedbackService = require('../services/feedback');

router.get('/api', function(req, res) {

    feedbackService.getFeedback().then(data => {
        res.json(data);
    });
    // res.json

    // res.json(feedbackData);
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api', function(req, res) {

   /* var feedback = req.body;
    feedbackService.addFeedback(feedback).then(data => {
        feedbackService.getFeedback().then(data => {
            res.json(data);
        });
    });*/
    feedbackData.unshift(req.body);
    fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(feedbackData);
});


router.delete('/api/:id', function(req, res) {
    feedbackData.splice(req.params.id, 1);
    fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(feedbackData);
});



module.exports = router;
