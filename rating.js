const express = require("express");
const User = require("./models/user.js");
const Book = require("./models/book.js");
const BookRating = require("./models/bookrating.js");
const Comment = require("./models/comment.js");
const routerRating = express.Router();

routerRating.post("/addbookrating", async (req, res) => {
  const { username, isbn, rating } = req.body;

  const userFound = await User.findOne({ username: username });
  if (!userFound) {
    res.status(400).send({ error: "Username doesn't exists" });
    return;
  }

  const bookFound = await Book.findOne({ bookISBN: isbn });
  if (!bookFound) {
    res.status(400).send({ error: "Book does not exist." });
    return;
  }

  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    res
      .status(400)
      .send({ error: "Rating must be a whole number between 1 and 5" });
    return;
  }

  const alreadyRated = await BookRating.findOne({
    username: username,
    isbn: isbn,
  });
  if (alreadyRated) {
    res.status(400).send({ error: "You have already rated this book" });
    return;
  }

  const bookRating = new BookRating({
    username: username,
    isbn: isbn,
    rating: rating,
    datestamp: new Date(),
  });

  bookRating.save().then((data) => {
    res.status(201).json(data);
  });
});

routerRating.post("/comments", async (req, res) => {
  const { comment, userId, bookId } = req.body;

  try {
    const newComment = new Comment({
      comment,
      userId,
      bookId,
      datestamp: new Date(),
    });

    await newComment.save();

    return res.status(201).json({ message: "Comment created success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

routerRating.get("/books/:bookId/comments", async (req, res) => {
  const bookId = req.params.bookId.trim();
  try {
    const comments = await Comment.find({ bookId: bookId });
    if (comments.length === 0) {
      return res.status(404).json({ error: "No comments found" });
    }

    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

routerRating.get("/books/:bookId/averagerate", async (req, res) => {
  const bookId = req.params.bookId.trim();

  try {
    const ratings = await BookRating.find({ isbn: bookId });

    if (ratings.length === 0) {
      return res.status(404).json({ error: "No ratings found for this book" });
    }

    const totalRatings = ratings.length;
    let sumRatings = 0;

    for (let i = 0; i < totalRatings; i++) {
      sumRatings += ratings[i].rating;
    }

    const averageRating = sumRatings / totalRatings;

    return res.json({ averageRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = routerRating;
