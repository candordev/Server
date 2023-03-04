const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
  img: {
    type: String,
  },
  comments: {
    type: Array,
    }
})

module.exports = mongoose.model('Post', postSchema)