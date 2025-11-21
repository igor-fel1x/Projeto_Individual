var forcaModel = require("../models/forcaModel");

function inserir(req, res) {
    console.log('Função inserir foi chamada!');
    var fkUsuario = req.body.fkUsuarioServer;
    // var fkjogo = req.body.fkjogoServer;
    var forca = req.body.forcaServer;

    console.log(fkUsuario)
    console.log(forca)

    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (forca == undefined) {
        res.status(400).send("Seu forca está undefined!");
    } else {
        forcaModel.inserir(fkUsuario, forca)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o Inserir! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
} 

function buscarDadosMaiorForca(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    forcaModel.buscarDadosMaxForca(idUsuario)
    .then(function (resposta){
        res.send(resposta).status(200)
    }).catch(function(erro){
        res.send(erro).status(500)
    })
}

function buscarDadosGrafico(req, res) {
    var idUsuario = req.params.idUsuario;

    forcaModel.buscarDadosGrafico(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimoIdjogo() {
    forcaModel.buscarUltimoIdjogo() 
        .then(function (resultado) {
            // Apenas retorna o resultado do DB
            res.status(200).json(resultado); 
        })
        .catch(function (error) {
            console.error(`Erro ao buscar último ID: ${error.message}`);
            res.status(500).send("Erro interno ao buscar o último ID do jogo.");
        });
}

module.exports = {
    inserir,
    buscarDadosGrafico,
    buscarDadosMaiorForca,
    buscarUltimoIdjogo
};