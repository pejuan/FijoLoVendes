

(function(){
	var app = angular.module('flvStore',[]);
	app.controller('flvStoreController',function($scope,$http){
		$scope.formData = {};
		$http.get('/api/products')
		   .success(function(data){
			$scope.products=data;
			console.log(data)
		})
		 .error(function(data){
		   	console.log('Error: ' + data);
		   });
		 $scope.createProduct = function(){
		 	$http.post('/api/products', $scope.formData)
		 	.success(function(data){
		 		$scope.formData = {};
		 		$scope.products = data;
		 		console.log(data);
		 	})
		 	.error(function(data){
		 		console.log("Error:" + data);
		 	});
		 };
		 $scope.deleteProduct = function(id){
		 	$http.delete('api/products/' + id)
		 	.success(function(data){
		 		$scope.products = data;
		 		console.log(data);
		 	})
		 	.error(function(data){
		 		console.log('Error:' + data);
		 	});
		 };

	});
	app.controller('TabController',function(){
		this.tab = 1;
		this.isSet = function(checkout){
			 return this.tab === checkout;
		};
		this.setTab = function(number){
			this.tab = number;
		}
	});
})();