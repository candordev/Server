const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//write a get request to get user information from database based on the token sent from the front end - check chat gpt code in user sign up validation chat section header whatev shit on left called bruh


module.exports = router