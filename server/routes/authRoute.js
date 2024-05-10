const express = require("express");
const router = express.Router();

// Importando os controles necessários
const {
  registerControll,
  loginControll,
} = require("../controllers/authControllers");

router.post("/register", (req, res) => {
  registerControll(req, res);
});

router.post("/login", (req, res) => {
  loginControll(req, res);
});

module.exports = router;
