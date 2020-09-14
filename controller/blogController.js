const Post = require("../models/posts");

exports.blogHome = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 9;
    const skip = (page - 1) * limit;

    let numBlogs;

    numBlogs = await Post.countDocuments();
    if (skip >= numBlogs) throw new Error("This Page Does Not Exist");

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const pages = Math.ceil(numBlogs / 9);

    res.status(200).render("blog/blogHome", {
      posts,
      pages,
      limit,
      pagina: page,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.showBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });

    res.status(200).render("blog/showBlog", { post });
  } catch (err) {
    console.error(err);
  }
};

exports.getPostForm = (req, res) => {
  res.status(200).render("blog/makePostForm");
};

exports.getEditBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    res.status(200).render("blog/editPost", { post });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      title: "An error ha occurred on our side",
      msg: err.message,
    });
  }
};
