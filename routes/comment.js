const express = require('express')

// controller functions
const { createComment, deleteComment } = require('../controllers/commentController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
//router uses auth because only a logged in user can use these routes
router.use(requireAuth)
router.post('/createComment', createComment)
router.delete('/deleteComment',deleteComment)

module.exports = router