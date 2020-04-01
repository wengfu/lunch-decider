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
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.map.setCenter(pos);
        this.mapService.setMarker(pos);
        this.restaurantService.initRestaurants(pos, '500').subscribe((response) => {
            for (let i = 0; i < response.length; i++) {
                const place = response[i];
                const restaurant = {
                    id: i,
                    place,
                    marker: this.mapService.setMarker(place.geometry.location, 'restaurant_red'),
                    selected: false
                };
                restaurant.marker.addListener('mouseover', () => this.onHoverRestaurant(restaurant, 'enter') );
                restaurant.marker.addListener('mouseout', () => this.onHoverRestaurant(restaurant, 'leave') );
                this.restaurantsArray.push(restaurant);
            }
        });
    }

    public removeRestaurant(restaurantId: number) {
        this.restaurantsArray = _.filter(this.restaurantsArray, (r) => {
            if (r.place.id === restaurantId) {
                r.marker.setMap(null);
                r.marker = null;
            }
            return r.place.id !== restaurantId;
        });
    }

    public onHoverRestaurant(restaurant: Restaurant, enterLeave: string) {
        if (restaurant) {
            if (enterLeave === 'enter') {
                this.mapService.setIcon(restaurant.marker, 'restaurant_blue', true);
                restaurant.selected = true;
            } else {
                this.mapService.setIcon(restaurant.marker, 'restaurant_red', false);
                restaurant.selected = false;
            }
        }
    }

    public spinRoulette() {
        this.spinResult = this.restaurantsArray[Math.floor(Math.random() * this.restaurantsArray.length)];
    }

    public handleLocationError() {}
}
