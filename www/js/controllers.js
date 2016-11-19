angular.module('deals.controllers', [])

    .controller('DealsLoginCtrl', function ($scope, $http, $location) {
    	$scope.baseURL = "http://localhost:8000/";
    	$scope.userName = "";
    	
    	$scope.FBLogin = function(){
    		if(username){
    			$location.path("/userHome");
    		}else{
    			FB.login(function(response) {
    			    if (response.authResponse) {
    			     console.log('Welcome!  Fetching your information.... ');
    			     FB.api('/me', function(response) {
    			       console.log('Good to see you, ' + response.name + '.');
    			       username = response.name;
    			       console.log(username);
    			       var accessToken = FB.getAuthResponse();
    			       console.log(accessToken);
    			       if(accessToken.userID != null){
    			            // $scope.userName = accessToken.userID;
    			            userid = accessToken.userID;
    			            console.log(username);
    			       		$location.path("/userHome");
    			       }
    			     });
    			    } else {
    			     console.log('User cancelled login or did not fully authorize.');
    			    }
    			});
    		}
	    };


    	$scope.checkUser = function(){
    		$http.get($scope.baseURL+'login').then(function(response){
    			$scope.userData = response.json();
    			$scope.userName = $scope.userData["username"];
    			$location.path("/userHome");
    		}, function(response){
    			console.log("Some Error occured in Api");
    			$location.path("/invalidLogin");
    		});
    	}

    	$scope.loginUser = function(){
    		$scope.checkUser();
    	}

    })

    .controller('InvalidLoginCtrl', function ($scope) {})

    .controller('DealsHomeCtrl', function ($scope) {
    	$scope.username = username;
    })

    .controller('AllDealsCtrl', function ($scope, $http) {
    	$http.get("https://sheetsu.com/apis/v1.0/f30264ebda07").success(function(response){
			$scope.deals = response;
		})
		.error(function(error){
	        console.log("Some Error occured in Api");
		});
    });
