'use strict';

app.controller('StartPageCtrl', function($scope, camps) {
  $scope.camps = camps;
  $scope.isError = false;

  if(angular.isUndefined(camps)){
    $scope.isError = true;
  }

  //Bepalen van het seizoen voor te filteren bij dit seizoen
  // en voor het kleur van de toolbar dit seizoen
  $scope.season = function (){
      switch (new Date().getMonth()) {
        case 11:
        case 0:
        case 1:
          return 'Krokus';
        case 2:
        case 3:
        case 4:
          return 'Pasen';
        case 5:
        case 6:
        case 7:
          return 'Zomer';
        case 8:
        case 9:
        case 10:
          return 'Herst';
      }
    };
});
