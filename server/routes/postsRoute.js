const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/authControllers");

// Importação dos controllers
const {
  addPosts,
  getPosts,
  deletePost,
} = require("../controllers/postsControllers");

router.post("/add", verifyToken, (req, res) => {
  addPosts(req, res);
});

router.get("/", (req, res) => {
  getPosts(req, res);
});

router.post("/delete/:postID", (req, res) => {
  deletePost(req, res);
});

module.exports = router;
