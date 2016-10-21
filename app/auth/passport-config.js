module.exports = function() {
    const passport = require('passport');
    const passportLocal = require('passport-local');
    const bcrypt = require('bcrypt');
    const userService = require('./../services/user-service');

    passport.use(new passportLocal.Strategy({usernameField: 'email'}, function(email, password, next) {
        userService.findUser(email, function(err, user) {
            console.log('looking for user with email', email);
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(null, null);
            }

            bcrypt.compare(password, user.password, function(err, same) {
               if (err) {
                   return next(err)
               }
                if (!same) {
                    return (null, null);
                }
                console.log('user successfully authenticated', user);
                next(null, user);
            });
        });
    }));

    passport.serializeUser(function (user, next) {
        next(null, user.email);
    });
    
    passport.deserializeUser(function (email, next) {
        userService.findUser(email, function(err, user) {
            next(err, user);
        })
    })
}