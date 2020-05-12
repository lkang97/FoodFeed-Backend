const express = require("express");

const db = require("../db/models");
const { Post } = db;
const { requireAuth } = require("../auth");
const { asyncHandler } = require("../utils");

const router = express.Router();

router.get(
  "/users/:userId/posts",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const posts = await Post.findAll({ where: { userId } });
    if (posts) {
      res.json({ posts });
    }
  })
);

router.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const posts = await Post.findAll();
    if (posts) {
      res.json({ posts });
    }
  })
);

router.get(
  "/posts/:id",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await Post.findByPk(postId);
    if (post) {
      res.json({ post });
    }
  })
);

router.post(
  "/posts",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, imageUrl, caption } = req.body;
    const post = await Post.create({ userId, imageUrl, caption });
    res.status(201).json({ post });
  })
);

router.delete(
  "/posts/:id",
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
