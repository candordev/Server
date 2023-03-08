const express = require('express')

// controller functions
const { createPost } = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)
// adding new post route route
router.post('/createPost', createPost)


module.exports = router