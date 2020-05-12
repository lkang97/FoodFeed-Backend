const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const imageRouter = require("./routes/image-upload");

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/", postsRouter);
app.use("/", commentsRouter);
app.use("/", likesRouter);
app.use("/", imageRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested page couldn't be found.");
  err.status = 404;
  next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === "production";
  res.render("error", {
    title: "Server Error",
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
