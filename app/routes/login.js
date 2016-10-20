var express = require('express');
var router = express.Router();
var passport = require('passport');

var config = require('../config');
var userService = require('../services/user-service');

/* GET users listing. */
/*router.get('/signup', function(req, res, next) {
    res.send('respond with a resource');
});*/

// GET /users/create
router.get('/signup', function(req, res, next) {
    var vm = {
        pageID:'signup',
        pageTitle:'Create an account',
        error: '',
        input: {
            firstName: '',
            lastName: '',
            role: '',
            email: ''
        }
    };
    res.render('create-user', vm);
});

router.post('/signup', function(req, res, next) {

    console.log("I am here", req.body);
    
    req.body = {
        'firstName': 'Lekan',
        'lastName': 'Babe',
        'role': 'Developer',
        'email': 'lekan@ikotun.com',
        'password': 'pass123'
    }
    
    console.log("This is the signup form");
    userService.addUser(req.body, function(err) {
        if (err) {
            console.log(err);

            var vm = {
                title: 'Create an account',
                input: req.body,
                pageID:'signup',
                pageTitle:'Create an account',
                error: 'An error occurred. Please try again.'
            };
            delete vm.input.password;
            return res.render('create-user', vm);
        }
        req.login(req.body, function(err) {
            res.redirect('/login');
        });
    });
});

// GET /login
router.get('/login', function(req, res, next) {
    var vm = {
        pageID:'login',
        pageTitle: 'Login'
    };
    res.render('login', vm);
});

router.post('/login', function(req, res, next) {
    req.session.orderId = 123456;
    if (req.body.rememberMe) {
        req.session.cookie.maxAge = config.cookieMaxAge;
    }
    next();
}, passport.authenticate('local', {failureRedirect:'/', failureFlash: 'Invalid credentials', successRedirect:'/login'}));

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;