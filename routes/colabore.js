var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('colabore');
});
router.post('/', function(req, res, next) {
var nombre = req.body.nombre;
var apellido = req.body.apellido;
var ciudad = req.body.ciudad;
var comocolaborar = req.comocolaborar.nombre;
  res.render('colabore');
});

module.exports = router;
