const express = require('express');
const Book = require('./models/book.js');

const routerDetails = express.Router()


routerDetails.post('/authorpost', async (req, res) =>
{
    const author = new Author(
        {
            authorId: req.body.authorId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            biography: req.body.biography,
            publisher: req.body.publisher
        })

    try
    {
        const newAuthor = await author.save()
        res.status(201).send(newAuthor)
    }

    catch (error)
    {
        res.status(400).send(error)
    }
})

module.exports = routerDetails;