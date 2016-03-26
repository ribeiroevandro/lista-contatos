var mongoose = require('mongoose');

/**
 * Criando banco de dados.
 */
var ContatoSchema = new mongoose.Schema({
	nome: String,
	email: String,
	telefone: {type: Number, default: 0},
});

/**
 * Definindo o model
 */
mongoose.model('Contato', ContatoSchema);