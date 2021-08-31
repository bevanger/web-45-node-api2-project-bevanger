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

router.get('/:id/comments', async (req, res) => {
    const {id} = req.params;
    const post = await Posts.findById(id);

    if(post) {
        Posts.findPostComments(id)
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(err => res.status(500).json({ message: "The comments information could not be retrieved" })
            )} else {
                res.status(404).json({ message: "The post with teh specified ID does not exist" })
            }
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
    const { id } = req.params;
    const changes = req.body;

    if(!id || !req.body.title || !req.body.contents) { // Better way? !changes doesn't catch
        res.status(400).json({ message: 'Please provide title and contents for the post'})
    } else {
        Posts.update(id, changes)
            .then(success => {
                if(success) {
                    Posts.findById(id)
                        .then(updatedPost => res.status(200).json(updatedPost))
                        .catch(err => console.log(err))
                } else {
                    res.status(404).json({ message: 'The post with the specified ID does not exist'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'The post information could not be modified'})
            })
    }
});

router.delete('/:id', async (req, res) => {
    const post = await Posts.findById(req.params.id)
    Posts.remove(req.params.id)
        .then(success => {
            if(success) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The post could not be removed" })
        })
});

module.exports = router;