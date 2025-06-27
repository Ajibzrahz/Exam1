import postModel from "../models/post_model.js";
import userModel from "../models/user_model.js";

const createPost = async (req, res) => {
  const { id } = req.user;
  const info = req.body;

  if (!id) {
    res.send("You cannot create a post, login!");
  }
  try {
    const newPost = new postModel({
      user: id,
      ...info,
    });
    const savedPost = await newPost.save();
    res.send("Posted");

    //update usermodel
    const userInfo = await userModel.findById(id);
    userInfo.posts.push(savedPost.id);
    await userInfo.save();
  } catch (error) {
    res.json(error.message);
  }
};

const getPost = async (req, res) => {
    const { postId } = req.query;

  try {
    const post = await postModel
      .findById(postId)
      .populate({
        path: "user",
        select: "name email hobbies",
      });

      res.json(post)
  } catch (error) {
    res.json(error.message);
  }
};


export {createPost, getPost}
