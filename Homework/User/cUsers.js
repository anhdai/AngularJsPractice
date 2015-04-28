var userApp = angular.module('cApp', ['ngRoute']);
  userApp.config(function($routeProvider){
  $routeProvider.
  when('/', {
    templateUrl: 'userData.html',
    controller: 'UserList'
  }).
  when('/:ID',{
      templateUrl: 'userDetail.html',
      controller: 'UserDetail'
  }).
  otherwise({
    redirectTo: '/'
  });
});

userApp.controller('UserList', function($scope, $http) {
  $scope.fName = '';
  $scope.lName = '';
  $scope.id = 0;
  $http.post('data.json').success(function(data){
    $scope.users = data;
  });
  $scope.edit = false;
  $scope.addUser = function() {
    if($scope.edit) {
      $scope.users.splice($scope.id-1,1,{id:$scope.id,fName:$scope.fName, lName:$scope.lName});
      $scope.fName = '';
      $scope.lName = '';
      $scope.id = 0;
    }
    else {
      count = $scope.users.length + 1;
      $scope.users.push({id:count,fName:$scope.fName, lName:$scope.lName});
      $scope.fName = '';
      $scope.lName = '';
    }
    $scope.edit = false;
  };
  $scope.editUser = function(id) {
    $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName;
    $scope.edit = true;
    $scope.id = id;
  }
});

userApp.controller('UserDetail', function($scope, $routeParams, $http) {
    $scope.anotherId = $routeParams.ID;
    $http.post("data.json").success(function(data){
        $scope.userDetail = data.filter(function(entry){
            console.log(typeof parseInt($scope.anotherId));
            console.log(typeof entry.id);
            return parseInt($scope.anotherId) === entry.id;
        })[0];
    });
});