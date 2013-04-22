/**
 * TodoController
 *
 * <p>Controller gérant la récupération de la liste des Todos, l’ajout, la mise à jour et la suppression des Todos.</p>
 *
 * @author gprince - sqli
 */
TodoList.controller(
	'TodoController',
	
	/**
	 * Constructeur
	 
	 * @param {} $scope scope Angular JS
	 * @param {} TodoModel service de gestion de la liste des Todos
	 
	 * @constructor
	 */
	function ($scope, TodoModel) {
		
		// Récupération de la liste des Todos et ajout de celle-ci dans le scope
		$scope.todos = TodoModel.getTodos();
	
		/**
		 * Ajouter un todo à la liste
		 */
		$scope.addTodo = function () {
			// On fait appel au modèle pour ajouter le doto et on retourne la liste mise à jour
			$scope.todos = TodoModel.addTodo($scope.todo.description);
			$scope.todo.description = ""; 
		};
		
		/**
		 * Mettre à jour l'état d'un todo
		 *
		 * @parma {} todo
		 * 			Le todo à mettre à jour
		 */
		$scope.updateTodo = function (todo) {
			// On fait appel au modèle pour mettre à jour le doto
			TodoModel.updateTodo(todo);
		};
		
		/**
		 * Supprimer les todos dont l'état est 'Terminé'
	     */
		$scope.deleteTodos = function () {
			// On fait appel au modèle pour supprimer les dotos concernés et on retourne la liste mise à jour
			$scope.todos = TodoModel.deleteTodos();
		};
	}
);