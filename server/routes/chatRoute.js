const express = require("express");
const router = express.Router();

const { sendMessage, getMessages } = require("../controllers/chatControllers");

router.post("/send", (req, res) => {
  sendMessage(req, res);
});

router.get("/:sender/:receiver", (req, res) => {
  getMessages(req, res);
});

module.exports = router;
