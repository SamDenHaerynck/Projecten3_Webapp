'use strict';

//camps wordt geïnjecteerd in app.js in de $routeProvider, dit zijn de kampen
app.controller('CampsCtrl', function($scope, camps) {
    $scope.camps = camps;
    //Filteren: zorgen voor de geselecteerde filter
    $scope.activeSeason = 'all';
    //update de filter met 'all', 'Zomer', 'Herfst', 'Krokus' of 'Pasen'
    $scope.setActive = function(type) {
        $scope.activeSeason = type;
    };
    //controlleerd of het type overeenkomt met het seizoen waarop gefilterd wordt
    $scope.isActive = function(type) {
        return type === $scope.activeSeason;

    };
    //Filter voor leeftijd die gebruikt wordt bij ng-repeat
    $scope.ageFilter = function(camp) {
      var ret = false;
      if($scope.age){
        if($scope.age >= parseInt(camp.minimumAge) && $scope.age <= parseInt(camp.maximumAge)){
          ret = true;
        }
      }else{
        ret = true;
      }

      return ret;
    };

});
