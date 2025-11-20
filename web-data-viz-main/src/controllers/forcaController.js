var forcaModel = require("../models/forcaModel");


function inserir(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkusuario = req.body.fkusuarioServer;
    var forca = req.body.forcaServer;
   

    // Faça as validações dos valores
    if (fkusuario == undefined) {
        res.status(400).send("Seu fkusuario está undefined!");
    } else if (forca == undefined) {
        res.status(400).send("Seu forca está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        forcaModel.inserir(fkusuario, forca)
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
    var idusuario = req.params.idusuario;

    forcaModel.buscarDadosUsuario(idusuario)
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
    var idusuario = req.params.idusuario;

    forcaModel.buscarDadosGrafico(idusuario).then(function (resultado) {
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

module.exports = {
    inserir, 
    buscarDadosGrafico, 
    buscarDadosUsuario,
}