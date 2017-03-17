var express = require('express');
var router = express.Router();

// ruta muy sencilla encargada de renderear la vista donde se ejecuta el código
// de JS que hace las peticiones al servidor y la visualización de datos
router.get('/', function(req, res) {
  // render de la la vista
  res.render('items', {});
});

module.exports = router;
