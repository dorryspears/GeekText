const express = require('express');
const Book = require('./models/book.js');
const Author = require('./models/author.js');

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

router.post('/authorpost', async (req, res) =>
{
    const author = new Author(
        {
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