'use strict';

var NUMBER_REGEXP = /^\d+$/,
  MEMBERNUMBER_REGEXP = /^\d{3}\/\d{7}$/,
  EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

app.directive('number', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.number = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (NUMBER_REGEXP.test(viewValue)) {
                    return true;
                }
                console.log('number');
                return false;
            };
        }
    };
})
.directive('emailaddress', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.emailaddress = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (EMAIL_REGEXP.test(viewValue)) {
                    return true;
                }
                console.log('emailaddress');
                return false;
            };
        }
    };
})
.directive('isMemberValidator', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.isMemberValidator = function(modelValue, viewValue) {
              if(scope.isMemberGroup === 'true'){
                if(!ctrl.$isEmpty(modelValue)){
                    return true;
                }
              } else {
                return true;
              }
              console.log('isMemberValidator');
              return false;
            };
        }
    };
})
.directive('memberNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.memberNumber = function(modelValue, viewValue) {
                if(scope.isMemberGroup === 'true'){
                    if(!ctrl.$isEmpty(modelValue)){
                        if (MEMBERNUMBER_REGEXP.test(viewValue)) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
                console.log('memberNumber');
                return false;
            };
        }
    };
})
.directive('isParentSameValidator', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.isParentSameValidator = function(modelValue, viewValue) {
              if(scope.isParentSame === 'false'){
                if(!ctrl.$isEmpty(modelValue)){
                  return true;
                }
              } else {
                return true;
              }
              console.log('isParentSameValidator');
              return false;
            };
        }
    };
})
.directive('isAddressSameValidator', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.isAddressSameValidator = function(modelValue, viewValue) {
              if(scope.isAddressSame === 'false'){
                if(!ctrl.$isEmpty(modelValue)){
                  return true;
                }
              } else {
                return true;
              }
              console.log('isAddressSameValidator');
              return false;
            };
        }
    };
})
.directive('natNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.natNumber = function(modelValue, viewValue) {
                /*// RR numbers need to be 11 chars long
                console.log('modelvalue: ', modelValue + '.', 'viewvalue: ', viewValue + '.');
                if (viewValue.length !== 11) {
                    return false;
                }

                var checkDigit = viewValue.substr(viewValue.length - 2, 2);
                var modFunction = function(nr) {
                    return 97 - (nr % 97);
                };
                var nrToCheck = parseInt(viewValue.substr(0, 9));

                // first check without 2
                if (modFunction(nrToCheck) === checkDigit) {
                    return true;
                }

                // then check with 2 appended for y2k+ births
                nrToCheck = parseInt('2' + viewValue.substr(0, 9));

                return (modFunction(nrToCheck) === checkDigit);*/

                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (viewValue.length === 11) {
                    return true;
                }
                return false;
                /*var checkDigit = viewValue.substr(viewValue.length - 2, 2);
                var modFunction = function(nr) {
                    return 97 - (nr % 97);
                };
                var nrToCheck = parseInt(viewValue.substr(0, 9));
                if (modFunction(nrToCheck) === checkDigit) {
                    return true;
                }
                nrToCheck = parseInt('2' + viewValue.substr(0, 9));
                return (modFunction(nrToCheck) === checkDigit);

                var nummerCheck = viewValue.substr(0, 9);
                var checkDigit = viewValue.substr(9);

                if(97 - nummerCheck % 97 === checkDigit){
                  return true;
                }
                nummerCheck = '2' + nummerCheck;
                return (97 - nummerCheck % 97 === checkDigit);*/
            };
        }
    };
})
.directive('passwordlength', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.passwordlength = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (viewValue.length >= 4 && viewValue.length <= 50) {
                    return true;
                }
                return false;
            };
        }
    };
});