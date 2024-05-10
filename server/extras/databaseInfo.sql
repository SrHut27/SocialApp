CREATE DATABASE socialApp;
USE socialApp;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user INT,
    tittle VARCHAR(255) NOT NULL,
    content text,
    FOREIGN KEY (user) REFERENCES users(id)
);
