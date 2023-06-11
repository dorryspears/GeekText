const express = require('express');
const Book = require('./models/book.js');
const { faker } = require('@faker-js/faker');
const Author = require('./models/author.js');

const routerDetails = express.Router()

routerDetails.post('/', async (req, res) => {
    try {
        const author = await Author.findOne({ authorId: req.body.authorId });
        if (!author) {
            res.status(400).send({ error: 'Author doesn\'t exist' });
            return;
        }

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

        const newBook = await book.save()
        res.status(201).json(newBook)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
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
        return;
    }

    try {
        for (let i = 0; i < numBooks; i++) {

            var author = await Author.aggregate([{ $sample: { size: 1 } }]);

            if (!author) {
                res.status(400).send({ error: 'No authors found' });
            }

            var authorId = author[0].authorId;


            await Book.create({
                title: faker.lorem.words(),
                publisher: faker.company.name(),
                genre: faker.word.words(),
                rating: faker.number.int(5),
                copiesSold: faker.number.int(1000),
                price: faker.finance.amount(1, 100, 2),
                bookISBN: faker.number.int(1000000000000, 9999999999999),
                yearPublished: faker.date.past({ years: 100 }).getFullYear(),
                authorId: authorId,
                description: faker.lorem.paragraph()
            })
        }

        res.status(201).send(`Created ${numBooks} book(s)`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

routerDetails.post('/authorpost', async (req, res) => {
    const author = new Author(
        {
            authorId: req.body.authorId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            biography: req.body.biography,
            publisher: req.body.publisher
        })

    try {
        const newAuthor = await author.save()
        res.status(201).send(newAuthor)
    }

    catch (error) {
        res.status(400).send(error)
    }
})

routerDetails.post('/authorrandom', async (req, res) => {
    const numAuthors = req.body.numAuthors;

    if (!numAuthors) {
        res.status(400).send({ error: 'Number of authors is required' });
        return;
    }

    try {
        for (let i = 0; i < numAuthors; i++) {

            tempId = faker.number.int(1000);

            const authorFound = await Author.findOne({ authorId: tempId });
            if (authorFound) {
                i--;
                continue;
            }

            await Author.create(
                {
                    authorId: tempId,
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    biography: faker.lorem.paragraph(),
                    publisher: faker.company.name()
                })
        }

        res.status(201).send(`Created ${numAuthors} author(s)`);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
})


module.exports = routerDetails;