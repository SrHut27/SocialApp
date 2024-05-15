// A função de ResetEmail precisa ser alterada, pois ela deve redirecionar para o client, não para o servidor

// Importando as configurações de email:
const transporter = require("../configs/email_config");

function sendPasswordResetEmail(email, resetToken) {
  const mailOptions = {
    from: "serviceemail@gmail.com",
    to: email,
    subject: "Recuperação de Senha",
    html: `
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <p>Olá,</p>
                <p>Esqueceu sua senha no SocialApp, com o email: ${email}?</p>
                <p>Para redefinir sua senha, na página de recuperação, insira esse valor:</p>
                <p>${resetToken} </p>
                <p style="margin-top: 20px;">Se você não solicitou uma redefinição de senha, ignore este email.</p>
                <p style="margin-top: 20px;">Atenciosamente,</p>
                <p style="font-weight: bold;">Suco Maria Peregrina</p>
            </div>
        `,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Erro ao enviar email de recuperação de senha: ", error);
    } else {
      console.log("Email de recuperação de senha enviado com sucesso.");
    }
  });
}

// Função para enviar o email de confirmação de alteração de senha
function sendPasswordResetConfirmationEmail(email) {
  const mailOptions = {
    from: "serviceemail@gmail.com",
    to: email,
    subject: "Confirmação de Alteração de Senha",
    html: `
            <p>Sua senha foi alterada com sucesso no SocialApp, com o email: ${email}.</p>
            <p>Se você não realizou esta alteração, entre em contato conosco imediatamente. Clique no link ou contate-nos pelo telefone: (17) XXXX-XXXX</p>
        `,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(
        "Erro ao enviar email de confirmação de alteração de senha: ",
        error
      );
    } else {
      console.log(
        "Email de confirmação de alteração de senha enviado com sucesso."
      );
    }
  });
}

// Função para gerar um token de redefinição de senha aleatório
function generateResetToken() {
  const tokenLength = 20;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// Exportando as funções
module.exports = {
  sendPasswordResetEmail,
  sendPasswordResetConfirmationEmail,
  generateResetToken,
};
