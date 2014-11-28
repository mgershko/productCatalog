'use strict';

// Products controller
angular.module('products').controller('CreateProductController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories', '$http',
	function($scope, $stateParams, $location, Authentication, Products, Categories, $http) {
		$scope.authentication = Authentication;
		$scope.searchText = '';
		$scope.searchType = 'name';
		$scope.selectedCategories= [];

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = new Products ({
				name: this.name,
				image: this.image,
				description: this.description,
				price: this.price,
				quantity: this.quantity,
				category: this.selectedCategories
			});


			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.image = '';
				$scope.description = '';
				$scope.price = '';
				$scope.quantity = '';
				$scope.category = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) { 
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;
			product.category = $scope.selectedCategories;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({ 
				productId: $stateParams.productId
			});
		};

		$scope.searchTextFunction = function(){
			$scope.filteredProducts = [];
			angular.forEach($scope.products, function(elem, i){
				if (elem[$scope.searchType].indexOf($scope.searchText) !== -1){
					$scope.filteredProducts.push(elem);
				}

			});
		};

		$scope.changeCategory = function(category){
			if($scope.selectedCategories.indexOf(category.name) !== -1){
				$scope.selectedCategories.splice($scope.selectedCategories.indexOf(category.name), 1);
			} else {
				$scope.selectedCategories.push(category.name);
			}

		};

		$scope.uploadImage = function(files){
			var fd = new FormData();
			fd.append('file', files[0]);
			$http.post('/uploader', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})
				.success(function(data){
					$scope.image = data.imageUrl;
				})
				.error(function(){

				});
		};

		var init = function () {
			if($scope.product){
				$scope.selectedCategories = $scope.product.category;
			}
			$scope.categories = Categories.query();
			Products.query().$promise.then(function (products) {
				$scope.filteredProducts = products;
			});
		};

		init();
	}
]);

angular.module('products').controller('EditProductController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories', '$http',
	function($scope, $stateParams, $location, Authentication, Products, Categories, $http) {
		$scope.authentication = Authentication;
		$scope.searchText = '';
		$scope.searchType = 'name';
		$scope.selectedCategories= [];

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = new Products ({
				name: this.name,
				image: this.image,
				description: this.description,
				price: this.price,
				quantity: this.quantity,
				category: this.selectedCategories
			});


			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.image = '';
				$scope.description = '';
				$scope.price = '';
				$scope.quantity = '';
				$scope.category = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;
			product.category = $scope.selectedCategories;
			product.image = $scope.image;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};

		$scope.searchTextFunction = function(){
			$scope.filteredProducts = [];
			angular.forEach($scope.products, function(elem, i){
				if (elem[$scope.searchType].indexOf($scope.searchText) !== -1){
					$scope.filteredProducts.push(elem);
				}

			});
		};

		$scope.changeCategory = function(category){
			if($scope.selectedCategories.indexOf(category.name) !== -1){
				$scope.selectedCategories.splice($scope.selectedCategories.indexOf(category.name), 1);
			} else {
				$scope.selectedCategories.push(category.name);
			}

		};

		$scope.uploadImage = function(files){
			var fd = new FormData();
			fd.append('file', files[0]);
			$http.post('/uploader', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})
				.success(function(data){
					$scope.image = data.imageUrl;
				})
				.error(function(){

				});
		};

		var init = function () {

			$scope.categories = Categories.query();
			Products.get({productId: $stateParams.productId}).$promise.then(function (product) {
				$scope.product = product;
				if($scope.product){
					$scope.selectedCategories = $scope.product.category;
				}
			});
		};

		init();
	}
]);

angular.module('products').controller('ViewProductController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories',
	function($scope, $stateParams, $location, Authentication, Products, Categories) {
		$scope.authentication = Authentication;
		$scope.searchText = '';
		$scope.searchType = 'name';
		$scope.selectedCategories= [];

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = new Products ({
				name: this.name,
				image: this.image,
				description: this.description,
				price: this.price,
				quantity: this.quantity,
				category: this.selectedCategories
			});


			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.image = '';
				$scope.description = '';
				$scope.price = '';
				$scope.quantity = '';
				$scope.category = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;
			product.category = $scope.selectedCategories;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};

		$scope.searchTextFunction = function(){
			$scope.filteredProducts = [];
			angular.forEach($scope.products, function(elem, i){
				if (elem[$scope.searchType].indexOf($scope.searchText) !== -1){
					$scope.filteredProducts.push(elem);
				}

			});
		};

		$scope.changeCategory = function(category){
			if($scope.selectedCategories.indexOf(category.name) !== -1){
				$scope.selectedCategories.splice($scope.selectedCategories.indexOf(category.name), 1);
			} else {
				$scope.selectedCategories.push(category.name);
			}

		};

		var init = function () {
			if($scope.product){
				$scope.selectedCategories = $scope.product.category;
			}
			$scope.categories = Categories.query();
			Products.query().$promise.then(function (products) {
				$scope.filteredProducts = products;
			});
		};

		init();
	}
]);

angular.module('products').controller('ListProductController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories',
	function($scope, $stateParams, $location, Authentication, Products, Categories) {
		$scope.authentication = Authentication;
		$scope.searchText = '';
		$scope.searchType = 'name';
		$scope.selectedCategories= [];

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = new Products ({
				name: this.name,
				image: this.image,
				description: this.description,
				price: this.price,
				quantity: this.quantity,
				category: this.selectedCategories
			});


			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.image = '';
				$scope.description = '';
				$scope.price = '';
				$scope.quantity = '';
				$scope.category = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;
			product.category = $scope.selectedCategories;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};

		$scope.searchTextFunction = function(){
			$scope.filteredProducts = [];
			angular.forEach($scope.products, function(elem, i){
				if (elem[$scope.searchType].indexOf($scope.searchText) !== -1){
					$scope.filteredProducts.push(elem);
				}

			});
		};

		$scope.changeCategory = function(category){
			if($scope.selectedCategories.indexOf(category.name) !== -1){
				$scope.selectedCategories.splice($scope.selectedCategories.indexOf(category.name), 1);
			} else {
				$scope.selectedCategories.push(category.name);
			}

		};

		var init = function () {
			if($scope.product){
				$scope.selectedCategories = $scope.product.category;
			}
			$scope.categories = Categories.query();
			Products.query().$promise.then(function (products) {
				$scope.filteredProducts = products;
			});
		};

		init();
	}
]);


