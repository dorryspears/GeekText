const express = require('express');
const Book = require('./models/book.js');
const Author = require('./models/author.js');

const router = express.Router()

router.get('/rating', async (req, res) => {
    const rating = req.body.rating;

    if (rating < 0 || rating > 5) {
        return res.status(400).send({ error: 'Rating must be between 0 and 5' });
    }

    const books = await Book.find({ rating: { $gte: rating } });
    res.send(books);
});

router.put('/discount', async (req, res) => {
    const { discountPercent, publisher } = req.body;

    if (!discountPercent || !publisher) {
        return res.status(400).send({ error: 'Discount percent and Publisher are required' });
    }

    const discountFactor = 1 - discountPercent / 100;

    try {
        await Book.updateMany({ publisher: publisher }, { $mul: { price: discountFactor } });
        res.status(200).send('Updated Successfully');
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the book prices' });
    }

})

router.get('/topsellers', async (req, res) => {

    try {
        const books = await Book.find({}, [], { skip: 0, limit: 10, sort: { copiesSold: -1 } })
        res.status(200).send('Retrieved top sellers!')
    }

    catch (error)
    {
        res.status(500).send(error)
    }
})

router.get('/genre', async (req, res) => {
    try {
        const genreData = req.body.genre;
        const books = await Book.find({ genre: genreData });
        res.json(books);
    }
    catch (err) {
        console.error('Error retrieving books:', err);
        res.status(500).json({ error: 'Failed to retrieve books' });
    }

});

module.exports = router;
