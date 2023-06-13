const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    homeAddress: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema)