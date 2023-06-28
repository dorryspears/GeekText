const mongoose = require('mongoose')

const bookRatingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('BookRating', bookRatingSchema)