describe('TodoController', function() {
  beforeEach(module('todoApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.archive', function() {
    it('only should archive completed tasks', function() {
      var $scope = {};
      var controller = $controller('TodoController', { $scope: $scope });
      $scope.todos = [{pk:1, description: "take pills", completed:false},
          {pk:2, description: "go to the Gym", completed:false},
          {pk:3, description: "call to mom", completed:true}];
      $scope.archive();
      expect($scope.todos.length).toEqual(2);
    });
  });

  describe('$scope.remaining', function() {
    it('Should count the uncompleted tasks', function() {
      var $scope = {};
      var controller = $controller('TodoController', { $scope: $scope });
      $scope.todos = [{pk:1, description: "take pills", completed:false},
          {pk:2, description: "go to the Gym", completed:false},
          {pk:3, description: "call to mom", completed:true}];
      expect($scope.remaining()).toEqual(2);
    });
  });



});