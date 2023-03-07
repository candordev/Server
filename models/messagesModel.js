const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, // reference to the user model
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId, // reference to the user model
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

messageSchema.statics.createM = async function(userData) { // userData is pulled from the messageController.js
  if (!userData.content) {
    throw Error('Message content is empty')
  }
  const message = await this.create({...userData}) // this creates a new message with the sender, recipient, and content and saves it to the database

  return message

}


module.exports = mongoose.model('Message', messageSchema);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA2YjlhZjgwZjY3Mzc4YjVjMGU5MjQiLCJpYXQiOjE2NzgyMjgxMDQsImV4cCI6MTY3ODQ4NzMwNH0.j-MAMFE1SmHyei7-CI-UyqTJXprCa7sF5eq4zFjotHU
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA2NjEwMDUzODcyOTg1OTQxNzU3ODgiLCJpYXQiOjE2NzgyMjgzOTksImV4cCI6MTY3ODQ4NzU5OX0.4Flf2FmQVloGFS3iz47K15Kcvz0AZBxOr6sa_vJmsPk
