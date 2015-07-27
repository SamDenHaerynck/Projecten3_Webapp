'use strict';

app.factory('toast', function($mdToast) {
    return function(text) {
        $mdToast.show({
            template: '<md-toast>' + text + '</md-toast>',
            hideDelay: 3000,
            position: 'top right'
        });
    };
});