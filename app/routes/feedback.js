var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');

router.get('/feedback', restrict, function(req, res) {

  res.render('feedback', {
    pageTitle: 'Feedback',
    pageID: 'feedback'
  });

});

module.exports = router;
