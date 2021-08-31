// implement your posts router here
const e = require('express');
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
   const newPost = req.body
   if(!newPost.title || !newPost.contents) {
       res.status(400).json({ message: "Please provide title and contents for the post" })
   } else { 
       Posts.insert(newPost)
        .then(postId => {
            newPost.id = postId.id;
            res.status(201).json(newPost)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
   }
});

router.put('/:id', (req, res) => {
    res.status(200).json({ message: 'updates post with specified id' })
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'deletes post with specified id' })
});

module.exports = router;