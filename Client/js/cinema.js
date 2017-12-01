
var myApp = angular.module('myApp', ['ngRoute'])


myApp.config( ['$routeProvider', function($routeProvider) {
  $routeProvider

		 .when('/search', {
      templateUrl: 'templates/search.html',
      controller: 'searchController'
    })
    .when('/nowshowing', {
      templateUrl: 'templates/nowshowing.html',
      controller: 'nowshowingController'
    })
    .when('/comingsoon', {
		  templateUrl: 'templates/comingsoon.html',
      controller: 'comingsoonController'
		})
	.when('/details/:id', {
      templateUrl: 'templates/details.html',
      controller: 'detailsController'
    })
		.otherwise({
		  redirectTo: 'search'
		})
	}])



myApp.controller('searchController', function($scope, $http) {



  $scope.search = function($event) {
    console.log('search()')
    if ($event.which == 13 || $event.which == 113) { // enter key presses
      var searchTerm = $scope.searchTerm
      var url = ''
      if ($event.which == 13)
      	url = 'https://api.themoviedb.org/3/search/movie?api_key=841bd11e480bb95e7f8ec6294d7262b2&language=en-US&page=1&include_adult=false&query='+searchTerm
      else if($event.which == 113)
      	url = 'https://cde305-lakessh.c9users.io/movies?q='+searchTerm



      console.log(url)
      $http.get(url).success(function(response) {
        console.log(response)
        if (response.data)
        	$scope.movies = response.data
        else if (response.results)
        	$scope.movies = response.results
          $scope.searchTerm = ''

      })
    }
  }

})

myApp.controller('nowshowingController', function($scope, $http) {

  console.log('myAPI GET /search')
  var url ='https://cde305-lakessh.c9users.io/movies/now_playing'
  $http.get(url).success(function(response) {
	  console.log(response.message);
	  $scope.movies = response.data;
	  $scope.nowTerm=''
  })


})

myApp.controller('comingsoonController', function($scope, $http) {
  $scope.message = 'This is the comingsoon screen'
  console.log('myAPI GET /search')
  var url ='https://cde305-lakessh.c9users.io/movies/upcoming'
  $http.get(url).success(function(response) {
	  console.log(response.message);
	  $scope.movies = response.data;
	  $scope.comingTerm=''
  })


})

myApp.controller('detailsController', function($scope,  $routeParams, $http, $window) {

  $scope.id = $routeParams.id


  var url = 'https://cde305-lakessh.c9users.io/movies/find/' +  $scope.id

  $http.get(url).success(function(responseMovie) {
  	if (responseMovie.code == 200){
	    console.log(responseMovie.message + $scope.id)
	    $scope.message = responseMovie.message
	    $scope.movie = {}
	  $scope.movie.title=responseMovie.data.title
	  $scope.movie.original_title= responseMovie.data.original_title
    $scope.movie.overview= responseMovie.data.overview
    $scope.movie.original_language= responseMovie.data.original_language
    $scope.movie.release_date= responseMovie.data.release_date
    $scope.movie.poster_path= responseMovie.data.poster_path

    $scope.movie.status=responseMovie.data.status
  	}
  	else
  		$window.alert(responseMovie.message)
  })

	$scope.postLike = function(like) {
		if (like===1 || like===-1) {
			var data = {}
			data.like = like
			$http.post(url, data).success((response) => {
					$window.alert(response.message + '\n Likes:' + response.like + '  Dislikes:' + response.dislike)
			})
		}
	}


});






