

const mongoose = require('mongoose')
const User = require('../models/user')


//sign up Logic
const getSignup = async(req, res, next) => {
    res.render('signup')
}

const createUser = async (req, res, next) => {
    try {
        const { name, username, password, phonenumber, email} = await req.body
        const errors = []

        const reRenderSignup = (req, res, next) => {
            console.log(errors)
            res.render('signup', {
                errors,
                username,
                name,
                phonenumber,
                email
            })
        }

        if( !name || !username || !password || !phonenumber || !email ) {
            errors.push({ msg: 'please fill out all fields appropriately' })
            reRenderSignup(req, res, next)
        } else {
            const existingUser = await User.findOne().or([{ email: email}, { phonenumber : phonenumber }])
            if(existingUser) {
            errors.push({ msg: 'User already exists, try changing your email or phone number' })
            reRenderSignup(req, res, next)
            } else {
                const user = await User.create(
                    req.body
                )
                req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                );
                res.redirect('/users/login')
            }
            
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    getSignup
}