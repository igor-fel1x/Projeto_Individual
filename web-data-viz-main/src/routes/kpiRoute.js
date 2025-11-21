var express = require("express")
var router = express.Router()
var forcaController = require('../controllers/forcaController')
router.post('/maxforca', function (req, res){
    forcaController.buscarDa dosMaiorForca(req, res)
})
router.post("/inserir", function (req, res) {
    forcaController.inserir(req, res);
});

module.exports = router