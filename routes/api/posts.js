const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const router = express.Router();

// @route   GET api/posts
// @desc    get all posts
// @access  public (token not required)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", ["name", "picture"]);
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

// @route   POST api/posts
// @desc    create post
// @access  private

router.post(
  "/",
  [auth, check("picture", "Please upload a Picture").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json("Picture is required");
    }
    const { picture, caption } = req.body;
    try {
      let post = await new Post({
        user: req.user.id,
        picture,
        caption,
      });
      post = await post.save();
      //   console.log("this is an insta-post", post);
      res.json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server error");
    }
  }
);

// @route   Get api/posts/me
// @desc    get my posts
// @access  private

router.get("/me", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

// @route   Get api/posts/:user_id
// @desc    get posts of user_id
// @access  public

router.get("/:user_id", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.user_id });
    if (posts.length === 0) {
      return res.status(400).json("Posts not found");
    }
    res.json(posts);
  } catch (error) {
    if (error.kind === "ObjectId") {
      console.error(error.message);
      return res.status(400).send("User not Found");
    }
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

// Get post by post_id

router.get("/post/:post_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).populate("user", [
      "name",
      "picture",
    ]);
    if (!post) {
      return res.status(400).json("Post not found");
    }
    res.json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

// like post

router.put("/like", auth, async (req, res) => {
  try {
    const liked = await Post.findByIdAndUpdate(
      req.body.postID,
      {
        $push: { likes: req.user.id },
      },
      {
        new: true,
      }
    );
    res.json(liked);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

// unlike post

router.put("/unlike", auth, async (req, res) => {
  try {
    const unliked = await Post.findByIdAndUpdate(
      req.body.postID,
      {
        $pull: { likes: req.user.id },
      },
      {
        new: true,
      }
    );
    res.json(unliked);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

// comment on post

router.put("/comment", auth, async (req, res) => {
  try {
    const comment = await Post.findByIdAndUpdate(
      req.body.postID,
      {
        $push: {
          comments: {
            text: req.body.text,
            postedBy: req.user.id,
            picture: req.body.picture,
          },
        },
      },
      {
        new: true,
      }
    );
    res.json(comment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
