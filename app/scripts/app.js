'use strict';
/* global app:true */
/* exported app */

/**
 * @ngdoc overview
 * @name projectApp
 * @description
 * # projectApp
 *
 * Main module of the application.
 */
var app = angular
    .module('projectApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/camps', {
                templateUrl: 'views/camps.html',
                controller: 'CampsCtrl',
                resolve: {
                    camps: function(Rest, restQuery) {
                        return restQuery(
                            Rest,
                            'camps'
                        );
                    }
                }
            })
            .when('/camps/:campId', {
                templateUrl: 'views/showcamp.html',
                controller: 'CampViewCtrl',
                resolve: {
                    camp: function($route, Rest, restGet) {
                        return restGet(
                            Rest,
                            'camps/' + $route.current.params.campId
                        );
                    },
                    images: function($route, Rest, restQuery) {
                        return restQuery(
                            Rest,
                            'camps/' + $route.current.params.campId + '/images'
                        );
                    },
                    extra: function($route, Rest, restGet) {
                        return restGet(
                            Rest,
                            'camps/' + $route.current.params.campId + '/extra'
                        );
                    }
                }
            })
            .when('/camps/:campId/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignUpCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/noaccess', {
                templateUrl: 'views/noaccess.html',
            })
            .when('/portal', {
                templateUrl: 'views/portal.html',
                controller: 'LoginCtrl'
            })
            .when('/forum', {
                templateUrl: 'views/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    posts: function(restSecure, restQuery) {
                        return restQuery(
                            restSecure,
                            'posts'
                        );
                    }
                }
            })
            .when('/forum/submit', {
                templateUrl: 'views/createPost.html',
                controller: 'CreatePostCtrl'
            })
            .when('/forum/:postId', {
                templateUrl: 'views/showPost.html',
                controller: 'ShowPostCtrl',
                resolve: {
                    post: function($route, restSecure, restGet) {
                        return restGet(
                            restSecure,
                            'posts/' + $route.current.params.postId
                        );
                    },
                    comments: function($route, restSecure, restQuery) {
                        return restQuery(
                            restSecure,
                            'posts/' + $route.current.params.postId + '/comments'
                        );
                    }
                }
            })
            .when('/manageusers', {
                templateUrl: 'views/manageusers.html',
                controller: 'ManageUsersCtrl',
                resolve: {
                    users: function(restSecure, restQuery){
                        return restQuery(
                            restSecure,
                            'admin/users'
                        );
                    }
                }
            })
            .when('/managecamps', {
                templateUrl: 'views/managecamps.html',
                controller: 'ManageCampsCtrl',
                resolve: {
                  camps: function(Rest, restQuery) {
                    return restQuery(
                      Rest,
                      'camps'
                    );
                  }
                }
            })
            .when('/contact' , {
              templateUrl: 'views/contact.html',
              controller: 'ContactCtrl'
            })
            .when('/', {
                templateUrl: 'views/startPage.html',
                controller: 'StartPageCtrl',
                resolve: {
                    camps: function(Rest, restQuery) {
                        return restQuery(
                            Rest,
                            'camps'
                        );
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $location, Auth, toast) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            var route = next.$$route;
            var path = route.originalPath;
            var securedRoutes = [{
                'route': '/forum',
                'admin': false
            }, {
                'route': '/managecamps',
                'admin': true
            }, {
                'route': '/manageusers',
                'admin': true
            }];

            //Check if current route exists in securedRoutes array
            for (var i = 0; i < securedRoutes.length; i++) {
                if (securedRoutes[i].route === path) {
                    if(!Auth.isAuthorized(securedRoutes[i].admin)) {
                        toast('Je moet ingelogd zijn om deze pagina te bekijken');
                        $location.path('/');
                    }
                }
            }

            // if (securedRoutes.indexOf(path) !== -1) {
            //     if (!Auth.isAuthorized(secu)) {
            //         $location.path('/noaccess');
            //     }
            // }

        });
    });
