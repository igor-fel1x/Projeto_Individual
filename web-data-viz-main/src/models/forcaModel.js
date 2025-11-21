var database = require("../database/config");

var database = require("../database/config");

function inserir(fkUsuario, forca) {
    
   return buscarUltimoIdjogo() // Busca o ID internamente
        .then(resultado => {

            // ... (código de segurança omitido)
            const fkjogo = resultado[0].idjogo; // USA O ID BUSCADO
            
            // Aqui o 'forca' é o parâmetro que veio do Controller
            var instrucaoSql = `INSERT INTO resultado (fkUsuario, fkjogo, forca, dt) VALUES 
                ('${fkUsuario}', ${fkjogo}, ${forca}, current_timestamp);`; 
            
            
                console.log("Executando a instrução SQL de INSERT: \n" + instrucaoSql);
                return database.executar(instrucaoSql);
        });

        
}

function buscarDadosMaxForca(idUsuario) {
    var instrucaoSql = `
        SELECT 
            MAX(forca) as maior_forca,
            MIN(forca) as menor_forca,
            COUNT(dt) as qtd_tentativas,
            AVG(forca) as media_forca
        FROM resultado r join Usuario u on r.fkUsuario = u.idUsuario
        where u.idUsuario = ${idUsuario}
        ;
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
    var instrucaoSql = ` 
        SELECT idjogo FROM Jogo 
        ORDER BY idjogo DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    // Retorna a promessa do DB para a função 'inserir' ou para o Controller
    return database.executar(instrucaoSql);
}

module.exports = {
    inserir,
    buscarDadosGrafico,
    buscarDadosMaxForca,
    buscarUltimoIdjogo
};