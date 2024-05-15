const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/authControllers");

const { upload } = require("../configs/multer_uploader");

// Importação dos controllers
const {
  addPosts,
  getPosts,
  deletePost,
} = require("../controllers/postsControllers");

router.post("/add", verifyToken, upload.single("file"), (req, res) => {
  addPosts(req, res);
});

router.get("/", verifyToken, (req, res) => {
  getPosts(req, res);
});

router.post("/delete/:postID", verifyToken, (req, res) => {
  deletePost(req, res);
});

module.exports = router;
