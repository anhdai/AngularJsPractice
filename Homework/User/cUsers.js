angular.module('cApp', []).controller('UserCtrl', function($scope) {
    $scope.fName = '';
    $scope.lName = '';
    $scope.id = 0;
    $scope.users = [{id:1, fName:'Tom', lName:'Hilton'},
        {id:2, fName:'Peter', lName:'Hamilton'}];
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