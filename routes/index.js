/**
 * Configurações
 */
var express 	= require('express');
var mongoose 	= require('mongoose');
var router 		= express.Router();
var Contato 	= mongoose.model('Contato');

/**
 * Buscando contatos.
 */
router.get('/api/contatos', function (req, res) {
	// Buscando dados
	Contato.find(function(err, contatos) {
		if(err) {
			res.send(err);
		}
		res.json(contatos);
	});
});

/**
 * Criando contatos.
 */
router.post('/api/contatos', function (req, res) {
	Contato.create({
		nome: req.body.nome,
		email: req.body.email,
		telefone: req.body.telefone,
		done: false
	}, function(err, contato) {
		if (err) {
			res.send(err);
		}
		Contato.find(function(err, contatos) {
			if(err) {
				res.send(err);
			}
			res.json(contatos);
		});
	});
});

/**
 * Deletando contatos.
 */
router.delete('/api/contatos/:contato_id', function (req, res) {
	Contato.remove({
		_id: req.params.contato_id
	}, function(err, contato) {
		if (err) {
			res.send(err);
		}
		Contato.find(function(err, contatos) {
			if (err) {
				res.send(err);
			}
			res.json(contatos);
		});
	});	
});

/**
 * Editando contatos.
 */
router.get('/api/contatos/:contato_id', function (req, res) {
	Contato.findOne({
		_id: req.params.contato_id
	}, function(err, contato) {
		if (err) {
			res.send(err);
		}
		res.json(contato);
	});	
});

/**
 * Atualizando contatos.
 */
router.put('/api/contatos/:contato_id', function (req, res) {
	var contatoData = req.body;
	var id = req.params.contato_id;

	Contato.update(
		{_id: id},
		contatoData,
		{ upsert: true},
		function(err, contato) {
			if (err) { res.send(err); }
			res.json(contato);
		}
	);
});

/**
 * Front-end 
 */
router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;

