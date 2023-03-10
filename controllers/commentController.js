const Post = require('../models/postModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')
const { default: mongoose } = require('mongoose')

const createComment = async (req, res) => {
    try {
        const {content,user, postID, parentID} = req.body
        const newComment = await Comment.create({content,authorID: user,postID, parentID})
        const post = await Post.findOne({_id: postID})
        post.addComment(newComment._id)
        res.send("added new comment with id " + newComment._id + " to post with id " + postID)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
} 

//how to recursively delete comment with parent id of the one to be deleted because should delete all the children comments too
const deleteComment = async (req, res) => {
    try{
        const {user,commentID} = req.body
        const comment = await Comment.findOne({_id: commentID})
        const post = await Post.findOne({_id: comment.postID})
        userObjectID = new mongoose.Types.ObjectId(user)
        if (!userObjectID.equals(comment.authorID)) {
            res.status(401).json({"errorMessage":"unauthorized to delete this comment"})
        }
        post.removeComment(commentID)
        Comment.deleteComment(commentID)
        res.send("comment successfully deleted")
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = { createComment, deleteComment }