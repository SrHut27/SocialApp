CREATE DATABASE socialApp;
USE socialApp;

CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_photo_path VARCHAR(255) DEFAULT NULL,
    reset_token VARCHAR(255) DEFAULT NULL
);

CREATE TABLE posts (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    tittle VARCHAR(255) NOT NULL,
    content text,
    filePath VARCHAR(255) UNIQUE,
    fileExtension VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
