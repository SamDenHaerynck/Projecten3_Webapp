'use strict';

//camp is het geselecteerde kamp, images zijn de foto's die bij dit kamp horen en extra is informatie van het kamp die via een aparte call opgehaald wordt
app.controller('CampViewCtrl', function($scope, camp, images, extra) {
    $scope.camp = camp.data;
    $scope.camp.groups = extra;
    $scope.campimages = images;
    $scope.parentView = false;
    $scope.parentViewButtonText = 'Meer informatie';
    $scope.enableParentView = function(){
        if($scope.parentView){
            $scope.parentViewButtonText = 'Meer informatie';
            $scope.parentView = false;
        }else{
            $scope.parentViewButtonText = 'Minder informatie';
            $scope.parentView = true;
        }
    };

    //Opties voor het weergeven van een melding als een kamp bijna volgeboekt is
    $scope.camp.isDeductible = $scope.camp.isDeductible ? 'Ja' : 'Nee';
    $scope.camp.placesLeft = $scope.camp.maxParticipants - $scope.camp.registrations;
    $scope.camp.showPlaces = $scope.camp.placesLeft < 10 && $scope.camp.placesLeft > 0;
    $scope.camp.showFull = $scope.camp.placesLeft <= 0;

    //Alle afbeeldingen van de server binnenkrijgen en verwerken
    var imgDiv = document.getElementById('campImages');
    var campImageLocation = 'http://project-groep6.azurewebsites.net/public/img/camps/';

    angular.forEach($scope.campimages, function(value) {
        var aChild = '<figure><img src="' + campImageLocation + value.location + '"/><figcaption>'  + camp.data.title + '</figcaption></figure>';
        imgDiv.innerHTML += aChild;
    });

    //Opties voor de slideshow instellen
    var opts = {
        //om de slides automatisch te laten vooruitgaan, dit kan een boolean of een object zijn
        auto: {
            speed: 2500,
            pauseOnHover: true
        },
        // keuze om op fullscreen te zetten wordt op ja gezet
        fullScreen: true,
        // om swipe te ondersteunen bij modile devices
        swipe: true
    };
    makeBSS('.bss-slides', opts);
});
