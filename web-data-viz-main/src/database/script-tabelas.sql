-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj CHAR(14),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);

insert into empresa (razao_social, codigo_ativacao) values ('Empresa 1', 'ED145B');
insert into empresa (razao_social, codigo_ativacao) values ('Empresa 2', 'A1B2C3');
insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);
insert into aquario (descricao, fk_empresa) values ('Aquário de Peixe-dourado', 2);


@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Barlow', 'Segoe UI', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: black;
}

:root {
  --tamanho-header: 80px;
  --tamanho-banner: calc(100vh - var(--tamanho-header) - var(--tamanho-footer) - 2px);
  --tamanho-simulador: calc(100vh - var(--tamanho-header) - var(--tamanho-footer) - 2px);
  --tamanho-login: calc(100vh - var(--tamanho-header) - var(--tamanho-footer) - 2px);
  --tamanho-footer: 65px;
}

.container {
  display: flex;
  width: 80%;
  margin: auto;
}

.header {
  height: var(--tamanho-header);
  border-bottom: 2px solid #32b9cd;
}

.header .container {
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header a {
  text-decoration: none;
  color: #e3b062;
}

.agora {
  font-weight: 800;
}

.navbar {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  color: #e3b062;
}

.titulo {
  color: #32b9cd;
  width: fit-content;
  font-weight: 500;
}

.header h1 {
  margin: 0;
}

/* BANNER */

.banner {
  height: var(--tamanho-banner);
  color: white;
  background-image: url('../assets/imgs/bg-jelly-fish-para-home.png');
  background-size: cover;
}

.banner .container {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.banner .container p {
  width: 50%;
  margin: 0;
  padding: 0;
  font-size: 36px;
}

.banner .container span {
  font-weight: 800;
}

/* MISSÃO VISÃO VALORES */

.social {
  background-color: #e5e5e5;
  display: flex;
}

.social .container {
  justify-content: center;
}

.box img {
  width: 170px;
}

.social .container .boxes {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;
}

.social p {
  text-align: center;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* FOOTER */

.footer {
  background-color: #32b9cd;
  height: 150px;
  color: #fff;
  display: flex;
  font-size: 15px;
}

.footer .container {
  justify-content: center;
  text-align: center;
}

.footer .container .version {
  font-size: 12px;
}

/* LOGIN */

.login {
  height: var(--tamanho-login);
  background-image: url('../assets/imgs/bg-jelly-fish-para-home.png');
  background-size: cover;
}

.login .container {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  width: 50%;
  background-color: #e5e5e5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: palevioletred;
  flex-direction: column;
  height: fit-content;
  padding: 20px 0;
}

.card h2 {
  margin: 0;
  font-size: 30px;
}

.formulario {
  display: flex;
  height: 90%;
  width: 80%;
  justify-content: space-around;
  flex-direction: column;
}

.formulario span {
  font-size: 15px;
  font-weight: 800;
}

.formulario input {
  border: 2px solid #32b9cd;
  text-align: center;
  border-radius: 10px;
  margin: 0;
}

.formulario select {
  border: 2px solid #32b9cd;
  background-color: white;
  color: gray;
  height: 36px;
  text-align: center;
  border-radius: 10px;
  margin: 0;
}

.campo {
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 5px 0;
}

.botao {
  cursor: pointer;
  font-family: "Barlow", sans-serif;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  background-color: #ED145B;
  width: 120px;
  height: 30px;
  align-self: center;
  margin-top: 20px;
}

.loading-div {
  width: 50px;
  display: none;
}

.loading-div img {
  height: 50px;
  width: 50px;
}

#div_erros_login {
  display: none
}

/* FORMULARIO */

.alerta_erro{
  display: flex;
  justify-content: flex-end;
}

.card_erro {
  display: none;
  background-color: #fff;
  color: black;
  width: 230px;
  position: fixed;
  border-radius: 4px;
  border: #ED145B 3px solid;
  padding: 10px;
  margin-right: 10%;
}

.card_erro #mensagem_erro{
  font-weight: 500;
  font-size: 20px;
}

.formulario .tipo_campo {
  font-size: 20px;
  font-weight: 600 !important;
}

.formulario {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  border: 2px solid #32b9cd;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
}

.btn {
  font-family: "Barlow", sans-serif;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  padding: 10px 15px;
  color: white;
  background-color: #ED145B;
  width: 120px;
  align-self: center;
  margin-top: 5px;
}

.loading-div {
  width: 50px;
  margin: auto;
  display: none;
}

.loading-div img {
  height: 50px;
  width: 50px;
}

/* SIMULADOR */

.simulador {
  color: white;
}

.simulador .container {
  flex-direction: column;
  overflow: scroll; 
  height: var(--tamanho-simulador);
}

/* ALERTA */

#alerta {
  position: absolute;
  right: 0;
  bottom: 0;
}

.mensagem-alarme {
  background-color: white;
  border-radius: 5px;
  width: 300px;
  height: 80px;
  margin: 10px;
  padding: 10px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.mensagem-alarme h3 {
  font-size: 14px;
  margin: 0;
}

.mensagem-alarme .informacao {
  width: 66%;
}

.alarme-sino {
  width: 48px;
  height: 48px;
  animation-name: bell;
  animation-duration: 4s;
  background-image: url('https://cdn-icons-png.flaticon.com/512/1157/1157000.png');
  background-size: cover;
  animation-iteration-count: infinite;
}



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="css/estilo.css">
</head>
<body>
  <div class="navbar">
    <div class="conteudo-nav">
    <img src="assets/imgs/navbar.png" alt="">
    <a href="">Jiu Jitsu</a>
    <a href=""> Muay Thai</a>
    <a href="">Cadastro</a>
    <a href="">Login</a>
    </div>
  </div>
  <div class="home">
    <img src="assets/imgs/home1.2.png" alt="">
    <p> Artes Marciais salvam vidas</p>
  </div>



  
</body>
</html>