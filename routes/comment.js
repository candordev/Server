const express = require('express')

// controller functions
const { createComment, deleteComment } = require('../controllers/commentController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)
// adding new post route route
router.post('/createComment', createComment)
router.delete('/deleteComment',deleteComment)

module.exports = router