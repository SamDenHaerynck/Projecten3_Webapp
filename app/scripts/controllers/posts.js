'use strict';

app.controller('PostsCtrl', function($scope, $location, $routeParams, posts) {
  console.log(posts);
	$scope.posts = posts;
  angular.forEach($scope.posts, function(value) {
      value.timestampFormatted = Date.parse(value.timestamp);
  });
  $scope.activeCat = 'all';

	$scope.createPost = function(){
		$location.path('/forum/submit');
	};

  //Filteren: zorgen voor de geselecteerde filter
  $scope.setActive = function(type) {
    $scope.activeCat = type;
  };


  $scope.isActive = function(type) {
    return type === $scope.activeCat;

  };

  //Filter voor categorie
  $scope.categorieFilter = function(post){
    if($scope.activeCat === 'all'){
      return true;
    }else{
      if($scope.activeCat === post.postType){
        return true;
      }
      return false;
    }

  };
});
