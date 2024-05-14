// Importando funções necessárias para a API:
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const connection = require("../configs/database_connection"); // Importando a instância do banco de dados

// Importando ações de email:
const {
  sendPasswordResetEmail,
  sendPasswordResetConfirmationEmail,
  generateResetToken,
} = require("../utils/email_functions");

// Conectando ao banco de dados:
connection.connect((error) => {
  if (error) throw error;
});

// Função de cadastrar usuário
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
      error: `As senhas não coincidem. Por favor, tente novamente.`,
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
        error: `O username: ${username} já foi cadastrado e não pode ser cadastrado novamente`,
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
          resultado: `Olá ${username}! Seu cadastro foi realizado com sucesso! Você será redirecionado para a tela de login em breve.`,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: `Não foi possível conectar ao banco de dados`,
    });
    console.log(error);
    return;
  }
};

// Função de logar usuário
const loginControll = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      error: `Se deseja logar, informe todos os dados de login necessários`,
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
        res.status(200).json({ token, expiresIn, user });
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

// Função de criação de token de recuperação
const forgotPasswordControll = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(403).json({
      error: `Se deseja recuperar a senha, informe um email`,
    });
    return;
  }

  try {
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

    if (existingEmail.length === 0) {
      res.status(403).json({
        error: `O email: ${email} que você deseja recuperar a conta não está associado a nenhuma conta. Se desejar, registre-se no SocialApp`,
      });
      return;
    } else {
      const resetToken = generateResetToken();
      const userID = existingEmail[0].id;

      const setResetToken = await new Promise((resolve, reject) => {
        connection.execute(
          "UPDATE users SET reset_token = ? WHERE id = ?",
          [resetToken, userID],
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
        resultado: `Foi enviado um email de recuperação de senha para o endereço: ${email}`,
      });
      sendPasswordResetEmail(email, resetToken);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `No momento, não é possível estabeler uma conexão com o banco de dados`,
    });
    return;
  }
};

// Rota para exibir o formulário de alteração de senha com base no token de redefinição de senha
const resetPasswordGET = async (req, res) => {
  const { token } = req.params;

  try {
    const exisitngResetToken = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM users WHERE reset_token = ?",
        [token],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
    if (exisitngResetToken.length === 0) {
      res.status(403).json({
        error: `Houve um engano. Não há nenhuma senha para ser recuperada com esse token. Se deseja recuperar sua conta, tente novamente em Recuperar Senha...`,
      });
      return;
    } else {
      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `No momento, não foi possível estabelecer uma conexão com o banco de dados`,
    });
    return;
  }
};

// Controlle para recuperar/trocar senha
const resetPasswordPOST = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    if (!password || !confirmPassword) {
      res.status(403).json({
        error: `Se deseja recuperar sua senha, informe todos os dados necessários`,
      });
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        error: `As senhas não coincidem. Por favor, tente novamente.`,
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

    const exisitngResetToken = await new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM users WHERE reset_token = ?",
        [token],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });

    if (exisitngResetToken.length === 0) {
      res.status(403).json({
        error: `Não há recuperação de senha para esta conta.`,
      });
      return;
    } else {
      const userID = exisitngResetToken[0].id;
      const userEmail = exisitngResetToken[0].email;

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatePassword = await new Promise((resolve, reject) => {
        connection.execute(
          "UPDATE users SET password = ?, reset_token = NULL WHERE id = ?",
          [hashedPassword, userID],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });
      sendPasswordResetConfirmationEmail(userEmail);

      res.status(200).json({
        resultado: `Sua senha foi alterada com sucesso!`,
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

// Controle de acesso de rotas:
const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = {
  registerControll,
  loginControll,
  forgotPasswordControll,
  resetPasswordGET,
  resetPasswordPOST,
  verifyToken,
};
