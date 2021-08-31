// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({ message: 'returns an array of all post objects' })
});

router.get('/:id', (req, res) => {
    res.status(200).json({ message: 'returns post with specified id' })
});

router.get('/:id/comments', (req, res) => {
    res.status(200).json({ message: 'returns array of all the comments of specified post id' })
});

router.post('/', (req, res) => {
    res.status(200).json({ message: 'creates new post' })
});

router.put('/:id', (req, res) => {
    res.status(200).json({ message: 'updates post with specified id' })
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'deletes post with specified id' })
});

module.exports = router;