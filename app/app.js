(function(){
	var app = angular.module('flvStore',[]);
	app.controller('flvStoreController',["$http",function($http){
	    var store = this;
		$http.get('/products').success(function(data){
			store.products=data;
		});

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
})();