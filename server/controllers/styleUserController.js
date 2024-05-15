const connection = require("../configs/database_connection");
const fs = require("fs");

const changeUserName = async (req, res) => {
  const { userID, userNAME, newUsername } = req.body;

  if (!userID) {
    res.status(500).json({
      error: `Não há nenhum usuário logado no momento...`,
    });
    return;
  }

  if (!newUsername) {
    res.status(403).json({
      error: `Se deseja alterar seu nome de usuário, informe um novo.`,
    });
    return;
  }

  if (userNAME === newUsername) {
    res.status(403).json({
      error: `O username ${userNAME} já está ligado a sua conta...`,
    });
    return;
  }

  try {
    const existingUsername = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM users WHERE username = ?",
        [newUsername],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
    if (existingUsername.length > 0) {
      res.status(400).json({
        error: `O username ${newUsername} já está ligado a uma conta...`,
      });
      return;
    } else {
      const alterarUsername = await new Promise((resolve, reject) => {
        connection.execute(
          "UPDATE users SET username = ? WHERE id = ?",
          [newUsername, userID],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });

      res.status(200).json({
        resultado: `O seu username agora é ${newUsername}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `No momento, não foi possível estabeler uma conexão com o banco de dados`,
    });
    return;
  }
};

const updatePhoto = async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    res.status(500).json({
      error: `Não há nenhum usuário logado no momento...`,
    });
    return;
  }

  if (!req.file) {
    res.status(403).json({
      error: `Se deseja inserir uma foto de perfil, deve enviar um arquivo PNG ou JPG`,
    });
    return;
  }

  // Verifica se o tipo de arquivo é permitido
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(req.file.mimetype)) {
    res.status(403).json({
      error: `O tipo de arquivo enviado não é suportado. Por favor, envie um arquivo PNG, JPG ou WEBP.`,
    });
    return;
  }

  let profileFilePath = "/profile_photos/" + req.file.filename;
  try {
    const existingUser = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM users WHERE id = ?",
        [userID],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
    if (existingUser.length === 0) {
      res.status(500).json({
        error: `Houve um erro de conexão e não reconhecemos nenhum usuário logado. Faça login no sistema e tente novamente`,
      });
      return;
    } else {
      const addProfilePhoto = await new Promise((resolve, reject) => {
        connection.execute(
          "UPDATE users SET profile_photo_path = ? WHERE id = ?",
          [profileFilePath, userID],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });
      res.status(200).json({
        resultado: `Sua foto de perfil foi atualizada com sucesso!`,
      });
    }
  } catch (error) {}
};

module.exports = { changeUserName, updatePhoto };
