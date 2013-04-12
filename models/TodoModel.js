/**
 * Modèle de Todo
 *
 * <p>Service de gestion de la liste des Todos avec persistance par local storage.</p>
 *
 * @author gprince - sqli
 */
TodoList.service(
    'TodoModel',
	
	/**
	 * Constructeur
	 *
	 * @constructor
	 */
    function() {
	
		/**
		 * Récupérer la liste des Todos
		 *
		 * @return [] La liste récupérée depuis le local storage si elle existe ou une liste vide sinon
		 */
		this.getTodos = function () {
			var todos = JSON.parse(window.localStorage.getItem('todos'));
			if(!todos) { return []; /* Aucune liste n'existe on retourne une nouvelle liste vide */ }
			return todos;
		};
		
		/**
		 * Ajouter un todo
		 * 
		 * @param String description
		 *			Description du todo
		 */
		this.addTodo = function(description) {
			var now = new Date();
			var todo = {
				id: now,
                description: description,
                done: false
            };
			
			var todos = JSON.parse(window.localStorage.getItem('todos'));
			if(!todos) { todos = []; }
			todos.push(todo);
			
			window.localStorage.setItem('todos', JSON.stringify(todos));
			
			return todos;
		};
		
		/**
		 * Mettre à jour un todo
		 *
		 * @param {} todo
		 *			Le todo à mettre à jour
		 */
		this.updateTodo = function(todo) {
			if(!todo) return;
			
			var todos = JSON.parse(window.localStorage.getItem('todos'));
			if(!todos) { return []; }
			
			for (var i = 0; i < todos.length; i++) {
                if(todos[i].id === todo.id) {
                    todos[i].done = todo.done;
                    window.localStorage.setItem('todos', JSON.stringify(todos));
                    return;
                }
            }
		};
		
		/**
		 * Supprimer les todos dont l'état est 'Terminé'
		 */
		this.deleteTodos = function() {
			var todos = JSON.parse(window.localStorage.getItem('todos'));
			if(!todos) { return []; }
			
			// On utilise underscore JS pour filtrer la liste et retournée une nouvelle liste sans todos à l'état 'Terminé'
			todos = _.filter(todos, function(todo) { return !todo.done; } );
			window.localStorage.setItem('todos', JSON.stringify(todos));
			return todos;
		};
		
		/**
		 * Supprimer un todo de la liste
		 *
		 * @param {} todo
		 *			Le todo à supprimer
		 */
		this.deleteTodo = function(todo) {
			var todos = JSON.parse(window.localStorage.getItem('todos'));
			if(!todos) { return []; }
			
			if(!todo) return todos;
			
			for (var i = 0; i < todos.length; i++) {
                if(todos[i].id === todo.id) {
                    todos.splice(i, 1);
                    window.localStorage.setItem('todos', JSON.stringify(todos));
                    return todos;
                }
            }
		};
	}
);