const express = require("express");

const db = require("../db/models");
const { Post } = db;
const { requireAuth } = require("../auth");
const { asyncHandler } = require("../utils");

const router = express.Router();

//Returns all the posts for a single user
router.get(
  "/users/:userId(\\d+)/posts",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const posts = await Post.findAll({ where: { userId } });
    if (posts) {
      res.json({ posts });
    }
  })
);

//Returns all the posts from the database
router.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const posts = await Post.findAll();
    if (posts) {
      res.json({ posts });
    }
  })
);

//Returns a single post from its id
router.get(
  "/posts/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    if (post) {
      res.json({ post });
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
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    if (post && Number(userId) === post.userId) {
      await post.destroy();
      res.status(204).end();
    }
  })
);

module.exports = router;