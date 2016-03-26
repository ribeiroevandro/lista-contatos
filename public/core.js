var listaContatos = angular.module('listaContatos', []);

function mainController($scope, $http) {
	// TODO: Remover chamadas duplicadas.

	var refresh = function() {
		$http.get('/api/contatos/')
			.success(function(data) {
				$scope.contatos = data;
				$scope.formContato = {};
				console.log("contatos: ", data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	refresh();

	$scope.criarContato = function() {
		$http.post('/api/contatos/', $scope.formContato)
			.success(function(data) {
				$scope.formContato = {};
				$scope.contatos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deletarContato = function(id) {
		$http.delete('/api/contatos/' + id)
			.success(function(data) {
				$scope.contatos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.editarContato = function(id) {
		$http.get('/api/contatos/' + id)
			.success(function(data) {
				$scope.formContato = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.atualizarContato = function() {
		$http.put('/api/contatos/' + $scope.formContato._id, $scope.formContato)
			.success(function(response) {
				refresh();
			});
	};
}