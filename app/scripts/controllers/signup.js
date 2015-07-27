'use strict';

app.controller('SignUpCtrl', function($scope, $routeParams, toast, $location, Rest, $timeout) {
    //validatieberichten worden in het begin verborgen
    $scope.submitted = false;
    $scope.submittedGlobal = false;
    //dit is een functie die een broadcast van text zal doen na 0.2 seconden, anders is de view niet klaar om het juiste inputveld te focussen
    $scope.timedBroadcast = function(text){
        $timeout(function () {
            $scope.$broadcast(text);
        }, 200);
    };
    //deze functie veranderd de card die op dit moment wordt getoond
    $scope.changeCard = function(cardNr){
        if(!$scope.submittedGlobal){
            //validatieberichten worden verborgen als als de gebruiker nog niet het volledige formulier heeft proberen verzenden
            $scope.submitted = false;
        }
        $scope.currentCard = cardNr;
        //deze broadcast zorgt ervoor dat het juiste inputveld gefocussed wordt, de broadcast wordt ontvangen in inputFocus.js
        $scope.timedBroadcast('card' + cardNr);
    };
    //standaard wordt de eerste card getoond
    $scope.changeCard(1);
    //het volledige formulier wordt verzonden
    $scope.submit = function() {
        //controleren of het form geen validatiefouten bevat
        if ($scope.signupForm.$valid) {
            //de Rest factory in rest.js wordt aangeroepen met een save waarbij een string wordt meegegeven die de basisurl zal verlengen
            Rest().save({
                extendUrl: 'camps/' + $routeParams.campId + '/signup'
            }, $scope.registration);
            //een toast wordt getoond vanuit de toast factory in publicFunctions.js
            toast('Bedankt! U bent succesvol ingeschreven');
            //er wordt geredirect naar het kampoverzicht
            $location.path('/camps/' + $routeParams.campId);
        } else {
            //als de validatie faalt wordt er een toast getoont
            toast('Controleer nog eens of u alle gegevens juist hebt ingevult');
            //de validatieberichten worden getoont
            $scope.submitted = true;
            //dit zal ervoor zorgen dat de validatieberichten vanaf dit punt niet meer verborgen kunnen worden
            $scope.submittedGlobal = true;
            //de eerste card wordt weer getoond
            $scope.currentCard = 1;
        }
    };
    //als er op 1 van de "volgende" knoppen wordt geduwd zal het form van die card meegegeven worden (subform)
    $scope.subformSubmit = function(subform){
        //controleren of het subform geen validatiefouten bevat
        if (subform.$valid){
            //de volgende card wordt getoond
            var nextCard = $scope.currentCard + 1;
            $scope.changeCard(nextCard);
            //als de gebruiker nog niet het volledige formulier heeft proberen verzenden worden de validatiefouten verborgen
            if(!$scope.submittedGlobal){
                $scope.submitted = false;
            }
        }else{
            toast('Controleer of u alle gegevens juist hebt ingevult');
            console.log(subform.$error);
            $scope.submitted = true;
        }
    };
    //standaard ben je geen lid van joetz
    $scope.isMemberGroup = 'false';
    //om te checken of de inputvelden voor de informatie voor als je lid bent van Joetz getoont moet worden
    $scope.isMemberStuffShown = function() {
        return $scope.isMemberGroup === 'true';
    };
    //als de radiobuttons van de informatie voor als je lid bent van Joetz op false komen wordt de data in het object leeggemaakt
    $scope.emptyMemberFields = function() {
        if($scope.isMemberGroup !== 'true'){
            $scope.registration.memberNumber1 = '';
            $scope.registration.memberNumber2 = '';
        }
        $scope.changeCard(1);
    };
    //standaard is er geen tweede contactpersoon
    $scope.isParentSame = 'true';
    //om te checken of de inputvelden voor de tweede contactpersoon getoont moet worden
    $scope.isSecondParentShown = function() {
        return $scope.isParentSame === 'false';
    };
    //als de radiobuttons van de tweede contactpersoon op true komen wordt de data in het object leeggemaakt
    $scope.emptyParentFields = function() {
        if($scope.isParentSame !== 'false'){
            $scope.registration.parents.pop();
        }
        $scope.changeCard(3);
    };
    //standaard hebben de kinderen geen ander adres dan hun ouders
    $scope.isAddressSame = 'true';
    //om te checken of de inputvelden voor adres van de kinderen getoont moet worden
    $scope.isSecondAddressShown = function() {
        return $scope.isAddressSame === 'false';
    };
    //als de radiobuttons van address op true komen wordt de data in het object leeggemaakt
    $scope.emptyAddressFields = function() {
        if($scope.isAddressSame !== 'false'){
            $scope.registration.street = '';
            $scope.registration.nr = '';
            $scope.registration.bus = '';
            $scope.registration.place = '';
            $scope.registration.postal = '';
        }
        $scope.changeCard(4);
    };
    //de optie om een noodcontactpersoon toe te voegen wordt getoont
    $scope.secondEmergencyContactTrue = true;
    //het pad en de tekst van de images wordt ingevuld
    $scope.srcPink = '../images/signUpForm/roze.gif';
    $scope.altPink = 'Roze';
    $scope.srcGreen = '../images/signUpForm/groen.gif';
    $scope.altGreen = 'Groen';
    $scope.srcBlue = '../images/signUpForm/blauw.gif';
    $scope.altBlue = 'Blauw';
    $scope.srcSticker = '../images/signUpForm/klever.gif';
    $scope.altSticker = 'Klever';
    $scope.srcPlus = '../images/signUpForm/plus.gif';
    $scope.altPlus = ' ';
    $scope.srcMin = '../images/signUpForm/min.gif';
    $scope.altMin = ' ';
    //de registratie wordt aangemaakt en er wordt een kind aan toegevoegd
    $scope.registration = {
        participants: [{}]
    };
    //standaardata voor de presentatie, deze functie wordt aangeroepen als er op de foto in het formulier wordt geklikt
    $scope.enableTestData = function() {
        /*$scope.registration = {
            memberNumber1: '309/1234567',
            memberNumber2: '309/7654321',
            parents: {
                0: {
                    natNr: '12345678910',
                    fName: 'pfname1',
                    lName: 'plname1',
                    street: 'pstreet1',
                    nr: '5',
                    bus: 'pbus1',
                    place: 'pplace1',
                    postal: 'ppostal1',
                    mail: 'pmail1@mail.be',
                    phone: 'pphone1'
                }, 
                1: {
                    natNr: '10987654321',
                    fName: 'pfname2',
                    lName: 'plname2',
                    street: 'pstreet2',
                    nr: 'pnr2',
                    bus: 'pbus2',
                    place: 'pplace2',
                    postal: 'ppostal2',
                    mail: 'pmail2@mail.be',
                    phone: 'pphone2'
                }
            },
            participants: {
                0: {
                    natNr: '10987654321',
                    fName: 'James',
                    lName: 'de Meyer',
                    birthdate: new Date(2013, 9, 22)
                }, 
                1: {
                    natNr: '10987654321',
                    fName: 'Sara',
                    lName: 'de Meyer',
                    birthdate: new Date(1999, 5, 15)
                }
            },
            street: 'cstreet',
            nr: 'cnr',
            bus: 'cbus',
            place: 'cplace',
            postal: 'cpostal',
            emergencyContacts: {
                0: {
                    fName: 'efname1',
                    lName: 'elname1',
                    phone: 'ephone1'
                },
                1: {
                    fName: 'efname2',
                    lName: 'elname2',
                    phone: 'ephone2'
                }
            },
            extraInfo: 'James is alergisch aan pinda\'s en Sara heeft soms moeite met slapen.'
        };*/
    };
});