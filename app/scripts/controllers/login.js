'use strict';


app.controller('LoginCtrl', function($scope, Auth, $location, restLogin, restSecure, toast) {
    //validatiemessage wordt niet getoond
    $scope.loginError = false;
    //als de gebruiker al ingelogd is wordt hij naar het forum doorverwezen, de false wilt zeggen dat hij niet als admin moet ingelogd zijn
    if (Auth.isAuthorized(false)) {
        $location.path('/forum');
    }
    //validatiemessages worden niet getoond
    $scope.submitted = false;
    //als alle velden ingevuld zijn zal de restLogin service de gebruiker inloggen
    $scope.login = function() {
        if (!$scope.user || typeof($scope.user.email) === 'undefined' || typeof($scope.user.password) === 'undefined') {
            $scope.loginError = true;
        } else {
            restLogin($scope.user, $scope);
        }
    };
    //validatiemessage wordt getoond
    $scope.loginFailed = function() {
        $scope.loginError = true;
    };
    //als er geen validatiefouten zijn wordt er aan de backend gevraagd om het wachtwoord te resetten
    $scope.resetPassword = function() {
        if (!$scope.passwordResetForm.$valid) {
            toast('Controleer nog eens of u alle gegevens juist hebt ingevuld');
            $scope.submitted = true;
        } else {
            restSecure().save({
                extendUrl: 'auth/forgot'
            }, $scope.userEmail, function(response) {
                console.log(response.status);

                if (response.status !== 'error') {
                    toast('We hebben u het nieuwe wachtwoord gemailed.');
                } else {
                    toast('Er was een probleem bij resetten van uw wachtwoord. Probeer het later opnieuw.');
                }
            }, function() {
                toast('Er was een probleem bij resetten van uw wachtwoord. Probeer het later opnieuw.');
            });
        }
    };
});
