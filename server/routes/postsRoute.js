const express = require("express");
const router = express.Router();

const verifyToken = require("../controllers/authControllers");

// Importação dos controllers
const { addPosts } = require("../controllers/postsControllers");

module.exports = router;
