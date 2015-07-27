'use strict';

app.factory('Auth', function($http, $cookieStore) {

    var Auth = {
        isAuthorized: function(admin) {
            var data = $cookieStore.get('userInfo');
            //todo: check if expired

            if (data && !admin) {
                return true;
            }
            if (admin && data.isAdmin) {
                console.log('did it');
                return true;
            }
            console.log('failed');
            return false;
        },

        resolveUser: function() {
            return $cookieStore.get('userInfo');
        },

        resolveToken: function() {
            var user = $cookieStore.get('userInfo');
            console.log('cookie: ', user);
            if (angular.isUndefined(user)) {
                return null;
            }
            return user.token;
        }
    };
    return Auth;
});
