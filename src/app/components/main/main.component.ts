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
    public spinResult: Restaurant = null;
    public showBackdrop = true;

    constructor(
        public mapService: MapService,
        public restaurantService: RestaurantService
    ) {}

    ngOnInit() {
        this.mapService.initMap(this.mapContainer.nativeElement, this.defaultCenter);
        this.map = this.mapService.getMap();
        this.restaurantService.initService(this.map);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.getPositionSuccessCallBack.bind(this),
                this.handleLocationError,
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }

        // google.maps.event.addListener(this.map, 'click', function(event){
        //   this.userMarker = new google.maps.Marker({
        //     position: event.latLng,
        //     map: this.map
        //   });
        // })
    }

    public getPositionSuccessCallBack(position) {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.map.setCenter(pos);
        this.mapService.setMarker(pos);
        this.restaurantService.initRestaurants(pos, '500').subscribe((response) => {
            this.showBackdrop = false;
            for (let i = 0; i < response.length; i++) {
                const place = response[i];
                const restaurant = {
                    id: i,
                    place,
                    marker: this.mapService.setMarker(place.geometry.location, 'restaurant_red'),
                    selected: false
                };
                restaurant.marker.addListener('mouseover', () => this.onOverRestaurant(restaurant) );
                restaurant.marker.addListener('mouseout', () => this.onLeaveRestaurant(restaurant) );
                this.restaurantsArray.push(restaurant);
            }
        });
    }

    public removeRestaurant(restaurantId: number) {
        this.restaurantsArray = _.filter(this.restaurantsArray, (r) => {
            if (r.id === restaurantId) {
                r.marker.setMap(null);
                r.marker = null;
            }
            return r.id !== restaurantId;
        });
    }

    public onOverRestaurant(restaurant: Restaurant) {
        if (restaurant) {
            this.mapService.setIcon(restaurant.marker, 'restaurant_blue', true);
            restaurant.selected = true;
        }
    }

    public onLeaveRestaurant(restaurant: Restaurant) {
        if (restaurant) {
            this.mapService.setIcon(restaurant.marker, 'restaurant_red', false);
            restaurant.selected = false;
        }
    }

    public handleLocationError(error) {
        let errorMessage = '';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location access blocked.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                errorMessage = 'The request to get user location timed out.';
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = 'An unknown error occurred.';
                break;
        }
        alert(errorMessage);
    }
}
