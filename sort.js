const express = require('express');
const Book = require('./models/book.js');

const router = express.Router()

router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        rating: req.body.rating,
        copiesSold: req.body.copiesSold,
        price: req.body.price
    })
    try {
        const newBook = await book.save()
        res.status(201).json(newBook)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})



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





module.exports = router;