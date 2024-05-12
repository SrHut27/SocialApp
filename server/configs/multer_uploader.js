const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const publicDirectory = path.join(__dirname, "../../client/public");
const uploadsDirectory = path.join(publicDirectory, "/posts");

if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}

// Configuração do armazenamento do multer:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = uuidv4();
    const extension = path.extname(file.originalname);
    const fileName = `${uniqueFileName}${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
