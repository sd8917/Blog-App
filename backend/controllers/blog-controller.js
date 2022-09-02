const Blog = require("../model/Blog");
const User = require("../model/User");

exports.getAllBlog = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }

  return res.status(200).json({ blogs });
};

exports.createBlog = async (req, res, next) => {
  const { title, desc, image, user } = req.body;
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Unable to find the user by this ID" });
  }

  const blog = new Blog({
    title,
    desc,
    image,
    user,
  });

  try {
    await blog.save();
    //push to existing user blogs push new blog..
    existingUser.blogs.push(blog);
    await existingUser.save();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: `Code error ${error}` });
  }

  return res.status(201).json({ blog });
};

exports.updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, desc } = req.body;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      desc,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the Blog" });
  }
  return res.status(200).json({ blog });
};

exports.getBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(404).json({ message: "No blog found !" });
  }
  return res.status(200).json({ blog });
};

exports.deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log("error", error);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable to delete blog" });
  }
  return res.status(200).json({ message: "Successfully deleted !" });
};

exports.getBlogByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }

  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog found !" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
