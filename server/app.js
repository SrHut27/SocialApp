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

// Aplicação de rotas:
app.use("/auth", authRoute);
app.use("/app", postRoute);

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
