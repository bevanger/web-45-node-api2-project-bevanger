// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');
const router = express.Router();


router.get('/', (req, res) => {
   Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        }else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })    
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
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