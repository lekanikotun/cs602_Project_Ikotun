var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');

router.get('/signup', function(req, res) {

    res.render('signup', {
        pageTitle: 'Sign Up For Course',
        pageID: 'signup'
    });

});

module.exports = router;
