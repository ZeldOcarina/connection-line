const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const User = require("./users");

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    validator: function (v) {
      return v.length <= 60;
    },
    message: "Il titolo della pagina non può superare i 60 caratteri.",
  },
  title: {
    required: [true, "A blog article must have a title"],
    unique: true,
    type: String,
  },
  subtitle: String,
  seoDescription: {
    type: String,
    validator: function (v) {
      return v.length >= 120 && v.length <= 320;
    },
    message:
      "La descrizione SEO deve superare i 120 caratteri ed essere inferiore ai 320!",
  },
  slug: { type: String, /*slug: "title",*/ unique: true, slugPaddingSize: 1 },
  content: String,
  createdAt: Date,
  image: String,
  imageAltText: String,
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
