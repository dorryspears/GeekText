const express = require("express");
const User = require("./models/user.js");
const Wishlist = require("./models/wishlist.js");
const routerWishlist = express.Router();

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

module.exports = routerWishlist;