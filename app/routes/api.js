var express = require('express');
var router = express.Router();
var feedbackService = require('../services/feedback');
var restrict = require('../auth/restrict');

router.get('/api', restrict, function(req, res) {
    feedbackService.getFeedback().then(data => {
        res.json(data);
    });
});

router.post('/api', restrict, function(req, res) {

    var feedback = req.body;
    console.log(req.body);
    feedbackService.addFeedback(feedback).then(() => {
        feedbackService.getFeedback().then(data => {
            res.json(data);
        });
    }).catch(error => {
        res.send('An error occurred');
    });
});


router.delete('/api/:id', restrict, function(req, res) {
    feedbackService.deleteFeedback(req.params.id).then(() => {
        feedbackService.getFeedback().then(data => {
            res.json(data);
        });
    }).catch(error => {
        res.send('An error occurred');
    });
});



module.exports = router;
