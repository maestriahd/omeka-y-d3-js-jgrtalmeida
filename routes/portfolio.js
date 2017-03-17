// importa las librerias necesarias
var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

const API_KEY = 'a36cc25663b183871facaba86c9d9a8a252855af';  // constante para guardar el API key del omeka

// objeto que guarda la configuración de la conexion al Omeka
var server = {
  baseUrl: 'http://elcrucedelrio.omeka.net/api', // la URL del API (http://miomeka.org/api)
  uri: '',
  method: 'GET', // método que vamos a usar
  qs: {
    key: API_KEY
  },
  useQuerystring: true, //construye una URL con la información suministrada
  json: true // Lo que recibiremos es un objeto JSON
};

// lógica de la ruta
router.get('/', function(req, res) {

  // Inicia una cascada de operaciones
  async.waterfall([
    // En este primer paso se realiza la petición al API del omeka
    function(callback) {
      console.log('peticion a /items');
      // actualiza la dirección del recurso a consultar en el objeto de
      // configuración de request
      server.uri = '/items';
      // ejecuta la llamada al servidor
      request(server, function (error, response, body) {
        // si hay un error lo reporta y para la ejecución de la cascada
        if(error){
          callback(error);
        }
        // si no hay error y la respuesta del servidor tiene el código 200
        // quiere decir que todo resultó bien
        if (!error && response.statusCode == 200) {
          // sigue el flujo de acciones de la cascada entregando el primer
          // elemento del objeto recibido
          callback(null, body[0], body);
        }
      });
    },
    // Obtiene la información de la colección
    // La función recibe lo entregado en el anterior paso en el primer parámetro
    // `item`
    function(item, items, callback) {
      console.log('peticion a /collections');
      // actualiza la dirección del recurso a consultar en el objeto de
      // configuración de request
      server.uri = '/collections/'+item.collection.id;
      // ejecuta la llamada al servidor
      request(server, function (error, response, body) {
        // si hay un error lo reporta y para la ejecución de la cascada
        if(error){
          callback(error);
        }
        // si no hay error y la respuesta del servidor tiene el código 200
        // quiere decir que todo resultó bien
        if (!error && response.statusCode == 200) {
          // sigue el flujo de acciones de la cascada, entrega al siguiente paso
          // el resultado tanto de la primera, como de esta segunda acción
          callback(null, item, items, body);
        }
      });
    },
    // Obtiene la información de la archivos asociados
    // La función recibe lo entregado en los anteriores pasos en los parámetros
    // `item` y `collection`
    function(item, items, collection, callback) {
      console.log('peticion a /files');

      // crea un nuevo objeto de configuración para Request con la información
      // del archivo a descargar
      var files = {
        uri: item.files.url, // extrae la URL del obejto item
        method: 'GET',
        qs: {
          key: API_KEY
        },
        useQuerystring: true,
        json: true
      };

      // ejecuta la llamada al servidor
      request(files, function (error, response, body) {
        // si hay un error lo reporta y para la ejecución de la cascada
        if(error){
          callback(error);
        }
        // si no hay error y la respuesta del servidor tiene el código 200
        // quiere decir que todo resultó bien
        if (!error && response.statusCode == 200) {
          // sigue el flujo de acciones de la cascada, entrega al siguiente paso
          // el resultado tanto de esta como las acciones anteriores
          callback(null, item, items, collection, body);
        }
      });
    }
  ],
  // finalizan las acciones de la cascada, esta función se ejecuta UNICAMENTE
  // al finalizar el proceso
  function (err, item, items, collection, files) {
    // si se presentó algún error lo imprime en la consola
    if (err){
      console.log(err);
    }
    // Hace el render de la vista con la informacion obtenida del Omeka
    res.render('portfolio', {
      item: item,
      items: items,
      collection: collection,
      files: files
    });
  });
});

module.exports = router;
