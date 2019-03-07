var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

//Register
router.post('/register', (req, res) => {

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('email', 'Email is not valid').isEmail()
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password)

    var errors = req.validationErrors()

    if (errors) {
        for (var i = 0; i < errors.length; i++) {
            req.flash('error_msg', errors[i].msg)
            res.redirect('/')
        }
    } else {
        var newUser = new User({
            email: email,
            username: username,
            password: password
        })
        User.createUser(newUser, function(err, user) {
            if (err) {
                throw err
            } else if (user == 'Existed') {
                req.flash('error_msg', 'Username Existed !!!')
                res.redirect('/')
            } else {
                req.flash('success_msg', 'You are registered and can now login')
                res.redirect('/')
            }
        })
    }

})

//Log In
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err
            if (!user) {
                return done(null, false, { message: 'Unknown User' })
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err
                if (isMatch && !err) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Invalid password' })
                }
            })
        })
    }))

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user)
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            req.flash('success_msg', 'Invalid username or password.')
            return res.redirect('/')
        }
        req.logIn(user, function(err) {
            if (err) { return next(err) }
            req.flash('success_msg', 'Welcome to E-learning Website')
            res.redirect('/dashboard')
        });
    })(req, res, next);
})

router.get('/logout', function(req, res) {

    req.logout()

    req.flash('success_msg', 'You are logged out')

    res.redirect('/')

})

module.exports = router