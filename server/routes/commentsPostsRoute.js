const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/authControllers");

// Importando controles dessa rota:
const {
  addComment,
  getComments,
  delComments,
} = require("../controllers/commentsPostsControllers");

router.post("/add/:postID", verifyToken, (req, res) => {
  addComment(req, res);
});

router.get("/", verifyToken, (req, res) => {
  getComments(req, res);
});

router.post("/del/:commentID", verifyToken, (req, res) => {
  delComments(req, res);
});

module.exports = router;
