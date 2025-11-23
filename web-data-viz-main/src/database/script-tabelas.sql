CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) UNIQUE NOT NULL, 
    email VARCHAR(45) UNIQUE NOT NULL, 
    senha VARCHAR(45) NOT NULL
);


CREATE TABLE Jogo (
    idjogo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);


CREATE TABLE resultado (
    fkUsuario INT NOT NULL,
    fkjogo INT NOT NULL,
    forca INT NOT NULL,
    dt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    PRIMARY KEY (fkUsuario, fkjogo, dt), 
    FOREIGN KEY (fkusuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkjogo) REFERENCES Jogo(idJogo)
);