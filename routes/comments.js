const express = require("express");

const db = require("../db/models");
const { Comment } = db;
const { requireAuth } = require("../auth");
const { asyncHandler } = require("../utils");

const router = express.Router();

const userPermissionError = () => {
  const err = Error("You do not have permission to do this");
  err.title = "User alert.";
  err.status = 404;
  return err;
};

router.get(
  "/posts/:postId/comments",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await Comment.findAll({ where: { postId } });
    res.json({ comments });
  })
);

router.post(
  "/posts/:postId/comments",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { userId, comment } = req.body;
    const newComment = await Comment.create({ userId, postId, comment });
    if (newComment) {
      res.status(201).json({ newComment });
    }
  })
);

router.put(
  "/comments/:id",
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const { userId, comment } = req.body;
    const commentToEdit = await Comment.findByPk(commentId);
    if (commentToEdit && Number(userId) === commentToEdit.userId) {
      await commentToEdit.update({ comment });
      res.json({ commentToEdit });
    } else {
      next(userPermissionError());
    }
  })
);

router.delete(
  "/comments/:id",
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const { userId } = req.body;
    const comment = await Comment.findByPk(commentId);
    if (comment && Number(userId) === comment.userId) {
      await comment.destroy();
      res.status(204).end();
    } else {
      next(userPermissionError());
    }
  })
);

module.exports = router;
