'use strict';

//var baseUrl = 'http://localhost/School/3TIN/Projecten_III/PR3_Backend/api/camps/';
var baseUrl = 'http://project-groep6.azurewebsites.net/api/';
var baseUrlSafe = 'https://project-groep6.azurewebsites.net/api/';

app.factory('Rest', function($resource) {
    return function(){ 
        return $resource(baseUrl + ':extendUrl', null, null);
    };
})
.factory('restSecure', function($resource, Auth) {
    return function(){
        var token = Auth.resolveToken();
        return $resource(baseUrlSafe + ':extendUrl', null, {
            get: {
                method: 'GET',
                headers: {
                    'X-XSRF-TOKEN': token
                }
            },
            save: {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': token
                }
            },
            query: {
                method: 'GET',
                isArray: true,
                headers: {
                    'X-XSRF-TOKEN': token
                }
            },
            update: {
                method: 'PUT',
                headers: {
                    'X-XSRF-TOKEN': token
                }
            },
            remove: {
                method: 'DELETE',
                headers: {
                    'X-XSRF-TOKEN': token
                }
            }
        });
    };
})
.factory('handleServerError', function(toast, $location, restLogout) {
    return function() {
        toast('Er was een probleem bij het oproepen van de server');
        if($location.path() !== '/'){
            $location.path('/');
            restLogout();
        }
    };
})
.factory('restGet', function(handleServerError) {
    return function(rest, url) {
        return rest().get({ 
            extendUrl: url
        }, function(response) {
            if(response.status === 'error'){
                handleServerError();
            }
        }, function() {
            handleServerError();
        }).$promise;
    };
})
.factory('restQuery', function(handleServerError) {
    try {
        return function(rest, url) {
            return rest().query({ 
                extendUrl: url
            }, function(response) {
                if(response.status === 'error'){
                    handleServerError();
                }
            }, function() {
                handleServerError();
            }).$promise;
        };
    }
    catch(err) {
        console.log(err);
        handleServerError();
    }
})
.factory('restLogin', function(toast, $location, $cookieStore, $resource) {
    return function(user, scope) {
        return $resource(baseUrlSafe + 'auth/login', null, null).save({}, 
        JSON.stringify({'email': user.email, 'password': user.password}), 
        function(response) {
            if(response.status === 'error'){
                toast('Er was een probleem bij het oproepen van de server');
            }
            if (response.token) {
                $cookieStore.put('userInfo', response);
                user = response;
                console.log(user);
            }
            toast('Je bent succesvol ingelogd');
            $location.path('/forum');
        }, function() {
            scope.loginError = true;
            toast('Er was een probleem bij het inloggen');
        }).$promise;
    };
})
.factory('handleLogout', function(toast, $location, $cookieStore, $route) {
    return function() {
        $location.path('/');
        $route.reload();
        $cookieStore.remove('userInfo');
    };
})
.factory('restLogout', function(restSecure, handleLogout, toast) {
    return function() {
        return restSecure().save({
            extendUrl: 'auth/logout'
        }, 
        '', 
        function() {
            toast('Je bent uitgelogd');
            handleLogout();
        }, function() {
            handleLogout();
        }).$promise;
    };
});