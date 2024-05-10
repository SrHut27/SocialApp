const express = require("express");
const router = express.Router();

// Importando os controles necessários
const {
  registerControll,
  loginControll,
  forgotPasswordControll,
  resetPasswordGET,
  resetPasswordPOST
} = require("../controllers/authControllers");

router.post("/register", (req, res) => {
  registerControll(req, res);
});

router.post("/login", (req, res) => {
  loginControll(req, res);
});

router.post("/forgot-password", (req, res) => {
  forgotPasswordControll(req, res);
});

router.get("/reset-password/:token", (req, res) => {
  resetPasswordGET(req, res);
})

router.post("/reset-password/:token", (req, res) => {
  resetPasswordPOST(req, res);
})

module.exports = router;
