const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
    },
    upvotes: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    downvotes: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    content: {
        type: String,
    },
    pollOptions: {
        type: Array,
    },
    pollResults: {
        type: Array,
    },
    date: { type: Date, default: Date.now },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

postSchema.methods.editPost = async function (reqObj) {
    this.title = reqObj.title || this.title
    this.location = reqObj.location || this.location
    this.contentType = reqObj.contentType || this.contentType
    this.imgURL = reqObj.imgURL || this.imgURL
    this.content = reqObj.content || this.content
    this.pollOptions = reqObj.pollOptions || this.pollOptions
    this.pollResults = reqObj.pollResults || this.pollResults
    await this.save()
}

postSchema.statics.deletePost = async function (id) {
    await this.findByIdAndDelete(id)
}

postSchema.methods.incrementUpvote = async function (uid) {
    if (this.upvotes.includes(new mongoose.Types.ObjectId(uid))) {
        this.upvotes = this.upvotes.filter((user) => !user.equals(new mongoose.Types.ObjectId(uid)));
    }
    else {
        this.upvotes.push(new mongoose.Types.ObjectId(uid))
        this.downvotes = this.downvotes.filter((user) => !user.equals(new mongoose.Types.ObjectId(uid)))
    }
    await this.save()
}

postSchema.methods.incrementDownvote = async function (uid) {
    if (this.downvotes.includes(new mongoose.Types.ObjectId(uid))) {
        this.downvotes = this.downvotes.filter((user) => !user.equals(new mongoose.Types.ObjectId(uid)))
    }
    else {
        this.downvotes.push(new mongoose.Types.ObjectId(uid))
        this.upvotes = this.upvotes.filter((user) => !user.equals(new mongoose.Types.ObjectId(uid)))
    }
    await this.save()
}

postSchema.methods.addComment = async function(commentID) {
    try {
      this.comments.push(commentID)
      await this.save()
    } catch (error) {
      throw Error(error)
    }
  }
  
  postSchema.methods.removeComment = async function(commentID) {
    try {
        this.comments = this.comments.filter((comment) => !comment.equals(new mongoose.Types.ObjectId(commentID)))
        await this.save()
    } catch (error) {
      throw Error(error)
    }
  }





module.exports = mongoose.model('Post', postSchema)
