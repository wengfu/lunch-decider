window.onload = function(){
  
};
var module = angular.module('appModule', []);
module.controller('mainController', ['$scope', 'MapService', 'RestaurantService', 
  function($scope, MapService, RestaurantService){

    var defaultCenter = { lat: 39.9523789, lng: -75.1635996 };
    var secondMarkerLocation = { lat: 39.234523, lng: -75.2342323 };
    var map;

    function init(){
      MapService.initMap('mapContainer', defaultCenter);
      map = MapService.getMap();
      RestaurantService.initService(map);
    }
    google.maps.event.addDomListener(window, 'load', init);


    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        MapService.setMarker(pos);
        RestaurantService.initRestaurants(pos, '500');
      }, function(){
        handleLocationError();
      })
    }

    // var userMarker;
    // google.maps.event.addListener(map, 'click', function(event){
    //   userMarker = new google.maps.Marker({
    //     position: event.latLng,
    //     map: map
    //   });
    // })

    function handleLocationError(){

    }
}]);