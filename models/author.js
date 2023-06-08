const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
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