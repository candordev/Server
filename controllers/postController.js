const Post = require('../models/postModel')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const createPost = async (req, res) => {
    _id = req.body._id
    if (req.img) {
        const post = await Post.create({uid: _id, title: req.title, content: req.content, img: req.img})
        const user = await User.findOne({_id})
        user.addPost(post._id)
    }
    await Post.create({uid: _id, title: req.title, content: req.content})
}

const upVote = async (req, res) => {
    _id = req.body._id
    postId = req.body.postId
    const user = await User.findOne({_id})
    const post = await Post.findOne({_id: postId})
    try {
        post.incrementUpvote(user._id)
        res.send("upvote incremented)")
    } catch (error) {
        res.status(404).json({error: error.message})
    }
    
}

const downVote = async (req, res) => {
    _id = req.body._id
    postId = req.body.postId
    const user = await User.findOne({_id})
    const post = await Post.findOne({_id: postId})
    try {
        post.incrementDownvote(user._id)
        res.send("downvote incremented)")
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = { createPost }
