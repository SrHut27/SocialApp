const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Importação de rotas:
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postsRoute");
const chatRoute = require("./routes/chatRoute");

// Aplicação de rotas:
app.use("/auth", authRoute);
app.use("/app", postRoute);
app.use("/messages", chatRoute);

const server = app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

// Configurando o Socket.IO
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("A user connected");
});
