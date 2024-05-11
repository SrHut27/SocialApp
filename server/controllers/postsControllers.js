const connection = require("../configs/database_connection");

const addPosts = async (req, res) => {
  const { userID, title, content } = req.body;

  if (!userID) {
    res.status(402).json({
      error: `Não há nenhum usuário logado no momento...`,
    });
    return;
  }

  if (!title) {
    res.status(401).json({
      error: `Se deseja cadastrar uma publicação, informe um título a ela`,
    });
    return;
  }

  try {
    // Verificanndo se o userID é um vallor real do banco
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
      const addPost = await new Promise((resolve, reject) => {
        connection.execute(
          "INSERT INTO posts (user_id, title, content) VALUES (?,?,?)",
          [userID, title, content],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(error);
          }
        );
      });

      res.status(200).json({
        resultado: `Publicação realizada com sucesso!`,
      });
    }
  } catch (error) {}
};

module.exports = { addPosts };
