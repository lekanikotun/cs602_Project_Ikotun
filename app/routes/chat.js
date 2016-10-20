var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');

router.get('/chat', restrict, function(req, res) {

  res.render('chat', {
    pageTitle: 'Chat',
    pageID: 'chat'
  });

});

module.exports = router;
