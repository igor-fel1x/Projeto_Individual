var database = require("../database/config");

var database = require("../database/config");

function inserir(fkUsuario, forca) {
    

    var instrucaoSql = `insert into resultado (fkUsuario,fkjogo, forca, dt) values 
    ('${fkUsuario}', 1, '${forca}' , current_timestamp);`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

         npm 
}

function buscarDadosUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT 
            MAX(forca) as maior_forca,
            MIN(forca) as menor_forca,
            COUNT(forca) as qtd_tentativas,
            ROUND(AVG(forca), 1) as media_forca
        FROM resultado 
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosGrafico(idUsuario) {
    var instrucaoSql = `
         SELECT forca, dt as horario
        FROM resultado 
        WHERE fkUsuario = ${idUsuario} 
        ORDER BY id DESC 
        LIMIT 7;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimoIdjogo() {

    var instrucaoSql = ` SELECT idjogo FROM Jogo 
                    ORDER BY idjogo DESC
                    LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    inserir,
    buscarDadosGrafico,
    buscarDadosUsuario, 
    buscarUltimoIdjogo
}