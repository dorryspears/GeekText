const express = require("express");
const User = require("./models/user.js");
const routerProfile = express.Router();

routerProfile.post("/addcreditcard", async (req, res) => {
  const { userName, cardHolder, cardNumber, expirationDate, cvv } = req.body;
  const userFound = await User.findOne({ username: userName });
  if (!userFound) {
    res.sendStatus(400);
    return;
  }
  res.status(200).send({
    userName: userName,
    cardHolder: cardHolder,
    cardNumber: cardNumber,
    expirationDate: expirationDate,
    cvv: cvv,
  });
});

routerProfile.post("/addUser", async (req, res) => {
  const userFound = await User.findOne({ username: req.body.username });
  if (userFound) {
    res.status(400).send({ error: "Username already exists" });
    return;
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    fullName: req.body.fullName,
    email: req.body.email,
    homeAddress: req.body.homeAddress,
  });

  user.save().then((data) => {
    res.status(201).json(data);
  });
});

module.exports = routerProfile;
