(function () {
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController);

    NarrowItDownController.$inject = ['$http'];
    function NarrowItDownController($http) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = [];

        ctrl.narrowItDown = function () {
            if (ctrl.searchTerm.trim() === '') {
                ctrl.found = [];
                return;
            }

            // Use the $http service to fetch menu items and filter them
            var menuUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json';
            $http.get(menuUrl)
    .then(function (response) {
        console.log(response)
        var menuData = response.data; // Assuming the API response is an object with a property containing an array
        var menuItems = menuData["A"].menu_items; // Adjust this according to the actual structure
        if (!Array.isArray(menuItems)) {
            console.error('Menu items are not in the expected format:', menuItems);
            ctrl.found = [];
            return;
        }

        ctrl.found = filterMenuItems(menuItems, ctrl.searchTerm);
    })
    .catch(function (error) {
        console.error('Error fetching menu items:', error);
    });

        };

        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        };

        function filterMenuItems(menuItems, searchTerm) {
            var filteredItems = [];
            searchTerm = searchTerm.toLowerCase();

            menuItems.forEach( (item)=> {
                if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                    filteredItems.push(item);
                }
            });

            return filteredItems;
        }
    }
})();

