const express = require("express");

const db = require("../db/models");
const { Comment, User } = db;
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const router = express.Router();

const userPermissionError = () => {
  const err = Error("You do not have permission to do this");
  err.title = "User alert.";
  err.status = 404;
  return err;
};

//Returns all the comments for a particular post
router.get(
  "/posts/:postId(\\d+)/comments",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await Comment.findAll({
      include: [{ model: User, attributes: ["username", "imageUrl", "id"] }],
      where: { postId },
      order: [["createdAt", "ASC"]],
    });
    res.json({ comments });
  })
);

//Creates a new comment on a single post
router.post(
  "/posts/:postId(\\d+)/comments",
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { userId, comment } = req.body;
    const newComment = await Comment.create({ userId, postId, comment });
    if (newComment) {
      res.status(201).json({ newComment });
    }
  })
);

//Edits a single comment if the userId matches the comment's
router.put(
  "/comments/:id(\\d+)",
  requireAuth,
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

//Deletes a comment by its id if the userId matches the comment's
router.delete(
  "/comments/:id(\\d+)",
  requireAuth,
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
