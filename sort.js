const express = require('express');
const Book = require('./models/book.js');

const router = express.Router()

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

    const books = await Book.find({}, [], { skip: 0, limit: 10, sort: { copiesSold: -1 } })
    res.send(books);
})

//TODO
router.get('/genre', async (req, res) => 
{ 
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