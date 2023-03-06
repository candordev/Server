require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

//JSON WEB TOKENS - allow us to create a token that can allow the frontend to access certain parts of the backend accordingly
//EXAMPLE: if a user is logged in token sent to front end and, they can access the user profile page, but if they are not logged in no token sent to front end, they cannot access the user profile page
//Token parts
//Header - type of token and algorithm used to create the token
//Payload - data that is stored in the token
//Signature - used to verify the token has not been tampered with

//Future requests made by front end to the backend will include the token in the header of the request to allow the front end to access protective parts of the backend