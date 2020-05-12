const express = require("express");

const db = require("../db/models");
const { User, Post } = db;
const { asyncHandler, handleValidationErrors } = require("../utils");

const router = express.Router();

module.exports = router;
