const Post = require('../models/postModel')
const User = require('../models/userModel')

const createPost = async (req, res) => {
    try {
        const {user,title,location,contentType,imgURL, content, pollOptions, pollResults} = req.body
        const post = await Post.create({user, title, location, contentType, imgURL, content, pollOptions, pollResults})
        const tempUser = await User.findOne({_id: user})
        console.log(tempUser.email,tempUser.password)
        await tempUser.addPost(post._id)
        res.status(200).json({id: post._id,title,content,message: "Post created"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const editPost = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.body.postID})
        await post.editPost(req.body)
        res.send("successfully edited post")
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
        

const deletePost = async (req, res) => {
    try {
        const {user,postID} = req.body
        await Post.findByIdAndDelete(postID)
        const tempUser = await User.findOne({_id: user})
        await tempUser.removePost(postID)
        res.status(200).json({message: "Post deleted with id: " + postID})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const upVote = async (req, res) => {
    try {
        const _id = req.body.user
        const postID = req.body.postID
        const post = await Post.findOne({_id: postID})
        await post.incrementUpvote(_id)
        res.send("upvote incremented)")
    } catch (error) {
        res.status(404).json({error: error.message})
    } 
}

const downVote = async (req, res) => {
    try {
        const _id = req.body.user
        const postID = req.body.postID
        const post = await Post.findOne({_id: postID})
        await post.incrementDownvote(_id)
        res.send("downvote incremented)")
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = { createPost, deletePost, upVote, downVote, editPost }
