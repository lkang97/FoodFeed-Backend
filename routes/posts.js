const express = require("express");

const db = require("../db/models");
const { Post, User, Comment, Like } = db;
const { requireAuth } = require("../auth");
const { asyncHandler } = require("../utils");

const router = express.Router();

//Returns all the posts for a single user
router.get(
  "/users/:userId(\\d+)/posts",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ["username", "imageUrl", "id"] }],
      where: { userId },
      order: [["id", "DESC"]],
    });
    if (posts) {
      res.json({ posts });
    }
  })
);

//Returns all the posts from the database
router.get(
  "/posts",
  requireAuth,
  asyncHandler(async (req, res) => {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ["username", "imageUrl", "id"] }],
      order: [["id", "DESC"]],
    });
    if (posts) {
      res.json({ posts });
    }
  })
);

//Returns a single post from its id
router.get(
  "/posts/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    const { username, imageUrl } = await User.findByPk(Number(post.userId));
    if (post) {
      res.json({ post, username, imageUrl });
    }
  })
);

//Creates a new post
router.post(
  "/posts",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, imageUrl, caption } = req.body;
    const post = await Post.create({ userId, imageUrl, caption });
    res.status(201).json({ post });
  })
);

//Deletes a post if the userId matches the post's original user
router.delete(
  "/posts/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    const comments = await Comment.findAll({ where: { postId } });
    const likes = await Like.findAll({ where: { postId } });
    if (post && Number(userId) === post.userId) {
      for (let comment of comments) {
        await comment.destroy();
      }

      for (let like of likes) {
        await like.destroy();
      }

      await post.destroy();
      res.status(204).end();
    }
  })
);

module.exports = router;
