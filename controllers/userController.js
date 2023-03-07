const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' }) // creates a token with the user id that is included in payload and a secret key. third argument is an object that sets the expiration time of the token(3 days)
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id) // creates token for the user based on the found user schema found by email and password above

    res.status(200).json({email, token})// the token is sent to the front end to allow user specifc access to the backend and user specfic ui
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, firstName, lastName, profilePicture, bio, dateOfBirth} = req.body
  

  try {
    const userData = {email, password, firstName, lastName, profilePicture, bio, dateOfBirth}
    console.log(userData)

    const user = await User.signup(userData) //sign up method with email and password hashed using a fucntion in user model. Saves the user in format user schema into the database as well as into varibale user here.

    // create a token
    const token = createToken(user._id) // creates token based on user schema made by email and password above

    res.status(200).json({email, token})// the token is sent to the front end more to just prove that user is 
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {signupUser, loginUser}

//JSON WEB TOKENS - allow us to create a token that can allow the frontend to access certain parts of the backend accordingly
//EXAMPLE: if a user is logged in token sent to front end and, they can access the user profile page, but if they are not logged in no token sent to front end, they cannot access the user profile page
//Token parts
//Header - type of token and algorithm used to create the token
//Payload - data that is stored in the token
//Signature - used to verify the token has not been tampered with

//Future requests made by front end to the backend will include the token in the header of the request to allow the front end to access protective parts of the backend