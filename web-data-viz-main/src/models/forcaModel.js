var database = require("../database/config");

var database = require("../database/config");

function inserir(fkusuario, forca) {

    var instrucaoSql = `insert into resultado (fkusuario, fkjogo, forca, dt) values 
    ('${fkusuario}', 1, '${forca}' , current_timestamp);`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT 
            MAX(forca) as maior_forca,
            MIN(forca) as menor_forca,
            COUNT(forca) as qtd_tentativas,
            ROUND(AVG(forca), 1) as media_forca
        FROM resultado 
        WHERE fkusuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosGrafico(idUsuario) {
    var instrucaoSql = `
         SELECT forca, dt as horario
        FROM resultado 
        WHERE fkusuario = ${idUsuario} 
        ORDER BY id DESC 
        LIMIT 7;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    inserir,
    buscarDadosGrafico,
    buscarDadosUsuario,
}