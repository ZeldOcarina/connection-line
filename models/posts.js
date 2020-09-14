const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const User = require("./users");

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
  title: {
    required: [true, "A blog article must have a title"],
    unique: true,
    type: String,
  },
  subtitle: String,
  slug: { type: String, slug: "title", unique: true, slugPaddingSize: 1 },
  content: String,
  createdAt: Date,
  image: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
});

postSchema.pre("save", async function () {
  this.createdAt = Date.now();
  const author = await User.findOneAndUpdate(
    { _id: this.author },
    { postsMade: this._id },
    { new: true }
  );
  this.image = this.image || "/assets/blog/default-top-picture";
});

postSchema.pre(/^find/, function (next) {
  this.populate({ path: "author", select: "name avatar" });
  this.populate({ path: "comments", select: "comment author createdAt" });
  next();
});

module.exports = mongoose.model("Post", postSchema);
