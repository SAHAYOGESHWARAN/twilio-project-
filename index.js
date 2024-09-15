const path = require('path')
const express = require('express');
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(session({ 
    secret: "please log me in",
    resave: true,
    saveUninitialized: true
    }
));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user
    next();
});

//define error handler
app.use(function(err, req, res, next) {
    res.render('error', {
        error : err
    })
})

//listen on port
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});


//connect to mongodb
mongoose.connect('mongodb://localhost:27017/authWithTwilio', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => {
        console.log(`connected to mongodb`)
    })
    .catch(e => console.log(e))

    //after requiring connect-flash
const expressLayouts = require('express-ejs-layouts')

//after the mongoose.connect logic
app.use(expressLayouts);
app.set('view engine', 'ejs');
