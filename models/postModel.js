const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  uid: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true
  },
    title: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
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
        required: true
    },
    pollOptions: {
        type: Array,
    },
  img: {
    type: String,
  },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
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
    if (this.upvotes.includes(uid)) {
        this.upvotes = this.upvotes.filter((user) => user !== uid)
    }
    else {
        this.upvotes.push(uid)
        this.downvotes = this.downvotes.filter((user) => user !== uid)
    }
    await this.save()
}

postSchema.methods.incrementDownvote = async function (uid) {
    if (this.downvotes.includes(uid)) {
        this.downvotes = this.downvotes.filter((user) => user !== uid)
    }
    else {
        this.downvotes.push(uid)
        this.upvotes = this.upvotes.filter((user) => user !== uid)
    }
    await this.save()
}






module.exports = mongoose.model('Post', postSchema)
