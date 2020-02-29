const Post = require("../models/posts");

exports.blogHome = async (req, res) => {
  try {
    const posts = await Post.find({});
    //console.log(posts);
    return res.status(200).render("blog/blogHome", { posts });
  } catch (err) {
    console.error(err);
  }
  //console.log(res.locals.user);
  //console.log(req.user);
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
      msg: err.message
    });
  }
};
