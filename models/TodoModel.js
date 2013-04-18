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
    
      /* Récupération de la liste depuis le local storage */
			var todos = JSON.parse(window.localStorage.getItem('todos'));
      
      /* Si la liste n'existe pas on retourne une nouvelle liste vide */
			if(!todos) { return []; }
			return todos;
		};
		
		/**
		 * Ajouter un todo
		 * 
		 * @param String description
		 *			Description du todo
		 */
		this.addTodo = function(description) {
    
      /* La date courante servira d’ID */
			var now = new Date();
      
      /* Création de l’objet à persister Todo */
			var todo = {
				id: now,
                description: description,
                done: false
            };
			
      /* Récupération de la liste depuis le local storage */
			var todos = JSON.parse(window.localStorage.getItem('todos'));
      
      /* Si la liste n'existe pas on crée une nouvelle liste vide */
			if(!todos) { todos = []; }
      
      /* On y ajoute notre todo */
			todos.push(todo);
			
      /* On persiste la liste */
			window.localStorage.setItem('todos', JSON.stringify(todos));
			
      /* Finalement on retourne la liste modifiée */
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
			
      /* Récupération de la liste depuis le local storage */
			var todos = JSON.parse(window.localStorage.getItem('todos'));
      
      /* Si la liste n'existe pas on crée une nouvelle liste vide */
			if(!todos) { todos = []; }
			
      /* On cherche le todo */
			for (var i = 0; i < todos.length; i++) {
      
        if(todos[i].id === todo.id) {
          /* on met à jour l'état */
          todos[i].done = todo.done;
          
          /* et on sauvegarde la liste avant de sortir */
          window.localStorage.setItem('todos', JSON.stringify(todos));
          return;
        }
      }
		};
		
		/**
		 * Supprimer les todos dont l'état est : 'Terminé'
		 */
		this.deleteTodos = function() {
    
      /* Récupération de la liste depuis le local storage */
      var todos = JSON.parse(window.localStorage.getItem('todos'));

      /* Si la liste n'existe pas on crée une nouvelle liste vide */
      if(!todos) { todos = []; }

      /* filtrage de la liste */
      todos = _.filter(todos, function(todo) { return !todo.done; } );

      /* sauvegarde la liste filtrée avant de sortir */
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