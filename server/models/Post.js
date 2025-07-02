const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  votedUsers: [ { userId: String, vote: { type: String, enum: ["upvote", "downvote"] } }],  
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);