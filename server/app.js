const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Impportando conexão com a DB e as tabelas:
const connection = require("./configs/database_connection");

// Conectando com a DB e criando tabelas:
connection.connect((error) => {
  if (error) throw error;
});

// Importação de rotas:
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postsRoute");
const styleUserRoute = require("./routes/styleUserRoute");
const commentsPostsRoute = require("./routes/commentsPostsRoute");

// Aplicação de rotas:
app.use("/auth", authRoute);
app.use("/app", postRoute);
app.use("/app/update", styleUserRoute);
app.use("/comments", commentsPostsRoute);

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
