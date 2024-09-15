

const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user')
const { sendVerification } = require('../config/twilioLogic')

const getLogin = async(req, res) => {
    res.render('login')
}

const authUser = async(req, res, next) => {
    try {
        passport.authenticate('local', function(err, user, info) {
            if (err) { 
                return next(err) 
            }
            if (!user) { 
                req.flash(
                    'error_msg',
                    info.message
                )
                return res.redirect('/users/login')
            }
            req.logIn(user, function(err) {
                if (err) { 
                    return next(err)
                }
                sendVerification(req, res, req.user.phonenumber)
                res.redirect('/users/verify');
            });
        })(req, res, next);
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    getLogin,
    authUser
}