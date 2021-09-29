const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  caption: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
