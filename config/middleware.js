

//check if a user is verified
const isLoggedIn = async(req, res, next) => {
    if(req.user){
        return next()
    } else {
        req.flash(
            'error_msg',
            'You must be logged in to do that'
        )
        res.redirect('/users/login')
    }
}

const notLoggedIn = async(req, res, next) => {
    if(!req.user) {
        return next()
    } else{
        res.redirect('back')
    }
}

//prevents an unverified user from accessing '/dashboard'
const isVerified = async(req, res, next) => {
    if(req.session.verified){
        return next()
    } else {
        req.flash(
            'error_msg',
            'You must be verified to do that'
        )
        res.redirect('/users/login')
    }
}


//prevent verified User from accessing '/verify'
const notVerified = async(req, res, next) => {
    if(!req.session.verified){
        return next()
    } else {
        res.redirect('back')
    }
}


module.exports = {
    isLoggedIn,
    isVerified,
    notVerified,
    notLoggedIn
}