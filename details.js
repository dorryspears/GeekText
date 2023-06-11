const express = require('express');
const Book = require('./models/book.js');
const { faker } = require('@faker-js/faker');
const e = require('express');

const routerDetails = express.Router()

routerDetails.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        rating: req.body.rating,
        copiesSold: req.body.copiesSold,
        price: req.body.price,
        bookISBN: req.body.bookISBN,
        yearPublished: req.body.yearPublished,
        authorId: req.body.authorId,
        description: req.body.description
    })
    try {
        const newBook = await book.save()
        res.status(201).json(newBook)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})


routerDetails.post('/clear', async (req, res) => {
    try {
        await Book.deleteMany({})
        res.status(200).send('Cleared Successfully');
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while clearing the database' });
    }
})

routerDetails.post('/random', async (req, res) => {
    const numBooks = req.body.numBooks;

    if (!numBooks) {
        res.status(400).send({ error: 'Number of books is required' });
    }

    try {
        for (let i = 0; i < numBooks; i++) {
            await Book.create({
                title: faker.lorem.words(),
                publisher: faker.company.name(),
                genre: faker.word.words(),
                rating: faker.number.int(5),
                copiesSold: faker.number.int(1000),
                price: faker.finance.amount(1, 100, 2),
                bookISBN: faker.number.int(1000000000000, 9999999999999),
                yearPublished: faker.date.past({ years: 100 }).getFullYear(),
                //TODO Replace with author id from author table
                authorId: faker.number.int(100),
                description: faker.lorem.paragraph()
            })
        }

        res.status(201).send(`Created ${numBooks} book(s)`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

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