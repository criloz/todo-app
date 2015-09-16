angular.module('todoApp', ['ui.router', 'restangular', 'ngMaterial']);
angular.module('todoApp').controller('TodoController', ['$scope', 'Restangular', function($scope, Restangular) {

        var TaskApi = Restangular.all('/api/tasks/');

        var loadTasks = function() {
            TaskApi.getList().then(function(tasks) {
                $scope.todos = tasks;
            });

        };

        $scope.todos = [];
        $scope.due_date = "";
        loadTasks();


        $scope.addTodo = function() {
            var save = null;
            if (($scope.due_date != null) && ($scope.due_date != undefined) && ($scope.due_date!="")) {
                save = TaskApi.post({
                    description: $scope.todoText,
                    due_date: formattedDate($scope.due_date)
                });
            } else {
                save = TaskApi.post({
                    description: $scope.todoText
                });
            }

            $scope.todoText = '';
            $scope.due_date = null;
            save.then(function() {
                $scope.todos = TaskApi.getList().$object;
            })


        };

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
                count += todo.completed ? 0 : 1;
            });
            return count;
        };

        $scope.change_done = function(task_pk, previous_value) {
            Restangular.one('/api/tasks/', task_pk).patch({
                "completed": !previous_value
            })

        };

        $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.completed) $scope.todos.push(todo);
                else Restangular.one('/api/tasks/', todo.pk).patch({
                    "archived": true
                });
            });
        };
    }])
    .config(function($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/route1");
        $stateProvider
            .state('route1', {
                url: "/route1",
                templateUrl: "/static/partials/partial_1.html",
                controller: "TodoController"
            });

        $mdIconProvider
            .defaultIconSet("/static/images/avatars.svg", 128)
            .icon("menu", "/static/images/menu.svg", 24)
            .icon("add", "/static/images/add.svg", 48);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');

    });