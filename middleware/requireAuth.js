const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // gets token from the headers
  const { authorization } = req.headers

  //returns error if no token at all
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  //token is in the form of "Bearer 58209HFDSKL2084E2JFL..."
  //this split removes the "Bearer" part leaving just the token
  const token = authorization.split(' ')[1]

  //it verifies json web token to see if it is of a valid user
  //decrypts the jwt with the secret key
  //if the verification fails an error is thrown and this means the request is not authorized
  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    console.log("require auth visited:" + _id)
    //here, if the verification is successful, the id of the logged in user is added to the req.body for use in the controller functions
    req.body.user = await User.findOne({ _id }).select('_id')
    //this next() is what makes it a middleware function. This next moves from this method to whatever the called controller function is
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth