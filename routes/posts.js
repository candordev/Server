const express = require('express')

// controller functions
const { createPost, getPosts, getPostsByLocation, getPostsByTag, deletePost, updatePost } = require('../controllers/messagesController')

const router = express.Router()

// create post route
router.post('/', createPost)

// get all posts route
router.get('/', getPosts)

// get posts by location route
router.get('/location/:location', getPostsByLocation)

// get posts by tag route
router.get('/tag/:tag', getPostsByTag)

// delete post route
router.delete('/:id', deletePost)

// update post route
router.put('/:id', updatePost)

module.exports = router
