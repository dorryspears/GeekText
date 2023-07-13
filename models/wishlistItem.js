const mongoose = require('mongoose')

const wishlistItemSchema = new mongoose.Schema({
    wishlistId: {
        type: String,
        required: true
    },
    bookISBN: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema)