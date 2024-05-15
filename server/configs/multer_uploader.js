const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const publicDirectory = path.join(__dirname, "../../client/public");
const uploadsDirectory = path.join(publicDirectory, "/posts");
const uploadsProfileDirectory = path.join(publicDirectory, "/profile_photos");

if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}

if (!fs.existsSync(uploadsProfileDirectory)) {
  fs.mkdirSync(uploadsProfileDirectory);
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

// Configruando o armazenamento do multer para as fotos de perfil:
const storage_profile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsProfileDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = uuidv4();
    const extension = path.extname(file.originalname);
    const fileName = `${uniqueFileName}${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
const upload_profile = multer({ storage: storage_profile });

module.exports = { upload, upload_profile };
