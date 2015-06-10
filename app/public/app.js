
var app = angular.module('flvStore',[]);
   
	app.controller('flvCtrl',['$scope', '$http',function($scope,$http){
			$scope.product = {};
			 console.log("Hello World from controller");
	    $scope.refresh = function(){
				$http.get('/products').success(function(data){
				console.log("I got the data I requested");
				$scope.products=data;
                
			});
	    };
		$scope.addProduct = function(){
			console.log($scope.product);
			$http.post('/products', $scope.product).success(function(response){
				console.log(response);
			});

		};
		$scope.getProduct = function(product){
		   $scope.product = product;
		};

		$scope.createComment =function(){
		 	$http.post('/api/products/'+ $scope.product.id, $scope.product.comment).success(function(response){
             console.log(response);
		 });
		};

	}]);
	app.controller('TabController',function(){
		this.tab = 1;
		this.isSet = function(checkout){
			 return this.tab === checkout;
		};
		this.setTab = function(number){
			this.tab = number;
		}
	});
	 app.controller('loginCtrl',['$scope', '$http',function($scope,$http){
    	 $scope.user = {};
    	 $scope.login = function(){
               $http.post('/users',$scope.user).success(function(response){
                    console.log(response);
               });
    	 };
    	 $scope.signup = function(){
    	 	  $http.post('/users',$scope.user).success(function(response){
                    console.log(response);
               });     
    	 };
    }]);