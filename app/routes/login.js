var express = require('express');
var router = express.Router();
var passport = require('passport');

var config = require('../config');
var userService = require('../services/user-service');

// GET /users/create
router.get('/create', function(req, res, next) {
    var vm = {
        pageID:'create',
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

router.post('/create', function(req, res, next) {
    
    console.log("This is the Create form");
    userService.addUser(req.body, function(err) {
        if (err) {
            console.log(err);

            var vm = {
                title: 'Create an account',
                input: req.body,
                pageID:'create',
                pageTitle:'Create an account',
                error: 'An error occurred. Please try again.'
            };
            delete vm.input.password;
            return res.render('create-user', vm);
        }
        return req.login(req.body, function(err) {
            if (err) {
                console.log("An error occurred while trying to log in");
                return res.redirect('/login')
            }
            res.redirect('/');
        });
    });
});

// GET /login
router.get('/login', function(req, res, next) {
    console.log("this is session obj", req.session);
    var vm = {
        pageID:'login',
        pageTitle: 'Login'
    };
    res.render('login', vm);
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect:'/login',
        successRedirect: '/orders',
        failureFlash: 'Invalid username and password combination'
    })
);

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;