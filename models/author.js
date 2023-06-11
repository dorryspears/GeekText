const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    authorId: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)