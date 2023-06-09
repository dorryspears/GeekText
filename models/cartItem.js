const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('CartItem', cartSchema)