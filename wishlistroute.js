const express = require("express");
const User = require("./models/user.js");
const Wishlist = require("./models/wishlist.js");
const routerWishlist = express.Router();
const Cart = require("./models/cartItem.js");
const Book = require("./models/book.js");

routerWishlist.post("/create", async (req, res) => {
    const { username, wishlistName } = req.body;

    const userFound = await User.findOne({ username: username });
    if (!userFound) {
        res.status(400).send({ error: "Username doesn\'t exists" });
        return;
    }

    const wishlistFound = await Wishlist.findOne({ username: username, wishlistName: wishlistName });
    if (wishlistFound) {
        res.status(400).send({ error: "Wishlist name already exists" });
        return;
    }

    const wishlistId = Math.floor(Math.random() * 100000);

    const wishlist = new Wishlist({
        username: username,
        wishlistName: wishlistName,
        wishlistId: wishlistId,
    });

    wishlist.save().then((data) => {
        res.status(201).json(data);
    });
});

// add book to user's wishlist
routerWishlist.post("/addbook", async (req, res) => {
    const { username, wishListId, _id } = req.body; // extract necessary fields from the body

    const bookFound = await Book.findOne({ _id });
    if (!bookFound) 
    {
        res.status(400).send({ error: "Book does not exist." });
        return;
    }
    
    const wishlist = await Wishlist.findOneAndUpdate(  // add book to user's wish list by _id
        { username: username, wishlistId: wishlistId },
        { $push: { books: _id } },
        { new: true }
    );

   if(!wishlist) 
   {
    res.status(400).send({ error: "Wishlist not found." });
    return;
   } 

   res.status(200).json(wishlist);
});

module.exports = routerWishlist;