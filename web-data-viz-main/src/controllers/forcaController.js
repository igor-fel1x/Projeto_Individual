var forcaModel = require("../models/forcaModel");


function inserir(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var forca = req.body.forcaServer;

    console.log(fkUsuario)
    console.log(forca)
   

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (forca == undefined) {
        res.status(400).send("Seu forca está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        forcaModel.inserir(fkUsuario, forca)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Inserir! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarDadosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    forcaModel.buscarDadosUsuario(idUsuario)
    .then(function (resultado) {
        // Se tiver dados, envia o primeiro registro
        res.json(resultado[0] || {
            maior_forca: 0,
            menor_forca: 0, 
            qtd_tentativas: 0,
            media_forca: 0
        });
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).send("Erro no servidor");
    });
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
    forcaModel.buscarUltimoIdjogo(idUsuario).then(function (resultado) {
        if (response.ok) {
            response.json().then(function (resultado) {
                console.log(`Dados recebidos: ${JSON.stringify(resultado)}`);
                sessionStorage.ID_ULTIMA_PARTIDA = resultado[0].idPartida
                console.log(resultado)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}


module.exports = {
    inserir, 
    buscarDadosGrafico, 
    buscarDadosUsuario, 
    buscarUltimoIdjogo
}