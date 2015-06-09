
var app = angular.module('flvStore',[]);
	app.controller('flvCtrl',['$scope', '$http',function($scope,$http){
			$scope.product = {};
			$scope.comment="";
			 console.log("Hello World from controller");
			 refresh = function(){
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

		$scope.createComment =function(){
		 	$http.post('/api/products', $scope.comment).success(function){

		 });

	}]);
	app.controller('TabController',function(){
		this.tab = 1;
		this.isSet = function(checkout){
			 return this.tab === checkout;
		};
		this.setTab = function(number){
			if(number===2)
				refresh();
			this.tab = number;
		}
	});