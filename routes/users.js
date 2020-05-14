const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { getUserToken, requireAuth } = require("../auth");
const { asyncHandler, handleValidationErrors } = require("../utils");

//Imports database models
const db = require("../db/models");
const { User } = db;

const router = express.Router();

const userNotFoundError = (id) => {
  const err = Error(`User with id of ${id} could not be found.`);
  err.title = "User not found.";
  err.status = 404;
  return err;
};

//Checks to see if email and password are valid
const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

//Returns the username, profileName, imageUrl, and biography
// for a single user
router.get(
  "/:id(\\d+)",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
      const { username, profileName, imageUrl, biography } = user;
      res.json({ username, profileName, imageUrl, biography });
    } else {
      next(userNotFoundError(userId));
    }
  })
);

//Updates a user's profileName, imageUrl, and/or biography
router.put(
  "/:id(\\d+)",
  requireAuth,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const { profileName, imageUrl, biography } = req.body;

    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    if (user) {
      await user.update({ profileName, imageUrl, biography });
      res.json(user);
    } else {
      next(userNotFound(userId));
    }
  })
);

//Creates a new user and sends back a 201 created status, along
// with the token and userId
router.post(
  "/",
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 30 })
    .withMessage("Max username length is 30 characters"),
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      username,
      email,
      password,
      profileName,
      imageUrl,
      biography,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      profileName,
      imageUrl,
      biography,
    });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

//Checks to see if the email and password credentials provided match
//what is in the database for a particular user
router.post(
  "/token",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id, name: user.username } });
  })
);

module.exports = router;
