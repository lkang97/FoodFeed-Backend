const express = require("express");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");

const db = require("../db/models");
const { Like } = db;

const router = express.Router();

router.get(
  "/posts/:postId/likes",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const likes = await Like.findAll({ where: { postId } });
    res.json({ likes });
  })
);

router.post(
  "/posts/:postId/likes",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { userId } = req.body;
    const like = await Like.create({ userId, postId });
    res.status(201).end();
  })
);

router.delete(
  "/likes/:id",
  asyncHandler(async (req, res) => {
    const likeId = parseInt(req.params.id, 10);
    const { userId } = req.body;
    const like = await Like.findByPk(likeId);
    if (like && Number(userId) === like.userId) {
      await like.destroy();
      res.status(204).end();
    }
  })
);
module.exports = router;
