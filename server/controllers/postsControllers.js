const connection = require("../configs/database_connection");

// Função para formatar data e hora da consulta do banco de dados:
const formatDateTime = require("../utils/date_format");

// Rota para mostrar as publicações
const getPosts = async (req, res) => {
  try {
    const getingPosts = await new Promise((resolve, reject) => {
      connection.execute("SELECT * FROM posts", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
    if (getingPosts.length === 0) {
      res.status(404).json({
        error: `Não há nenhum post ainda...`,
      });
      return;
    } else {
      const formattedPosts = getingPosts.map(posts => ({
        ...posts,
        created_at: formatDateTime(posts.created_at)
      }));

      res.status(200).json({
        resultado: formattedPosts,
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

// Rota para adicionar publicação
const addPosts = async (req, res) => {
  const { userID, content } = req.body;
  let filePath = null;
  let fileExtension = null;

  if (!userID) {
    res.status(500).json({
      error: `Não há nenhum usuário logado no momento...`,
    });
    return;
  }

  if (!content) {
    res.status(401).json({
      error: `Se deseja cadastrar uma publicação, informe o conteúdo dela`,
    });
    return;
  }

  if (!req.file) {
    filePath = null;
  } else {
    filePath = "/posts/" + req.file.filename;
    fileExtension = req.file.filename.split(".").pop();
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
      const username = existingUser[0].username;
      const addPost = await new Promise((resolve, reject) => {
        connection.execute(
          "INSERT INTO posts (user_id, username, content, filePath, fileExtension) VALUES (?,?,?,?,?)",
          [userID, username, content, filePath, fileExtension],
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
        resultado: `Publicação realizada com sucesso!`,
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

// Rota para apagar publicação
const deletePost = async (req, res) => {
  const { userID } = req.body;
  const { postID } = req.params;

  try {
    const existingPost = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM posts WHERE id = ? AND user_id = ?",
        [postID, userID],
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
      res.status(405).json({
        error: `Houve um erro ao apagar a publicação, ela não foi encontrada`,
      });
      return;
    } else {
      const post = existingPost[0];

      const deletingPost = await new Promise((resolve, reject) => {
        connection.execute(
          "DELETE FROM posts WHERE id = ?",
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
      res.status(200).json({
        resultado: `A publicação -${post.title}- foi apagada com sucesso`,
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

module.exports = { addPosts, getPosts, deletePost };
