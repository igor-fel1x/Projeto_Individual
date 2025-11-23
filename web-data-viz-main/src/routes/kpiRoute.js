var express = require("express")
var router = express.Router()
var forcaController = require('../controllers/forcaController')
router.post('/maxforca', function (req, res){
    forcaController.buscarDadosMaiorForca(req, res)
})
router.post("/inserir", function (req, res) {
    forcaController.inserir(req, res);
});
router.get("/buscarDadosGrafico/:idUsuario", function (req, res) {
    forcaController.buscarDadosGrafico(req, res);
});

module.exports = router