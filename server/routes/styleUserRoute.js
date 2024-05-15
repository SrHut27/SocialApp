const express = require("express");
const router = express.Router();

// Middleware de verificação de usuário
const { verifyToken } = require("../controllers/authControllers");

// Importando os controles da rota:
const {
  changeUserName,
  updatePhoto,
} = require("../controllers/styleUserController");

// Importando uploader de foto de perfil (só pode suportar jpg e png!)
const { upload_profile } = require("../configs/multer_uploader");

// Rotas da aplicação:
router.post("/username", verifyToken, (req, res) => {
  changeUserName(req, res);
});

router.post("/profile_photo", upload_profile.single("file"), (req, res) => {
  updatePhoto(req, res);
});

module.exports = router;
