const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Users
router.get('/', async (req, res) => {
    const users = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add User
router.post('/', async (req, res) => {
    const users = await loadPostsCollection();
    await users.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete User
router.delete('/:id', async (req, res) => {
    const users = await loadPostsCollection();
    await users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://YOUR_OWN_MONGODB',
        {
            useNewUrlParser: true
        }
    );

    return client.db('vue_express').collection('users');
}

module.exports = router;