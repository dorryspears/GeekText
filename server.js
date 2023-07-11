const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./sort.js");
const details = require("./details.js");
const profile = require("./profile.js");
const cart = require("./cart.js");
const rating = require("./rating.js");
const wishlist = require("./wishlistroute.js");
const connection_string = process.env.MONGODB_CONNECTION_STRING;
const Comment = require("./models/comment.js");
const app = express();

mongoose.connect(connection_string);

app.use(express.json());

app.post("/comments", async (req, res) => {
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

app.get("/books/:bookId/comments", async (req, res) => {
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

app.use("/sort", routes);
app.use("/details", details);
app.use("/profile", profile);
app.use("/shoppingcart", cart);
app.use("/rating", rating);
app.use("/wishlist", wishlist);
app.use("/cart", cart);

module.exports = app;
