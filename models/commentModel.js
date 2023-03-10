const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  authorID: { type: mongoose.Types.ObjectId, required: true },
  date: { type: Date, default: Date.now },
  parentID: { type: Schema.Types.ObjectId, ref: 'Comment' }, // reference to parent comment
  postID: { type: Schema.Types.ObjectId, ref: 'Post', required: true } // reference to post that the comment is on
});

commentSchema.statics.deleteComment = async function (id) {
  await this.findByIdAndDelete(id)
}

module.exports = mongoose.model('Comment', commentSchema);

