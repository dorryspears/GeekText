const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./sort.js');
const details = require('./details.js');
const profile = require('./profile.js');
const connection_string = process.env.MONGODB_CONNECTION_STRING

const app = express()

mongoose.connect(connection_string)

app.use(express.json());
app.use('/sort', routes)
app.use('/details', details)
app.use('/profile', profile)

module.exports = app