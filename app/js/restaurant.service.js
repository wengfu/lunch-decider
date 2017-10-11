angular.module('appModule')
.service('RestaurantService', ['MapService', '$q', function(MapService, $q){
  var service = {};
  
  var placesService;
  
  service.initService = function(map){
    placesService = new google.maps.places.PlacesService(map);
  };
  
  service.initRestaurants = function(center, radius){
    var deferred = $q.defer();

    var request = {
      location: center,
      radius: radius,
      type: ['restaurant']
    };
    var callback = function(results, status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          // console.log(results[i])
          MapService.setMarker(results[i].geometry.location);
        }
        deferred.resolve(results);
      }
    };
    placesService.nearbySearch(request, callback);

    return deferred.promise;
  };
  
  return service;
}]);