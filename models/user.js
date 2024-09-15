const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    phonenumber : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    verified: Boolean
})

module.exports = mongoose.model('user', userSchema)
