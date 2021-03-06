const express = require("express");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const db = require("../db/models");
const { Like } = db;

const router = express.Router();

//Returns all the likes for a single post
router.get(
  "/posts/:postId(\\d+)/likes",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const likes = await Like.findAll({
      where: { postId },
    });
    const userIds = likes.map((like) => like.userId);
    res.json({ userIds });
  })
);

//Adds a like onto a post
router.post(
  "/posts/:postId(\\d+)/likes",
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { userId } = req.body;
    const like = await Like.create({ userId, postId });
    res.status(201).json({ like });
  })
);

//Removes a like from a post
router.delete(
  "/posts/:postId(\\d+)/likes",
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { userId } = req.body;
    const like = await Like.findOne({ where: { userId, postId } });
    if (like) {
      await like.destroy();
      res.status(204).end();
    }
  })
);

module.exports = router;
