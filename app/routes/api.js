var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var feedbackService = require('../services/feedback');

router.get('/api', function(req, res) {

    feedbackService.getFeedback().then(data => {
        res.json(data);
    });
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api', function(req, res) {

    var feedback = req.body;
    feedbackService.addFeedback(feedback).then(() => {
        feedbackService.getFeedback().then(data => {
            res.json(data);
        });
    }).catch(error => {
        res.send('An error occurred');
    });
});


router.delete('/api/:id', function(req, res) {
    feedbackData.splice(req.params.id, 1);

    feedbackService.deleteFeedback(req.params.id).then(() => {
        feedbackService.getFeedback().then(data => {
            res.json(data);
        });
    }).catch(error => {
        res.send('An error occurred');
    });
});



module.exports = router;
