// Importando funções necessárias para a API:
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const connection = require("../configs/database_connection"); // Importando a instância do banco de dados

// Conectando ao banco de dados:
connection.connect((error) => {
  if (error) throw error;
});

const registerControll = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    res.status(400).json({
      error: `Se deseja continuar o cadastro, informe todos os dados necessários.`,
    });
    return;
  }

  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      error: `A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial.`,
    });
    return;
  }

  if (password != confirmPassword) {
    res.status(400).json({
      error: `As senhas não coicidem. Por favor, tente novamente.`,
    });
    return;
  }

  try {
    const existingUsername = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM users WHERE username = ?",
        [username],
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
      res.status(403).json({
        error: `O username: ${username} já foi cadastrado abteriormente e não pode ser cadastrado novamente`,
      });
      return;
    } else {
      const existingEmail = await new Promise((resolve, reject) => {
        connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });

      if (existingEmail.length > 0) {
        res.status(403).json({
          error: `O email: ${email} já está associado a uma conta e não pode ser registrado novamente`,
        });
        return;
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const addUser = await new Promise((resolve, reject) => {
          connection.execute(
            "INSERT INTO users (username, email, password) VALUES (?,?,?)",
            [username, email, hashedPassword],
            (error, results) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(results);
            }
          );
        });
        res.status(201).json({
          resultado: `Olá ${username}! Seja bem vindo ao nosso site :). Clique em logar agora para acessar nosso site!`,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: `Não foi possível conectar ao banco de dados no momento`,
    });
    console.log(error);
    return;
  }
};

const loginControll = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      error: `Se deseja logar, informe todas os dados de login necessários`,
    });
    return;
  }

  try {
    const existingUser = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email],
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
      res.status(401).json({
        error: `Este email: ${email} não está vinculado a nenhuma conta. Cadastre-se no sistema.`,
      });
      return;
    } else {
      const user = existingUser[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(403).json({
          error: `A senha informada está incorreta`,
        });
        return;
      } else {
        const expiresIn = "1m";
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: expiresIn,
        });
        res.status(200).json({ token, expiresIn });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `No momento não foi possível estabelecer uma conexão com o servidor, tente novamente mais tarde`,
    });
    return;
  }
};

module.exports = { registerControll, loginControll };
