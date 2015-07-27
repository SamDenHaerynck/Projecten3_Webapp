'use strict';

//restSecure is de factory die een beveiligde service aanbiedt om een save op te doen, toast is een factory die toasts toont
app.controller('CreatePostCtrl', function($scope, $location, toast, restSecure) {
    //validatieberichten worden verborgen
    $scope.submitted = false;
    //er zijn 3 verschillende types van posts, 'bericht' is de standaard
    $scope.post = {postType: 'bericht'};
    $scope.types = [
        {postType: 'bericht'}, 
        {postType: 'activiteit'}, 
        {postType: 'nieuwsbericht'}
    ];
    //de post wordt verzonden
    $scope.submit = function() {
        if ($scope.postForm.$valid) {
            restSecure().save({
                extendUrl: 'posts/submit'
            }, $scope.post);
            toast('Je post is nu gepubliceerd!');
            $location.path('/forum');
        } else {
            toast('Controleer of u alle gegevens juist hebt ingevuld');
            //als validatie mislukt worden de validatiemessages getoond
            $scope.submitted = true;
        }
    };
    //Geeft de label voor de textarea, als het een activiteit is moet er 'Oschrijving' in plaats van 'Inhoud' getoond worden
    $scope.getTextLabel = function(){
        if($scope.post.postType === 'activiteit'){
            return 'Oschrijving';
        } else {
            return 'Inhoud';
        }
    };
});
