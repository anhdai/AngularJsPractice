angular.module('cApp', []).controller('UserCtrl', function($scope) {
    $scope.fName = '';
    $scope.lName = '';
    $scope.users = [];
    $scope.addUser = function() {
        $scope.users.push({fName:$scope.fName, lName:$scope.lName});
        $scope.fName = '';
        $scope.lName = '';
    };
});