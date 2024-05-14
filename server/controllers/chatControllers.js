const Message = require("../models/message");
const io = require("socket.io-client");

let messages = []; // Armazenamento temporário das mensagens

const sendMessage = (req, res) => {
  const { sender, receiver, content } = req.body;
  const timestamp = new Date().toISOString(); // Obtém o timestamp atual

  const newMessage = new Message(
    messages.length + 1,
    sender,
    receiver,
    content,
    timestamp
  );
  messages.push(newMessage);

  // Emitir mensagem via Socket.IO
  io.emit("message", newMessage);

  res.status(200).json({ message: "Mensagem enviada com sucesso!" });
};

const getMessages = (req, res) => {
  const { sender, receiver } = req.params;
  const conversation = messages.filter(
    (message) =>
      (message.sender === sender && message.receiver === receiver) ||
      (message.sender === receiver && message.receiver === sender)
  );

  res.status(200).json({ messages: conversation });
};

module.exports = {
  sendMessage,
  getMessages,
};
