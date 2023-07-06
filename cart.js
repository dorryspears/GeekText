const express = require("express");
const User = require("./models/user.js");
const Book = require("./models/book.js");
const CartItem = require("./models/cartItem.js");
const cartItem = require("./models/cartItem.js");
const routerCart = express.Router();

routerCart.post("/addbook", async (req, res) => {
  const { username, isbn } = req.body;

  const userFound = await User.findOne({ username: username });
  if (!userFound) {
    res.status(400).send({ error: "Does not exist." });
    return;
  }

  const bookFound = await Book.findOne({ bookISBN: isbn });
  if (!bookFound) {
    res.status(400).send({ error: "Book does not exist." });
    return;
  }

  const cartItem = new CartItem({
    username: username,
    isbn: isbn,
  });

  cartItem.save().then((data) => {
    res.status(201).json(data);
  });
});

routerCart.get('/username', async (req, res) => 
{
    try
    {
        const username = req.body.username;
        const userFound = await User.findOne({ username: username });
        
        if (!userFound) 
        {
        res.status(400).send({ error: "Does not exist." });
        return;
        }
        res.json(await CartItem.find({ username: username }));   
        
    }
    
    catch (err)
    {
        console.error('Error retrieving books from cart:', err);
        res.status(500).json({ error: 'Failed to retrieve books from cart' })
    }
});



module.exports = routerCart;
routerCart.delete("/removeitem", async (req, res) => {
  const { username, isbn } = req.body;

  try {
    const removedItem = await CartItem.findOneAndRemove({ username, isbn });

    if (!removedItem) {
      res.status(400).json({ error: "Item not found" });
      return;
    }

    res.status(200).json({ message: "Items successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = routerCart;
