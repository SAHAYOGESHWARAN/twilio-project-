

const express = require('express')
const router = express.Router()
const { createUser, getSignup } = require('../controllers/signUpController')
const { authUser, getLogin } = require('../controllers/loginController')
const { loadVerify, verifyUser, resendCode } = require('../controllers/verifyController')
const { isLoggedIn, isVerified, notVerified, notLoggedIn } = require('../config/middleware')


//login route
router.route('/login')
    .all(notLoggedIn)
    .get(getLogin)
    .post(authUser)


//signup route
router.route('/signup')
    .all(notLoggedIn)
    .get(getSignup)
    .post(createUser)

//logout
router.route('/logout')
    .get(async (req, res) => {
        req.logout();
        res.redirect('/');
    })

router.route('/resend')
    .all(isLoggedIn, notVerified)
    .get(resendCode)

//verify route
router.route('/verify')
    .all(isLoggedIn, notVerified)
    .get(loadVerify)
    .post(verifyUser)

//dashboard
router.route('/dashboard')
    .all(isLoggedIn, isVerified)
    .get(async (req, res) => {
        res.render('dashboard')
    })


//export router
module.exports = router