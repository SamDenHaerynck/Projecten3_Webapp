'use strict';

app.directive('focusOn', function() {
    return function(scope, elem, attr) {
        scope.$on(attr.focusOn, function() {
            angular.element(elem[0]).find('input').focus();
            angular.element(elem[0]).find('textarea').focus();
        });
   };
});