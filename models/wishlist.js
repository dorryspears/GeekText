const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    wishlistName: {
        type: String,
        required: true
    },
    wishlistId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('WishList', wishlistSchema)