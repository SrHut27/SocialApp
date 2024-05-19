const connection = require("../configs/database_connection");

connection.connect((error) => {
  if (error) throw error;
});

const addComment = async (req, res) => {
  const { postID } = req.params;
  const { userID, content } = req.body;

  if (!userID) {
    res.status(500).json({
      error: `Não há nenhum usuário logado no momento...`,
    });
    return;
  }

  if (!content) {
    res.status(400).json({
      error: `Se deseja fazer um comentário, precisa fazê-lo...`,
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
    }
    const existingPost = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM posts WHERE id = ?",
        [postID],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });

    if (existingPost.length === 0) {
      res.status(400).json({
        error: `Não existe nenhuma publicação com esses dados...`,
      });
      return;
    } else {
      const addComment = await new Promise((resolve, reject) => {
        connection.execute(
          "INSERT INTO comments (user_id, post_id, comment_content) VALUES (?,?,?)",
          [userID, postID, content],
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
        resultado: `Comentário realizado com sucesso!`,
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

module.exports = { addComment };
