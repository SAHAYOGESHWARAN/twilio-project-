

//file contains passport logic for local login

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const User = require('../models/user')

const localAuth = (passport) => {
    passport.use(
        new LocalStrategy(
        { usernameField: 'email' }, async(email, password, done) => {
            try {
                const user = await User.findOne({ email: email }) 
                
                if (!user) {
                    return done(null, false, { message: 'Incorrect email' });
                }
                //validate password
                const valid = await user.validPassword(password)
                if (!valid) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);

            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}

module.exports = {
    localAuth
}


