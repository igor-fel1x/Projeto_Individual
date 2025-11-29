var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
};


//  codigo pc faculdade - css dash

// * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// }

// body {
//     font-family: 'Exo 2', sans-serif;
//     background-color: black;
//     height: 100vh;
//     color: white;
// }

// .navbar{
//     display: flex;
//     background-color: rgb(105, 105, 105);
//     height: 8vh; 
//     width: auto;
//     border-bottom: 3px solid white; 
//     align-items: center; 
// }

// .navbar img{
//     height: 180px; 
// }


// #b_usuario {
//     color: #f00000;
// }

// .geral {
//     padding: 20px 5px; 
// }

// .kpi {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 20px;
//     gap: 2%; 
// }

// .cnt-kpi {
//     background-color: #222;
//     padding: 20px 5px; 
//     border-radius: 5px; 
//     text-align: center;
//     flex: 1;
//     border-bottom: 2px solid #f00000;
// }

// .cnt-kpi p {
//     margin: 0;
// }

// div:has(canvas) {
//     display: flex;
//     align-items: center;
//     gap: 30px; 
//     padding: 10px; 
// }

// #barra {
//     background-color: #222;
//     border-radius: 8px;
//     flex: 2;
//     width: auto !important; 
//     height: 650px !important; 
// }

// .imagem-esquerda,
// .imagem-direita {
//     height: 400px; 
//     /* background-color: #222; */
//     border-radius: 8px ;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// .imagem-direita img{
//     height: 400px; 
//   filter: drop-shadow(10px 10px 5px red);       
// }
// .imagem-esquerda img{
//     height: 400px; 
//    filter: drop-shadow(-8px 4px 10px red);
// }

// .janela {
//   display: flex;
//   /* width: 100vw; */
//   /* background-color: #32b9cd; */
// }

// .header-left a {
//   text-decoration: none;
//   color: white;
// }

// .header-left {
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 999;
//   height: 100vh;
//   width: 16%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
//   border-right: 3px solid red;
//   background-color: rgb(16, 16, 16);
// }



// .header-left h1 {
//   color: #32b9cd;
// }

// .hello {
//   width: 100%;
//   display: flex;
//   justify-content: center;
// }

// .hello h3 {
//   color: white;
//   font-weight: 300;
//   font-size: 1.2rem;
// }

// .hello h3 span {
//   font-weight: 800;
// }

// .btn-nav {
//   width: 40%;
//   color: black;
//   background-color: red;
//   border: 3px solid white;
//   border-radius: 5px;
//   text-align: center;
//   padding: 2px 5px;
// }

// .btn-nav-white {
//   width: 40%;
//   background-color: white;
//   border: 3px solid red;
//   border-radius: 5px;
//   text-align: center;
//   padding: 2px 5px;
// }

// .btn-nav-white h3 {
//   color: black;
//   padding: 0;
//   margin: 0;
// }

// .btn-nav h3 {
//   margin: 0;
//   padding: 0;
// }
// .btn-logout h3{
//  width: 100%;
//   background-color: black;
//   border: 3px solid red;
//   border-radius: 5px;
//   text-align: center;
//   padding: 2px 5px;

// }


