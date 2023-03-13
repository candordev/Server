const express = require('express')

// controller functions
const { createPost, deletePost, upVote, downVote, editPost } = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
//router uses auth because only a logged in user can use these routes
router.use(requireAuth)
router.post('/createPost', createPost)
router.delete('/deletePost', deletePost)
router.post('/upVote', upVote)
router.post('/downVote', downVote)
router.post('/editPost', editPost)



module.exports = router