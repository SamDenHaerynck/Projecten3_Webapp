'use strict';

app.controller('ShowPostCtrl', function($scope, $routeParams, $route, $mdToast, toast, restSecure, post, comments) {
	$scope.post = post.data;
    $scope.post.timestampFormatted = Date.parse($scope.post.timestamp);
    angular.forEach($scope.post, function(value) {
        if(value === null){
            value = 'Niet gespecificeerd';
        }
    });
	$scope.comments = comments;
    angular.forEach($scope.comments, function(value) {
        value.timestampFormatted = Date.parse(value.timestamp);
    });
    $scope.newComment = {};
	$scope.submitted = false;

	$scope.createComment = function(){
		$scope.submitted = false;
		if ($scope.commentForm.$valid) {
            var response = restSecure().save({
                extendUrl: 'posts/' + $routeParams.postId + '/comments/submit'
            }, $scope.newComment, function(){
                toast('Je reactie is geplaatst');
                $scope.newComment.text = '';
            }, function(){
                toast('Er was een fout bij het plaatsen van je reactie');
            });
        } else {
            toast('Je reactie mag niet leeg zijn');
            $scope.submitted = true;
        }
	};
  $scope.checkText = function(){
    return !angular.isUndefined($scope.newComment.text);
  };

});
