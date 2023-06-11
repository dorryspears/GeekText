const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./sort.js');
const details = require('./details.js');
const connection_string = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(connection_string)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
    console.log('Connected to MongoDB')
})


const app = express()

app.use(express.json());
app.use('/sort', routes)
app.use('/details', details)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})