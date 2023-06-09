const express = require("express");
const User = require("./models/user.js");
const Book = require("./models/book.js");
const BookRating = require("./models/bookrating.js");
const routerRating = express.Router();

routerRating.post("/addbookrating", async (req, res) => {
    const { username, isbn, rating } = req.body;

    const userFound = await User.findOne({ username: username });
    if (!userFound) {
        res.status(400).send({ error: "Username doesn\'t exists" });
        return;
    }

    const bookFound = await Book.findOne({ bookISBN: isbn});
    if (!bookFound) {
        res.status(400).send({ error: "Book does not exist." });
        return;
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        res.status(400).send({ error: "Rating must be a whole number between 1 and 5" });
        return;
    }

    const alreadyRated = await BookRating.findOne({ username: username, isbn: isbn });
    if (alreadyRated) {
        res.status(400).send({ error: "You have already rated this book" });
        return;
    }

    const bookRating = new BookRating({
        username: username,
        isbn: isbn,
        rating: rating,
    });

    bookRating.save().then((data) => {
        res.status(201).json(data);
    });
});

//retrieve average rating for a book
routerRating.get("/getbookaverage/:isbn", async (req, res) => {
    const { _id } = req.params;  

//Aggregate ratings and calculate average    
    const averageRating = await BookRating.aggregate([
        { $match: { _id } },
        {
            $group: {
                _id: null,
                avgRating: { $avg: "$rating" },
            },
        },
    ]);  

    if (!averageRating[0]) {
        res.status(200).json({ avgRating: "No ratings yet for this book." }); //message if no ratings found
        return;
    }

    res.status(200).json({ avgRating: averageRating[0].avgRating });
});



module.exports = routerRating;