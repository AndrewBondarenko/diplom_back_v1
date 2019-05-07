const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Users
router.get('/', async (req, res) => {
    const users = await loadPostsCollection();
    res.send(await users.find({}).toArray());
});

// Add User
router.post('/', async (req, res) => {
    const users = await loadPostsCollection();
    await users.insertOne({
        username: req.body.username,
        password: req.body.password,
    });
    res.status(201).send();
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://AndrewBondarenko:ab12qwaszx@cluster0-e77xk.mongodb.net/test?retryWrites=true",
        {
            useNewUrlParser: true
        }
    );

    return client.db('test').collection('users');
}

module.exports = router;