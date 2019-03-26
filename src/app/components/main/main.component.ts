/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../../service/map.service';
import { RestaurantService } from '../../service/restaurant.service';
import { Restaurant } from '../../models/restaurant.interface';
import * as _ from 'lodash';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
    @ViewChild('mapContainer') mapContainer: any;
    
    public defaultCenter = { lat: 39.9523789, lng: -75.1635996 };
    public secondMarkerLocation = { lat: 39.234523, lng: -75.2342323 };
    public map: google.maps.Map;
    public restaurantsArray: Restaurant[] = [];
    public userMarker;
    
    constructor(
        public mapService: MapService,
        public restaurantService: RestaurantService
    ) {}

    ngOnInit() {
        // google.maps.event.addDomListener(window, 'load', this.init);
        this.mapService.initMap(this.mapContainer.nativeElement, this.defaultCenter);
        this.map = this.mapService.getMap();
        this.restaurantService.initService(this.map);
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                this.getPositionSuccessCallBack.bind(this),
                () => this.handleLocationError());
        }
        
        // google.maps.event.addListener(this.map, 'click', function(event){
        //   this.userMarker = new google.maps.Marker({
        //     position: event.latLng,
        //     map: this.map
        //   });
        // })
    }

    public getPositionSuccessCallBack(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.map.setCenter(pos);
        this.mapService.setMarker(pos);
        this.restaurantService.initRestaurants(pos, '500').subscribe((response) => {
            for (var i = 0; i < response.length; i++) {
                const place = response[i];
                this.restaurantsArray.push({
                    id: i,
                    place: place,
                    marker: this.mapService.setMarker(place.geometry.location, 'restaurant_red')
                });
            }
        });
    }
    
    public removeRestaurant(restaurantId: number){
        this.restaurantsArray = _.filter(this.restaurantsArray, (r) => {
            if(r.place.id === restaurantId){
                r.marker.setMap(null);
                r.marker = null;
            }
            return r.place.id !== restaurantId;
        });
    }

    public hoverRestaurant(restaurant: Restaurant, enterLeave: string) {
        if (enterLeave === 'enter') {
            this.mapService.setIcon(restaurant.marker, 'restaurant_blue', true);
        } else {
            this.mapService.setIcon(restaurant.marker, 'restaurant_red', false);
        }
        
    }

    public handleLocationError() {}
}