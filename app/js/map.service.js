/**
 * Created by FUG on 8/20/17.
 */
angular.module('appModule')
.service('MapService', function(){
  var service = {};
  
  var _map = null;
  
  service.initMap = function(mapContainerElementId, defaultCenter){
    _map = new google.maps.Map(
      document.getElementById(mapContainerElementId), {
        center: defaultCenter,
        zoom: 16
      });
  };
  service.getMap = function(){
    return _map;
  };
  service.setMarker = function(position){
    return new google.maps.Marker({
      position: position,
      map: _map
    });
  };
  
  return service;
});