const express = require('express');
const User = require('./models/user.js');
const routerProfile = express.Router()

routerProfile.post('/addUser', async (req, res) => {

    const userFound = await User.findOne({ username: req.body.username });
        if (userFound) {
            res.status(400).send({ error: 'Username already exists' });
            return;
        }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        email: req.body.email,
        homeAddress: req.body.homeAddress
    });

    user.save()
        .then(data => {
            res.status(201).json(data);
        });
    });

routerProfile.patch('/updateUser', async (req, res) => {

    try{
        if (req.body.email)
        {
            res.status(400).send({ error: 'You cannot update your E-mail.' });
            return;
        }

        const updateUser = await User.findOneAndUpdate({username: req.body.username}, {$set: req.body})
        const updatedUser = await User.findOne({username: req.body.username})
        res.status(200).send(updatedUser)
    }

    catch (error)
    {
        res.status(500).send(error)
    }

})

module.exports = routerProfile;
