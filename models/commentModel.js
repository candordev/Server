const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//content is straightforward
//authorID is the userID of the author of the comment
//date straightforward
//parentID is the id of another comment. If a comment has a parentID that means its a subcomment
//postID is the id of the post that it is under
const commentSchema = new Schema({
  content: { type: String, required: true },
  authorID: { type: mongoose.Types.ObjectId, required: true },
  date: { type: Date, default: Date.now },
  parentID: { type: Schema.Types.ObjectId, ref: 'Comment' }, // reference to parent comment
  postID: { type: Schema.Types.ObjectId, ref: 'Post', required: true } // reference to post that the comment is on
});

//method of the model that lets you delete a comment
commentSchema.statics.deleteComment = async function (id) {
  await this.findByIdAndDelete(id)
}

module.exports = mongoose.model('Comment', commentSchema);

