const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    copiesSold: {
        type: Number,
        required: true
    },
    price: {
        type: Decimal128,
        required: true
    },
    bookISBN: {
        type: String,
        required: true
    },
    yearPublished: {
        type: Number,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Book', bookSchema)