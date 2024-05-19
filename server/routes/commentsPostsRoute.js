const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/authControllers");

// Importando controles dessa rota:
const { addComment } = require("../controllers/commentsPostsControllers");

router.post("/add/:postID", verifyToken, (req, res) => {
  addComment(req, res);
});

module.exports = router;
