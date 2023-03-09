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
  //comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

postSchema.methods.editPost = async function (title, content, img) {
    this.title = title
    this.content = content
    this.img = img
    await this.save()
}

postSchema.statics.deletePost = async function (id) {
    await this.findByIdAndDelete(id)
}

postSchema.methods.incrementUpvote = async function (uid) {
    if (this.upvotes.includes(new mongoose.Types.ObjectId(uid))) {
        this.upvotes = this.upvotes.filter((user) => user.toString() !== uid)
    }
    else {
        this.upvotes.push(new mongoose.Types.ObjectId(uid))
        this.downvotes = this.downvotes.filter((user) => user.toString() !== uid)
    }
    await this.save()
}

postSchema.methods.incrementDownvote = async function (uid) {
    if (this.downvotes.includes(new mongoose.Types.ObjectId(uid))) {
        this.downvotes = this.downvotes.filter((user) => user.toString() !== uid)
    }
    else {
        this.downvotes.push(new mongoose.Types.ObjectId(uid))
        this.upvotes = this.upvotes.filter((user) => user.toString() !== uid)
    }
    await this.save()
}






module.exports = mongoose.model('Post', postSchema)
