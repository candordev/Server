const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { use } = require('../routes/user')

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
  },
  firstName: { type: String},
  lastName: { type: String },
  profilePicture: { type: String },
  bio: { type: String },
  dateOfBirth: { type: Date },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // connects to the post model by referencing the post id
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]

})

// static signup method
userSchema.statics.signup = async function(userData) { // async function allows usage of this keyword 
  console.log(userData)

  // validation
  console.log(email, password)
  if (!email || !password) {
  if (!userData.email || !userData.password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(userData.email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(userData.password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email: userData.email}) // this refers to the User model
  

  if (exists) {
    throw Error('Email already in use') // checks if email already exists
  }

  //bycrypt is a hashing function that can has the passwords in a secure way - imported at the top and npm installed
  const salt = await bcrypt.genSalt(10) //genSalt adds a random set of 10 characters to the password - hashes for identical passwords would be different
  const hash = await bcrypt.hash(userData.password, salt) //hashes the password with the salt

  const user = await this.create({...userData, password: hash }) // this creates a new user with the email and password hash and saves it to the database

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


