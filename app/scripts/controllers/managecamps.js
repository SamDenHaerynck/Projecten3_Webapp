'use strict';

app.controller('ManageCampsCtrl', function($scope, $location, $routeParams, camps, restSecure, toast) {
  $scope.camps = camps;

  $scope.changeIsFeatured = function(idcamp, checkedvalue) {
    var changed = {
      id: idcamp, 
      isFeatured : checkedvalue
    };
    restSecure().update({
      extendUrl: 'admin/camps/' + idcamp
    }, changed);
    toast('De wijziging is opgeslaan');
  };
});
