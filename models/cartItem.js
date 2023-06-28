const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('CartItem', userSchema)