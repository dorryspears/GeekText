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

    router.get('/ratings/:bookID/average', (req, res) => {
    const bookID = req.params.bookID;
    
    const bookRatings = ratings.filter(rating => rating.bookID === bookID);

    const sum = bookRatings.reduce((total, rating) => total + rating.rating, 0);
    
    res.json(averageRating);

    })


module.exports = router;