angular.module('app', []);

angular.module('app').controller('testCtrl', function($scope) {
    $scope.jobs = [
        {title : "Sales Person", desription:"you will fight dragons"},
        {title : "Accountant", desription:"you will use the keyboard"}
    ]
});