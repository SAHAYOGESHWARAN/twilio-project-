

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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

//hash password on save
userSchema.pre('save', async function() {
    return new Promise( async (resolve, reject) => {
        await bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(this.password, salt, async (err, hash) => {
                if(err) {
                    reject (err)
                } else {
                    resolve (this.password = hash)
                }
            });
        });
    })
})

userSchema.methods.validPassword = async function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, res) => {
            if(err) {
                reject (err)
            } 
            resolve (res)
        }); 
    })
}

module.exports = mongoose.model('user', userSchema)