const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(email, password) { // async function allows usage of this keyword 

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email }) // this refers to the User model

  if (exists) {
    throw Error('Email already in use') // checks if email already exists
  }

  //bycrypt is a hashing function that can has the passwords in a secure way - imported at the top and npm installed
  const salt = await bcrypt.genSalt(10) //genSalt adds a random set of 10 characters to the password - hashes for identical passwords would be different
  const hash = await bcrypt.hash(password, salt) //hashes the password with the salt

  const user = await this.create({ email, password: hash }) // this creates a new user with the email and password hash and saves it to the database??? saves to database

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email }) // finds user model for specific user in database by email
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password) // compares the plain text password that is entered to the hashed passowrd in the user schema for that specfic email
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)


