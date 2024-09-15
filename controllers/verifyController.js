


const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user')
const { sendVerification, checkVerification } = require('../config/twilioLogic')

const loadVerify = async(req, res) => {
    res.render('verify')
}

const resendCode = async(req, res) => {
    sendVerification(req, res, req.user.phonenumber)
    res.redirect('/users/verify')
}

const verifyUser = async(req, res) => {
    //check verification code from user input
    const verifyStatus = await checkVerification(req, res, req.user.phonenumber, req.body.verifyCode)
    
    if(verifyStatus === 'approved') {
        req.session.verified = true
        res.redirect('/users/dashboard')
    } else {
        req.session.verified = false
        req.flash(
            'error_msg',
            'wrong verification code'
        )
        res.redirect('/users/verify')
    }
    
}

module.exports = {
    loadVerify,
    verifyUser,
    resendCode
}