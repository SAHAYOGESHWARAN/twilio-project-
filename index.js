

const path = require('path')
const express = require('express');
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const expressLayouts = require('express-ejs-layouts')

const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const { localAuth } = require('./config/passportLogic')

const port = process.env.PORT || 3000
const app = express();

localAuth(passport)

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

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(session({ 
    secret: "please log me in",
    resave: true,
    saveUninitialized: true }
));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());
app.use(passport.session());

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

app.use('/users', userRoute)

//Routes

app.get('/', (req, res) => {
    res.render('home')
})

//define error handler
app.use(function(err, req, res, next) {
    res.render('error', {
        error : err
    })
})


//listen on port
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})