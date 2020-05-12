const express = require("express");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");

const db = require("../db/models");
const { User, Post, Comment } = db;

const router = express.Router();

router.get(
  "/posts/:postId/comments",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt"]],
    });
  })
);

module.exports = router;
