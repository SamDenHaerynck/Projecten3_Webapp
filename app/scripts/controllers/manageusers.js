'use strict';

app.controller('ManageUsersCtrl', function ($scope, $location, $routeParams, users, restSecure, toast, $route) {
	$scope.newUser = {isAdmin: 0};
    $scope.users = users;
    $scope.submitted = false;

    $scope.changeUser = function(id){
    	$scope.currentUser = id;
    };

    $scope.enableNewUser = function(){
    	$scope.newUser.exists = true;
    };

    $scope.cancel = function(){
    	$scope.newUser = {};
    	$scope.newUser.exists = false;
    };

    $scope.create = function(){
    	$scope.submitted = false;
    	console.log('form ', $scope.newUserForm);
		if ($scope.newUserForm.$valid) {
            restSecure().save({
                extendUrl: 'admin/users/new'
            }, $scope.newUser);
            toast('Die nieuwe gebruiker is aangemaakt');
            $route.reload();
            //$location.path('/manageusers/');
        } else {
            toast('Controleer nog eens of u alle gegevens juist hebt ingevult');
            $scope.submitted = true;
        }
    };

    $scope.update = function(id, form, changedUser){
        $scope.submitted = false;
    	if (form.$valid) {
            if(angular.isUndefined(changedUser.password)){
                changedUser.password = '';
            }
        	restSecure().update({
        		extendUrl: 'admin/users/' + id
      		}, changedUser);
            toast('De gebruiker is aangepast ');
    	} else {
      		toast('Controleer nog eens of u alle gegevens juist hebt ingevult');
      		$scope.submitted = true;
    	}
  	};

    $scope.remove = function(id){
        restSecure().remove({
            extendUrl: 'admin/users/' + id
        });
        toast('De gebruiker is verwijderd');
    };
});
