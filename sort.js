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

//TODO
router.get('/genre', async (req, res) => 
{ 
    res.send('GitTest') // Test with Postman
    
    try
    {
        const genreData = req.body.genre; 
        const books = (await Book.find({ genre : genreData })).values
        const data = books.map 
        res.json(books);
    }
    catch (err)
    {
        console.error('Error retrieving books:', err);
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
    
});

module.exports = router;