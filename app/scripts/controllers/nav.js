'use strict';

app.controller('NavCtrl', function($scope, $mdSidenav, $location, Auth, restLogout) {
    $scope.isAuthorized = Auth.isAuthorized;
    $scope.user = Auth.resolveUser();

    $scope.logout = function() {
        restLogout();
    };

    $scope.isAuthorized = function(admin) {
        if (Auth.resolveUser()) {
            return Auth.isAuthorized(admin);
        }
    };

    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };

    $scope.close = function() {
        $mdSidenav('left').close();
    };
});
