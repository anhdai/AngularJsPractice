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

userApp.factory('getUser', function($http){
    var cache;
    function getList(callback){
        if(cache){
            callback(cache);
        } else{
            $http.post('data.json').success(function(data){
                cache = data;
                callback(data);
            });
        }
    }
    return {
        list: getList,
        find: function(Id, callback){
            $http.post("data.json").success(function(data){
                userDetail = data.filter(function(entry){
                    return parseInt(Id) === entry.id;
                })[0];
                callback(userDetail);
            });
        }
    }
});

userApp.directive('user',function(){
    return{
        scope:{
            user: "="
        },
        restrict: "A",
        templateUrl: "userId.html"
    };
});

userApp.controller('UserList', function($scope, getUser) {
  $scope.fName = '';
  $scope.lName = '';
  $scope.id = 0;
  getUser.list(function(data){
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
  };
});

userApp.controller('UserDetail', function($scope, $routeParams, getUser) {
    getUser.find($routeParams.ID, function(userDetail){
        $scope.userDetail = userDetail;
    });
});

userApp.filter('encodeURI', function(){
    return window.encodeURI;
});