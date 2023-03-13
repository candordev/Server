const mongoose = require('mongoose')

const Schema = mongoose.Schema


//Explanation of the the ones that aren't self-explanatory:
//contentType: either problem, solution, or poll
//if the content type is a poll, the pollOptions is filled with the options and the poll results is an array that keeps track of the votes for each option
//the upvotes and downvotes are arrays of userIDs to show the users that have liked and disliked a post 
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

//edits the editable parts of the post. NEED TO FIGURE OUT HOW TO PROPERLY EDIT POLL STUFF SO THAT IT KEEPS THE EXISTING RESULTS
//MAYBE GET RID OF THIS ALL TOGETHER
postSchema.methods.editPost = async function (reqObj) {
    this.title = reqObj.title || this.title
    this.imgURL = reqObj.imgURL || this.imgURL
    this.content = reqObj.content || this.content
    this.pollOptions = reqObj.pollOptions || this.pollOptions
    this.pollResults = reqObj.pollResults || this.pollResults
    await this.save()
}

//simply deletes post by id
postSchema.statics.deletePost = async function (id) {
    await this.findByIdAndDelete(id)
}

//increments upvotes
//parameter is the id of the user who is upvoting
//if the user has already upvoted this post, the upvote is removed
//otherwise, the user id is added to the upvote array and removed from the downvote array if it is there
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

//increments downvotes
//parameter is the id of the user who is downvoting
//if the user has already downvoted this post, the downvote is removed
//otherwise, the user id is added to the downvote array and removed from the upvote array if it is there
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

//adds comment by adding it to comments array
postSchema.methods.addComment = async function(commentID) {
    try {
      this.comments.push(commentID)
      await this.save()
    } catch (error) {
      throw Error(error)
    }
  }
  
  //comment is removed. this is called from commentController when a comment is deleted
  postSchema.methods.removeComment = async function(commentID) {
    try {
        this.comments = this.comments.filter((comment) => !comment.equals(new mongoose.Types.ObjectId(commentID)))
        await this.save()
    } catch (error) {
      throw Error(error)
    }
  }





module.exports = mongoose.model('Post', postSchema)
