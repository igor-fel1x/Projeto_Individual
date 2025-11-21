var express = require("express");
var router = express.Router();
var forcaController = require("../controllers/forcaController");

router.post("/inserir", function (req, res) {
    forcaController.inserir(req, res);
});

router.get("/buscarDadosUsuario/:idUsuario", function (req, res) {
    forcaController.buscarDadosUsuario(req, res);
});

router.get("/buscarDadosGrafico/:idUsuario", function (req, res) {
    forcaController.buscarDadosGrafico(req, res);
});

router.get("/buscarUltimoIdjogo/:idUsuario", function (req, res) {
    forcaController.buscarUltimoIdjogo(req, res);
});

module.exports = router;