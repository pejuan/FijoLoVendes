angular.module('Fijolovendes', [])
    .constant('ENDPOINT_URI', 'http://localhost:1337/api/')
    .controller('TabController',function(){
        this.tab = 1;
        this.isSet = function(checkout){
             return this.tab === checkout;
        }
        this.setTab = function(number){
            this.tab = number;
        }
    })
    .controller('MainCtrl', function (ProductsModel) {
        var main = this;

        function getProducts() {
            ProductsModel.all()
                .then(function (result) {
                    main.products = result.data;
                });
        }

        function createProduct(product) {
            ProductsModel.create(product)
                .then(function (result) {
                    initCreateForm();
                    getProducts();
                });
        }

        function updateProduct(product) {
            ProductsModel.update(product.id, product)
                .then(function (result) {
                    cancelEditing();
                    getProducts();
                });
        }

        function deleteProduct(productId) {
            ProductsModel.destroy(productId)
                .then(function (result) {
                    cancelEditing();
                    getProducts();
                });
        }

        function initCreateForm() {
            main.newProduct = { name: '', price: '',shipping: ' ', seller: ' ', stock: ' '};
        }

        function setEditedProduct(product) {
            main.editedProduct = angular.copy(product);
            main.isEditing = true;
        }

        function isCurrentProduct(productId) {
            return main.editedProduct !== null && main.editedProduct.id === productId;
        }

        function cancelEditing() {
            main.editedProduct = null;
            main.isEditing = false;
        }

        main.products = [];
        main.editedProduct = null;
        main.isEditing = false;
        main.getProducts = getProducts;
        main.createProduct = createProduct;
        main.updateProduct = updateProduct;
        main.deleteProduct = deleteProduct;
        main.setEditedProduct = setEditedProduct;
        main.isCurrentProduct = isCurrentProduct;
        main.cancelEditing = cancelEditing;

        initCreateForm();
        getProducts();
    })
    .service('ProductsModel', function ($http, ENDPOINT_URI) {
        var service = this,
            path = 'products/';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        function getUrlForId(productId) {
            return getUrl(path) + productId;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (productId) {
            return $http.get(getUrlForId(productId));
        };

        service.create = function (product) {
            return $http.post(getUrl(), product);
        };

        service.update = function (productId, product) {
            return $http.put(getUrlForId(productId), product);
        };

        service.destroy = function (productId) {
            return $http.delete(getUrlForId(productId));
        };
    });