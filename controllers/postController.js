const Post = require('../models/postModel')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const createPost = async (req, res) => {
    _id = req._id
    if (req.img) {
        const post = await Post.create({uid: _id, title: req.title, content: req.content, img: req.img})
        const user = await User.findOne({_id})
        user.addPost(post._id)
    } else {
        await Post.create({uid: _id, title: req.title, content: req.content})
    }
}

module.exports = { createPost }