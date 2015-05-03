angular.module('input', []).
        controller('optionsController', function($scope){
            $scope.user = {
                    name: function(newName) {
                            return angular.isDefined(newName) ? (_name = newName) : _name;
                        }
                    };
        });