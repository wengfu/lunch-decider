angular.module('appModule')
.service('RestaurantService', ['MapService', function(MapService){
  var service = {};
  
  var placesService;
  
  service.initService = function(map){
    placesService = new google.maps.places.PlacesService(map);
  };
  
  service.initRestaurants = function(center, radius){
    var request = {
      location: center,
      radius: radius,
      type: ['restaurant']
    };
    var callback = function(results, status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          MapService.setMarker(results[i].geometry.location);
        }
      }
    };
    placesService.nearbySearch(request, callback);
  };
  
  return service;
}]);