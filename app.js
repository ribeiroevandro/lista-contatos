/**
 * Requires
 */
var express 		= require('express');
var app 			= express();
var mongoose 		= require('mongoose');
var logger 			= require('morgan');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');

/**
 * Banco de dados
 */
mongoose.connect('mongodb://localhost/contato');
require('./models/Contato.js');

/**
 * Configurações
 */
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

/**
 * Rotas
 */
var index = require('./routes/index');
app.use('/', index);

/**
 * Servidor
 */
app.listen(8080);
console.log("Lista de contatos rodando na porta 8080");
