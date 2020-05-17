const express = require("express");
const { requireAuth } = require("../auth");

const upload = require("../upload");
const imageUpload = upload.single("image");
const router = express.Router();

router.post("/upload", requireAuth, function (req, res) {
  imageUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
